import React, { useEffect, useState } from 'react';
import { fetchData, addData } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahSesiPeserta = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const [asalPeserta, setAsalPeserta] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [filteredPeserta, setFilteredPeserta] = useState([]);
  const [selectedAsal, setSelectedAsal] = useState('');
  const [selectedPeserta, setSelectedPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchInitialData = async () => {
      const asalData = await fetchData('peserta/asal');
      const pesertaData = await fetchData('peserta');
      if (asalData) setAsalPeserta(asalData);
      if (pesertaData) setPeserta(pesertaData);
    };

    fetchInitialData();
  }, []);

  const handleAsalChange = (event) => {
    const asal = event.target.value;
    setSelectedAsal(asal);
    const filtered = peserta.filter((p) => p.peserta_asalsekolah === asal);
    setFilteredPeserta(filtered);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedPeserta((prev) => [...prev, id]);
    } else {
      setSelectedPeserta((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleSubmit = async () => {
    try {
      const payloads = selectedPeserta.map((pesertaId) => ({
        SectionId: parseInt(sectionId),
        PesertaId: pesertaId,
      }));

      for (const data of payloads) {
        await addData('ujian/peserta', data);
      }

      toast.success('Peserta berhasil dimasukkan ke section.');
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error('Gagal menambahkan peserta.');
    }
  };

  const dataToShow = selectedAsal ? filteredPeserta : peserta;

  const filteredAndSearchedData = dataToShow.filter((p) =>
    p.peserta_nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAndSearchedData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredAndSearchedData.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '60px' }}>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark d-flex text-white rounded-top-4 justify-content-between align-items-center">
          <h3>Masukkan Peserta ke Section {sectionId}</h3>
        </div>
        <div className="card-body">

          <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-2">
            {/* Filter Asal */}
          <select
            className="form-select mb-3"
            value={selectedAsal}
            onChange={handleAsalChange}
            style={{ width: '300px' }}
          >
            <option value="">Pilih Asal Peserta</option>
            {asalPeserta.map((asal, index) => (
              <option key={index} value={asal.AsalDaerah}>
                {asal.AsalDaerah}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari nama peserta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          </div>

          {/* Tabel */}
          <form>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-secondary">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Asal Sekolah</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th width="80px" className='text-center'>Pilih</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? currentData.map((p, index) => (
                    <tr key={p.peserta_id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{p.peserta_nama}</td>
                      <td>{p.peserta_asalsekolah}</td>
                      <td>{p.peserta_alamat}</td>
                      <td>{p.peserta_nohp}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(p.peserta_id, e.target.checked)
                          }
                        />
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center">Tidak ada peserta ditemukan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>

          {/* Pagination dan tombol aksi */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
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
                  <span className="page-link">Halaman {currentPage} dari {totalPages}</span>
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

          {/* Tombol aksi */}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
            <button className="btn btn-success" onClick={handleSubmit}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahSesiPeserta;
