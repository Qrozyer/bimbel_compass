import React, { useState, useEffect } from 'react';

const BidangTable = ({ data, onEdit, onDelete, onDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setCurrentPage(1); // Reset halaman saat data berubah
  }, [data, itemsPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (!Array.isArray(data)) return <div>Data tidak valid</div>;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th>No</th>
              <th>Nama Bidang</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.BidangId}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.BidangNama}</td>
                  <td dangerouslySetInnerHTML={{ __html: item.BidangKeterangan }}></td>
                  <td width={255}>
                    <button className="btn btn-info btn-sm me-2" onClick={() => onDetail?.(item)}>
                      <i className="fas fa-eye me-1"></i> Detail
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                      <i className="fas fa-edit me-1"></i> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.BidangId)}>
                      <i className="fas fa-trash-alt me-1"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Tidak ada data bidang yang tersedia.
                </td>
              </tr>
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
            {[10, 15, 20, 25, 30].map((num) => (
              <option key={num} value={num}>
                {num}
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
                Halaman {currentPage} dari {totalPages || 1}
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

export default BidangTable;
