import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMateri } from '../../actions/materiActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import MateriTable from '../../components/materi/MateriTable';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const MateriListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const materi = useSelector((state) => state.materi.materi);

  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [selectedBidangId, setSelectedBidangId] = useState('');
  const [selectedSubBidangId, setSelectedSubBidangId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMateri, setFilteredMateri] = useState([]);

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: '/sub-bidang' },
    { label: 'Materi', to: '/materi' },
  ];

  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const materiData = await fetchData('materi');
        const bidangData = await fetchData('bidang');
        const subBidangData = await fetchData('sub-bidang');
        if (materiData) dispatch(setMateri(materiData));
        if (bidangData) setBidangList(bidangData);
        if (subBidangData) setSubBidangList(subBidangData);
      } catch (error) {
        Swal.fire('Error', 'Gagal memuat data.', 'error');
      }
    };
    fetchDataAll();
  }, [dispatch]);

  useEffect(() => {
    let data = materi;

    if (selectedSubBidangId) {
      data = data.filter(item => item.SubId === parseInt(selectedSubBidangId));
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => item.MateriJudul.toLowerCase().includes(lowerQuery));
    }

    setFilteredMateri(data);
  }, [materi, selectedSubBidangId, searchQuery]);

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

  const handleDetail = (item) => {
  navigate(`/materi/detail/${item.MateriId}`);
};

const handleSoal = (item) => {
  navigate(`/soal/by-materi/${item.MateriId}`);
};


  // Filter sub-bidang sesuai bidang yang dipilih
  const filteredSubBidang = selectedBidangId
    ? subBidangList.filter((sb) => sb.BidangId === parseInt(selectedBidangId))
    : [];

  return (
    <div className="container pt-5" style={{ maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-secondary me-2" onClick={() => navigate('/dashboard')}>
            ← Kembali
          </button>
          <button className="btn btn-success" onClick={() => navigate('/materi/add')}>
            + Tambah Materi
          </button>
        </div>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Materi</h5>
        </div>
        <div className="card-body p-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-3">
  {/* Group kiri: Bidang & Sub Bidang */}
  <div className="d-flex flex-wrap gap-2">
    {/* Filter Bidang */}
    <div className="d-flex flex-column" style={{ minWidth: '150px' }}>
      <label className="form-label">Filter Bidang:</label>
      <select
        className="form-select"
        value={selectedBidangId}
        onChange={(e) => {
          const bidangId = e.target.value;
          setSelectedBidangId(bidangId);
          setSelectedSubBidangId('');
        }}
      >
        <option value="">Semua Bidang</option>
        {bidangList.map((bidang) => (
          <option key={bidang.BidangId} value={bidang.BidangId}>
            {bidang.BidangNama}
          </option>
        ))}
      </select>
    </div>

    {/* Filter Sub Bidang */}
    <div className="d-flex flex-column" style={{ minWidth: '150px' }}>
      <label className="form-label">Filter Sub Bidang:</label>
      <select
        className="form-select"
        value={selectedSubBidangId}
        onChange={(e) => setSelectedSubBidangId(e.target.value)}
        disabled={!selectedBidangId}
      >
        <option value="">Semua Sub Bidang</option>
        {filteredSubBidang.map((sb) => (
          <option key={sb.SubId} value={sb.SubId}>
            {sb.SubNama}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Search di kanan */}
  <div className="d-flex flex-column" style={{ minWidth: '300px' }}>
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
</div>

          <MateriTable
  data={filteredMateri}
  onEdit={(item) => navigate(`/materi/edit/${item.MateriId}`)}
  onDelete={handleDelete}
  onDetail={handleDetail}
  onSoal={handleSoal}
/>

        </div>
      </div>
    </div>
  );
};

export default MateriListPage;
