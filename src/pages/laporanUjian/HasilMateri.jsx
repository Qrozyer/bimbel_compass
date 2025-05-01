import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';

const HasilMateri = () => {
  const navigate = useNavigate();
  const [materiList, setMateriList] = useState([]);

  useEffect(() => {
    const getMateri = async () => {
      const data = await fetchData('materi');
      if (Array.isArray(data)) {
        setMateriList(data);
      }
    };

    getMateri();
  }, []);

  const handleLihatHasil = (materiId) => {
    navigate(`/laporan-materi/${materiId}`);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1000px' }}>
      <h3 className="mb-4">Daftar Materi</h3>

      {!materiList.length ? (
        <p>Tidak ada materi yang tersedia.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>ID Materi</th>
                <th>Judul</th>
                <th>Dibuat</th>
                <th>Diperbarui</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {materiList.map((materi, index) => (
                <tr key={materi.MateriId}>
                  <td>{index + 1}</td>
                  <td>{materi.MateriId}</td>
                  <td>{materi.MateriJudul}</td>
                  <td>{materi.MateriCreate}</td>
                  <td>{materi.MateriUpdate}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleLihatHasil(materi.MateriId)}
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

export default HasilMateri;
