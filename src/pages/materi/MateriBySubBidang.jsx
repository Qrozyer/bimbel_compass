// src/pages/materi/MateriBySubBidang.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMateri } from '../../actions/materiActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import MateriTable from '../../components/materi/MateriTable';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const MateriBySubBidang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subId } = useParams();
  const [BidangId, setBidangId] = useState('');
  const [subBidangName, setSubBidangName] = useState('');
  const materi = useSelector((state) => state.materi.materi);

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: `/sub-bidang/by-bidang/${BidangId}` },
    { label: 'Materi', to: `/materi/by-sub-bidang/${subId}` },
  ];

  useEffect(() => {
    const fetchFilteredMateri = async () => {
      const data = await fetchData(`materi/filter/${subId}`);
      if (data) {
        dispatch(setMateri(data));
      }
    };

    const fetchSubBidang = async () => {
      const data = await fetchData(`sub-bidang/pilih/${subId}`);
      if (data) {
        setSubBidangName(data.SubNama);
        setBidangId(data.BidangId);
      }
    };

    fetchFilteredMateri();
    fetchSubBidang();
  }, [dispatch, subId]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('materi', id);
        dispatch(setMateri(materi.filter((item) => item.MateriId !== id)));
        Swal.fire('Terhapus!', 'Data materi telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{margin: '20 px auto', maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
              ← Kembali
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate(`/materi/add/${subId}`)}
            >
              + Tambah Data Materi
            </button>
          </div>


      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">
            Daftar Materi dari Sub Bidang: {subBidangName || 'Memuat...'}
          </h5>
        </div>
        <div className="card-body">
          <MateriTable
            data={materi}
            onEdit={(item) => navigate(`/materi/edit/${item.MateriId}`)}
            onDelete={handleDelete}
            onDetail={(item) => navigate(`/materi/detail/${item.MateriId}`)}
            onSoal={(item) => navigate(`/soal/by-materi/${item.MateriId}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default MateriBySubBidang;
