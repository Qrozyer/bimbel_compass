// src/pages/peserta/AsalPesertaList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';

const AsalPesertaList = () => {
  const navigate = useNavigate();
  const [asalPeserta, setAsalPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData('peserta/asal');
        setAsalPeserta(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Gagal mengambil data asal peserta:', error);
      }
    };

    getData();
  }, []);

  const handleDelete = (asalDaerah) => {
    Swal.fire({
      title: `Hapus asal daerah "${asalDaerah}"?`,
      text: 'Tindakan ini tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteData('peserta/asal', asalDaerah); // pastikan endpoint delete sesuai
          setAsalPeserta((prev) => prev.filter((item) => item.AsalDaerah !== asalDaerah));
          Swal.fire('Terhapus!', 'Asal daerah telah dihapus.', 'success');
        } catch (err) {
          console.error('Gagal menghapus:', err);
          Swal.fire('Gagal!', 'Gagal menghapus asal daerah.', 'error');
        }
      }
    });
  };

  const filteredData = asalPeserta.filter((item) =>
    item.AsalDaerah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '800px' }}>
      <h2>Data Asal Peserta</h2>
      <div className="d-flex justify-content-start gap-2 mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button className="btn btn-success" onClick={() => navigate('/asal-peserta/add')}>
          Tambah Asal Peserta
        </button>
      </div>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daftar Asal Peserta</h5>
        </div>
        <div className="card-body p-3">
          <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari asal daerah..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle" style={{ fontSize: '14px' }}>
              <thead className="table-secondary text-dark">
                <tr>
                  <th style={{ width: '10%' }}>No.</th>
                  <th>Asal Daerah</th>
                  <th style={{ width: '25%' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{item.AsalDaerah}</td>
                      <td className="d-flex gap-1">
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.AsalDaerah)}>
                          <i className="fas fa-trash"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Tidak ada data asal peserta yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div>
              Tampilkan{' '}
              <select
                className="form-select d-inline-block w-auto"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>{' '}
              baris per halaman
            </div>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(1)}>
                    &laquo;
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                    &lsaquo;
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    Halaman {currentPage} dari {totalPages || 1}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                    &rsaquo;
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsalPesertaList;
