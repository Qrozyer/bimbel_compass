import React, { useState, useEffect } from 'react';
import { fetchData, addData } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SoalMateriTable from '../../components/soal/SoalMateriTable';

const SoalMateriForm = () => {
  const { MateriId } = useParams();
  const navigate = useNavigate();

  const [bidangList, setBidangList] = useState([]);
  const [subBidangList, setSubBidangList] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const [soalList, setSoalList] = useState([]);

  const [selectedBidangId, setSelectedBidangId] = useState('');
  const [selectedSubBidangId, setSelectedSubBidangId] = useState('');
  const [selectedMateriId, setSelectedMateriId] = useState('');

  const [materiJudul, setMateriJudul] = useState('');
  const [selectedSoalIds, setSelectedSoalIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [bidangData, subBidangData, materiData, soalData] = await Promise.all([
          fetchData('bidang'),
          fetchData('sub-bidang'),
          fetchData('materi'),
          fetchData('soal'),
        ]);
        setBidangList(bidangData);
        setSubBidangList(subBidangData);
        setMateriList(materiData);
        setSoalList(soalData);
      } catch (error) {
        toast.error('Gagal memuat data');
      }
    };

    const fetchMateri = async () => {
      try {
        const materi = await fetchData(`materi/pilih/${MateriId}`);
        if (materi) {
          setMateriJudul(materi.MateriJudul);
        }
      } catch (error) {
        toast.error('Gagal memuat data materi');
      }
    };

    fetchAll();
    fetchMateri();
  }, [MateriId]);

  const handleSubmit = async () => {
    try {
      for (const soalId of selectedSoalIds) {
        await addData('materi/soal', {
          MateriId: parseInt(MateriId),
          SoalId: parseInt(soalId),
        });
      }
      toast.success('Soal berhasil dimasukkan ke materi');
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      toast.error('Gagal memasukkan soal');
    }
  };

  const handleCheckboxToggle = (soalId) => {
    setSelectedSoalIds((prev) =>
      prev.includes(soalId) ? prev.filter((id) => id !== soalId) : [...prev, soalId]
    );
  };

  const filteredSubBidang = subBidangList.filter(
    (sb) => sb.BidangId === parseInt(selectedBidangId)
  );
  const filteredMateri = materiList.filter(
    (m) => m.SubId === parseInt(selectedSubBidangId)
  );

  let filteredSoal = soalList;

  if (selectedBidangId || selectedSubBidangId || selectedMateriId) {
    const selectedMateriIds = materiList
      .filter((m) =>
        (!selectedBidangId || m.BidangId === parseInt(selectedBidangId)) &&
        (!selectedSubBidangId || m.SubId === parseInt(selectedSubBidangId)) &&
        (!selectedMateriId || m.MateriId === parseInt(selectedMateriId))
      )
      .map((m) => m.MateriId);

    filteredSoal = soalList.filter((s) => selectedMateriIds.includes(s.MateriId));
  }

  filteredSoal = filteredSoal.filter((s) =>
    s.SoalPertanyaan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSoal.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredSoal.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBidangId, selectedSubBidangId, selectedMateriId]);

  return (
    <div className="container py-4" style={{ maxWidth: '1200px' }}>
      <ToastContainer />
      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Masukkan Soal ke Materi: {materiJudul}</h5>
        </div>

        <div className="card-body">
          {/* Filter */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Pilih Bidang:</label>
              <select
                className="form-select"
                value={selectedBidangId}
                onChange={(e) => {
                  setSelectedBidangId(e.target.value);
                  setSelectedSubBidangId('');
                  setSelectedMateriId('');
                }}
              >
                <option value="">-- Semua Bidang --</option>
                {bidangList.map((b) => (
                  <option key={b.BidangId} value={b.BidangId}>
                    {b.BidangNama}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Pilih Sub Bidang:</label>
              <select
                className="form-select"
                value={selectedSubBidangId}
                onChange={(e) => {
                  setSelectedSubBidangId(e.target.value);
                  setSelectedMateriId('');
                }}
                disabled={!selectedBidangId}
              >
                <option value="">-- Semua Sub Bidang --</option>
                {filteredSubBidang.map((sb) => (
                  <option key={sb.SubId} value={sb.SubId}>
                    {sb.SubNama}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Pilih Materi:</label>
              <select
                className="form-select"
                value={selectedMateriId}
                onChange={(e) => setSelectedMateriId(e.target.value)}
                disabled={!selectedSubBidangId}
              >
                <option value="">-- Semua Materi --</option>
                {filteredMateri.map((m) => (
                  <option key={m.MateriId} value={m.MateriId}>
                    {m.MateriJudul}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table + Search + Pagination */}
          <SoalMateriTable
            data={currentItems}
            selectedSoalIds={selectedSoalIds}
            onSelectSoal={handleCheckboxToggle}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
          />

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4 gap-2">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Kembali</button>
            <button
              className="btn btn-primary"
              disabled={selectedSoalIds.length === 0}
              onClick={handleSubmit}
            >
              Simpan Soal ke Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalMateriForm;
