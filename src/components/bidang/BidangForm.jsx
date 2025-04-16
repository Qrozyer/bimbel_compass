import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../utils/editorConfig';
import Swal from 'sweetalert2';

const BidangForm = ({ initialData, onSave, onCancel }) => {
  console.log("BidangForm initialData:", initialData);
  const [BidangNama, setBidangNama] = useState(String(initialData?.BidangNama || ''));
  const [editorData, setEditorData] = useState(String(initialData?.BidangKeterangan || ''));
  const editorRef = useRef(null);

  useEffect(() => {
    setBidangNama(String(initialData?.BidangNama || ''));
    setEditorData(String(initialData?.BidangKeterangan || ''));
  }, [initialData]);

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const handleSave = () => {
    if (!BidangNama || !editorData) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }
    onSave({ BidangNama, BidangKeterangan: editorData });
  };

  return (
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Bidang' : 'Tambah Bidang'}</h4>
        <div className="form-group">
          <label>Nama Bidang</label>
          <input
            type="text"
            className="form-control"
            value={BidangNama}
            onChange={(e) => setBidangNama(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Keterangan</label>
          <div id="editor">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={editorData}
              onChange={handleEditorChange}
              onReady={(editor) => { editorRef.current = editor; }}
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

export default BidangForm;