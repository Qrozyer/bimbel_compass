import React, { useState, useEffect } from 'react';

const SubBidangTable = ({ data, onEdit, onDelete, onDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset ke halaman pertama saat data berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  if (!Array.isArray(data)) return null;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th>No</th>
              <th>Nama Sub Bidang</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Tidak ada sub bidang yang tersedia untuk bidang ini.
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.SubId}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.SubNama}</td>
                  <td dangerouslySetInnerHTML={{ __html: item.SubKeterangan }} />
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => onDetail?.(item)}>
                      <i className="fas fa-eye"></i> Detail
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit?.(item)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete?.(item.SubId)}>
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
    </>
  );
};

export default SubBidangTable;
