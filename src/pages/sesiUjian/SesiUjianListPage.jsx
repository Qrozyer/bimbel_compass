import React, { useState, useEffect } from 'react';
import SesiUjianTable from '../../components/sesiUjian/SesiUjianTable';
import { fetchData, deleteData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SesiUjianListPage = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await fetchData('soal/section');
      if (data) {
        setSessions(data);
      }
    };
    fetchSessions();
  }, []);

  const handleAdd = () => {
    navigate('/sesi-ujian/form');
  };

  const handleDelete = async (sectionId) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data sesi ujian akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      const response = await deleteData('soal/section', sectionId);
      if (response) {
        setSessions(sessions.filter((session) => session.SectionId !== sectionId));
        Swal.fire('Dihapus!', 'Sesi ujian berhasil dihapus.', 'success');
      } else {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus sesi ujian.', 'error');
      }
    }
  };

  return (
    <div className="container py-5" style={{ margin: '0 auto', padding: '20px', maxWidth: '1200px' }}>
      <h1 className="mt-4 mb-4">Daftar Sesi Ujian</h1>

      {/* Tombol kembali dan tambah */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <button className="btn btn-success ms-2" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Tambah Sesi Ujian
        </button>
      </div>

      {/* Card untuk menampilkan tabel */}
      <div className="card rounded-4 shadow-sm">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <strong>List Sesi Ujian</strong>
        </div>
        <div className="card-body">
          <SesiUjianTable
            data={sessions}
            onDelete={handleDelete}
            onEdit={(session) => navigate(`/sesi-ujian/form/${session.SectionId}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default SesiUjianListPage;
