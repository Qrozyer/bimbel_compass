import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, fetchHasilUjianSafe } from '../../utils/api';

const LaporanUjianMateri = () => {
  const { materiid } = useParams();
  const navigate = useNavigate();
  const [pesertaList, setPesertaList] = useState([]);
  const [hasilMap, setHasilMap] = useState({});
  const [nilaiMap, setNilaiMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const pesertaRes = await fetchData('peserta');
        if (!Array.isArray(pesertaRes)) throw new Error('Gagal mengambil data peserta');
        setPesertaList(pesertaRes);

        const hasilPromises = pesertaRes.map(async (p) => {
          const hasil = await fetchHasilUjianSafe(`ujian/materi/hasil/${materiid}/${p.peserta_id}`);
          const nilai = await fetchHasilUjianSafe(`ujian/materi/hasil/nilai/${materiid}/${p.peserta_id}`);
          return { pesertaId: p.peserta_id, hasil, nilai };
        });

        const hasilData = await Promise.all(hasilPromises);

        const hasil = {};
        const nilai = {};
        hasilData.forEach(({ pesertaId, hasil: h, nilai: n }) => {
          if (Array.isArray(h) && h.length > 0) {
            hasil[pesertaId] = h;
            nilai[pesertaId] = n;
          }
        });

        setHasilMap(hasil);
        setNilaiMap(nilai);
      } catch (err) {
        console.error('Gagal memuat laporan ujian:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, [materiid]);

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
          <h5 className="card-title p-1">Laporan Hasil Ujian Materi</h5>
        </div>
        <div className="card-body">

          {Object.keys(hasilMap).length === 0 ? (
            <div className="alert alert-warning text-center" role="alert">
              Belum ada peserta yang mengerjakan ujian untuk materi ini.
            </div>
          ) : (
            Object.entries(hasilMap).map(([pesertaId, hasilList]) => {
              const peserta = pesertaList.find((p) => p.peserta_id.toString() === pesertaId);
              const nilai = nilaiMap[pesertaId];

              return (
                <div key={pesertaId} className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-2">{peserta?.peserta_nama}</h5>
                    <p className="mb-2"><strong>Asal Sekolah:</strong> {peserta?.peserta_asalsekolah}</p>

                    {nilai && (
                      <div className="mb-3">
                        <strong>Jumlah Benar:</strong> {nilai.jumlah_benar} |{' '}
                        <strong>Jumlah Salah:</strong> {nilai.jumlah_salah} |{' '}
                        <strong>Jumlah Soal:</strong> {nilai.jumlah_soal}
                      </div>
                    )}

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                          <tr>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Pertanyaan</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                            <th>Jawaban</th>
                            <th>Kunci</th>
                            <th>Status</th>
                            <th>Pembahasan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hasilList.map((item, index) => (
                            <tr key={item.MsId}>
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center">{item.Kode}</td>
                              <td dangerouslySetInnerHTML={{ __html: item.Soal }} />
                              <td dangerouslySetInnerHTML={{ __html: item.OpsiA }} />
                              <td dangerouslySetInnerHTML={{ __html: item.OpsiB }} />
                              <td dangerouslySetInnerHTML={{ __html: item.OpsiC }} />
                              <td dangerouslySetInnerHTML={{ __html: item.OpsiD }} />
                              <td dangerouslySetInnerHTML={{ __html: item.OpsiE }} />
                              <td className="text-center">{item.Jawaban}</td>
                              <td className="text-center">{item.JawabanBenar}</td>
                              <td className="text-center">
                                {item.Benar ? (
                                  <span className="badge bg-success">Benar</span>
                                ) : (
                                  <span className="badge bg-danger">Salah</span>
                                )}
                              </td>
                              <td>
                                <details>
                                  <summary>Lihat</summary>
                                  <div style={{ whiteSpace: 'pre-wrap' }}>{item.Pembahasan}</div>
                                </details>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LaporanUjianMateri;
