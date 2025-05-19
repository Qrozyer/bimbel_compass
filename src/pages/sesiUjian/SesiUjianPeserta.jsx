import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../utils/api';
import Swal from 'sweetalert2';

const SesiUjianPeserta = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [peserta, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPeserta = async () => {
      const result = await fetchData(`ujian/peserta/${sectionId}`);
      if (result) {
        setPeserta(result);
      }
    };
    fetchPeserta();
  }, [sectionId]);

  const handleTambahPeserta = () => {
    navigate(`/peserta/section/add/${sectionId}`);
  };

  const handleDeletePeserta = async (pesertaId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Peserta ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteData('ujian/peserta', pesertaId);
        if (response) {
          setPeserta(peserta.filter((item) => item.Id !== pesertaId));
          Swal.fire('Dihapus!', 'Peserta telah dihapus.', 'success');
        } else {
          Swal.fire('Gagal!', 'Gagal menghapus peserta.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus peserta.', 'error');
      }
    }
  };

  // Filter dan pagination
  const filteredPeserta = peserta.filter((item) =>
    item.PesertaNama.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPeserta.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredPeserta.slice(indexOfFirst, indexOfLast);

  if (!peserta.length) {
    return (
      <div className="container" style={{ margin: '0 auto', paddingTop: '80px', maxWidth: '1000px' }}>
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <button className="btn btn-success me-2" onClick={handleTambahPeserta}>
          <i className="fas fa-plus"></i> Masukkan Peserta
        </button>
        <div className="alert alert-info mt-3">
          <strong>Info!</strong> Belum ada peserta yang terdaftar untuk sesi ujian ini.
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ margin: '0 auto', paddingTop: '80px', maxWidth: '1000px' }}>
      {/* Tombol aksi */}
      <div className="d-flex justify-content-start mb-3 gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <button className="btn btn-success" onClick={handleTambahPeserta}>
          <i className="fas fa-plus"></i> Masukkan Peserta
        </button>
      </div>

      <div className="card rounded-4 shadow-sm">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Peserta Ujian - Section {peserta[0].SectionNama}</h5>
        </div>

        <div className="card-body">
          {/* Search dan kontrol pagination */}
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-2">
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama peserta..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset ke halaman 1 saat searching
                }}
              />
            </div>

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
          </div>

          {/* Tabel peserta */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-secondary">
                <tr>
                  <th>No</th>
                  <th>Nama Peserta</th>
                  <th>Nama Sesi</th>
                  <th width="100px">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.Id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{item.PesertaNama}</td>
                      <td>{item.SectionNama}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeletePeserta(item.Id)}
                        >
                          <i className="fas fa-trash"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Tidak ada peserta ditemukan
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
                  <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lsaquo;</button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">Halaman {currentPage} dari {totalPages}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&rsaquo;</button>
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

export default SesiUjianPeserta;
