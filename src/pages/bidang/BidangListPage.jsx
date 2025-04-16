import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import BidangTable from '../../components/bidang/BidangTable';
import { useNavigate } from 'react-router-dom'; 

const BidangListPage = () => {
  const dispatch = useDispatch();
  const bidang = useSelector((state) => state.bidang.bidang);
  const navigate = useNavigate(); // Ganti useHistory() dengan useNavigate()

  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang'); // Tambahkan endpoint 'bidang'
      if (data) {
        dispatch(setBidang(data));
      }
    };
    fetchDataBidang();
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
        await deleteData('bidang', id); // Ganti deleteBidangApi dengan deleteData dan endpoint 'bidang'
        dispatch(setBidang(bidang.filter((item) => item.BidangId !== id)));
        Swal.fire('Terhapus!', 'Data bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-success mb-3" onClick={() => navigate('/bidang/add')}>
        Tambah Data Bidang
      </button>
      <BidangTable data={bidang} onEdit={(item) => navigate(`/bidang/edit/${item.BidangId}`)} onDelete={handleDelete} />
    </div>
  );
};

export default BidangListPage;