import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';

const PesertaForm = ({ initialData, onSave, onCancel }) => {
  const [PesertaNama, setPesertaNama] = useState('');
  const [PesertaEmail, setPesertaEmail] = useState('');
  const [PesertaJk, setPesertaJk] = useState('L');
  const [PesertaAlamat, setPesertaAlamat] = useState('');
  const [PesertaNohp, setPesertaNohp] = useState('');
  const [PesertaPendidikanTerakhir, setPesertaPendidikanTerakhir] = useState('');
  const [PesertaAsalSekolah, setPesertaAsalSekolah] = useState('');
  const [PesertaPeriode, setPesertaPeriode] = useState('');
  const [asalPesertaList, setAsalPesertaList] = useState([]);
  const [periodeList, setPeriodeList] = useState([]);

  // Set initial data on mount or when props change
  useEffect(() => {
    setPesertaNama(String(initialData?.peserta_nama || ''));
    setPesertaEmail(String(initialData?.peserta_email || ''));
    setPesertaJk(initialData?.peserta_jk || 'L');
    setPesertaAlamat(String(initialData?.peserta_alamat || ''));
    setPesertaNohp(String(initialData?.peserta_nohp || ''));
    setPesertaPendidikanTerakhir(String(initialData?.peserta_pendidikanterakhir || ''));
    setPesertaAsalSekolah(String(initialData?.peserta_asalsekolah || ''));
    setPesertaPeriode(initialData?.peserta_periode || '');
  }, [initialData]);

  // Fetch asal peserta dan periode
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const asalResponse = await fetchData('/peserta/asal');
        const periodeResponse = await fetchData('/periode');
        setAsalPesertaList(asalResponse);
        setPeriodeList(periodeResponse);
      } catch (error) {
        Swal.fire('Error', 'Gagal memuat data dropdown.', 'error');
      }
    };
    fetchDropdownData();
  }, []);

  const handleSave = () => {
    if (!PesertaNama || !PesertaEmail || !PesertaJk || !PesertaAlamat || !PesertaNohp || !PesertaPendidikanTerakhir || !PesertaAsalSekolah || !PesertaPeriode) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    onSave({
      PesertaEmail,
      PesertaNama,
      PesertaJk,
      PesertaAlamat,
      PesertaNohp,
      PesertaPendidikanTerakhir,
      PesertaAsalSekolah,
      PesertaPeriode,
    });
  };

  return (
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Peserta' : 'Tambah Peserta'}</h4>

        <div className="form-group">
          <label>Asal Peserta</label>
          <select className="form-control" value={PesertaAsalSekolah} onChange={(e) => setPesertaAsalSekolah(e.target.value)}>
            <option value="">Pilih Asal Peserta</option>
            {asalPesertaList.map((asal, index) => (
              <option key={index} value={asal.AsalDaerah}>
                {asal.AsalDaerah}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Periode</label>
          <select className="form-control" value={PesertaPeriode} onChange={(e) => setPesertaPeriode(e.target.value)}>
            <option value="">Pilih Periode</option>
            {periodeList.map((periode, index) => (
              <option key={index} value={periode.PeriodeNama}>
                {periode.PeriodeNama}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nama Peserta</label>
          <input type="text" className="form-control" value={PesertaNama} onChange={(e) => setPesertaNama(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email Peserta</label>
          <input type="email" className="form-control" value={PesertaEmail} onChange={(e) => setPesertaEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Jenis Kelamin</label>
          <select className="form-control" value={PesertaJk} onChange={(e) => setPesertaJk(e.target.value)}>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Alamat</label>
          <input type="text" className="form-control" value={PesertaAlamat} onChange={(e) => setPesertaAlamat(e.target.value)} />
        </div>

        <div className="form-group">
          <label>No HP</label>
          <input type="text" className="form-control" value={PesertaNohp} onChange={(e) => setPesertaNohp(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Pendidikan Terakhir</label>
          <input type="text" className="form-control" value={PesertaPendidikanTerakhir} onChange={(e) => setPesertaPendidikanTerakhir(e.target.value)} />
        </div>

        <div className="form-group mt-3">
          <button className="btn btn-secondary mr-2" onClick={onCancel}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default PesertaForm;
