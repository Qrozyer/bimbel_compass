import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSoal } from '../../actions/soalActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import SoalTable from '../../components/soal/SoalTable';
import { useNavigate } from 'react-router-dom'; 

const SoalListPage = () => {
  const dispatch = useDispatch();
  const soal = useSelector((state) => state.soal.soal);
  const navigate = useNavigate(); // Ganti useHistory() dengan useNavigate()

  useEffect(() => {
    const fetchDataSoal = async () => {
      const data = await fetchData('soal'); // Tambahkan endpoint 'soal'
      if (data) {
        dispatch(setSoal(data));
      }
    };
    fetchDataSoal();
  }, [dispatch]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('soal', id); // Ganti deletesoalApi dengan deleteData dan endpoint 'soal'
        dispatch(setSoal(soal.filter((item) => item.SoalId !== id)));
        Swal.fire('Terhapus!', 'Data soal telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-success mb-3" onClick={() => navigate('/soal/add')}>
        Tambah Data soal
      </button>
      <SoalTable data={soal} onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)} onDelete={handleDelete} />
    </div>
  );
};

export default SoalListPage;