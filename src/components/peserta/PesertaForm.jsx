import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';

const PesertaForm = ({ initialData, onSave, onCancel }) => {
  const [PesertaNama, setPesertaNama] = useState(String(initialData?.PesertaNama || ''));
  const [PesertaEmail, setPesertaEmail] = useState(String(initialData?.PesertaEmail || ''));
  const [PesertaJk, setPesertaJk] = useState(initialData?.PesertaJk || 'L');
  const [PesertaAlamat, setPesertaAlamat] = useState(String(initialData?.PesertaAlamat || ''));
  const [PesertaNohp, setPesertaNohp] = useState(String(initialData?.PesertaNohp || ''));
  const [PesertaPendidikan, setPesertaPendidikan] = useState(String(initialData?.PesertaPendidikanTerakhir || ''));
  const [PesertaAsalSekolah, setPesertaAsalSekolah] = useState(String(initialData?.PesertaAsalSekolah || ''));
//   const [PesertaPassword, setPesertaPassword] = useState(String(initialData?.PesertaPassword || ''));
  const [PesertaPeriode, setPesertaPeriode] = useState(initialData?.PesertaPeriode || '');
  const [PesertaList, setPesertaList] = useState([]);

  useEffect(() => {
    setPesertaNama(String(initialData?.peserta_nama || ''));
    setPesertaEmail(String(initialData?.peserta_email || ''));
    setPesertaJk(initialData?.peserta_jk || 'L');
    setPesertaAlamat(String(initialData?.peserta_alamat || ''));
    setPesertaNohp(String(initialData?.peserta_nohp || ''));
    setPesertaPendidikan(String(initialData?.peserta_pendidikanterakhir || ''));
    setPesertaAsalSekolah(String(initialData?.peserta_asalsekolah || ''));
    // setPesertaPassword(String(initialData?.peserta_password || ''));
    setPesertaPeriode(initialData?.peserta_periode || '');
  }, [initialData]);

  const handleSave = () => {
    if (!PesertaNama || !PesertaEmail || !PesertaJk || !PesertaAlamat || !PesertaNohp || !PesertaPendidikan || !PesertaAsalSekolah) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    onSave({
      PesertaEmail,
      PesertaNama,
      PesertaJk,
      PesertaAlamat,
      PesertaNohp,
      PesertaPendidikan,
      PesertaAsalSekolah,
    //   PesertaPassword,
      PesertaPeriode,
    });
  };

  return (
    console.log("PesertaForm initialData:", initialData),
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Peserta' : 'Tambah Peserta'}</h4>
        <div className="form-group">
          <label>Nama Peserta</label>
          <input
            type="text"
            className="form-control"
            value={PesertaNama}
            onChange={(e) => setPesertaNama(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Peserta</label>
          <input
            type="email"
            className="form-control"
            value={PesertaEmail}
            onChange={(e) => setPesertaEmail(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label>Password Peserta</label>
          <input
            type="text"
            className="form-control"
            value={PesertaPassword}
            onChange={(e) => setPesertaPassword(e.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label>Jenis Kelamin</label>
          <select
            className="form-control"
            value={PesertaJk}
            onChange={(e) => setPesertaJk(e.target.value)}
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Alamat</label>
          <input
            type="text"
            className="form-control"
            value={PesertaAlamat}
            onChange={(e) => setPesertaAlamat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>No HP</label>
          <input
            type="text"
            className="form-control"
            value={PesertaNohp}
            onChange={(e) => setPesertaNohp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Pendidikan Terakhir</label>
          <input
            type="text"
            className="form-control"
            value={PesertaPendidikan}
            onChange={(e) => setPesertaPendidikan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Asal Sekolah</label>
          <input
            type="text"
            className="form-control"
            value={PesertaAsalSekolah}
            onChange={(e) => setPesertaAsalSekolah(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Periode</label>
          <input
            type="text"
            className="form-control"
            value={PesertaPeriode}
            onChange={(e) => setPesertaPeriode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-secondary mr-2" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PesertaForm;
