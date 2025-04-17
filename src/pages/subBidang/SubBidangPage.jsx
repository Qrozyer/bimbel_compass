import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Menambahkan useDispatch
import { setSubBidang } from '../../actions/subBidangActions';  // Pastikan action setSubBidang ada
import { fetchData, deleteData } from '../../utils/api';  // Fungsi untuk fetch data
import Swal from 'sweetalert2';

const SubBidangPage = () => {
  const { id } = useParams();  // Mengambil bidangId dari URL
  const [subBidang, setSubBidangData] = useState([]);  // State untuk daftar sub bidang
  const dispatch = useDispatch();  // Menggunakan dispatch untuk memperbarui state Redux

  useEffect(() => {
    const fetchDataSubBidang = async () => {
      const data = await fetchData('sub-bidang');  // Ambil data sub bidang
      if (data) {
        // Filter sub bidang berdasarkan BidangId
        const filteredSubBidang = data.filter((item) => item.BidangId === parseInt(id));
        setSubBidangData(filteredSubBidang);  // Menyimpan data sub bidang di state lokal
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

  if (!subBidang.length) return <div>Loading...</div>;  // Menampilkan loading jika data belum ada

  return (
    <div>
      <h1>Sub Bidang untuk Bidang ID: {id}</h1>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {subBidang.map((item) => (
          <div 
            key={item.SubId}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              width: '250px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            <div>
              <strong>{item.SubNama}</strong>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.SubKeterangan }}></div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button 
                onClick={() => console.log("Edit sub bidang ID:", item.SubId)}  // Tambahkan logika Edit sesuai kebutuhan
                style={{
                  backgroundColor: '#FFC107', 
                  color: '#00000', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-edit mr-1"></i>
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item.SubId)}  // Menjalankan handleDelete
                style={{
                  backgroundColor: '#F44336', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-trash-alt mr-1"></i>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubBidangPage;
