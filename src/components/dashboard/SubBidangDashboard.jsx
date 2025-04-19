import React from 'react';
import { useNavigate } from 'react-router-dom';  // Mengimpor useNavigate

const SubBidangDashboard = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman sub bidang

  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }
  
  // Fungsi untuk mengarahkan ke halaman Sub Bidang
  const handleCardClick = (SubId) => {
    navigate(`/materi/${SubId}`); // Mengarahkan ke halaman Sub Bidang berdasarkan BidangId
  };

  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item, index) => (
        <div 
          key={item.SubId} 
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',  // Menambahkan cursor pointer agar pengguna tahu bahwa ini bisa diklik
          }}
          onClick={() => handleCardClick(item.SubId)}  // Menambahkan onClick untuk navigasi
        >
          <div>
              <strong>{item.SubNama}</strong>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.SubKeterangan }}></div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                style={{
                  backgroundColor: '#FFC107', 
                  color: '#00000', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-edit mr-1"></i>
                Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(item.BidangId); }}  // Mencegah onClick hapus mengarahkan ke Sub Bidang
                style={{
                  backgroundColor: '#F44336', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-trash-alt mr-1"></i>
                Hapus
              </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SubBidangDashboard;
