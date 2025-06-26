import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UjianDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchData(`ujian/data/pilih/${id}`);
        setDetail(res);
      } catch (err) {
        toast.error('Gagal mengambil data detail ujian');
      }
    };
    getDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <ToastContainer />

      {/* Button Kembali */}
      <div className="mb-3 mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left me-2"></i>Kembali
        </button>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Detail Ujian</h5>
        </div>

        <div className="card-body px-4 py-3">
          {detail ? (
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th style={{ width: '200px' }}>ID Ujian</th>
                  <td>:</td>
                  <td>{detail.Id}</td>
                </tr>
                <tr>
                  <th>Section ID</th>
                  <td>:</td>
                  <td>{detail.SectionID}</td>
                </tr>
                <tr>
                  <th>Tanggal Ujian</th>
                  <td>:</td>
                  <td>{formatDate(detail.TglUjian)}</td>
                </tr>
                <tr>
                  <th>Waktu Mulai</th>
                  <td>:</td>
                  <td>{formatDate(detail.AwalUjian)}</td>
                </tr>
                <tr>
                  <th>Waktu Selesai</th>
                  <td>:</td>
                  <td>{formatDate(detail.AkhirUjian)}</td>
                </tr>
                <tr>
                  <th>Durasi</th>
                  <td>:</td>
                  <td>{detail.Durasi} menit</td>
                </tr>
                <tr>
                  <th>Waktu Update</th>
                  <td>:</td>
                  <td>{formatDate(detail.WaktuUpdate)}</td>
                </tr>
                <tr>
                  <th>Status Tampil</th>
                  <td>:</td>
                  <td>
                    {detail.Tampil === 1 ? (
                      <span className="badge bg-success">Aktif</span>
                    ) : (
                      <span className="badge bg-danger">Tidak Aktif</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div>Memuat detail ujian...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UjianDetail;
