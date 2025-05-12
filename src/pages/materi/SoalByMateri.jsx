import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SoalTable from '../../components/soal/SoalTable';
import { fetchData, deleteData } from '../../utils/api';
import Swal from 'sweetalert2';

const SoalByMateri = () => {
  const { materiId } = useParams();
  const [soal, setSoal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoal = async () => {
      const result = await fetchData(`soal/filter/${materiId}`);
      if (result) {
        setSoal(result);
      }
    };
    fetchSoal();
  }, [materiId]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Hapus soal?',
      text: 'Soal yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('soal', id);
        setSoal(soal.filter((item) => item.SoalId !== id));
        Swal.fire('Terhapus!', 'Soal berhasil dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary mr-2" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/soal/add/${materiId}`)}
        >
          Tambah Soal
        </button>
      </div>
      <SoalTable
        data={soal}
        onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SoalByMateri;
