import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; 
import BidangPesertaTable from '../../components/bidang/BidangPesertaTable';
import { useNavigate } from 'react-router-dom'; 

const BidangPeserta = () => {
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
      <BidangPesertaTable
        data={bidang}         
      />
    </div>
  );
};

export default BidangPeserta;
