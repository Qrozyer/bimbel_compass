import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/api';  // Pastikan untuk mengimpor deleteData

const SesiUjianPeserta = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [peserta, setPeserta] = useState([]);

  useEffect(() => {
    const fetchPeserta = async () => {
      const result = await fetchData(`ujian/peserta/${sectionId}`);
      if (result) {
        setPeserta(result);
      }
    };

    fetchPeserta();
  }, [sectionId]);

  const handleTambahPeserta = () => {
    navigate(`/peserta/section/add/${sectionId}`);
  };

  const handleDeletePeserta = async (pesertaId) => {
    // Tampilkan konfirmasi sebelum delete
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Peserta ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteData('ujian/peserta', pesertaId);
        if (response) {
          // Menghapus peserta dari state setelah sukses
          setPeserta(peserta.filter((item) => item.Id !== pesertaId));
          Swal.fire('Dihapus!', 'Peserta telah dihapus.', 'success');
        } else {
          Swal.fire('Gagal!', 'Gagal menghapus peserta.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus peserta.', 'error');
      }
    }
  };

  if (!peserta.length) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px' }}>
        <h4>Peserta ujian tidak ditemukan.</h4>
        <button className="btn btn-primary me-2" onClick={handleTambahPeserta}>
          Masukkan Peserta
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h3 className="mb-3">Peserta Ujian - Section {peserta[0].SectionNama}</h3>
      <button className="btn btn-primary mb-3 me-2" onClick={handleTambahPeserta}>
        Masukkan Peserta
      </button>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Kembali
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Nama Peserta</th>
              <th>Nama Sesi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {peserta.map((item, index) => (
              <tr key={item.Id}>
                <td>{index + 1}</td>
                <td>{item.PesertaNama}</td>
                <td>{item.SectionNama}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePeserta(item.Id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SesiUjianPeserta;
