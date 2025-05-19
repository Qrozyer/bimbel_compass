import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, addData } from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahPesertaBidang = () => {
  const { BidangId: routeBidangId } = useParams();
  const navigate = useNavigate();
  const [bidangList, setBidangList] = useState([]);
  const [bidangId, setBidangId] = useState(routeBidangId || '');
  const [pesertaList, setPesertaList] = useState([]);
  const [selectedPesertaId, setSelectedPesertaId] = useState('');
  const [expiredDate, setExpiredDate] = useState('');

  useEffect(() => {
    const fetchBidang = async () => {
      try {
        const data = await fetchData('bidang');
        setBidangList(data);
      } catch (error) {
        console.error('Error fetching bidang:', error);
      }
    };

    fetchBidang();
  }, []);

  useEffect(() => {
    if (!bidangId) return;

    const fetchPeserta = async () => {
      try {
        const data = await fetchData('peserta');
        setPesertaList(data);
      } catch (error) {
        console.error('Error fetching peserta:', error);
      }
    };

    fetchPeserta();
  }, [bidangId]);

  const handleSubmit = async () => {
    if (!bidangId || !selectedPesertaId || !expiredDate) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    try {
      await addData('peserta/bidang', {
        BidangId: parseInt(bidangId),
        PesertaId: parseInt(selectedPesertaId),
        Expired: expiredDate,
      });
      toast.success('Peserta berhasil dimasukkan ke bidang!');
      navigate(-1);
    } catch (error) {
      console.error('Error adding peserta to bidang:', error);
      toast.error('Gagal menambahkan peserta.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="mb-3">
        <button className="btn btn-secondary fw-medium" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {/* Dropdown Pilih Bidang */}
          {!routeBidangId && (
            <div className="mb-3">
              <label className="form-label">Pilih Bidang</label>
              <select
                className="form-select"
                value={bidangId}
                onChange={(e) => setBidangId(e.target.value)}
              >
                <option value="">-- Pilih Bidang --</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>
                    {b.BidangNama}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!bidangId ? (
            <div className="alert alert-info mt-3">
              Silakan pilih <strong>Bidang</strong> terlebih dahulu sebelum menambahkan peserta.
            </div>
          ) : (
            <>
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

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                  Batal
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  Simpan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TambahPesertaBidang;
