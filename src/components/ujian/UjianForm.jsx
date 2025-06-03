import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';

const UjianForm = ({ initialData, onSave, onCancel }) => {
  const [TglUjian, setTglUjian] = useState('');
  const [AwalUjian, setAwalUjian] = useState('');
  const [AkhirUjian, setAkhirUjian] = useState('');
  const [Durasi, setDurasi] = useState('');
  const [Tampil, setTampil] = useState(1);
  const [NamaSection, setNamaSection] = useState('');

  useEffect(() => {
    if (initialData) {
      setTglUjian(initialData.TglUjian || '');
      setAwalUjian(initialData.AwalUjian || '');
      setAkhirUjian(initialData.AkhirUjian || '');
      setDurasi(initialData.Durasi || '');
      setTampil(initialData.Tampil ?? 1);
      
      if (initialData.SectionID) {
        const fetchSectionName = async () => {
          try {
            const response = await fetchData(`soal/section/pilih/${initialData.SectionID}`);
            if (response) {
              setNamaSection(response.SectionNama);
            }
          } catch (error) {
            console.error('Error fetching section name:', error);
          }
        };
        fetchSectionName();
      }      
    }
  }, [initialData]);

  const handleSave = () => {
    if (!TglUjian || !AwalUjian || !AkhirUjian || !Durasi) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    const payload = {
  TglUjian,
  Mulai: AwalUjian,
  Akhir: AkhirUjian,
  Durasi: parseInt(Durasi, 10),
  Tampil: parseInt(Tampil, 10),
};


    onSave(payload);
  };

  return (
    <div className="form-container card rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
            <h3>Ujian Update Form</h3>
        </div>
      <div className="card-body">        

        <div className="form-group">
          <label>Nama Section</label>
          <input            
            disabled
            className="form-control"
            value={NamaSection}            
          />
        </div>

        <div className="form-group">
          <label>Tanggal Ujian</label>
          <input
            type="date"
            className="form-control"
            value={TglUjian}
            onChange={(e) => setTglUjian(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Waktu Awal Ujian</label>
          <input
            type="datetime-local"
            className="form-control"
            value={AwalUjian}
            onChange={(e) => setAwalUjian(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Waktu Akhir Ujian</label>
          <input
            type="datetime-local"
            className="form-control"
            value={AkhirUjian}
            onChange={(e) => setAkhirUjian(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Durasi (menit)</label>
          <input
            type="number"
            className="form-control"
            value={Durasi}
            onChange={(e) => setDurasi(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Aktifkan Ujian</label>
          <select
            className="form-control"
            value={Tampil}
            onChange={(e) => setTampil(e.target.value)}
          >
            <option value={1}>Ya</option>
            <option value={0}>Tidak</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <button className="btn btn-secondary mr-2" onClick={onCancel}>Batal</button>
          <button className="btn btn-success" onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default UjianForm;
