import React, { useState, useEffect } from 'react';
import { fetchData, addData, editData } from '../../utils/api'; // API untuk fetch dan save data
import { useNavigate, useParams } from 'react-router-dom'; // Menggunakan useNavigate dan useParams untuk routing
import Swal from 'sweetalert2';

const SesiUjianFormPage = () => {
  const [sessionData, setSessionData] = useState({
    SectionNama: '',
    WaktuCreate: '',
    WaktuUpdate: '',
  }); // State untuk menyimpan data sesi ujian
  const { id } = useParams(); // Mengambil ID sesi ujian dari URL jika mengedit
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fetch data sesi ujian jika mengedit
  useEffect(() => {
    if (id) {
      const fetchSession = async () => {
        const data = await fetchData(`soal/section/${id}`);
        if (data) {
          setSessionData(data);
        }
      };
      fetchSession();
    }
  }, [id]);

  // Handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  // Menyimpan sesi ujian baru atau memperbarui sesi ujian
  const handleSave = async () => {
    if (!sessionData.SectionNama || !sessionData.WaktuCreate) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    const apiCall = id ? editData : addData; // Gunakan editData jika ada ID, addData jika baru
    const response = await apiCall('soal/section', id, sessionData);

    if (response) {
      Swal.fire('Berhasil Disimpan', '', 'success');
      navigate('/sesi-ujian'); // Kembali ke halaman daftar sesi ujian
    } else {
      Swal.fire('Error', 'Terjadi kesalahan saat menyimpan sesi ujian', 'error');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">{id ? 'Edit Sesi Ujian' : 'Tambah Sesi Ujian'}</h1>

      <div className="form-group">
        <label>Nama Sesi Ujian</label>
        <input
          type="text"
          name="SectionNama"
          className="form-control"
          value={sessionData.SectionNama}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-primary" onClick={handleSave}>
          Simpan
        </button>
        <button className="btn btn-secondary ml-2" onClick={() => navigate('/sesi-ujian')}>
          Batal
        </button>
      </div>
    </div>
  );
};

export default SesiUjianFormPage;
