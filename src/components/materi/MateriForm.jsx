import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import { fetchData } from '../../utils/api';
import tinymceFullConfig from '../../utils/configTiny';

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const MateriForm = ({ initialData, subIdParam, onSave, onCancel }) => {
  const [MateriJudul, setMateriJudul] = useState(initialData?.MateriJudul || '');
  const [editorData, setEditorData] = useState(initialData?.MateriIsi || '');
  const [videoEditorData, setVideoEditorData] = useState(initialData?.MateriVideo || '');
  const [subBidangList, setSubBidangList] = useState([]);
  const [selectedSubBidang, setSelectedSubBidang] = useState(
    subIdParam || initialData?.SubId || ''
  );

  useEffect(() => {
    setSelectedSubBidang(subIdParam || initialData?.SubId || '');
    setMateriJudul(initialData?.MateriJudul || '');
    setEditorData(initialData?.MateriIsi || '');
    setVideoEditorData(initialData?.MateriVideo || '');

    const fetchSubBidangData = async () => {
      const subBidangData = await fetchData('sub-bidang');
      if (subBidangData) {
        setSubBidangList(subBidangData);
      }
    };
    fetchSubBidangData();
  }, [initialData, subIdParam]);

  const handleSave = () => {
    if (!MateriJudul || !editorData || !selectedSubBidang) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }
    onSave({
      MateriJudul,
      MateriIsi: editorData,
      SubId: parseInt(selectedSubBidang),
      MateriVideo: videoEditorData,
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
          <label>Video Materi</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={videoEditorData}
            init={{
              ...tinymceFullConfig,
              height: 200,
              plugins: [...tinymceFullConfig.plugins, 'media'],
              toolbar: `${tinymceFullConfig.toolbar} | media`,
              media_live_embeds: true,
            }}
            onEditorChange={(content) => setVideoEditorData(content)}
          />
        </div>

        <div className="form-group">
          <label>Isi Materi</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData}
            init={{
              ...tinymceFullConfig,
              height: 400,
              plugins: [...tinymceFullConfig.plugins, 'media'],
              toolbar: `${tinymceFullConfig.toolbar} | media`,
              media_live_embeds: true,
            }}
            onEditorChange={(content) => setEditorData(content)}
          />
        </div>

        <div className="form-group mt-3">
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
