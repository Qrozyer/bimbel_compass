import React, { useEffect, useState } from 'react';
import { fetchData, addData } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahSesiPeserta = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const [asalPeserta, setAsalPeserta] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [filteredPeserta, setFilteredPeserta] = useState([]);
  const [selectedAsal, setSelectedAsal] = useState('');
  const [selectedPeserta, setSelectedPeserta] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const asalData = await fetchData('peserta/asal');
      const pesertaData = await fetchData('peserta');
      if (asalData) setAsalPeserta(asalData);
      if (pesertaData) setPeserta(pesertaData);
    };

    fetchInitialData();
  }, []);

  const handleAsalChange = (event) => {
    const asal = event.target.value;
    setSelectedAsal(asal);
    const filtered = peserta.filter((p) => p.peserta_asalsekolah === asal);
    setFilteredPeserta(filtered);
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedPeserta((prev) => [...prev, id]);
    } else {
      setSelectedPeserta((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleSubmit = async () => {
    try {
      const payloads = selectedPeserta.map((pesertaId) => ({
        SectionId: parseInt(sectionId),
        PesertaId: pesertaId,
      }));

      for (const data of payloads) {
        await addData('ujian/peserta', data);
      }

      // Menampilkan toast sukses
      toast.success('Peserta berhasil dimasukkan ke section.');
      navigate(-1);
    } catch (error) {
      console.error(error);
      // Menampilkan toast error
      toast.error('Gagal menambahkan peserta.');
    }
  };

  const dataToShow = selectedAsal ? filteredPeserta : peserta;

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1000px' }}>
      <h3 className="mb-3">Masukkan Peserta ke Section {sectionId}</h3>

      <div className="d-flex justify-content-between mb-3">
        <select
          className="form-select"
          value={selectedAsal}
          onChange={handleAsalChange}
          style={{ width: '300px' }}
        >
          <option value="">Pilih Asal Peserta</option>
          {asalPeserta.map((asal, index) => (
            <option key={index} value={asal.AsalDaerah}>
              {asal.AsalDaerah}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>

      <form>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Asal Sekolah</th>
              <th>Alamat</th>
              <th>No HP</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((p) => (
              <tr key={p.peserta_id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(p.peserta_id, e.target.checked)}
                  />
                </td>
                <td>{p.peserta_nama}</td>
                <td>{p.peserta_asalsekolah}</td>
                <td>{p.peserta_alamat}</td>
                <td>{p.peserta_nohp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TambahSesiPeserta;
