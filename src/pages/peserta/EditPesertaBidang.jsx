import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, editData } from '../../utils/api'; // pastikan updateData ada
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPesertaBidang = () => {
  const { id } = useParams(); // id peserta bidang
  const navigate = useNavigate();
  const [pesertaBidang, setPesertaBidang] = useState(null);
  const [expiredDate, setExpiredDate] = useState('');
  const [expiredTime, setExpiredTime] = useState('');
  const [aktif, setAktif] = useState(false);

  useEffect(() => {
    fetchPesertaBidang();
  }, [id]);

  const fetchPesertaBidang = async () => {
    try {
      const data = await fetchData(`peserta/bidang/${id}`);
      setPesertaBidang(data);
      console.log("Peserta Bidang Data:", data); // untuk cek di console
  
      if (data.expired || data.Expired) {
        const expiredValue = data.expired || data.Expired;
        const [date, time] = expiredValue.split(' ');
        setExpiredDate(date);
        setExpiredTime(time.substring(0, 5)); // ambil HH:mm
      } else {
        setExpiredDate('');
        setExpiredTime('');
      }
  
      setAktif(data.aktif === 1 || data.Aktif === 1);
    } catch (error) {
      console.error('Error fetching peserta bidang:', error);
      toast.error('Gagal mengambil data peserta bidang');
    }
  };
  

  const handleSubmit = async () => {
    if (!expiredDate || !expiredTime) {
      toast.error('Tanggal dan jam expired wajib diisi!');
      return;
    }

    const expiredFull = `${expiredDate} ${expiredTime}:00`;

    try {
      await editData(`peserta/bidang/${id}`, {
        BidangId: pesertaBidang.BidangId,
        PesertaId: pesertaBidang.PesertaId,
        Expired: expiredFull,
        Aktif: aktif ? 1 : 0,
      });
      toast.success('Data peserta bidang berhasil diperbarui!');
      navigate(-1);
    } catch (error) {
      console.error('Error updating peserta bidang:', error);
      toast.error('Gagal memperbarui data.');
    }
  };

  if (!pesertaBidang) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Peserta Bidang</h2>

      <div className="mb-3">
        <label className="form-label">Nama Peserta</label>
        <input
  type="text"
  className="form-control"
  value={pesertaBidang.PesertaNama || ''}
  disabled
/>

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

      <div className="mb-3">
      <select
  className="form-select"
  value={aktif ? '1' : '0'}
  onChange={(e) => setAktif(e.target.value === '1')}
>
  <option value="1">Aktif</option>
  <option value="0">Tidak Aktif</option>
</select>

      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Batal
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default EditPesertaBidang;
