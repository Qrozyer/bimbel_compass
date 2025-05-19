import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { fetchData, addData, editData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const BuatSoal = ({ soalId, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);

  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedSubBidang, setSelectedSubBidang] = useState('');
  const [selectedMateri, setSelectedMateri] = useState('');

  const [editorData, setEditorData] = useState({
    pertanyaan: '',
    jawabanA: '',
    jawabanB: '',
    jawabanC: '',
    jawabanD: '',
    jawabanE: '',
    pembahasan: '',
  });
  const [kunciJawaban, setKunciJawaban] = useState('');
  const [video, setVideo] = useState('');

  const isFormReady = selectedBidang && selectedSubBidang && selectedMateri;

  useEffect(() => {
    fetchData('bidang').then(data => {
      if (data) setBidangList(data);
    });
  }, []);

  useEffect(() => {
    if (selectedBidang) {
      fetchData(`sub-bidang/filter/${selectedBidang}`).then(data => {
        if (data) setSubBidangList(data);
        setSelectedSubBidang('');
        setMateriList([]);
        setSelectedMateri('');
      });
    } else {
      setSubBidangList([]);
      setSelectedSubBidang('');
      setMateriList([]);
      setSelectedMateri('');
    }
  }, [selectedBidang]);

  useEffect(() => {
    if (selectedSubBidang) {
      fetchData(`materi/filter/${selectedSubBidang}`).then(data => {
        if (data) setMateriList(data);
        setSelectedMateri('');
      });
    } else {
      setMateriList([]);
      setSelectedMateri('');
    }
  }, [selectedSubBidang]);

  useEffect(() => {
    if (soalId) {
      fetchData(`soal/${soalId}`).then(async soal => {
        if (soal) {
          setEditorData({
            pertanyaan: soal.SoalPertanyaan || '',
            jawabanA: soal.SoalA || '',
            jawabanB: soal.SoalB || '',
            jawabanC: soal.SoalC || '',
            jawabanD: soal.SoalD || '',
            jawabanE: soal.SoalE || '',
            pembahasan: soal.SoalPembahasan || '',
          });
          setKunciJawaban(soal.SoalJawaban || '');
          setVideo(soal.SoalVideo || '');

          if (soal.MateriId) {
            const materiDetail = await fetchData(`materi/pilih/${soal.MateriId}`);
            if (materiDetail) {
              setSelectedMateri(materiDetail.MateriId.toString());
              setSelectedSubBidang(materiDetail.SubBidangId.toString());
              const subBidangDetail = await fetchData(`sub-bidang/pilih/${materiDetail.SubBidangId}`);
              if (subBidangDetail) setSelectedBidang(subBidangDetail.BidangId.toString());
            }
          }
        }
      });
    }
  }, [soalId]);

  const handleEditorChange = (field, editor) => {
    setEditorData(prev => ({ ...prev, [field]: editor.getData() }));
  };

  const handleSubmit = async () => {
    if (
      !selectedBidang ||
      !selectedSubBidang ||
      !selectedMateri ||
      !editorData.pertanyaan ||
      !editorData.jawabanA ||
      !editorData.jawabanB ||
      !editorData.jawabanC ||
      !editorData.jawabanD ||
      !editorData.jawabanE ||
      !kunciJawaban ||
      !editorData.pembahasan
    ) {
      Swal.fire('Error', 'Semua field dan dropdown harus diisi!', 'error');
      return;
    }

    const payload = {
      SoalPertanyaan: editorData.pertanyaan,
      SoalA: editorData.jawabanA,
      SoalB: editorData.jawabanB,
      SoalC: editorData.jawabanC,
      SoalD: editorData.jawabanD,
      SoalE: editorData.jawabanE,
      SoalJawaban: kunciJawaban,
      SoalPembahasan: editorData.pembahasan,
      SoalVideo: video,
      MateriId: parseInt(selectedMateri),
    };

    let success = false;
    if (soalId) {
      success = await editData('soal', soalId, payload);
    } else {
      success = await addData('soal', payload);
    }

    if (success) {
      Swal.fire('Success', 'Data berhasil disimpan!', 'success');
      if (onSuccess) onSuccess();
    } else {
      Swal.fire('Error', 'Gagal menyimpan data.', 'error');
    }
  };

  return (
    <div className="container py-4 pt-5" style={{ margin: 'auto', padding: '50px', maxWidth: '1000px' }}>
      <div>
        <button className="btn btn-secondary me-2 fw-medium" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
      </div>
    <div style={{margin: '20px auto', padding: 20, border: '2px solid #ccc', borderRadius: 8 }}>
      <h3>{soalId ? 'Edit Soal' : 'Buat Soal'}</h3>

      {/* Dropdown Bidang */}
      <label>Bidang</label>
      <select value={selectedBidang} onChange={e => setSelectedBidang(e.target.value)} className="form-control" style={{ marginBottom: 10 }}>
        <option value="">-- Pilih Bidang --</option>
        {bidangList.map(b => <option key={b.BidangId} value={b.BidangId}>{b.BidangNama}</option>)}
      </select>

      {/* Dropdown Sub Bidang */}
      <label>Sub Bidang</label>
      <select
        value={selectedSubBidang}
        onChange={e => setSelectedSubBidang(e.target.value)}
        disabled={!selectedBidang}
        className="form-control"
        style={{ marginBottom: 10 }}
      >
        <option value="">-- Pilih Sub Bidang --</option>
        {subBidangList.map(s => <option key={s.SubId} value={s.SubId}>{s.SubNama}</option>)}
      </select>

      {/* Dropdown Materi */}
      <label>Materi</label>
      <select
        value={selectedMateri}
        onChange={e => setSelectedMateri(e.target.value)}
        disabled={!selectedSubBidang}
        className="form-control"
        style={{ marginBottom: 10 }}
      >
        <option value="">-- Pilih Materi --</option>
        {materiList.map(m => <option key={m.MateriId} value={m.MateriId}>{m.MateriJudul}</option>)}
      </select>

      {isFormReady ? (
  <div className="card mt-4">
    <div className="card-body">
      <label>Pertanyaan</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.pertanyaan}
        onChange={(event, editor) => handleEditorChange('pertanyaan', editor)}
      />
      <br />

      <label>Jawaban A</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.jawabanA}
        onChange={(event, editor) => handleEditorChange('jawabanA', editor)}
      />
      <br />

      <label>Jawaban B</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.jawabanB}
        onChange={(event, editor) => handleEditorChange('jawabanB', editor)}
      />
      <br />

      <label>Jawaban C</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.jawabanC}
        onChange={(event, editor) => handleEditorChange('jawabanC', editor)}
      />
      <br />

      <label>Jawaban D</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.jawabanD}
        onChange={(event, editor) => handleEditorChange('jawabanD', editor)}
      />
      <br />

      <label>Jawaban E</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.jawabanE}
        onChange={(event, editor) => handleEditorChange('jawabanE', editor)}
      />
      <br />

      <label>Kunci Jawaban</label>
      <input
        type="text"
        value={kunciJawaban}
        onChange={e => setKunciJawaban(e.target.value)}
        className="form-control"
        style={{ marginBottom: 10 }}
        placeholder="Contoh: A / B / C / D / E"
      />

      <label>Pembahasan</label>
      <CKEditor
        editor={ClassicEditor}
        data={editorData.pembahasan}
        onChange={(event, editor) => handleEditorChange('pembahasan', editor)}
      />
      <br />

      <label>Video (opsional)</label>
      <input
        type="text"
        value={video}
        onChange={e => setVideo(e.target.value)}
        className="form-control"
        placeholder="Masukkan link video jika ada"
        style={{ marginBottom: 10 }}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={handleSubmit} className="btn btn-primary me-2">
          Simpan
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Batal
        </button>
      </div>
    </div>
  </div>
) : (
  <div className="alert alert-info mt-4">
    Silakan pilih <strong>Bidang</strong>, <strong>Sub Bidang</strong>, dan <strong>Materi</strong> terlebih dahulu untuk mengisi soal.
  </div>
)}

    </div>
    </div>
  );
};

export default BuatSoal;
