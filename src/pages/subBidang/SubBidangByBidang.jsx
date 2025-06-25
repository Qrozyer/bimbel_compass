import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import SubBidangTable from '../../components/subBidang/SubBidangTable';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const SubBidangByBidangPage = () => {
  const { bidangId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subBidangList, setSubBidangList] = useState([]);
  const [filteredSubBidang, setFilteredSubBidang] = useState([]);
  const [bidangName, setBidangName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: `/sub-bidang/by-bidang/${bidangId}` },
  ];

  useEffect(() => {
    const fetchBidangName = async () => {
      try {
        const bidangList = await fetchData('bidang');
        const currentBidang = bidangList.find(
          (b) => b.BidangId === parseInt(bidangId)
        );
        setBidangName(currentBidang ? currentBidang.BidangNama : 'Tidak ditemukan');
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil nama bidang.', 'error');
      }
    };

    const fetchSubBidangData = async () => {
      try {
        setSubBidangList([]);
        dispatch(setSubBidang([]));

        const data = await fetchData(`sub-bidang/filter/${bidangId}`);
        if (data) {
          setSubBidangList(data);
          setFilteredSubBidang(data);
          dispatch(setSubBidang(data));
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data sub bidang.', 'error');
      }
    };

    fetchBidangName();
    fetchSubBidangData();
  }, [bidangId, dispatch]);

  // Filtering berdasarkan search
  useEffect(() => {
    const filtered = subBidangList.filter((item) =>
      item.SubNama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubBidang(filtered);
  }, [searchQuery, subBidangList]);

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
        const updated = subBidangList.filter((item) => item.SubId !== id);
        setSubBidangList(updated);
        dispatch(setSubBidang(updated));
        Swal.fire('Terhapus!', 'Data sub bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{ maxWidth: '1000px' }}>
      {/* Breadcrumb */}
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      {/* Tombol Aksi */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate('/bidang-list')}>
          ← Kembali
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/sub-bidang/add?bidangId=${bidangId}`)}
        >
          + Tambah Sub Bidang
        </button>
      </div>

      {/* Card Tabel */}
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Sub Bidang dari Bidang: {bidangName}</h5>
        </div>

        <div className="card-body p-3">
          {/* Search Filter */}
          <div className="mb-3" style={{ maxWidth: '350px' }}>
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

export default SubBidangByBidangPage;
