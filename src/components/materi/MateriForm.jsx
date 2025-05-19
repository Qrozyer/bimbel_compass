import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { editorConfig } from '../../utils/editorConfig';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MateriForm = ({ initialData, subIdParam, onSave, onCancel }) => {
  const [MateriJudul, setMateriJudul] = useState(String(initialData?.MateriJudul || ''));
  const [editorData, setEditorData] = useState(String(initialData?.MateriIsi || ''));
  const [videoUrl, setVideoUrl] = useState(initialData?.MateriVideo || '');
  const [subBidangList, setSubBidangList] = useState([]);
  const [selectedSubBidang, setSelectedSubBidang] = useState(
    String(subIdParam || initialData?.SubId || '')
  );

  const editorRef = useRef(null);

  useEffect(() => {
    setSelectedSubBidang(String(subIdParam || initialData?.SubId || ''));
    setMateriJudul(String(initialData?.MateriJudul || ''));
    setEditorData(String(initialData?.MateriIsi || ''));
    setVideoUrl(initialData?.MateriVideo || '');

    const fetchSubBidangData = async () => {
      const subBidangData = await fetchData('sub-bidang');
      if (subBidangData) {
        setSubBidangList(subBidangData);
      }
    };
    fetchSubBidangData();
  }, [initialData]);

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const handleSave = () => {
    if (!MateriJudul || !editorData || !selectedSubBidang) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }
    onSave({
      MateriJudul,
      MateriIsi: editorData,
      SubId: parseInt(selectedSubBidang),
      MateriVideo: videoUrl
    });
  };

  return (
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Materi' : 'Tambah Materi'}</h4>
        <div className="form-group">
          <label>Sub Bidang</label>
          <select
            className="form-control"
            value={selectedSubBidang}
            onChange={(e) => setSelectedSubBidang(e.target.value)}
          >
            <option value="">Pilih Sub Bidang</option>
            {subBidangList.map((subBidang) => (
              <option key={subBidang.SubId} value={subBidang.SubId}>
                {subBidang.SubNama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Judul Materi</label>
          <input
            type="text"
            className="form-control"
            value={MateriJudul}
            onChange={(e) => setMateriJudul(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>URL Video</label>
          <input
            type="text"
            className="form-control"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="example: https://www.youtube.com/embed/xxxxx"
          />
        </div>
        <div className="form-group">
          <label>Isi Materi</label>
          <div id="editor">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={editorData}
              onChange={handleEditorChange}
              onReady={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>
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

export default MateriForm;
