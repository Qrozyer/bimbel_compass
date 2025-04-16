import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import SubBidangTable from '../../components/subBidang/SubBidangTable';
import { useNavigate } from 'react-router-dom'; 

const SubBidangListPage = () => {
  const dispatch = useDispatch();
  const subBidang = useSelector((state) => state.subBidang.subBidang);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      const data = await fetchData('sub-bidang'); // Tambahkan endpoint 'bidang'
      if (data) {
        dispatch(setSubBidang(data));
      }
    };
    fetchDataSubBidang();
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
        await deleteData('sub-bidang', id); 
        dispatch(setSubBidang(subBidang.filter((item) => item.SubId !== id)));
        Swal.fire('Terhapus!', 'Data bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-success mb-3" onClick={() => navigate('/sub-bidang/add')}>
        Tambah Data Sub Bidang
      </button>
      <SubBidangTable data={subBidang} onEdit={(item) => navigate(`/sub-bidang/edit/${item.SubId}`)} onDelete={handleDelete} />
    </div>
  );
};

export default SubBidangListPage;