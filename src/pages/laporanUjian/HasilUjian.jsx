import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';

const HasilUjian = () => {
  const navigate = useNavigate();
  const [ujianList, setUjianList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUjian = async () => {
      try {
        const result = await fetchData('ujian/data/section');
        setUjianList(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Gagal mengambil data ujian:', error);
      }
    };
    fetchUjian();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handleDetailClick = (SectionId) => {
    navigate(`/hasil/ujian/${SectionId}`);
  };

  const filteredData = ujianList.filter((item) =>
    item.SectionNama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container" style={{ margin: '0 auto', padding: '50px', maxWidth: '1200px' }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Kembali
      </button>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daftar Ujian</h5>
        </div>

        <div className="card-body p-3">
          {/* Search */}
          <div className="d-flex justify-content-end mb-3">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama section..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle" style={{ fontSize: '14px' }}>
              <thead className="table-secondary text-dark">
                <tr>
                  <th>No</th>
                  <th>Nama Section</th>
                  <th>Tanggal Ujian</th>
                  <th>Awal</th>
                  <th>Akhir</th>
                  <th>Durasi (menit)</th>
                  <th>Waktu Update</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.Id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{item.SectionNama}</td>
                      <td>{item.TglUjian || '-'}</td>
                      <td>{item.AwalUjian || '-'}</td>
                      <td>{item.AkhirUjian || '-'}</td>
                      <td>{item.Durasi} menit</td>
                      <td>{item.WaktuUpdate || '-'}</td>
                      <td className="text-center">
                        <span className={`badge bg-${item.Tampil ? 'success' : 'danger'}`}>
                          {item.Tampil ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleDetailClick(item.SectionID)}
                        >
                          <i className="fas fa-eye"></i> Lihat Hasil
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      Tidak ada data ujian yang cocok.
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
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[5, 10, 15, 20, 25, 30].map((n) => (
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
                  <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                    &lsaquo;
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                    &rsaquo;
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilUjian;
