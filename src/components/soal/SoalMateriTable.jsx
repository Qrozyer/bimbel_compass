import React, { useState, useEffect } from 'react';

const SoalMateriTable = ({
  data = [],
  selectedSoalIds = [],
  onSelectSoal,
  searchEnabled = true,
  paginationEnabled = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const filteredData = data.filter((item) =>
    item.SoalPertanyaan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paginationEnabled
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : filteredData;

  const handleCheckboxChange = (id) => {
    onSelectSoal(id);
  };

  return (
    <div className="card shadow-sm rounded-4">
      <div className="card-body p-3">
        {searchEnabled && (
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
        )}

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
                <th>Kunci</th>
                <th>
                  <i className="fas fa-check-square"></i>
                </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSoalIds.includes(item.SoalId)}
                        onChange={() => handleCheckboxChange(item.SoalId)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    Tidak ada soal yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {paginationEnabled && (
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
        )}
      </div>
    </div>
  );
};

export default SoalMateriTable;
