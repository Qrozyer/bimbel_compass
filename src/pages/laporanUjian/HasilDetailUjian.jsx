import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, fetchHasilUjianSafe } from '../../utils/api';

const HasilDetailUjian = () => {
  const { sectionId } = useParams();
  const [sectionNama, setSectionNama] = useState('');
  const [pesertaList, setPesertaList] = useState([]);
  const [hasilMap, setHasilMap] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
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
    };

    fetchAllData();
  }, [sectionId]);

  return (
    <div className="container mt-4">
      <h3>Hasil Ujian - Sesi {sectionNama}</h3>

      <div className="table-responsive mt-3">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
                <tr key={peserta.Id}>
                  <td>{index + 1}</td>
                  <td>
  {hasil ? (
    <span className="badge bg-success">Sudah Mengerjakan</span>
  ) : (
    <span className="badge bg-danger">Belum Mengerjakan</span>
  )}
</td>

                  <td>{peserta.PesertaNama}</td>                  
                  <td>{hasil?.jumlah_benar ?? '-'}</td>
                  <td>{hasil?.jumlah_soal ?? '-'}</td>
                  <td>{hasil?.point ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HasilDetailUjian;
