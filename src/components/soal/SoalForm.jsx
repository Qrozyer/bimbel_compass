import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { editorConfig } from '../../utils/editorConfig';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const SoalForm = ({ initialData, onSave, onCancel }) => {
  // State untuk menyimpan semua nilai editor dalam objek
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
  
  const editorRef = useRef(null);

  useEffect(() => { 
    // Set initial data for the editor
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
    // Fetch materi data on component mount
    const fetchMateriData = async () => {
      const materiData = await fetchData('materi');
      if (materiData) {
        setMateriList(materiData);
      }
    };
    fetchMateriData();
  }, [initialData]);
  

  const handleEditorChange = (editorName, editor) => {
    const editorValue = editor.getData();  // Ambil data dari editor

    // Perbarui state dengan menggunakan nama editor (seperti 'pertanyaan', 'jawabanA', dll)
    setEditorData(prevData => ({
      ...prevData,
      [editorName]: editorValue,  // Update data berdasarkan nama editor
    }));
  };

  const handleSave = () => {
    console.log('Editor Data:', editorData);  // Log untuk memeriksa nilai editorData
    if (!editorData.pertanyaan || !editorData.jawabanA || !editorData.jawabanB || !editorData.jawabanC || 
        !editorData.jawabanD || !editorData.jawabanE || !kunciJawaban || !editorData.pembahasan || !selectedMateri) {
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
            {materiList.map((materi) => (
              <option key={materi.MateriId} value={materi.MateriId}>
                {materi.MateriJudul}
              </option>
            ))}
          </select>
        </div>

        {/* CKEditor untuk Pertanyaan */}
        <div className="form-group">
          <label>Pertanyaan</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.pertanyaan}
            onChange={(event, editor) => handleEditorChange('pertanyaan', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* CKEditor untuk Jawaban A */}
        <div className="form-group">
          <label>Jawaban A</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.jawabanA}
            onChange={(event, editor) => handleEditorChange('jawabanA', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* CKEditor untuk Jawaban B */}
        <div className="form-group">
          <label>Jawaban B</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.jawabanB}
            onChange={(event, editor) => handleEditorChange('jawabanB', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* CKEditor untuk Jawaban C */}
        <div className="form-group">
          <label>Jawaban C</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.jawabanC}
            onChange={(event, editor) => handleEditorChange('jawabanC', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* CKEditor untuk Jawaban D */}
        <div className="form-group">
          <label>Jawaban D</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.jawabanD}
            onChange={(event, editor) => handleEditorChange('jawabanD', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* CKEditor untuk Jawaban E */}
        <div className="form-group">
          <label>Jawaban E</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.jawabanE}
            onChange={(event, editor) => handleEditorChange('jawabanE', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* Input untuk Kunci Jawaban */}
        <div className="form-group">
          <label>Kunci Jawaban</label>
          <input
            type="text"
            className="form-control"
            value={kunciJawaban}
            onChange={(e) => setKunciJawaban(e.target.value)}
          />
        </div>

        {/* CKEditor untuk Pembahasan */}
        <div className="form-group">
          <label>Pembahasan</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData.pembahasan}
            onChange={(event, editor) => handleEditorChange('pembahasan', editor)} // Pass editorName
            onReady={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* Input untuk Video */}
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
