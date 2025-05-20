import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';

const HasilMateriListPage = () => {
  const navigate = useNavigate();
  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const [filteredMateri, setFilteredMateri] = useState([]);

  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedSubBidang, setSelectedSubBidang] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [bidangs, subBidangs, materis] = await Promise.all([
        fetchData('bidang'),
        fetchData('sub-bidang'),
        fetchData('materi'),
      ]);
      setBidangList(bidangs);
      setSubBidangList(subBidangs);
      setMateriList(materis);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    let filtered = materiList;

    if (selectedSubBidang) {
      filtered = filtered.filter((m) => m.SubId === parseInt(selectedSubBidang));
    } else if (selectedBidang) {
      const subIds = subBidangList
        .filter((sb) => sb.BidangId === parseInt(selectedBidang))
        .map((sb) => sb.SubId);
      filtered = filtered.filter((m) => subIds.includes(m.SubId));
    }

    if (searchTerm) {
      filtered = filtered.filter((m) =>
        m.MateriJudul.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMateri(filtered);
    setCurrentPage(1);
  }, [materiList, selectedBidang, selectedSubBidang, searchTerm, subBidangList]);

  const filteredSubBidang = subBidangList.filter(
    (sb) => sb.BidangId === parseInt(selectedBidang)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMateri.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMateri.length / itemsPerPage);

  const handleLihatHasil = (materiId) => {
    navigate(`/laporan-materi/${materiId}`);
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', padding: '50px', margin: '0 auto' }}>
      <div>
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
      </div>
      <div className="card rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Materi</h5>
        </div>
        <div className="card-body">
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Bidang</label>
              <select
                className="form-select"
                value={selectedBidang}
                onChange={(e) => {
                  setSelectedBidang(e.target.value);
                  setSelectedSubBidang('');
                }}
              >
                <option value="">Semua Bidang</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>{b.BidangNama}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Sub Bidang</label>
              <select
                className="form-select"
                value={selectedSubBidang}
                onChange={(e) => setSelectedSubBidang(e.target.value)}
                disabled={!selectedBidang}
              >
                <option value="">Semua Sub Bidang</option>
                {filteredSubBidang.map((sb) => (
                  <option key={sb.SubId} value={sb.SubId}>{sb.SubNama}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Cari Judul Materi</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan kata kunci"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredMateri.length === 0 ? (
            <div className="alert alert-warning">Tidak ada materi yang tersedia.</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>No</th>
                      <th>ID Materi</th>
                      <th>Judul</th>
                      <th>Dibuat</th>
                      <th>Diperbarui</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((materi, index) => (
                      <tr key={materi.MateriId}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{materi.MateriId}</td>
                        <td>{materi.MateriJudul}</td>
                        <td>{materi.MateriCreate}</td>
                        <td>{materi.MateriUpdate}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleLihatHasil(materi.MateriId)}
                          >
                            Lihat Hasil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  Tampilkan{' '}
                  <select
                    className="form-select d-inline-block w-auto"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    {[5, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>{n}</option>
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
                      <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lsaquo;</button>
                    </li>
                    <li className="page-item disabled">
                      <span className="page-link">
                        Halaman {currentPage} dari {totalPages}
                      </span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>&rsaquo;</button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HasilMateriListPage;
