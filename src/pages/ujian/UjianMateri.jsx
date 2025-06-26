import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSoal } from '../../actions/soalActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import SoalTable from '../../components/soal/SoalTable';
import { useNavigate } from 'react-router-dom'; 

const UjianMateri = () => {
  const dispatch = useDispatch();
  const soal = useSelector((state) => state.soal.soal);
  const navigate = useNavigate();

  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);

  const [selectedBidangId, setSelectedBidangId] = useState('');
  const [selectedSubBidangId, setSelectedSubBidangId] = useState('');
  const [selectedMateriId, setSelectedMateriId] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      const [soalData, bidangData, subBidangData, materiData] = await Promise.all([
        fetchData('soal'),
        fetchData('bidang'),
        fetchData('sub-bidang'),
        fetchData('materi'),
      ]);
      if (soalData) dispatch(setSoal(soalData));
      if (bidangData) setBidangList(bidangData);
      if (subBidangData) setSubBidangList(subBidangData);
      if (materiData) setMateriList(materiData);
    };
    fetchInitialData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('soal', id);
        dispatch(setSoal(soal.filter((item) => item.SoalId !== id)));
        Swal.fire('Terhapus!', 'Data soal telah dihapus.', 'success');
      }
    });
  };

  const filteredSubBidang = subBidangList.filter(sb => sb.BidangId === parseInt(selectedBidangId));
  const filteredMateri = materiList.filter(m => m.SubId === parseInt(selectedSubBidangId));
  const filteredSoal = selectedMateriId
    ? soal.filter((item) => item.MateriId === parseInt(selectedMateriId))
    : soal;

  return (
    <div className="container pt-5" style={{ maxWidth: '1200px' }}>
      {/* Tombol Navigasi */}
      <div className="d-flex justify-content-start align-items-center mb-3 gap-2 flex-wrap">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button className="btn btn-success" onClick={() => navigate('/buat-soal')}>
          + Buat Soal Baru
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/soal-materi/add')}>
          🎯 Masukkan Soal ke Materi
        </button>
      </div>

      {/* Card Tabel + Filter */}
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Ujian Materi</h5>
        </div>

        {/* Filter di dalam card */}
        <div className="card-body border-bottom pb-2">
          <div className="d-flex flex-wrap gap-3 align-items-end">
            {/* Bidang */}
            <div className="flex-grow-1">
              <label className="form-label">Pilih Bidang:</label>
              <select
                className="form-select"
                value={selectedBidangId}
                onChange={(e) => {
                  setSelectedBidangId(e.target.value);
                  setSelectedSubBidangId('');
                  setSelectedMateriId('');
                }}
              >
                <option value="">-- Semua Bidang --</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>
                    {b.BidangNama}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Bidang */}
            <div className="flex-grow-1">
              <label className="form-label">Pilih Sub Bidang:</label>
              <select
                className="form-select"
                value={selectedSubBidangId}
                onChange={(e) => {
                  setSelectedSubBidangId(e.target.value);
                  setSelectedMateriId('');
                }}
                disabled={!selectedBidangId}
              >
                <option value="">-- Semua Sub Bidang --</option>
                {filteredSubBidang.map((sb) => (
                  <option key={sb.SubId} value={sb.SubId}>
                    {sb.SubNama}
                  </option>
                ))}
              </select>
            </div>

            {/* Materi */}
            <div className="flex-grow-1">
              <label className="form-label">Pilih Materi:</label>
              <select
                className="form-select"
                value={selectedMateriId}
                onChange={(e) => setSelectedMateriId(e.target.value)}
                disabled={!selectedSubBidangId}
              >
                <option value="">-- Semua Materi --</option>
                {filteredMateri.map((m) => (
                  <option key={m.MateriId} value={m.MateriId}>
                    {m.MateriJudul}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabel Soal */}
        <div className="card-body">
          {!selectedBidangId || !selectedSubBidangId || !selectedMateriId ? (
            <div className="alert alert-info text-center">
              Silakan pilih <strong>Bidang</strong>, <strong>Sub Bidang</strong>, dan <strong>Materi</strong> untuk melihat soal.
            </div>
          ) : (
            <SoalTable
              data={filteredSoal}
              onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UjianMateri;
