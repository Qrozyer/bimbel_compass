import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import SubBidangTable from '../../components/subBidang/SubBidangTable';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const SubBidangByBidangPage = () => {
  const { bidangId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subBidang = useSelector((state) => state.subBidang.subBidang);
  const [BidangName, setBidangName] = useState('');

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: `/sub-bidang/by-bidang/${bidangId}` },
  ];

  useEffect(() => {
    const fetchDataFiltered = async () => {
      try {
        const data = await fetchData(`sub-bidang/filter/${bidangId}`);
        if (data) {
          dispatch(setSubBidang(data));
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data sub bidang.', 'error');
      }
    };

    const fetchBidangName = async () => {
      try {
        const data = await fetchData(`bidang`);
        if (data) {
          const bidang = data.find((item) => item.BidangId === parseInt(bidangId));
          if (bidang) {
            setBidangName(bidang.BidangNama);
          } else {
            setBidangName('Bidang tidak ditemukan');
          }
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil nama bidang.', 'error');
      }
    };

    fetchBidangName();
    fetchDataFiltered();
  }, [bidangId, dispatch]);

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
        await deleteData('sub-bidang', id);
        dispatch(setSubBidang(subBidang.filter((item) => item.SubId !== id)));
        Swal.fire('Terhapus!', 'Data sub bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{ margin: 'auto', maxWidth: '1000px' }}>
      <div className="flex-grow-1">
        {/* Breadcrumb */}
        <BreadcrumbNavigation paths={breadcrumbPaths} />

        <div className="d-flex justify-content-start mb-3">
              <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                ← Kembali
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate(`/sub-bidang/add?bidangId=${bidangId}`)}
              >
                + Tambah Sub Bidang
              </button>
            </div>


        {/* Card container */}
        <div className="card shadow-sm rounded-4 mt-3">
          <div className="card-header bg-dark text-white rounded-top-4">
            <h5 className="mb-0">Daftar Sub Bidang dari Bidang : {BidangName || 'Memuat...'}</h5>
          </div>

          <div className="card-body">            
            <SubBidangTable
              data={subBidang}
              onEdit={(item) => navigate(`/sub-bidang/edit/${item.SubId}`)}
              onDelete={handleDelete}
              onDetail={(item) => navigate(`/materi/by-sub-bidang/${item.SubId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBidangByBidangPage;
