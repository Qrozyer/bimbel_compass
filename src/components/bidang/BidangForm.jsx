import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import tinymceFullConfig from '../../utils/configTiny';

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const BidangForm = ({ initialData, onSave, onCancel }) => {
  const [BidangNama, setBidangNama] = useState(initialData?.BidangNama || '');
  const [editorData, setEditorData] = useState(initialData?.BidangKeterangan || '');
  const Tampil = 1; // Selalu aktif

  useEffect(() => {
    setBidangNama(initialData?.BidangNama || '');
    setEditorData(initialData?.BidangKeterangan || '');
  }, [initialData]);

  const handleSave = () => {
    if (!BidangNama || !editorData) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    onSave({ BidangNama, BidangKeterangan: editorData, Tampil });
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
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData}
            init={{ ...tinymceFullConfig, height: 300 }}
            onEditorChange={(content) => setEditorData(content)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select className="form-control" value={1} disabled>
            <option value={1}>Aktif</option>
          </select>
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

export default BidangForm;
