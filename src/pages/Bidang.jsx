import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBidang, editBidang, setBidang } from '../actions/bidangActions'; 
import Swal from 'sweetalert2';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/id'; 
import { toast } from 'react-toastify'; 

const baseURL = process.env.REACT_APP_BASE_URL;

const Bidang = () => {
  const dispatch = useDispatch();
  const bidang = useSelector((state) => state.bidang.bidang);

  const [BidangNama, setBidangNama] = useState('');
  const [editorData, setEditorData] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentBidangId, setCurrentBidangId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const editorRef = useRef(null); 

  useEffect(() => {
    fetchBidang();
  }, []);

  const editorConfig = {
    toolbar: [
      'undo', 'redo', 
      '|',
      'heading', '|',
      'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code', 
      '|',
      'link', 'uploadImage', 'blockQuote', 'codeBlock', 
      '|',
      'alignment', '|',
      'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
      '|',
      'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
      '|',
      'table',
      '|',
      'emoji'
    ],
    image: {
      toolbar: [
        'imageTextAlternative', '|',
        'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    emoji: {
      emojiList: ['', '', '', '', '', '', '', '', '', '']
    },
    extraPlugins: [MyCustomImageUploadAdapterPlugin],
  };

  function MyCustomImageUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyCustomUploadAdapter(loader);
    };
  }

  class MyCustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('file', this.loader.file);
        axios.post('YOUR_IMAGE_UPLOAD_URL', data)
          .then(response => {
            resolve({
              default: response.data.imageUrl
            });
          })
          .catch(error => reject('Upload failed: ' + error));
      });
    }

    abort() {
      console.log('Upload aborted');
    }
  }

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const fetchBidang = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${baseURL}/bidang`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBidang(response.data)); 
    } catch (error) {
      toast.error('Gagal mengambil data bidang!');
    }
  };

  const handleSave = () => {
    if (!BidangNama || !editorData) {
      Swal.fire('Error', 'Semua field harus diisi!', 'error');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'Anda harus login terlebih dahulu!', 'error');
      return;
    }

    const data = { BidangNama, BidangKeterangan: editorData };

    if (editMode) {
      axios
        .put(`${baseURL}/bidang/${currentBidangId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          fetchBidang(); 
          Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
          setShowForm(false); 
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.msg || 'Gagal memperbarui data';
          toast.error(errorMsg);
        });
    } else {
      axios
        .post(`${baseURL}/bidang`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          fetchBidang(); 
          Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
          setShowForm(false); 
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.msg || 'Gagal menambah data';
          toast.error(errorMsg);
        });
    }
  };

  const handleAddData = () => {
    setShowForm(true);
    setEditMode(false); 
    setBidangNama('');
    setEditorData('');
  };

  const handleEdit = (item) => {
    setBidangNama(item.BidangNama);
    setEditorData(item.BidangKeterangan);
    setCurrentBidangId(item.BidangId);
    setEditMode(true);
    setShowForm(true); 
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }

        axios
          .delete(`${baseURL}/bidang/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            dispatch(setBidang(bidang.filter((item) => item.BidangId !== id)));
            Swal.fire('Terhapus!', 'Data bidang telah dihapus.', 'success');
          })
          .catch((error) => {
            const errorMsg = error.response?.data?.msg || 'Gagal menghapus data bidang.';
            Swal.fire('Gagal!', errorMsg, 'error');
          });
      }
    });
  };

  // Menghubungkan toolbar dengan editor setelah render
  useEffect(() => {
    if (editorRef.current) {
      const toolbarContainer = document.querySelector('#toolbar-container');
      if (toolbarContainer) {
        toolbarContainer.appendChild(editorRef.current.ui.view.toolbar.element);
      }
    }
  }, [editorRef.current]); 

  return (
    <div className="content pt-3 px-4">
      <div className="container-fluid">
        <h3 className="mb-4">Daftar Bidang</h3>

        <button className="btn btn-success mb-3" onClick={handleAddData}>
          Tambah Data Bidang
        </button>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>No</th>
                <th>Nama Bidang</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bidang.map((item, index) => (
                <tr key={item.BidangId}>
                  <td>{index + 1}</td>
                  <td>{item.BidangNama}</td>
                  <td dangerouslySetInnerHTML={{ __html: item.BidangKeterangan }}></td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.BidangId)}
                    >
                      <i className="fas fa-trash-alt"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="form-container card">
            <div className="card-body">
              <h4>{editMode ? 'Edit Bidang' : 'Tambah Bidang'}</h4>
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
                <div id="toolbar-container">
                  <div id="toolbar">
                    {/* Toolbar akan di-render di sini */}
                  </div>
                </div>
                <div id="editor">
                  <CKEditor
                    editor={DecoupledEditor}
                    data={editorData}
                    config={editorConfig}
                    onChange={handleEditorChange}
                    onReady={editor => {
                      editorRef.current = editor;
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-secondary mr-2" onClick={() => setShowForm(false)}>
                  Batal
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bidang;