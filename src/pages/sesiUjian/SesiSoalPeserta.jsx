import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SesiSoalPeserta = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const handleSoalClick = () => {
    navigate(`/soal/section/${sectionId}`);
  };

  const handlePesertaClick = () => {
    navigate(`/peserta/section/${sectionId}`);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h3 className="mb-4">Pilih Kategori</h3>
      <div className="container" style={{ display: 'flex', gap: '20px' }}>
        <div
          onClick={handleSoalClick}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '30px',
            width: '200px',
            backgroundColor: '#ffe082', // Kuning muda
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Soal
        </div>

        <div
          onClick={handlePesertaClick}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '30px',
            width: '200px',
            backgroundColor: '#81d4fa', // Biru muda
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Peserta
        </div>
      </div>
    </div>
  );
};

export default SesiSoalPeserta;
