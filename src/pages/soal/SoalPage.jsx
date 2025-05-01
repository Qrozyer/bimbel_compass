import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSoal } from '../../actions/soalActions';
import { fetchData, deleteData } from '../../utils/api';
import SoalTable from '../../components/soal/SoalTable';
import Swal from 'sweetalert2';

const SoalPage = () => {
  const { id } = useParams();
  const [soal, setSoalData] = useState([]);
  const [materiJudul, setMateriJudul] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        // 1. Ambil data relasi soal untuk materi tertentu
        const relasi = await fetchData(`materi/soal/${id}`);
        const soalIds = relasi.map(item => item.SoalId); // Ambil hanya ID soal
    
        // 2. Ambil semua soal (berisi data lengkap)
        const semuaSoal = await fetchData('soal');
    
        // 3. Filter soal berdasarkan ID dari relasi
        const filteredSoal = semuaSoal.filter(item => soalIds.includes(item.SoalId));
    
        setSoalData(filteredSoal);
        dispatch(setSoal(filteredSoal));
      } catch (error) {
        console.error('Error fetching soal:', error);
      }
    };

    const fetchMateri = async () => {
      try {
        const materi = await fetchData(`materi/pilih/${id}`);
        if (materi) {
          setMateriJudul(materi.MateriJudul);
        }
      } catch (error) {
        console.error('Error fetching materi:', error);
      }
    };

    fetchDataSoal();
    fetchMateri();
  }, [id, dispatch]);

  const handleDelete = async (idSoal) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('soal', idSoal);
        dispatch(setSoal(soal.filter((item) => item.SoalId !== idSoal)));
        Swal.fire('Terhapus!', 'Data soal telah dihapus.', 'success');
      }
    });
  };

  if (!soal.length) return (
    <div className="pt-4 mb-4 ml-3">
      <h1 className="ml-3 mb-3">Soal untuk Materi: {materiJudul || id}</h1>
      <button className="btn btn-secondary mb-4 ml-3" onClick={() => navigate(-1)}>Kembali</button>
      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/soal/add`)}>Tambah Soal</button>
    </div>
  );

  return (
    <div className="pt-4 mb-4 ml-4">
      <h1 className="ml-3 mb-3">Soal untuk Materi: {materiJudul || id}</h1>

      <button className="btn btn-secondary mb-4 ml-3" onClick={() => navigate(-1)}>Kembali</button>
      <button className="btn btn-success mb-4 ml-3" onClick={() => navigate(`/soal-materi/add/${id}`)}>Masukkan Soal Untuk Materi</button>

      <SoalTable 
        data={soal}
        onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SoalPage;
