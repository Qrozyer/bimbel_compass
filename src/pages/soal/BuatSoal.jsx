import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import { fetchData, addData, editData } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import tinymceFullConfig from '../../utils/configTiny';

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const BuatSoal = () => {
  const navigate = useNavigate();
  const { soalId } = useParams();

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

  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);

  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedSubBidang, setSelectedSubBidang] = useState('');
  const [selectedMateri, setSelectedMateri] = useState('');

  const modeEdit = !!soalId;
  const isFormReady = selectedMateri;

  // Fetch bidang awal (untuk add)
  useEffect(() => {
    if (!modeEdit) {
      fetchData('bidang').then(data => {
        if (data) setBidangList(data);
      });
    }
  }, [modeEdit]);

  // Fetch subBidang ketika bidang berubah (hanya jika bukan edit)
  useEffect(() => {
    if (selectedBidang && !modeEdit) {
      fetchData(`sub-bidang/filter/${selectedBidang}`).then(data => {
        if (data) setSubBidangList(data);
      });
    }
  }, [selectedBidang, modeEdit]);

  // Fetch materi ketika subBidang berubah (hanya jika bukan edit)
  useEffect(() => {
    if (selectedSubBidang && !modeEdit) {
      fetchData(`materi/filter/${selectedSubBidang}`).then(data => {
        if (data) setMateriList(data);
      });
    }
  }, [selectedSubBidang, modeEdit]);

  // Fetch soal jika edit
  useEffect(() => {
    if (!modeEdit) return;

    const loadSoal = async () => {
      try {
        const soal = await fetchData(`soal/pilih/${soalId}`);
        if (!soal) return;

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
        setSelectedMateri(soal.MateriId?.toString() || '');

        // Fetch single materi data (for label display)
        const materiData = await fetchData(`materi/pilih/${soal.MateriId}`);
        if (materiData) {
          setMateriList([materiData]); // agar tetap tampil di dropdown
        }

      } catch (err) {
        console.error('Gagal load soal:', err);
      }
    };

    loadSoal();
  }, [soalId, modeEdit]);

  const handleEditorChange = (field, content) => {
    setEditorData(prev => ({ ...prev, [field]: content }));
  };

  const handleSubmit = async () => {
    if (
      !selectedMateri ||
      !editorData.pertanyaan || !editorData.jawabanA || !editorData.jawabanB ||
      !editorData.jawabanC || !editorData.jawabanD || !editorData.jawabanE ||
      !kunciJawaban || !editorData.pembahasan
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

    const success = modeEdit
      ? await editData('soal', soalId, payload)
      : await addData('soal', payload);

    if (success) {
      Swal.fire('Success', `Soal berhasil ${modeEdit ? 'diperbarui' : 'ditambahkan'}!`, 'success');
      navigate(-1);
    } else {
      Swal.fire('Error', 'Gagal menyimpan data.', 'error');
    }
  };

  return (
    <div className="container py-4 pt-5" style={{ maxWidth: '1000px' }}>
      <button className="btn btn-secondary fw-medium mb-3" onClick={() => navigate(-1)}>
        ← Kembali
      </button>

      <div className="border p-4 rounded">
        <h3>{modeEdit ? 'Edit Soal' : 'Buat Soal Baru'}</h3>

        {!modeEdit && (
          <>
            <label className="mt-3">Bidang</label>
            <select value={selectedBidang} onChange={(e) => setSelectedBidang(e.target.value)} className="form-control">
              <option value="">-- Pilih Bidang --</option>
              {bidangList.map(b => (
                <option key={b.BidangId} value={b.BidangId}>{b.BidangNama}</option>
              ))}
            </select>

            <label className="mt-3">Sub Bidang</label>
            <select value={selectedSubBidang} onChange={(e) => setSelectedSubBidang(e.target.value)} disabled={!selectedBidang} className="form-control">
              <option value="">-- Pilih Sub Bidang --</option>
              {subBidangList.map(s => (
                <option key={s.SubId} value={s.SubId}>{s.SubNama}</option>
              ))}
            </select>
          </>
        )}

        <label className="mt-3">Materi</label>
        <select
          value={selectedMateri}
          onChange={(e) => setSelectedMateri(e.target.value)}
          disabled={modeEdit || !selectedSubBidang}
          className="form-control mb-4"
        >
          <option value="">-- Pilih Materi --</option>
          {materiList.map(m => (
            <option key={m.MateriId} value={m.MateriId}>{m.MateriJudul}</option>
          ))}
        </select>

        {isFormReady ? (
          <div className="card">
            <div className="card-body">
              <label>Pertanyaan</label>
              <Editor
                apiKey={TINYMCE_API_KEY}
                value={editorData.pertanyaan}
                init={tinymceFullConfig}
                onEditorChange={(content) => handleEditorChange('pertanyaan', content)}
              />
              <br />
              {['A', 'B', 'C', 'D', 'E'].map(opt => (
                <div key={opt}>
                  <label>Jawaban {opt}</label>
                  <Editor
                    apiKey={TINYMCE_API_KEY}
                    value={editorData[`jawaban${opt}`]}
                    init={tinymceFullConfig}
                    onEditorChange={(content) => handleEditorChange(`jawaban${opt}`, content)}
                  />
                  <br />
                </div>
              ))}
              <label>Kunci Jawaban</label>
              <input
                type="text"
                className="form-control mb-3"
                value={kunciJawaban}
                onChange={(e) => setKunciJawaban(e.target.value)}
                placeholder="Contoh: A / B / C / D / E"
              />
              <label>Pembahasan</label>
              <Editor
                apiKey={TINYMCE_API_KEY}
                value={editorData.pembahasan}
                init={tinymceFullConfig}
                onEditorChange={(content) => handleEditorChange('pembahasan', content)}
              />
              <br />
              <label>Video (opsional)</label>
              <Editor
                apiKey={TINYMCE_API_KEY}
                value={video}
                init={tinymceFullConfig}
                onEditorChange={(content) => setVideo(content)}
              />
              <br />
              <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={handleSubmit}>Simpan</button>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Batal</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info mt-3">
            Silakan pilih <strong>Materi</strong> terlebih dahulu.
          </div>
        )}
      </div>
    </div>
  );
};

export default BuatSoal;
