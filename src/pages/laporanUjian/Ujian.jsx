import React from 'react';
import { useNavigate } from 'react-router-dom';

const Ujian = () => {
  const navigate = useNavigate();

  const handleHasilUjianClick = () => {
    navigate('/hasil-ujian'); // ganti dengan route yang sesuai di app-mu
  };

  const handleLaporanMateriClick = () => {
    navigate('/laporan-materi'); // ganti dengan route yang sesuai di app-mu
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h3 className="mb-4">Pilih Kategori Ujian</h3>
      <div className="container" style={{ display: 'flex', gap: '20px' }}>
        <div
          onClick={handleHasilUjianClick}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '30px',
            width: '250px',
            backgroundColor: '#aed581', // Hijau muda
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Daftar Hasil Ujian
        </div>

        <div
          onClick={handleLaporanMateriClick}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '30px',
            width: '250px',
            backgroundColor: '#ffccbc', // Oranye muda
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Laporan Ujian Materi
        </div>
      </div>
    </div>
  );
};

export default Ujian;
