// SesiSoal.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, editData } from '../../utils/api';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SesiSoal = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [soalList, setSoalList] = useState([]);
  const [sectionName, setSectionName] = useState('');
  const [editingPointId, setEditingPointId] = useState(null);
  const [editedPoint, setEditedPoint] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const data = await fetchData(`soal/list/${sectionId}`);
        setSoalList(data);
      } catch (error) {
        console.error('Error fetching soal list:', error);
      }
    };
    fetchSoal();
  }, [sectionId]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await fetchData(`soal/section/pilih/${sectionId}`);
        setSectionName(data.SectionNama);
      } catch (error) {
        console.error('Error fetching section:', error);
      }
    };
    fetchSection();
  }, [sectionId]);

  const handleAddSoal = () => {
    navigate(`/soal-list/${sectionId}`);
  };

  const handleDelete = async (Id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus soal ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await fetchData(`soal/list/${Id}`, 'DELETE');
        setSoalList(prev => prev.filter(soal => soal.Id !== Id));
        toast.success('Soal berhasil dihapus');
      } catch (error) {
        console.error('Error deleting soal:', error);
        toast.error('Gagal menghapus soal');
      }
    }
  };

  const handleEditPoint = (soal) => {
    setEditingPointId(soal.Id);
    setEditedPoint(soal.Point);
  };

  const handleCancelEdit = () => {
    setEditingPointId(null);
    setEditedPoint('');
  };

  const handleSavePoint = async (soal) => {
    try {
      await editData(`soal/list`, soal.Id, {Point: parseInt(editedPoint) });
      setSoalList(prev =>
        prev.map(s => (s.Id === soal.Id ? { ...s, Point: parseInt(editedPoint) } : s))
      );
      toast.success('Point berhasil diperbarui');
      setEditingPointId(null);
      setEditedPoint('');
    } catch (error) {
      console.error('Gagal update point:', error);
      toast.error('Gagal memperbarui point');
    }
  };

  // Pagination
  const totalItems = soalList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = soalList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container" style={{ margin: '0 auto', paddingTop: '80px', maxWidth: '1000px' }}>
      <ToastContainer />
      <div className="d-flex justify-content-start mb-3 gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <button className="btn btn-success" onClick={handleAddSoal}>
          <i className="fas fa-plus"></i> Masukkan Soal
        </button>
      </div>

      <div className="card rounded-4 shadow-sm">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Daftar Soal - Sesi {sectionName}</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-secondary">
              <tr>
                <th>No</th>
                <th>Pertanyaan</th>
                <th>A</th><th>B</th><th>C</th><th>D</th><th>E</th>
                <th>Point</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((soal, index) => (
                  <tr key={soal.SoalId}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td dangerouslySetInnerHTML={{ __html: soal.Pertanyaan }} />
<td dangerouslySetInnerHTML={{ __html: soal.JawabA }} />
<td dangerouslySetInnerHTML={{ __html: soal.JawabB }} />
<td dangerouslySetInnerHTML={{ __html: soal.JawabC }} />
<td dangerouslySetInnerHTML={{ __html: soal.JawabD }} />
<td dangerouslySetInnerHTML={{ __html: soal.JawabE }} />

                    <td>
                      {editingPointId === soal.Id ? (
                        <div className="d-flex align-items-center gap-1">
                          <input
                            type="number"
                            value={editedPoint}
                            onChange={(e) => setEditedPoint(e.target.value)}
                            className="form-control form-control-sm"
                            style={{ width: '70px' }}
                          />
                          <button className="btn btn-sm btn-success" onClick={() => handleSavePoint(soal)}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{soal.Point}</span>
                          <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => handleEditPoint(soal)}>
                            <i className="fas fa-pen"></i>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(soal.Id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="9" className="text-center">Tidak ada soal.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Tampilkan{' '}
              <select
                className="form-select d-inline-block w-auto"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
              </select>{' '}
              baris
            </div>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lsaquo;</button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">Halaman {currentPage} dari {totalPages}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&rsaquo;</button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SesiSoal;
