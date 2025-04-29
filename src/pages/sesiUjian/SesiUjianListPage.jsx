import React, { useState, useEffect } from 'react';
import SesiUjianTable from '../../components/sesiUjian/SesiUjianTable';
import { fetchData, deleteData } from '../../utils/api'; // Menggunakan API untuk fetch dan delete data
import { useNavigate } from 'react-router-dom'; // Untuk navigasi

const SesiUjianListPage = () => {
  const [sessions, setSessions] = useState([]); // State untuk menyimpan daftar sesi ujian
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // Ambil data sesi ujian dari API
  useEffect(() => {
    const fetchSessions = async () => {
      const data = await fetchData('soal/section'); // Ganti dengan API endpoint yang benar
      if (data) {
        setSessions(data); // Set data sesi ujian ke state
      }
    };
    fetchSessions();
  }, []);

  // Fungsi untuk mengarahkan ke halaman form untuk menambah/edit sesi ujian
  const handleAdd = () => {
    navigate('/sesi-ujian/form'); // Navigasi ke halaman form
  };

  // Fungsi untuk menghapus sesi ujian
  const handleDelete = async (sectionId) => {
    const response = await deleteData('soal/section', sectionId);
    if (response) {
      setSessions(sessions.filter((session) => session.SectionId !== sectionId)); // Update state setelah penghapusan
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Daftar Sesi Ujian</h1>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Tambah Sesi Ujian
      </button>

      {/* Menampilkan tabel sesi ujian */}
      <SesiUjianTable data={sessions} onDelete={handleDelete} onEdit={(session) => navigate(`/sesi-ujian/form/${session.SectionId}`)} />
    </div>
  );
};

export default SesiUjianListPage;
