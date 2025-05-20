import React from 'react';
import { useNavigate } from 'react-router-dom';

const LaporanUjian = () => {
  const navigate = useNavigate();

  const handleHasilUjianClick = () => {
    navigate('/hasil-ujian');
  };

  const handleLaporanMateriClick = () => {
    navigate('/laporan-materi');
  };

  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-5 ml-5" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left me-2"></i> Kembali
      </button>
      <h3 className="text-center mb-5">Pilih Kategori Ujian</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
        {/* Card: Daftar Hasil Ujian */}
        <div className="col" onClick={handleHasilUjianClick}>
          <div className="card text-center h-100 menu-card">
            <div className="card-body">
              <i className="fas fa-poll fa-3x mb-3"></i>
              <h5 className="card-title">Daftar Hasil Ujian Section</h5>
            </div>
          </div>
        </div>

        {/* Card: Laporan Ujian Materi */}
        <div className="col" onClick={handleLaporanMateriClick}>
          <div className="card text-center h-100 menu-card">
            <div className="card-body">
              <i className="fas fa-clipboard-list fa-3x mb-3"></i>
              <h5 className="card-title">Laporan Ujian Materi</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Tambahkan style langsung di bawah */}
      <style jsx>{`
        .menu-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .menu-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .card i {
          color: #007bff;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LaporanUjian;
