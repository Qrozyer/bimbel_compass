import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeserta } from '../../actions/pesertaActions';
import { fetchData, addData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SesiSoalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [materiList, setMateriList] = useState([]);
  const [soalList, setSoalList] = useState([]);
  const [filteredSoal, setFilteredSoal] = useState([]);
  const [selectedMateri, setSelectedMateri] = useState('');
  const [selectedSoal, setSelectedSoal] = useState([]);
  const peserta = useSelector((state) => state.peserta.peserta);

  useEffect(() => {
    const fetchMateriAndSoal = async () => {
      try {
        const materiData = await fetchData('materi');
        const soalData = await fetchData('soal');

        console.log("Materi Data:", materiData);
        console.log("Soal Data:", soalData);

        setMateriList(materiData);
        setSoalList(soalData);
        setFilteredSoal(soalData); // Saat awal, tampilkan semua soal
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMateriAndSoal();
  }, []); // hanya dijalankan sekali di awal

  const handleMateriChange = (event) => {
    const materiId = event.target.value;
    setSelectedMateri(materiId);

    if (materiId === '') {
      setFilteredSoal(soalList);
    } else {
      const filtered = soalList.filter((soal) => soal.MateriId === materiId);
      setFilteredSoal(filtered);
    }
  };

  const handleCheckboxChange = (soalId, isChecked) => {
    setSelectedSoal((prevState) => {
      if (isChecked) {
        return [...prevState, { SoalId: soalId, Point: 1 }];
      } else {
        return prevState.filter((soal) => soal.SoalId !== soalId);
      }
    });
  };

  const handlePointChange = (soalId, point) => {
    setSelectedSoal((prevState) =>
      prevState.map((soal) =>
        soal.SoalId === soalId ? { ...soal, Point: point } : soal
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const requests = selectedSoal.map((soal) => ({
        SectionId: 1, // ganti sesuai kebutuhan
        SoalId: soal.SoalId,
        Point: soal.Point,
      }));

      for (const request of requests) {
        await addData('soal/list', request);
      }

      alert('Data berhasil disubmit');
      navigate(-1); // <-- kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal submit data');
    }
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <select
            className="form-select"
            onChange={handleMateriChange}
            value={selectedMateri}
          >
            <option value="">Pilih Materi</option>
            {materiList.map((materi) => (
              <option key={materi.MateriId} value={materi.MateriId}>
                {materi.MateriJudul}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="btn btn-success" onClick={() => navigate('/soal/add')}>
            Tambah Soal
          </button>
        </div>
      </div>

      {filteredSoal.length === 0 ? (
        <div>Soal tidak ditemukan</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Pertanyaan</th>
              <th>Jawaban A</th>
              <th>Jawaban B</th>
              <th>Jawaban C</th>
              <th>Jawaban D</th>
              <th>Jawaban E</th>
              <th style={{ width: '100px' }}>Kunci Jawaban</th>
              <th style={{ width: '50px' }}>Aksi</th>
              <th style={{ width: '50px' }}>Poin</th>
            </tr>
          </thead>
          <tbody>
            {filteredSoal.map((soal, index) => (
              <tr key={soal.SoalId}>
                <td>{index + 1}</td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalPertanyaan }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalA }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalB }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalC }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalD }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalE }}></td>
                <td dangerouslySetInnerHTML={{ __html: soal.SoalJawaban }}></td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(soal.SoalId, e.target.checked)
                    }
                  />
                </td>
                <td style={{ width: '50px' }}>
  <input
    disabled={!selectedSoal.find((s) => s.SoalId === soal.SoalId)}
    type="number"
    min="0"
    value={
      selectedSoal.find((s) => s.SoalId === soal.SoalId)?.Point || 0
    }
    onChange={(e) => {
      const value = e.target.value;
      if (!isNaN(value) || value === "") {
        const numericValue = value ? parseInt(value) : 0;

        // Cek dulu, kalau soal belum dipilih (checkbox belum dicentang), langsung tambahkan.
        const existing = selectedSoal.find((s) => s.SoalId === soal.SoalId);
        if (existing) {
          handlePointChange(soal.SoalId, numericValue);
        } else {
          setSelectedSoal((prevState) => [
            ...prevState,
            { SoalId: soal.SoalId, Point: numericValue },
          ]);
        }
      }
    }}
  />
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SesiSoalForm;
