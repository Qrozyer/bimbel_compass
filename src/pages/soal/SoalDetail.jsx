import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';
import { convertToEmbedUrl } from '../../utils/video';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const SoalDetail = () => {
  const { soalId } = useParams();
  const navigate = useNavigate();
  const [soal, setSoal] = useState(null);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const data = await fetchData(`soal/pilih/${soalId}`);
        if (data) {
          setSoal(data);
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data soal.', 'error');
        console.error(error);
      }
    };
    fetchSoal();
  }, [soalId]);

  if (!soal) {
    return <div style={{ textAlign: 'center', marginTop: '60px' }}>Memuat detail soal...</div>;
  }

  const embedUrl = convertToEmbedUrl(soal.SoalVideo);

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Soal', to: '/soal' },
    { label: 'Detail Soal', to: `/detail-soal/${soalId}` },
  ];

  return (
    <div className="container py-4 pt-5" style={{ margin: 'auto', padding: '50px', maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-start align-items-center mb-4 mt-4">
        <button className="btn btn-secondary me-2 fw-medium" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button
          className="btn btn-warning fw-medium"
          onClick={() => navigate(`/buat-soal/${soal.SoalId}`)}
        >
          ✎ Edit Soal
        </button>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Detail Soal</h5>
        </div>

        <div className="card-body p-4">
          <h5 className="fw-bold text-primary mb-3">Pertanyaan:</h5>
          <div dangerouslySetInnerHTML={{ __html: soal.SoalPertanyaan }} className="mb-4" />

          <h6 className="fw-semibold">Pilihan Jawaban:</h6>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>A:</strong> <span dangerouslySetInnerHTML={{ __html: soal.SoalA }} /></li>
            <li className="list-group-item"><strong>B:</strong> <span dangerouslySetInnerHTML={{ __html: soal.SoalB }} /></li>
            <li className="list-group-item"><strong>C:</strong> <span dangerouslySetInnerHTML={{ __html: soal.SoalC }} /></li>
            <li className="list-group-item"><strong>D:</strong> <span dangerouslySetInnerHTML={{ __html: soal.SoalD }} /></li>
            <li className="list-group-item"><strong>E:</strong> <span dangerouslySetInnerHTML={{ __html: soal.SoalE }} /></li>
          </ul>

          <p><strong>Kunci Jawaban:</strong> {soal.SoalJawaban}</p>

          <div className="mt-4">
            <h6 className="fw-semibold">Pembahasan:</h6>
            <div dangerouslySetInnerHTML={{ __html: soal.SoalPembahasan }} className="mb-4" />
          </div>

          {/* Video Soal */}
          {embedUrl ? (
            <div className="mb-4">
              <h6>Video Soal:</h6>
              <div className="ratio ratio-16x9 mt-2">
                <iframe
                  src={embedUrl}
                  title="Video Soal"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <p><strong>Video:</strong> Tidak tersedia</p>
          )}

          <div className="text-muted mt-4" style={{ fontSize: '0.9rem' }}>
            <div>Dibuat: {new Date(soal.SoalCreate).toLocaleString()}</div>
            <div>Update Terakhir: {new Date(soal.SoalUpdate).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalDetail;
