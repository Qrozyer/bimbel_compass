import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeserta } from '../../actions/pesertaActions';
import { fetchData } from '../../utils/api';
import PesertaTable from '../../components/peserta/PesertaTable';
import { useNavigate } from 'react-router-dom';

const AsalPeserta = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [asalPeserta, setAsalPeserta] = useState([]);
  const [filteredPeserta, setFilteredPeserta] = useState([]);
  const [selectedAsal, setSelectedAsal] = useState(''); // Menyimpan asal yang dipilih
  const peserta = useSelector((state) => state.peserta.peserta);

  useEffect(() => {
    const fetchAsalPeserta = async () => {
      const data = await fetchData('peserta/asal');
      if (Array.isArray(data)) {
        setAsalPeserta(data); // Set asalPeserta menjadi array jika data valid
      } else {
        setAsalPeserta([]); // Jika data bukan array, set kosong
      }
    };

    const fetchPeserta = async () => {
      const dataPeserta = await fetchData('peserta');
      if (dataPeserta) {
        dispatch(setPeserta(dataPeserta));
      }
    };

    fetchAsalPeserta();
    fetchPeserta();
  }, [dispatch]);

  const handleAsalChange = (event) => {
    const asal = event.target.value;
    setSelectedAsal(asal);

    const filtered = peserta.filter((p) => p.peserta_asalsekolah === asal);
    setFilteredPeserta(filtered);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <select
            className="form-select"
            onChange={handleAsalChange}
            value={selectedAsal}
          >
            <option value="">Pilih Asal Peserta</option>
            {asalPeserta.map((asal, index) => (
              <option key={index} value={asal.AsalDaerah}>
                {asal.AsalDaerah}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="btn btn-success" onClick={() => navigate('/peserta/add')}>
            Tambah Peserta
          </button>
          
        </div>
      </div>

      {selectedAsal && filteredPeserta.length === 0 ? (
        <div>Peserta dari daerah asal "{selectedAsal}" tidak ada</div>
      ) : (
        <PesertaTable data={filteredPeserta.length > 0 ? filteredPeserta : peserta} />
      )}
    </div>
  );
};

export default AsalPeserta;
