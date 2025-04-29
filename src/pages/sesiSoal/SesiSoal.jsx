import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams untuk mengambil SectionId dari URL
import { fetchData } from '../../utils/api'; // Import fetchData untuk mengambil data soal
import SoalTable from '../../components/soal/SoalTable'; // Komponen tabel untuk menampilkan soal
import Swal from 'sweetalert2'; // Import SweetAlert untuk konfirmasi penghapusan

const SesiSoal = () => {
  const { sectionId } = useParams(); // Ambil SectionId dari URL parameter
  const navigate = useNavigate(); // Untuk navigasi ke halaman buat soal
  const [soalList, setSoalList] = useState([]); // Daftar soal yang akan ditampilkan

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const data = await fetchData(`soal/list/${sectionId}`); // Ambil data soal berdasarkan SectionId
        setSoalList(data); // Set soal yang diterima ke state soalList
      } catch (error) {
        console.error('Error fetching soal list:', error);
      }
    };

    fetchSoal(); // Panggil fungsi untuk mengambil soal berdasarkan SectionId
  }, [sectionId]); // Akan dipanggil setiap kali sectionId berubah

  const handleAddSoal = () => {
    // Navigasi ke halaman buat soal untuk SectionId tertentu
    navigate(`/soal-list/${sectionId}`);
  };

  const handleDelete = async (Id) => {
    // Menampilkan konfirmasi penghapusan
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus soal ini?',
      text: "Data soal yang dihapus tidak dapat dikembalikan.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        // Menghapus soal dari API
        await fetchData(`soal/list/${Id}`, 'DELETE'); // Endpoint DELETE untuk menghapus soal
        // Setelah berhasil menghapus, perbarui daftar soal
        setSoalList(prevSoalList => prevSoalList.filter(soal => soal.Id !== Id));
        Swal.fire('Soal dihapus!', 'Soal telah berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting soal:', error);
        Swal.fire('Gagal menghapus soal', 'Terjadi kesalahan saat menghapus soal.', 'error');
      }
    }
  };

  return (
    <div className='container p-4'>
      <h3 className='mb-3'>Soal untuk Sesi {sectionId}</h3>

      {/* Tombol untuk menambah soal */}
      <button 
        className="btn btn-primary mb-2 ml-3" 
        onClick={handleAddSoal}
      >
        Masukkan Soal
      </button>

      <div style={{padding: '15px', maxWidth: '100%' }}>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Pertanyaan</th>
            <th>Jawaban A</th>
            <th>Jawaban B</th>
            <th>Jawaban C</th>
            <th>Jawaban D</th>
            <th>Jawaban E</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {soalList.map((soal, index) => (
            <tr key={soal.SoalId}>
              <td>{index + 1}</td>
              <td>{soal.Pertanyaan}</td>
              <td>{soal.JawabA}</td>
              <td>{soal.JawabB}</td>
              <td>{soal.JawabC}</td>
              <td>{soal.JawabD}</td>
              <td>{soal.JawabE}</td>
              <td>{soal.Point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SesiSoal;
