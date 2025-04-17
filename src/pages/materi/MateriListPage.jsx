import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMateri } from '../../actions/materiActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import MateriTable from '../../components/materi/MateriTable';
import { useNavigate } from 'react-router-dom'; 

const MateriListPage = () => {
  const dispatch = useDispatch();
  const materi = useSelector((state) => state.materi.materi);
  const navigate = useNavigate(); // Ganti useHistory() dengan useNavigate()

  useEffect(() => {
    const fetchDataMateri = async () => {
      const data = await fetchData('materi'); // Tambahkan endpoint 'materi'
      if (data) {
        dispatch(setMateri(data));
      }
    };
    fetchDataMateri();
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
        await deleteData('materi', id); // Ganti deletemateriApi dengan deleteData dan endpoint 'materi'
        dispatch(setMateri(materi.filter((item) => item.MateriId !== id)));
        Swal.fire('Terhapus!', 'Data materi telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-success mb-3" onClick={() => navigate('/materi/add')}>
        Tambah Data materi
      </button>
      <MateriTable data={materi} onEdit={(item) => navigate(`/materi/edit/${item.MateriId}`)} onDelete={handleDelete} />
    </div>
  );
};

export default MateriListPage;