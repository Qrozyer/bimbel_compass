import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSoal } from '../../actions/soalActions';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, addData } from '../../utils/api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const SesiSoalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const [sectionName, setSectionName] = useState('');

  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const soalList = useSelector((state) => state.soal.soal);
  const [filteredSoal, setFilteredSoal] = useState([]);
  const [usedSoalIds, setUsedSoalIds] = useState([]);

  const [selectedBidang, setSelectedBidang] = useState('');
  const [selectedSubBidang, setSelectedSubBidang] = useState('');
  const [selectedMateri, setSelectedMateri] = useState('');
  const [selectedSoal, setSelectedSoal] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [soalData, bidangData, subBidangData, materiData] = await Promise.all([
          fetchData('soal'),
          fetchData('bidang'),
          fetchData('sub-bidang'),
          fetchData('materi'),
        ]);
        if (soalData) dispatch(setSoal(soalData));
        if (bidangData) setBidangList(bidangData);
        if (subBidangData) setSubBidangList(subBidangData);
        if (materiData) setMateriList(materiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await fetchData(`soal/section/pilih/${sectionId}`);
        setSectionName(data.SectionNama);
      } catch (error) {
        console.error('Error fetching section name:', error);
      }
    };
    fetchSection();
  }, [sectionId]);

  useEffect(() => {
    const fetchUsedSoal = async () => {
      try {
        const data = await fetchData(`soal/list/${sectionId}`);
        if (data && Array.isArray(data)) {
          const ids = data.map((item) => item.SoalId);
          setUsedSoalIds(ids);
        }
      } catch (error) {
        console.error('Error fetching used soal:', error);
      }
    };
    fetchUsedSoal();
  }, [sectionId]);

  useEffect(() => {
    if (selectedBidang && selectedSubBidang && selectedMateri) {
      const filtered = soalList
        .filter((soal) => soal.MateriId === parseInt(selectedMateri))
        .filter((soal) => !usedSoalIds.includes(soal.SoalId));
      setFilteredSoal(filtered);
      setCurrentPage(1);
    } else {
      setFilteredSoal([]);
    }
  }, [selectedBidang, selectedSubBidang, selectedMateri, soalList, usedSoalIds]);

  const filteredSubBidang = subBidangList.filter(
    (sb) => sb.BidangId === parseInt(selectedBidang)
  );
  const filteredMateri = materiList.filter(
    (m) => m.SubId === parseInt(selectedSubBidang)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSoal.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSoal.length / itemsPerPage);

  const handleCheckboxChange = (soalId, isChecked) => {
    setSelectedSoal((prev) =>
      isChecked
        ? [...prev, { SoalId: soalId, Point: 1 }]
        : prev.filter((s) => s.SoalId !== soalId)
    );
  };

  const handlePointChange = (soalId, point) => {
    setSelectedSoal((prev) =>
      prev.map((s) => (s.SoalId === soalId ? { ...s, Point: point } : s))
    );
  };

  const handleSubmit = async () => {
    try {
      const requests = selectedSoal.map((soal) => ({
        SectionId: Number(sectionId),
        SoalId: soal.SoalId,
        Point: soal.Point,
      }));

      for (const req of requests) {
        await addData('soal/list', req);
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil disimpan!',
        confirmButtonColor: '#3085d6',
      }).then(() => navigate(-1));
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Gagal menyimpan data. Silakan coba lagi.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', padding: '20px' }}>
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <button className="btn btn-success" onClick={() => navigate('/buat-soal')}>
          Buat Soal Baru
        </button>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Memasukkan Soal ke Sesi {sectionName}</h5>
        </div>
        <div className="card-body">
          {/* Filter */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Bidang</label>
              <select
                className="form-select"
                value={selectedBidang}
                onChange={(e) => {
                  setSelectedBidang(e.target.value);
                  setSelectedSubBidang('');
                  setSelectedMateri('');
                }}
              >
                <option value="">Pilih Bidang</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>{b.BidangNama}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Sub Bidang</label>
              <select
                className="form-select"
                value={selectedSubBidang}
                onChange={(e) => {
                  setSelectedSubBidang(e.target.value);
                  setSelectedMateri('');
                }}
                disabled={!selectedBidang}
              >
                <option value="">Pilih Sub Bidang</option>
                {filteredSubBidang.map((sb) => (
                  <option key={sb.SubId} value={sb.SubId}>{sb.SubNama}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Materi</label>
              <select
                className="form-select"
                value={selectedMateri}
                onChange={(e) => setSelectedMateri(e.target.value)}
                disabled={!selectedSubBidang}
              >
                <option value="">Pilih Materi</option>
                {filteredMateri.map((m) => (
                  <option key={m.MateriId} value={m.MateriId}>{m.MateriJudul}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Alert jika filter belum lengkap */}
          {(!selectedBidang || !selectedSubBidang || !selectedMateri) && (
            <div className="alert alert-info">
              Silakan pilih <strong>Bidang</strong>, <strong>Sub Bidang</strong>, dan <strong>Materi</strong> untuk menampilkan soal.
            </div>
          )}

          {/* Tabel Soal */}
          {selectedBidang && selectedSubBidang && selectedMateri && (
            filteredSoal.length === 0 ? (
              <div className="alert alert-warning">Soal tidak ditemukan atau sudah dimasukkan sebelumnya.</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-secondary">
                      <tr>
                        <th>No</th>
                        <th>Pertanyaan</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                        <th>Kunci</th>
                        <th>Pilih</th>
                        <th>Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((soal, index) => (
                        <tr key={soal.SoalId}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalPertanyaan }} />
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalA }} />
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalB }} />
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalC }} />
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalD }} />
                          <td dangerouslySetInnerHTML={{ __html: soal.SoalE }} />
                          <td>{soal.SoalJawaban}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedSoal.some((s) => s.SoalId === soal.SoalId)}
                              onChange={(e) => handleCheckboxChange(soal.SoalId, e.target.checked)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={
                                selectedSoal.find((s) => s.SoalId === soal.SoalId)?.Point || 1
                              }
                              disabled={!selectedSoal.some((s) => s.SoalId === soal.SoalId)}
                              onChange={(e) =>
                                handlePointChange(soal.SoalId, Number(e.target.value))
                              }
                              style={{ width: '60px' }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    Tampilkan{' '}
                    <select
                      className="form-select d-inline-block w-auto"
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                      {[5, 10, 15, 20].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>{' '}
                    baris per halaman
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                      </li>
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lsaquo;</button>
                      </li>
                      <li className="page-item disabled">
                        <span className="page-link">Halaman {currentPage} dari {totalPages}</span>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>&rsaquo;</button>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="mt-3 text-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={selectedSoal.length === 0}
                  >
                    Simpan Soal Terpilih
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SesiSoalForm;
