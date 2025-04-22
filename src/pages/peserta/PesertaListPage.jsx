import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeserta } from '../../actions/pesertaActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import PesertaTable from '../../components/peserta/PesertaTable';
import { useNavigate } from 'react-router-dom';

const PesertaListPage = () => {
  const dispatch = useDispatch();
  const peserta = useSelector((state) => state.peserta.peserta);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataPeserta = async () => {
      const data = await fetchData('peserta');
      if (data) {
        dispatch(setPeserta(data));
      }
    };
    fetchDataPeserta();
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
        await deleteData('peserta', id);
        dispatch(setPeserta(peserta.filter((item) => item.peserta_id !== id)));
        Swal.fire('Terhapus!', 'Data peserta telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-success mb-3" onClick={() => navigate('/peserta/add')}>
        Tambah Peserta
      </button>
      <PesertaTable data={peserta} onEdit={(item) => navigate(`/peserta/edit/${item.peserta_id}`)} onDelete={handleDelete} />
    </div>
  );
};

export default PesertaListPage;
