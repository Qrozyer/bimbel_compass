import React, { useState, useEffect } from 'react';
import { fetchData, addData } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SoalMateriForm = () => {
  const { MateriId } = useParams();
  const [soalList, setSoalList] = useState([]);
  const [materiJudul, setMateriJudul] = useState('');
  const [selectedSoalIds, setSelectedSoalIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const soalData = await fetchData('soal');
        setSoalList(soalData);
      } catch (error) {
        console.error('Gagal mengambil data soal:', error);
        toast.error('Gagal mengambil data soal');
      }
    };

    const fetchMateri = async () => {
      try {
        const materi = await fetchData(`materi/pilih/${MateriId}`);
        if (materi) {
          setMateriJudul(materi.MateriJudul);
        }
      } catch (error) {
        console.error('Error fetching materi:', error);
        toast.error('Gagal mengambil data materi');
      }
    };

    fetchMateri();
    fetchSoal();
  }, []);

  const handleCheckboxChange = (soalId, isChecked) => {
    if (isChecked) {
      setSelectedSoalIds((prev) => [...prev, soalId]);
    } else {
      setSelectedSoalIds((prev) => prev.filter((id) => id !== soalId));
    }
  };

  const handleSubmit = async () => {
    try {
      for (const soalId of selectedSoalIds) {
        await addData('materi/soal', {
          MateriId: parseInt(MateriId),
          SoalId: parseInt(soalId),
        });
      }

      toast.success('Soal berhasil dimasukkan ke materi');
      setTimeout(() => navigate(-1), 900); // Navigasi setelah toast tampil
    } catch (error) {
      console.error('Gagal submit data:', error);
      toast.error('Gagal memasukkan soal');
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Masukkan Soal ke Materi: {materiJudul}</h3>
        <button className="btn btn-success" onClick={() => navigate('/soal/add')}>
          Tambah Soal
        </button>
      </div>

      {soalList.length === 0 ? (
        <p>Belum ada soal tersedia.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Pertanyaan</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>Kunci</th>
              <th>Pilih</th>
            </tr>
          </thead>
          <tbody>
            {soalList.map((soal, index) => (
              <tr key={soal.SoalId}>
                <td>{index + 1}</td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalPertanyaan }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalA }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalB }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalC }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalD }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalE }} />
                <td dangerouslySetInnerHTML={{ __html: soal.SoalJawaban }} />
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(soal.SoalId, e.target.checked)
                    }
                    checked={selectedSoalIds.includes(soal.SoalId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-3 gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button
          className="btn btn-primary"
          disabled={selectedSoalIds.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SoalMateriForm;
