import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Menambahkan useDispatch
import { setSubBidang } from '../../actions/subBidangActions';  // Pastikan action setSubBidang ada
import { fetchData, deleteData } from '../../utils/api';  // Fungsi untuk fetch data
import SubBidangDashboard from '../../components/dashboard/SubBidangDashboard';
import { useNavigate } from 'react-router-dom';  // Mengimpor useNavigate
import Swal from 'sweetalert2';

const SubBidangPage = () => {
  const { id } = useParams();  // Mengambil bidangId dari URL
  const [subBidang, setSubBidangData] = useState([]);  // State untuk daftar sub bidang
  const dispatch = useDispatch();  // Menggunakan dispatch untuk memperbarui state Redux
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman sub bidang

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      try {
        const data = await fetchData('sub-bidang');
        if (data) {
          const filteredSubBidang = data.filter((item) => item.BidangId === parseInt(id));
          setSubBidangData(filteredSubBidang);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataSubBidang();
  }, [id]);

  // Fungsi untuk menangani penghapusan sub bidang
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
        // Panggil delete API
        await deleteData('sub-bidang', id);  
        dispatch(setSubBidang(subBidang.filter((item) => item.SubId !== id)));  // Memperbarui state Redux
        Swal.fire('Terhapus!', 'Data sub bidang telah dihapus.', 'success');
      }
    });
  };

  if (!subBidang.length) return (

  <div className="pt-4 mb-4 ml-3">
    <h1 className="ml-3 mb-3">Sub Bidang untuk Bidang: {subBidang[0]?.BidangNama}</h1>
      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/sub-bidang/add`)}>
        Tambah Data Sub Bidang
      </button>
  </div>

  );

  return (
    <div className="pt-4 mb-4 ml-4">
      <h1 className="ml-3 mb-3">Sub Bidang untuk Bidang: {subBidang[0]?.BidangNama}</h1>
      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/sub-bidang/add`)}>
        Tambah Data Sub Bidang
      </button>
      <SubBidangDashboard 
        data={subBidang} 
        onEdit={(item) => navigate(`/sub-bidang/edit/${item.SubId}`)} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SubBidangPage;
