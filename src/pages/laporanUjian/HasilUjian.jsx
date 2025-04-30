import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';

const HasilUjian = () => {
  const navigate = useNavigate();
  const [ujianList, setUjianList] = useState([]);

  useEffect(() => {
    const fetchUjian = async () => {
      const result = await fetchData('ujian/data/pilih/1');
      if (result) {
        const ujianArray = Array.isArray(result) ? result : [result];

        // Ambil nama section untuk setiap ujian
        const enriched = await Promise.all(
          ujianArray.map(async (ujian) => {
            const sectionDetail = await fetchData(`soal/section/pilih/${ujian.SectionId}`);
            return {
              ...ujian,
              SectionNama: sectionDetail?.SectionNama || 'Tidak diketahui',
            };
          })
        );

        setUjianList(enriched);
      }
    };
    fetchUjian();
  }, []);

  const handleDetailClick = (SectionId) => {
    navigate(`/hasil/ujian/${SectionId}`);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h3 className="mb-4">Daftar Ujian</h3>

      {!ujianList.length ? (
        <p>Tidak ada data ujian yang tersedia.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>ID Ujian</th>
                <th>Section</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Mulai</th>
                <th>Akhir</th>
                <th>Durasi (menit)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ujianList.map((item, index) => (
                <tr key={item.UjianId}>
                  <td>{index + 1}</td>
                  <td>{item.UjianId}</td>
                  <td>{item.SectionNama}</td>
                  <td>
                    {item.Tampil === 1 ? (
                      <span className="badge bg-success">Aktif</span>
                    ) : (
                      <span className="badge bg-danger">Tidak Aktif</span>
                    )}
                  </td>
                  <td>{item.TglUjian?.String || '-'}</td>
                  <td>{item.Mulai?.String || '-'}</td>
                  <td>{item.Akhir?.String || '-'}</td>
                  <td>{item.Durasi}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleDetailClick(item.SectionId)}
                    >
                      Lihat Hasil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HasilUjian;
