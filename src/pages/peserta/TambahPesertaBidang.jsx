import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, addData } from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahPesertaBidang = () => {
  const { BidangId } = useParams();
  const navigate = useNavigate();
  const [pesertaList, setPesertaList] = useState([]);
  const [selectedPesertaId, setSelectedPesertaId] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [expiredTime, setExpiredTime] = useState('');

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const data = await fetchData('peserta');
        setPesertaList(data);
      } catch (error) {
        console.error('Error fetching peserta:', error);
      }
    };

    fetchPeserta();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPesertaId || !expiredDate || !expiredTime) {
      toast.error('Peserta, tanggal, dan jam wajib diisi!');
      return;
    }

    const expiredFull = `${expiredDate} ${expiredTime}:00`;

    try {
      await addData('peserta/bidang', {
        BidangId: parseInt(BidangId),
        PesertaId: parseInt(selectedPesertaId),
        Expired: expiredFull,
      });
      toast.success('Peserta berhasil dimasukkan ke bidang!');
    navigate(-1);
    } catch (error) {
      console.error('Error adding peserta to bidang:', error);
      toast.error('Gagal menambahkan peserta.');
    }
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
      <h2 className="mb-4">Masukkan Peserta ke Bidang {BidangId}</h2>

      <div className="mb-3">
        <label className="form-label">Pilih Peserta</label>
        <select
          className="form-select"
          value={selectedPesertaId}
          onChange={(e) => setSelectedPesertaId(e.target.value)}
        >
          <option value="">-- Pilih Peserta --</option>
          {pesertaList.map((peserta) => (
            <option key={peserta.peserta_id} value={peserta.peserta_id}>
              {peserta.peserta_nama}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tanggal Expired</label>
        <input
          type="date"
          className="form-control"
          value={expiredDate}
          onChange={(e) => setExpiredDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Jam Expired</label>
        <input
          type="time"
          className="form-control"
          value={expiredTime}
          onChange={(e) => setExpiredTime(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Batal
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TambahPesertaBidang;
