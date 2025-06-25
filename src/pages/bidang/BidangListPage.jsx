import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import BidangTable from '../../components/bidang/BidangTable';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const BidangListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bidang = useSelector((state) => state.bidang.bidang);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBidang, setFilteredBidang] = useState([]);

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

  useEffect(() => {
    const filtered = searchQuery.trim()
      ? bidang.filter((item) =>
          item.BidangNama.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : bidang;
    setFilteredBidang(filtered);
  }, [searchQuery, bidang]);

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

      {/* Buttons */}
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

      {/* Card Table */}
      <div className="card shadow-sm rounded-4 mt-3">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Bidang</h5>
        </div>

        <div className="card-body p-3">
          {/* Pencarian */}
          <div className="d-flex flex-column mb-3" style={{ minWidth: '300px' }}>
            <label className="form-label">Pencarian Nama Bidang:</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama bidang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabel */}
          <BidangTable
            data={filteredBidang}
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
