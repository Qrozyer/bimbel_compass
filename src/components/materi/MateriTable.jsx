import React, { useState, useEffect } from 'react';

const MateriTable = ({ data, onEdit, onDelete, onSoal, onDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setCurrentPage(1); // Reset saat data berubah
  }, [data, itemsPerPage]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setPaginatedData(data.slice(startIdx, endIdx));
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (!data || !Array.isArray(data)) {
    return <div>Data kosong</div>;
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary text-dark">
            <tr>
              <th>No</th>
              <th>Judul Materi</th>
              <th>Isi Materi</th>
              <th>Detail</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Belum ada materi pada sub bidang ini.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item.MateriId}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.MateriJudul}</td>
                  <td dangerouslySetInnerHTML={{ __html: item.MateriIsi }} />
                  <td width={180}>
                    <button className="btn btn-info btn-sm me-2" onClick={() => onDetail(item)}>
                      <i className="fas fa-eye"></i> Materi Detail
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => onSoal(item)}>
                      <i className="fas fa-file-alt"></i> Soal
                    </button>
                  </td>
                  <td width={150}>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.MateriId)}>
                      <i className="fas fa-trash-alt"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        <div>
          Tampilkan{' '}
          <select
            className="form-select d-inline-block w-auto"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[5,10, 15, 20, 25].map((n) => (
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
    </>
  );
};

export default MateriTable;
