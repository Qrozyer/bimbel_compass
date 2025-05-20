import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, fetchHasilUjianSafe } from '../../utils/api';

const HasilDetailUjian = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [sectionNama, setSectionNama] = useState('');
  const [pesertaList, setPesertaList] = useState([]);
  const [hasilMap, setHasilMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const sectionRes = await fetchData(`soal/section/pilih/${sectionId}`);
        if (sectionRes?.SectionNama) {
          setSectionNama(sectionRes.SectionNama);
        }

        const pesertaRes = await fetchData(`ujian/peserta/${sectionId}`);
        if (Array.isArray(pesertaRes)) {
          setPesertaList(pesertaRes);

          const hasilPromises = pesertaRes.map(async (p) => {
            const hasil = await fetchHasilUjianSafe(`ujian/hasil/${sectionId}/${p.PesertaId}`);
            return { pesertaId: p.PesertaId, hasil };
          });

          const hasilResults = await Promise.all(hasilPromises);

          const map = {};
          hasilResults.forEach(({ pesertaId, hasil }) => {
            map[pesertaId] = hasil;
          });
          setHasilMap(map);
        }
      } catch (err) {
        console.error('Gagal memuat data hasil ujian:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [sectionId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container" style={{ margin: '0 auto', padding: '50px', maxWidth: '1000px' }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left me-2"></i> Kembali
      </button>

      <div className="card rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="card-title p-1">Hasil Ujian - Sesi {sectionNama}</h5>
        </div>
        <div className="card-body">
          {pesertaList.length === 0 ? (
            <div className="alert alert-warning text-center" role="alert">
              Belum ada peserta pada sesi ujian ini.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>No</th>
                    <th>Status</th>
                    <th>Nama Peserta</th>
                    <th>Jumlah Benar</th>
                    <th>Jumlah Soal</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {pesertaList.map((peserta, index) => {
                    const hasil = hasilMap[peserta.PesertaId];
                    return (
                      <tr key={peserta.PesertaId}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {hasil ? (
                            <span className="badge bg-success">Sudah Mengerjakan</span>
                          ) : (
                            <span className="badge bg-danger">Belum Mengerjakan</span>
                          )}
                        </td>
                        <td>{peserta.PesertaNama}</td>
                        <td className="text-center">{hasil?.jumlah_benar ?? '-'}</td>
                        <td className="text-center">{hasil?.jumlah_soal ?? '-'}</td>
                        <td className="text-center">{hasil?.point ?? '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HasilDetailUjian;
