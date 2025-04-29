import React from 'react';
import { useNavigate } from 'react-router-dom';

const MateriTableSubBidang = ({ data }) => {
  const navigate = useNavigate();

  // Menampilkan pesan jika data kosong atau tidak valid
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>Data kosong</div>;
  }

  const handleCardClick = (id) => {
    // Navigasi ke halaman detail materi berdasarkan ID
    navigate(`/soal/${id}`);
  };

  return (
    <div className="row">
      {data.map((item) => (
        <div className="col-12" key={item.MateriId}>
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'row',
              maxWidth: '100%',
              cursor: 'pointer', // Agar card bisa diklik
              transition: 'transform 0.2s',
              marginBottom: '2px', // Spasi antar card
              maxHeight: '120px', // Mengatur tinggi card
            }}
            onClick={() => handleCardClick(item.MateriId)} // Mengarahkan ke halaman detail
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.008)'} // Efek saat hover
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Kembali ke ukuran normal
          >
            <div className="card-body" style={{ width: '100%', padding: '1px' }}>
              <table className="table table-borderless" style={{ width: '100%', fontSize: '14px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '20%' }}><strong>{item.MateriJudul}</strong></td>
                    <td style={{ width: '20%' }} dangerouslySetInnerHTML={{ __html: item.MateriIsi }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MateriTableSubBidang;
