import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import BidangTable from '../../components/bidang/BidangTable';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const BidangListPage = () => {
  const dispatch = useDispatch();
  const bidang = useSelector((state) => state.bidang.bidang);
  const navigate = useNavigate();

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
  ];

  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang');
      if (data) {
        dispatch(setBidang(data));
      }
    };
    fetchDataBidang();
  }, [dispatch]);

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
        await deleteData('bidang', id);
        dispatch(setBidang(bidang.filter((item) => item.BidangId !== id)));
        Swal.fire('Terhapus!', 'Data bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{ margin: 'auto', maxWidth: '1000px' }}>
      {/* Breadcrumb */}
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-secondary me-2" onClick={() => navigate('/dashboard')}>
              ← Kembali
            </button>
            <button className="btn btn-success me-2" onClick={() => navigate('/bidang/add')}>
              + Tambah Data Bidang
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/peserta-bidang/tambah')}>
              Masukkan Peserta ke Bidang
            </button>
      </div>

      {/* Card wrapper */}
      <div className="card shadow-sm rounded-4 mt-3">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Bidang</h5>
        </div>

        <div className="card-body">
          <BidangTable
            data={bidang}
            onEdit={(item) => navigate(`/bidang/edit/${item.BidangId}`)}
            onDelete={handleDelete}
            onDetail={(item) => navigate(`/sub-bidang/by-bidang/${item.BidangId}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default BidangListPage;
