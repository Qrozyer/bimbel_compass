import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSoal } from '../../actions/soalActions';  // Pastikan action setSoal ada
import { fetchData, deleteData } from '../../utils/api';
import SoalTable from '../../components/soal/SoalTable';  // Import komponen SoalTable
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SoalPage = () => {
  const { id } = useParams();  // Mengambil MateriId dari URL
  const [soal, setSoalData] = useState([]);  // State untuk daftar soal
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman soal

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        const data = await fetchData('soal');  // Fetch data soal
        if (data) {
          // Filter soal berdasarkan MateriId yang dipilih
          const filteredSoal = data.filter((item) => item.MateriId === parseInt(id));
          setSoalData(filteredSoal);
          dispatch(setSoal(filteredSoal));  // Menyimpan data soal ke Redux
        }
      } catch (error) {
        console.error('Error fetching data soal:', error);
      }
    };
    fetchDataSoal();
  }, [id, dispatch]);

  // Fungsi untuk menangani penghapusan soal
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
        await deleteData('soal', id);  
        dispatch(setSoal(soal.filter((item) => item.SoalId !== id)));  // Memperbarui state Redux
        Swal.fire('Terhapus!', 'Data soal telah dihapus.', 'success');
      }
    });
  };

  // Jika tidak ada soal untuk MateriId yang diberikan
  if (!soal.length) return (
    <div className="pt-4 mb-4 ml-3">
      <h1 className="ml-3 mb-3">Soal untuk Materi: {id}</h1>
      <button 
        className="btn btn-secondary mb-4 ml-3" 
        onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
      >
        Kembali
      </button>
      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/soal/add`)}>
        Tambah Soal
      </button>
    </div>
  );

  return (
    <div className="pt-4 mb-4 ml-4">
      <h1 className="ml-3 mb-3">Soal untuk Materi: {id}</h1>
      
      <button 
        className="btn btn-secondary mb-4 ml-3" 
        onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
      >
        Kembali
      </button>

      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/soal/add`)}>
        Tambah Soal
      </button>
      
      <SoalTable 
        data={soal} 
        onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SoalPage;
