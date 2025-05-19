import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../utils/api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const PesertaBidang = () => {
  const { BidangId: paramBidangId } = useParams();
  const navigate = useNavigate();

  const [pesertaList, setPesertaList] = useState([]);
  const [bidangList, setBidangList] = useState([]);
  const [selectedBidang, setSelectedBidang] = useState(paramBidangId || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBidangList();
  }, []);

  useEffect(() => {
    if (selectedBidang) {
      fetchPeserta();
    }
  }, [selectedBidang]);

  const fetchBidangList = async () => {
    try {
      const data = await fetchData('bidang');
      setBidangList(data);
    } catch (error) {
      toast.error('Gagal mengambil data bidang');
    }
  };

  const fetchPeserta = async () => {
    setLoading(true);
    try {
      const data = await fetchData(`peserta/bidang/${selectedBidang}`);
      setPesertaList(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Gagal mengambil data peserta');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pesertaBidangId) => {
    navigate(`/peserta-bidang/edit/${selectedBidang}/${pesertaBidangId}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Peserta yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteData('peserta/bidang', id);
          toast.success('Peserta berhasil dihapus!');
          fetchPeserta();
        } catch (error) {
          toast.error('Gagal menghapus peserta.');
        }
      }
    });
  };

  const filteredData = pesertaList.filter((p) =>
    p.PesertaNama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ margin: '0px auto', padding: '80px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-start align-items-center mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
          <button className="btn btn-success" onClick={() => navigate(`/peserta-bidang/tambah`)}>
            Masukkan Peserta
        </button>
      </div>

      <div className="card shadow-sm rounded-4 mx-auto my-4">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center rounded-top-4">
          <h5 className="mb-0">Daftar Peserta Bidang</h5>
        </div>

        <div className="card-body">
          {/* Filter dan Search */}
          <div className="d-flex justify-content-between align-items-end flex-wrap mb-3 gap-2">
            <div>
              <label className="form-label">Filter Bidang</label>
              <select
                className="form-select"
                value={selectedBidang}
                onChange={(e) => {
                  setSelectedBidang(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Pilih Bidang</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>
                    {b.BidangNama}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ maxWidth: '300px' }}>
              <label className="form-label">Cari Peserta</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari peserta..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className='alert alert-info text-center'>Pilih <strong>Bidang</strong> Terlebih Dahulu</div>
          ) : currentItems.length === 0 ? (
            <div className="text-center">Peserta tidak ditemukan</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle" style={{ fontSize: '14px' }}>
                <thead className="table-secondary">
                  <tr>
                    <th>No</th>
                    <th>Nama Peserta</th>
                    <th>Aktif</th>
                    <th>Expired</th>
                    <th width="180px">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((peserta, index) => (
                    <tr key={peserta.Id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{peserta.PesertaNama}</td>
                      <td>
                        {peserta.Aktif ? (
                          <span className="badge bg-success">Aktif</span>
                        ) : (
                          <span className="badge bg-danger">Nonaktif</span>
                        )}
                      </td>
                      <td>{new Date(peserta.Expired).toLocaleDateString('id-ID')}</td>
                      <td className="d-flex gap-2">
                        <button className="btn btn-warning" onClick={() => handleEdit(peserta.Id)}>
                          <i className="fas fa-edit"> </i> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(peserta.Id)}>
                          <i className="fas fa-trash"> </i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
              <div>
                Tampilkan{' '}
                <select
                  className="form-select d-inline-block w-auto"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  {[10, 15, 20, 25].map((n) => (
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
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                      &lsaquo;
                    </button>
                  </li>
                  <li className="page-item disabled">
                    <span className="page-link">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
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
    </div>
  );
};

export default PesertaBidang;
