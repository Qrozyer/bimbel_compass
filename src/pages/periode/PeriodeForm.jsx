import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, addData } from '../../utils/api';

const PeriodeForm = () => {
  const navigate = useNavigate();
  const { nama } = useParams(); // untuk edit, ambil dari route /periode/edit/:nama
  const [periodeNama, setPeriodeNama] = useState('');

  useEffect(() => {
    const getData = async () => {
      if (nama) {
        try {
          const data = await fetchData('periode');
          const found = data.find((item) => item.PeriodeNama === nama);
          if (found) {
            setPeriodeNama(found.PeriodeNama);
          } else {
            Swal.fire('Error', 'Periode tidak ditemukan', 'error');
            navigate('/periode');
          }
        } catch (error) {
          console.error('Gagal mengambil data periode:', error);
          Swal.fire('Error', 'Gagal mengambil data dari server', 'error');
        }
      }
    };

    getData();
  }, [nama, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!periodeNama.trim()) {
      return Swal.fire('Validasi', 'Nama periode tidak boleh kosong.', 'warning');
    }

    try {
      await addData('periode', { PeriodeNama: periodeNama.trim() });
      Swal.fire('Berhasil', `Periode berhasil disimpan.`, 'success').then(() => {
        navigate('/periode');
      });
    } catch (err) {
      console.error('Gagal menyimpan periode:', err);
      Swal.fire('Error', 'Gagal menyimpan data.', 'error');
    }
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }}>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">{nama ? 'Edit' : 'Tambah'} Periode</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="periodeNama" className="form-label">
                Nama Periode
              </label>
              <input
                type="text"
                id="periodeNama"
                className="form-control"
                value={periodeNama}
                onChange={(e) => setPeriodeNama(e.target.value)}
                placeholder="Masukkan nama periode"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                ← Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PeriodeForm;
