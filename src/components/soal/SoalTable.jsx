import React, { useState, useEffect } from 'react';

const SoalTable = ({ data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman 1 jika search berubah
  }, [searchTerm, itemsPerPage]);

  if (!data || !Array.isArray(data)) {
    return <div>Data kosong</div>;
  }

  const filteredData = data.filter((item) =>
    item.SoalPertanyaan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card shadow-sm rounded-4">
      <div className="card-body p-3">
        {/* Search */}
        <div className="d-flex justify-content-between mb-3">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark text-white">
              <tr>
                <th>No</th>
                <th>Pertanyaan</th>
                <th>Jawaban A</th>
                <th>Jawaban B</th>
                <th>Jawaban C</th>
                <th>Jawaban D</th>
                <th>Jawaban E</th>
                <th>Kunci Jawaban</th>
                <th>Pembahasan</th>
                <th>Video</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.SoalId}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalPertanyaan }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalA }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalB }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalC }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalD }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalE }}></td>
                    <td>{item.SoalJawaban}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.SoalPembahasan }}></td>
                    <td>{item.SoalVideo}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-1 mb-1" onClick={() => onEdit(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.SoalId)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    Tidak ada soal yang cocok.
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
              {[5, 10, 15, 20, 25].map((n) => (
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
                  Halaman {currentPage} dari {totalPages}
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
  );
};

export default SoalTable;
