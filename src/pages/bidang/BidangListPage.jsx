import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import BidangTable from '../../components/bidang/BidangTable';
import { useNavigate } from 'react-router-dom'; 
import HierarkiNavigation from '../../components/HierarkiNavigation';

const BidangListPage = () => {
  const dispatch = useDispatch();
  const bidang = useSelector((state) => state.bidang.bidang);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataBidang = async () => {
      const data = await fetchData('bidang');
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
        await deleteData('bidang', id);
        dispatch(setBidang(bidang.filter((item) => item.BidangId !== id)));
        Swal.fire('Terhapus!', 'Data bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <HierarkiNavigation current="bidang"/>
      <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
     <div className="d-flex justify-content-start gap-2 mb-3">
  <button className="btn btn-secondary" onClick={() => navigate(-1)}>
    ← Kembali
  </button>
  <button className="btn btn-success" onClick={() => navigate('/bidang/add')}>
    Tambah Data Bidang
  </button>
</div>

      <BidangTable
        data={bidang}
        onEdit={(item) => navigate(`/bidang/edit/${item.BidangId}`)}
        onDelete={handleDelete}
        onDetail={(item) => navigate(`/sub-bidang/by-bidang/${item.BidangId}`)}
      />
    </div>
    </div>
  );
};

export default BidangListPage;
