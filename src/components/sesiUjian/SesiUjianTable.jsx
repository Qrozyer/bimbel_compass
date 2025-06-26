import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SesiUjianTable = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.SectionNama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [data, searchTerm]);

  if (!data || !Array.isArray(data)) return <div>Data kosong</div>;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* Search */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama sesi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th>No</th>
              <th>Nama Sesi</th>
              <th>Status</th>
              <th>Detail</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.SectionId}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.SectionNama}</td>
                  <td>
                    {item.SectionTampil === 1 ? (
                      <span className="badge bg-success">Aktif</span>
                    ) : (
                      <span className="badge bg-danger">Tidak Aktif</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/peserta/section/${item.SectionId}`)}
                      >
                        <i className="fas fa-user"></i> Peserta
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => navigate(`/soal/section/${item.SectionId}`)}
                      >
                        <i className="fas fa-question-circle"></i> Soal
                      </button>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => navigate(`/ujian/detail/${item.SectionId}`)}
                      >
                        <i className="fas fa-list"></i> Detail
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/aktivasi-ujian/${item.SectionId}`)}
                      >
                        <i className="fas fa-power-off"></i> Aktivasi
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => onEdit(item)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(item.SectionId)}
                      >
                        <i className="fas fa-trash-alt"></i> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada data yang cocok.
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
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                &lsaquo;
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                Halaman {currentPage} dari {totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
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
    </>
  );
};

export default SesiUjianTable;
