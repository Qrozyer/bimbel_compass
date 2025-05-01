import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import BidangTableDashboard from '../../components/dashboard/BidangTableDashboard';
import { useNavigate } from 'react-router-dom'; 

const BidangPage = () => {
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


  // Jika data kosong, tampilkan keterangan dan tombol kembali
  if (!bidang.length) {
    return (
      <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
        <h3 className="text-center">Data Bidang Tidak Tersedia</h3>
        <button className="btn btn-secondary mb-4 ml-3" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <button className="btn btn-secondary mb-4 ml-3" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <button className="btn btn-primary mb-4 ml-3" onClick={() => navigate('/soal/add')}>
        Buat Soal Baru
      </button>
      <h3 className="ml-4 mb-4">Tambah Soal Berdasarkan Materi</h3>
      <h5 className="ml-4 mb-4 text-secondary">Pilih Bidang</h5>
      <BidangTableDashboard 
        data={bidang}         
      />
    </div>
  );
};

export default BidangPage;
