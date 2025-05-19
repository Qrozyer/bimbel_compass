import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { convertToEmbedUrl } from '../../utils/video';
import Swal from 'sweetalert2';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const MateriDetail = () => {
  const { materiId } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);
  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: '#' },
    { label: 'Materi', to: `/materi/by-sub-bidang/${materi?.SubId}` },
    { label: 'Detail Materi', to: `/materi/detail/${materiId}` },
  ];

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
    
    <div className="container py-4 pt-5" style={{margin: 'auto', padding: '50px', maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />
      <div className="d-flex justify-content-start align-items-center mb-4 mt-4">
            <button className="btn btn-secondary me-2 fw-medium" onClick={() => navigate(-1)}>
              ← Kembali
            </button>
            <button
              className="btn btn-warning fw-medium" 
              onClick={() => navigate(`/materi/edit/${materi.MateriId}`)}
            >
              ✎ Edit Materi
            </button>
          </div>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Detail Materi</h5>          
        </div>

        <div className="card-body p-4">        
          <h2 className="text-primary fw-bold mb-3">{materi.MateriJudul}</h2>

          <div
            className="mb-4"
            style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.7' }}
            dangerouslySetInnerHTML={{ __html: materi.MateriIsi }}
          />

          {/* Video Materi */}
          {embedUrl ? (
            <div className="mb-4">
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
            <p className="mt-4">
              <strong>Video:</strong> Tidak tersedia
            </p>
          )}

          {/* Info Waktu */}
          <div className="text-muted" style={{ fontSize: '0.9rem' }}>
            <div>Dibuat pada: {new Date(materi.MateriCreate).toLocaleString()}</div>
            <div>Terakhir diperbarui: {new Date(materi.MateriUpdate).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriDetail;
