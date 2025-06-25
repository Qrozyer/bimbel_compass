import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

  const [materiList, setMateriList] = useState([]);
  const [filteredMateriList, setFilteredMateriList] = useState([]);
  const [subBidangName, setSubBidangName] = useState('');
  const [bidangId, setBidangId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: `/sub-bidang/by-bidang/${bidangId}` },
    { label: 'Materi', to: `/materi/by-sub-bidang/${subId}` },
  ];

  useEffect(() => {
    const fetchSubBidang = async () => {
      try {
        const data = await fetchData(`sub-bidang/pilih/${subId}`);
        if (data) {
          setSubBidangName(data.SubNama);
          setBidangId(data.BidangId);
        } else {
          setSubBidangName('Sub Bidang tidak ditemukan');
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data sub bidang.', 'error');
      }
    };

    const fetchFilteredMateri = async () => {
      try {
        setMateriList([]);
        dispatch(setMateri([]));

        const data = await fetchData(`materi/filter/${subId}`);
        if (Array.isArray(data)) {
          setMateriList(data);
          dispatch(setMateri(data));
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data materi.', 'error');
      }
    };

    fetchSubBidang();
    fetchFilteredMateri();
  }, [dispatch, subId]);

  useEffect(() => {
    let data = materiList;

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      data = data.filter((item) =>
        item.MateriJudul.toLowerCase().includes(lower)
      );
    }

    setFilteredMateriList(data);
  }, [searchQuery, materiList]);

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
        const updated = materiList.filter((item) => item.MateriId !== id);
        setMateriList(updated);
        dispatch(setMateri(updated));
        Swal.fire('Terhapus!', 'Data materi telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{ maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate(`/sub-bidang/by-bidang/${bidangId}`)}>
          ← Kembali
        </button>
        <button className="btn btn-success" onClick={() => navigate(`/materi/add/${subId}`)}>
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
          {/* Search Box */}
          <div className="d-flex flex-column mb-3" style={{ maxWidth: '400px' }}>
            <label className="form-label">Pencarian Judul Materi:</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cari judul materi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <MateriTable
            data={filteredMateriList}
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
