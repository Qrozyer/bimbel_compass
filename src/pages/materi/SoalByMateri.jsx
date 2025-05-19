import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSoal } from '../../actions/soalActions'; // pastikan ada action ini di redux kamu
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import SoalTable from '../../components/soal/SoalTable';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

const SoalByMateri = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materiId } = useParams();

  const soal = useSelector((state) => state.soal.soal); // pastikan di redux ada state soal.soal
  const [materiJudul, setMateriJudul] = useState('');

  const breadcrumbPaths = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Bidang', to: '/bidang-list' },
    { label: 'Sub Bidang', to: '#' }, // Bisa kamu ubah kalau punya data sub bidang
    { label: 'Materi', to: `/materi/by-sub-bidang/${materiId}` }, // atau sesuaikan url materi
    { label: 'Soal', to: `/soal/by-materi/${materiId}` },
  ];

  useEffect(() => {
    const fetchSoalByMateri = async () => {
      const data = await fetchData(`soal/filter/${materiId}`);
      if (data) {
        dispatch(setSoal(data));
      }
    };

    const fetchMateriInfo = async () => {
      const data = await fetchData(`materi/pilih/${materiId}`);
      if (data?.MateriJudul) {
        setMateriJudul(data.MateriJudul);
      }
    };

    fetchSoalByMateri();
    fetchMateriInfo();
  }, [dispatch, materiId]);

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
        await deleteData('soal', id);
        dispatch(setSoal(soal.filter((item) => item.SoalId !== id)));
        Swal.fire('Terhapus!', 'Data soal telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="container pt-5" style={{ margin: '20px auto', maxWidth: '1000px' }}>
      <BreadcrumbNavigation paths={breadcrumbPaths} />

      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/soal-materi/add/${materiId}`)}
        >
          + Tambah Data Soal
        </button>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-header bg-dark text-white rounded-top-4">
          <h5 className="mb-0">Soal dari Materi: {materiJudul || 'Memuat...'}</h5>
        </div>
        <div className="card-body">
          <SoalTable
            data={soal}
            onEdit={(item) => navigate(`/soal/edit/${item.SoalId}`)}
            onDelete={handleDelete}
            // Tambahkan props onDetail/onSoal jika ada fitur lain
          />
        </div>
      </div>
    </div>
  );
};

export default SoalByMateri;
