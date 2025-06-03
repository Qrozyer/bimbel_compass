// src/pages/sesi/SesiUjianFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, addData, editData } from '../../utils/api';

const SesiUjianFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    SectionNama: '',
    SectionTampil: 1,
  });

  useEffect(() => {
    if (isEdit) {
      const loadData = async () => {
        try {
          const data = await fetchData(`soal/section/pilih/${id}`);
          if (data) setForm(data);
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Gagal memuat data sesi.', 'error');
        }
      };
      loadData();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'SectionTampil' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.SectionNama.trim()) {
      Swal.fire('Peringatan', 'Nama sesi ujian wajib diisi!', 'warning');
      return;
    }

    try {
      if (isEdit) {
        await editData('soal/section', id, form);
        Swal.fire('Berhasil', 'Data berhasil diperbarui.', 'success');
      } else {
        await addData('soal/section', form);
        Swal.fire('Berhasil', 'Data berhasil ditambahkan.', 'success');
      }
      navigate('/sesi-ujian');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan data.', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '10px auto', paddingTop: '50px' }}>
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">{isEdit ? 'Edit Sesi Ujian' : 'Tambah Sesi Ujian'}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nama Sesi Ujian</label>
            <input
              type="text"
              name="SectionNama"
              className="form-control"
              value={form.SectionNama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status Tampil</label>
            <select
              name="SectionTampil"
              className="form-select"
              value={form.SectionTampil}
              onChange={handleChange}
            >
              <option value={1}>Aktif</option>
              <option value={0}>Tidak Aktif</option>
            </select>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
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

export default SesiUjianFormPage;
