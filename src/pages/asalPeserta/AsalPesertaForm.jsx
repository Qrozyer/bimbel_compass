import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, addData, editData } from '../../utils/api';

const AsalPesertaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    AsalDaerah: '',
  });

  useEffect(() => {
    if (isEdit) {
      const getData = async () => {
        try {
          const data = await fetchData(`peserta/asal/${id}`);
          if (data) setForm(data);
        } catch (err) {
          console.error('Gagal mengambil data:', err);
          Swal.fire('Error', 'Gagal mengambil data asal peserta.', 'error');
        }
      };
      getData();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, AsalDaerah: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.AsalDaerah.trim()) {
      Swal.fire('Peringatan', 'Asal Daerah wajib diisi!', 'warning');
      return;
    }

    try {
      if (isEdit) {
        await editData('peserta/asal', id, form);
        Swal.fire('Berhasil', 'Data berhasil diperbarui.', 'success');
      } else {
        await addData('peserta/asal', form);
        Swal.fire('Berhasil', 'Data berhasil ditambahkan.', 'success');
      }
      navigate('/asal-peserta');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Terjadi kesalahan saat menyimpan data.', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '10px auto', paddingTop: '50px' }}>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">{isEdit ? 'Edit Asal Peserta' : 'Tambah Asal Peserta'}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Asal Peserta</label>
            <input
              type="text"
              className="form-control"
              name="AsalDaerah"
              value={form.AsalDaerah}
              onChange={handleChange}
              placeholder="Contoh: Jakarta"
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => navigate('/asal-peserta')}>
              ← Kembali
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsalPesertaForm;
