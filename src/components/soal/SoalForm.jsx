import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';
import tinymceFullConfig from '../../utils/configTiny';
const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const SoalForm = ({ initialData, onSave, onCancel }) => {
  const [editorData, setEditorData] = useState({
    pertanyaan: initialData?.SoalPertanyaan || '',
    jawabanA: initialData?.SoalA || '',
    jawabanB: initialData?.SoalB || '',
    jawabanC: initialData?.SoalC || '',
    jawabanD: initialData?.SoalD || '',
    jawabanE: initialData?.SoalE || '',
    pembahasan: initialData?.SoalPembahasan || '',
  });

  const [kunciJawaban, setKunciJawaban] = useState(initialData?.SoalJawaban || '');
  const [video, setVideo] = useState(initialData?.SoalVideo || '');
  const [materiList, setMateriList] = useState([]);
  const [selectedMateri, setSelectedMateri] = useState(initialData?.MateriId || '');

  useEffect(() => {
    setEditorData({
      pertanyaan: initialData?.SoalPertanyaan || '',
      jawabanA: initialData?.SoalA || '',
      jawabanB: initialData?.SoalB || '',
      jawabanC: initialData?.SoalC || '',
      jawabanD: initialData?.SoalD || '',
      jawabanE: initialData?.SoalE || '',
      pembahasan: initialData?.SoalPembahasan || '',
    });
    setKunciJawaban(initialData?.SoalJawaban || '');
    setVideo(initialData?.SoalVideo || '');
    setSelectedMateri(initialData?.MateriId || '');

    const fetchMateriData = async () => {
      const materiData = await fetchData('materi');
      if (materiData) {
        setMateriList(materiData);
      }
    };
    fetchMateriData();
  }, [initialData]);

  const handleEditorChange = (editorName, content) => {
    setEditorData(prevData => ({
      ...prevData,
      [editorName]: content,
    }));
  };

  const handleSave = () => {
    if (
      !editorData.pertanyaan || !editorData.jawabanA || !editorData.jawabanB ||
      !editorData.jawabanC || !editorData.jawabanD || !editorData.jawabanE ||
      !kunciJawaban || !editorData.pembahasan || !selectedMateri
    ) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    onSave({
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
    });
  };

  return (
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Soal' : 'Tambah Soal'}</h4>

        {/* Dropdown untuk memilih materi */}
        <div className="form-group">
          <label>Materi</label>
          <select
            className="form-control"
            value={selectedMateri}
            onChange={(e) => setSelectedMateri(e.target.value)}
          >
            <option value="">Pilih Materi</option>
            {materiList.map(materi => (
              <option key={materi.MateriId} value={materi.MateriId}>
                {materi.MateriJudul}
              </option>
            ))}
          </select>
        </div>

        {/* TinyMCE Editor untuk Pertanyaan */}
        <div className="form-group">
          <label>Pertanyaan</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.pertanyaan}
            init={{ ...tinymceFullConfig, height: 200 }}
            onEditorChange={(content) => handleEditorChange('pertanyaan', content)}
          />
        </div>

        {/* Jawaban A */}
        <div className="form-group">
          <label>Jawaban A</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.jawabanA}
            init={{ ...tinymceFullConfig, height: 150 }}
            onEditorChange={(content) => handleEditorChange('jawabanA', content)}
          />
        </div>

        {/* Jawaban B */}
        <div className="form-group">
          <label>Jawaban B</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.jawabanB}
            init={{ ...tinymceFullConfig, height: 150 }}
            onEditorChange={(content) => handleEditorChange('jawabanB', content)}
          />
        </div>

        {/* Jawaban C */}
        <div className="form-group">
          <label>Jawaban C</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.jawabanC}
            init={{ ...tinymceFullConfig, height: 150 }}
            onEditorChange={(content) => handleEditorChange('jawabanC', content)}
          />
        </div>

        {/* Jawaban D */}
        <div className="form-group">
          <label>Jawaban D</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.jawabanD}
            init={{ ...tinymceFullConfig, height: 150 }}
            onEditorChange={(content) => handleEditorChange('jawabanD', content)}
          />
        </div>

        {/* Jawaban E */}
        <div className="form-group">
          <label>Jawaban E</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.jawabanE}
            init={{ ...tinymceFullConfig, height: 150 }}
            onEditorChange={(content) => handleEditorChange('jawabanE', content)}
          />
        </div>

        {/* Kunci Jawaban */}
        <div className="form-group">
          <label>Kunci Jawaban</label>
          <input
            type="text"
            className="form-control"
            value={kunciJawaban}
            onChange={(e) => setKunciJawaban(e.target.value)}
          />
        </div>

        {/* Pembahasan */}
        <div className="form-group">
          <label>Pembahasan</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData.pembahasan}
            init={{ ...tinymceFullConfig, height: 200 }}
            onEditorChange={(content) => handleEditorChange('pembahasan', content)}
          />
        </div>

        {/* Video */}
        <div className="form-group">
          <label>Video</label>
          <input
            type="text"
            className="form-control"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
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

export default SoalForm;
