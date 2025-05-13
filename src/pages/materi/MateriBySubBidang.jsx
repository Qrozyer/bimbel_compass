import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMateri } from '../../actions/materiActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import MateriTable from '../../components/materi/MateriTable';
import { useNavigate, useParams } from 'react-router-dom';
import HierarkiNavigation from '../../components/HierarkiNavigation';

const MateriBySubBidang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subId } = useParams(); // Ambil subId dari URL
  const materi = useSelector((state) => state.materi.materi);

  useEffect(() => {
    const fetchFilteredMateri = async () => {
      const data = await fetchData(`materi/filter/${subId}`);
      if (data) {
        dispatch(setMateri(data));
      }
    };
    fetchFilteredMateri();
  }, [dispatch, subId]);

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
        await deleteData('materi', id);
        dispatch(setMateri(materi.filter((item) => item.MateriId !== id)));
        Swal.fire('Terhapus!', 'Data materi telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px' }}>
      <HierarkiNavigation current="materi" subId={subId} />
  
      <div style={{ flex: 1 }}>
        <button className="btn btn-secondary mb-3 me-2" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate(`/materi/add/${subId}`)}
        >
          Tambah Data Materi
        </button>
  
        <MateriTable
          data={materi}
          onEdit={(item) => navigate(`/materi/edit/${item.MateriId}`)}
          onDelete={handleDelete}
          onDetail={(item) => navigate(`/materi/detail/${item.MateriId}`)}
          onSoal={(item) => navigate(`/soal/by-materi/${item.MateriId}`)}
        />
      </div>
    </div>
  );
  
};

export default MateriBySubBidang;
