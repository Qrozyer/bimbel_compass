import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import { fetchData } from '../../utils/api';
import tinymceFullConfig from '../../utils/configTiny'; // import configTiny

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY;

const SubBidangForm = ({ initialData, onSave, onCancel }) => {
  const [SubNama, setSubNama] = useState(String(initialData?.SubNama || ''));
  const [editorData, setEditorData] = useState(String(initialData?.SubKeterangan || ''));
  const [bidangList, setBidangList] = useState([]);
  const [selectedBidang, setSelectedBidang] = useState(initialData?.BidangId || '');

  useEffect(() => {
    setSubNama(String(initialData?.SubNama || ''));
    setEditorData(String(initialData?.SubKeterangan || ''));
    setSelectedBidang(initialData?.BidangId || '');

    const fetchBidangData = async () => {
      const bidangData = await fetchData('bidang');
      if (bidangData) {
        setBidangList(bidangData);
      }
    };
    fetchBidangData();
  }, [initialData]);

  const handleEditorChange = (content) => {
    setEditorData(content);
  };

  const handleSave = () => {
    if (!SubNama || !editorData || !selectedBidang) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    onSave({
      SubNama,
      SubKeterangan: editorData,
      BidangId: parseInt(selectedBidang),
    });
  };

  return (
    <div className="form-container card">
      <div className="card-body">
        <h4>{initialData ? 'Edit Sub Bidang' : 'Tambah Sub Bidang'}</h4>

        <div className="form-group">
          <label>Bidang</label>
          <select
            className="form-control"
            value={selectedBidang}
            onChange={(e) => setSelectedBidang(e.target.value)}
          >
            <option value="">Pilih Bidang</option>
            {bidangList.map((bidang) => (
              <option key={bidang.BidangId} value={bidang.BidangId}>
                {bidang.BidangNama}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nama Sub Bidang</label>
          <input
            type="text"
            className="form-control"
            value={SubNama}
            onChange={(e) => setSubNama(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Keterangan</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorData}
            init={{ ...tinymceFullConfig, height: 300, menubar: false }}
            onEditorChange={handleEditorChange}
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

export default SubBidangForm;
