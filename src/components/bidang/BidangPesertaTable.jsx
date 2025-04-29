import React from 'react';
import { useNavigate } from 'react-router-dom';  // Mengimpor useNavigate

const BidangPesertaTable = ({ data }) => {
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman sub bidang

  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }
  
  // Fungsi untuk mengarahkan ke halaman Sub Bidang
  const handleCardClick = (bidangId) => {
    navigate(`/peserta-bidang/${bidangId}`); // Mengarahkan ke halaman Sub Bidang berdasarkan BidangId
  };

  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item, index) => (
        <div 
          key={item.BidangId} 
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',  
            padding: '15px',
            width: '250px',
            boxShadow: '0 4px 8px #rgba(0, 0, 0, 0.93)',
            backgroundColor: '#0073ff',  // Warna latar belakang cerah kuning
            cursor: 'pointer',  // Menambahkan cursor pointer agar pengguna tahu bahwa ini bisa diklik
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Efek transisi
          }}
          onClick={() => handleCardClick(item.BidangId)}  // Menambahkan onClick untuk navigasi
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Efek saat hover
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Kembali ke ukuran semula
        >
          <div style={{ color: '#fff  ' }}>
            <strong>{item.BidangNama}</strong>
          </div>
          <div style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: item.BidangKeterangan }}></div>
        </div>
      ))}
    </div>
  );
};

export default BidangPesertaTable;
