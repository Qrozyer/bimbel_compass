import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { convertToEmbedUrl } from '../../utils/video';
import Swal from 'sweetalert2';

const MateriDetail = () => {
  const { materiId } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const data = await fetchData(`materi/pilih/${materiId}`);
        if (data) {
          setMateri(data);
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data materi.', 'error');
        console.error(error);
      }
    };
    fetchMateri();
  }, [materiId]);

  if (!materi) {
    return <div style={{ textAlign: 'center', marginTop: '60px' }}>Memuat detail materi...</div>;
  }

  const embedUrl = convertToEmbedUrl(materi.MateriVideo);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '30px auto',
        padding: '30px',
        border: '1px solid #ddd',
        backgroundColor: '#fdfdfd',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button className="btn btn-warning font-weight-bolder ml-2" onClick={() => navigate(`/materi/edit/${materi.MateriId}`)}>
          ✎ Edit Materi
        </button>
      </div>

      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#007bff',
          marginBottom: '25px',
        }}
      >
        {materi.MateriJudul}
      </h2>

      <div
        style={{
          fontSize: '1.1rem',
          color: '#333',
          lineHeight: '1.7',
        }}
        dangerouslySetInnerHTML={{ __html: materi.MateriIsi }}
      />

      {/* Video */}
      {embedUrl ? (
        <div className="mt-4">
          <h5>Video Materi:</h5>
          <div className="ratio ratio-16x9 mt-2">
            <iframe
              src={embedUrl}
              title="Video Materi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <p className="mt-4"><strong>Video:</strong> Tidak tersedia</p>
      )}

      {/* Tanggal */}
      <div className="mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
        <div>Dibuat pada: {new Date(materi.MateriCreate).toLocaleString()}</div>
        <div>Terakhir diperbarui: {new Date(materi.MateriUpdate).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default MateriDetail;
