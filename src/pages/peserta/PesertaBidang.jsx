import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../utils/api'; // pastikan deleteData ada
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PesertaBidang = () => {
  const { BidangId } = useParams();
  const navigate = useNavigate();
  const [pesertaList, setPesertaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPeserta();
  }, [BidangId]);

  const fetchPeserta = async () => {
    setLoading(true);
    try {
      const data = await fetchData(`peserta/bidang/${BidangId}`);
      setPesertaList(data);
    } catch (error) {
      console.error('Error fetching peserta:', error);
      toast.error('Gagal mengambil data peserta');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    // id di sini adalah id dari peserta bidang, bukan peserta_id
    navigate(`/peserta-bidang/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus peserta dari bidang ini?')) {
      try {
        await deleteData(`peserta/bidang/${id}`);
        toast.success('Peserta berhasil dihapus!');
        fetchPeserta(); // Refresh list
      } catch (error) {
        console.error('Error deleting peserta:', error);
        toast.error('Gagal menghapus peserta.');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleTambahPeserta = () => {
    navigate(`/peserta-bidang/tambah/${BidangId}`);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1000px' }}>
      <h2 className="mb-4">Daftar Peserta Bidang {BidangId}</h2>

      <div className="d-flex mb-3 gap-2">
        <button className="btn btn-secondary" onClick={handleBack}>
          Kembali
        </button>
        <button className="btn btn-success" onClick={handleTambahPeserta}>
          Masukkan Peserta
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : pesertaList.length === 0 ? (
        <div>Peserta tidak ditemukan</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Peserta</th>
              <th>Aktif</th>
              <th>Expired</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesertaList.map((peserta, index) => (
              <tr key={peserta.Id}>
                <td>{index + 1}</td>
                <td>{peserta.PesertaNama}</td>
                <td>
                  {peserta.Aktif ? (
                    <span className="badge bg-success">Aktif</span>
                  ) : (
                    <span className="badge bg-danger">Nonaktif</span>
                  )}
                </td>
                <td>{new Date(peserta.Expired).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(peserta.Id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(peserta.Id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PesertaBidang;
