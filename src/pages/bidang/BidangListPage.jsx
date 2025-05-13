import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../utils/api'; // Import deleteData
import Swal from 'sweetalert2'; // Import SweetAlert2

const PesertaTable = () => {
  const navigate = useNavigate();

  const [peserta, setPeserta] = useState([]);
  const [asalPeserta, setAsalPeserta] = useState([]);
  const [periodeList, setPeriodeList] = useState([]);

  const [selectedAsal, setSelectedAsal] = useState('');
  const [selectedPeriode, setSelectedPeriode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [asalData, periodeData, pesertaData] = await Promise.all([
          fetchData('peserta/asal'),
          fetchData('periode'),
          fetchData('peserta'),
        ]);

        setAsalPeserta(Array.isArray(asalData) ? asalData : []);
        setPeriodeList(Array.isArray(periodeData) ? periodeData : []);
        setPeserta(Array.isArray(pesertaData) ? pesertaData : []);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    };

    fetchInitialData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/peserta/edit/${id}`);
  };

  // Handle delete with SweetAlert
  const handleDelete = async (namaPeserta) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Menghapus peserta berdasarkan nama
          await deleteData(`peserta/${namaPeserta}`);
          // Mengupdate daftar peserta setelah penghapusan
          setPeserta((prevPeserta) => prevPeserta.filter((item) => item.peserta_nama !== namaPeserta));
          Swal.fire('Terhapus!', 'Peserta telah dihapus.', 'success');
        } catch (error) {
          console.error('Gagal menghapus peserta:', error);
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus peserta.', 'error');
        }
      }
    });
  };

  const filteredData = peserta
    .filter((p) =>
      (!selectedAsal || p.peserta_asalsekolah === selectedAsal) &&
      (!selectedPeriode || p.peserta_periode === selectedPeriode) &&
      p.peserta_nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="card shadow-sm rounded-4">
      <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Daftar Peserta</h5>
      </div>

      <div className="card-body p-3">
        {/* Filter dan Search */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div className="d-flex gap-2">
            <select className="form-select" value={selectedAsal} onChange={(e) => setSelectedAsal(e.target.value)}>
              <option value="">Pilih Asal Peserta</option>
              {asalPeserta.map((asal, index) => (
                <option key={index} value={asal.AsalDaerah}>
                  {asal.AsalDaerah}
                </option>
              ))}
            </select>

            <select className="form-select" value={selectedPeriode} onChange={(e) => setSelectedPeriode(e.target.value)}>
              <option value="">Pilih Periode</option>
              {periodeList.map((periode, index) => (
                <option key={index} value={periode.PeriodeNama}>
                  {periode.PeriodeNama}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari peserta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle" style={{ fontSize: '14px' }}>
            <thead className="table-secondary text-dark">
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>No HP</th>
                <th>Pendidikan Terakhir</th>
                <th>Asal Peserta</th>
                <th>Periode</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.peserta_id}>
                    <td>{index + 1}</td>
                    <td>{item.peserta_nama}</td>
                    <td>{item.peserta_email}</td>
                    <td>{item.peserta_jk}</td>
                    <td>{item.peserta_alamat}</td>
                    <td>{item.peserta_nohp}</td>
                    <td>{item.peserta_pendidikanterakhir}</td>
                    <td>{item.peserta_asalsekolah}</td>
                    <td>{item.peserta_periode}</td>
                    <td className="d-flex gap-1">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(item.peserta_id)}>
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.peserta_nama)}>
                        <i className="fas fa-trash"></i> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-white">
                    Tidak ada peserta yang cocok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesertaTable;
