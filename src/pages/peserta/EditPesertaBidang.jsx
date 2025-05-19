import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, editData } from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPesertaBidang = () => {
  const { bidangId, pesertaBidangId } = useParams();
  const navigate = useNavigate();

  const [pesertaBidang, setPesertaBidang] = useState(null);
  const [expiredDate, setExpiredDate] = useState('');
  const [aktif, setAktif] = useState(false);
  const [bidangList, setBidangList] = useState([]);
  const [selectedBidangId, setSelectedBidangId] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, [bidangId, pesertaBidangId]);

  const fetchInitialData = async () => {
    try {
      const [allBidang, allPesertaBidang] = await Promise.all([
        fetchData('bidang'),
        fetchData(`peserta/bidang/${bidangId}`),
      ]);

      setBidangList(allBidang);

      const selected = allPesertaBidang.find(item => item.Id === parseInt(pesertaBidangId));
      if (selected) {
        setPesertaBidang(selected);
        setExpiredDate(selected.Expired);
        setAktif(selected.aktif === 1 || selected.Aktif === 1);
        setSelectedBidangId(selected.BidangId?.toString() || '');
      } else {
        toast.error('Peserta bidang tidak ditemukan');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Gagal mengambil data');
    }
  };

  const handleSubmit = async () => {
    if (!expiredDate || !selectedBidangId) {
      toast.error('Bidang dan tanggal wajib diisi!');
      return;
    }    

    try {
      const result = await editData('peserta/bidang', pesertaBidang.Id, {
        BidangId: parseInt(selectedBidangId),
        PesertaId: pesertaBidang.PesertaId,
        Expired: expiredDate,
        Aktif: aktif ? 1 : 0,
      });

      if (result) {
        toast.success('Data peserta bidang berhasil diperbarui!');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error unexpected:', error);
      toast.error('Gagal memperbarui data.');
    }
  };

  if (!pesertaBidang) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <div className="card rounded-4 shadow-sm">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Edit Peserta Bidang</h5>  
        </div>          
        <div className="card-body">          
          <div className="mb-3">
            <label className="form-label">Nama Peserta</label>
            <input
              type="text"
              className="form-control"
              value={pesertaBidang?.PesertaNama || ''}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ubah Bidang</label>
            <select
              className="form-select"
              value={selectedBidangId}
              onChange={(e) => setSelectedBidangId(e.target.value)}
            >
              <option value="">-- Pilih Bidang --</option>
              {bidangList.map((bidang) => (
                <option key={bidang.BidangId} value={bidang.BidangId}>
                  {bidang.BidangNama}
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
            <label className="form-label">Status Aktif</label>
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
      </div>
    </div>
  );
};

export default EditPesertaBidang;
