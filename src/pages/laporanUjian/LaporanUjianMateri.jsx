import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, fetchHasilUjianSafe } from '../../utils/api';

const LaporanUjianMateri = () => {
  const { materiid } = useParams();
  const [pesertaList, setPesertaList] = useState([]);
  const [hasilMap, setHasilMap] = useState({});
  const [nilaiMap, setNilaiMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        // Ambil semua peserta
        const pesertaRes = await fetchData('peserta');
        if (!Array.isArray(pesertaRes)) throw new Error('Gagal mengambil data peserta');
        setPesertaList(pesertaRes);

        // Ambil hasil untuk tiap peserta
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

  if (loading) return <p>Memuat data...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Laporan Ujian Materi</h3>

      {Object.keys(hasilMap).length === 0 ? (
        <p>Tidak ada peserta yang memiliki hasil ujian untuk materi ini.</p>
      ) : (
        Object.entries(hasilMap).map(([pesertaId, hasilList]) => {
          const peserta = pesertaList.find((p) => p.peserta_id.toString() === pesertaId);
          const nilai = nilaiMap[pesertaId];

          return (
            <div key={pesertaId} className="mb-5">
              <h5>Nama Peserta: {peserta?.peserta_nama}</h5>
              <p>
                <strong>Asal Sekolah:</strong> {peserta?.peserta_asalsekolah}
              </p>

              {nilai && (
                <div className="mb-3">
                  <strong>Jumlah Benar:</strong> {nilai.jumlah_benar} |{' '}
                  <strong>Jumlah Salah:</strong> {nilai.jumlah_salah} |{' '}
                  <strong>Jumlah Soal:</strong> {nilai.jumlah_soal}
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
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
                        <td>{index + 1}</td>
                        <td>{item.Kode}</td>
                        <td dangerouslySetInnerHTML={{ __html: item.Soal }} />
                        <td dangerouslySetInnerHTML={{ __html: item.OpsiA }} />
                        <td dangerouslySetInnerHTML={{ __html: item.OpsiB }} />
                        <td dangerouslySetInnerHTML={{ __html: item.OpsiC }} />
                        <td dangerouslySetInnerHTML={{ __html: item.OpsiD }} />
                        <td dangerouslySetInnerHTML={{ __html: item.OpsiE }} />
                        <td>{item.Jawaban}</td>
                        <td>{item.JawabanBenar}</td>
                        <td>
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
          );
        })
      )}
    </div>
  );
};

export default LaporanUjianMateri;
