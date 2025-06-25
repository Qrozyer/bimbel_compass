import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import SubBidangTable from '../../components/subBidang/SubBidangTable';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const SubBidangListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subBidang = useSelector((state) => state.subBidang.subBidang);
  const [filteredSubBidang, setFilteredSubBidang] = useState([]);
  const [bidangList, setBidangList] = useState([]);
  const [selectedBidangId, setSelectedBidangId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: '/sub-bidang' },
  ];

  useEffect(() => {
    const fetchSubBidangAndBidang = async () => {
      try {
        const subData = await fetchData('sub-bidang');
        const bidangData = await fetchData('bidang');
        if (subData) dispatch(setSubBidang(subData));
        if (bidangData) setBidangList(bidangData);
      } catch (error) {
        Swal.fire('Error', 'Gagal memuat data.', 'error');
      }
    };

    fetchSubBidangAndBidang();
  }, [dispatch]);

  useEffect(() => {
    let data = subBidang;

    if (selectedBidangId) {
      data = data.filter(item => item.BidangId === parseInt(selectedBidangId));
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => item.SubNama.toLowerCase().includes(lowerQuery));
    }

    setFilteredSubBidang(data);
  }, [selectedBidangId, searchQuery, subBidang]);

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
    <div className="container pt-5" style={{ maxWidth: '1000px' }}>
      {/* Breadcrumb */}
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      {/* Header & Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-secondary me-2" onClick={() => navigate('/bidang-list')}>
            ← Kembali
          </button>
          <button className="btn btn-success" onClick={() => navigate('/sub-bidang/add')}>
            + Tambah Sub Bidang
          </button>
        </div>
      </div>

      {/* Card Table */}
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Sub Bidang</h5>
        </div>
        <div className="card-body p-3">
          {/* Filter dan Search */}
<div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-3">
  {/* Filter Bidang */}
  <div className="d-flex flex-column" style={{ minWidth: '250px' }}>
    <label className="form-label">Filter Berdasarkan Bidang:</label>
    <select
      className="form-select"
      value={selectedBidangId}
      onChange={(e) => setSelectedBidangId(e.target.value)}
    >
      <option value="">Semua Bidang</option>
      {bidangList.map((bidang) => (
        <option key={bidang.BidangId} value={bidang.BidangId}>
          {bidang.BidangNama}
        </option>
      ))}
    </select>
  </div>

  {/* Search */}
  <div className="d-flex flex-column" style={{ minWidth: '300px' }}>
    <label className="form-label">Pencarian Nama Sub Bidang:</label>
    <div className="input-group">
      <span className="input-group-text">
        <i className="fas fa-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Cari nama sub bidang..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
</div>


          {/* Tabel */}
          <SubBidangTable
            data={filteredSubBidang}
            onEdit={(item) => navigate(`/sub-bidang/edit/${item.SubId}`)}
            onDelete={handleDelete}
            onDetail={(item) => navigate(`/materi/by-sub-bidang/${item.SubId}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubBidangListPage;
