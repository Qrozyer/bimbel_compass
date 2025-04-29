import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api'; // Sesuaikan dengan path API Anda

const PesertaDetailPage = () => {
  const { id } = useParams(); // Mengambil id dari URL
  const [peserta, setPeserta] = useState(null);
  const navigate = useNavigate();

  // Mengambil data peserta berdasarkan id
  useEffect(() => {
    const fetchPesertaDetail = async () => {
      const data = await fetchData(`peserta/pilih/${id}`);
      if (data) {
        setPeserta(data); // Asumsi API mengembalikan data dalam bentuk array
      }
    };
    fetchPesertaDetail();
  }, [id]);

  const handleDelete = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data peserta ini akan dihapus dan tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('peserta', id);
        Swal.fire('Terhapus!', 'Data peserta telah dihapus.', 'success');
        navigate('/peserta'); // Kembali ke halaman daftar peserta setelah penghapusan
      }
    });
  };

  const handleEdit = () => {
    navigate(`/peserta/edit/${id}`); // Arahkan ke halaman edit
  };

  if (!peserta) {
    return <div>Loading...</div>; // Tampilkan loading jika data belum diambil
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px' }}>
      <h3>Detail Peserta</h3>
      <div className="card">
        <div className="card-body">
          <table className="table table-borderless" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '15%' }}><strong>Nama Peserta:</strong></td>
                <td>{peserta.PesertaNama}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Email:</strong></td>
                <td>{peserta.PesertaEmail}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Jenis Kelamin:</strong></td>
                <td>{peserta.PesertaJk === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Alamat:</strong></td>
                <td>{peserta.PesertaAlamat}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>No HP:</strong></td>
                <td>{peserta.PesertaNohp}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Pendidikan Terakhir:</strong></td>
                <td>{peserta.PesertaPendidikanTerakhir}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Asal Sekolah:</strong></td>
                <td>{peserta.PesertaAsalSekolah}</td>
              </tr>
              <tr>
                <td style={{ width: '15%' }}><strong>Periode:</strong></td>
                <td>{peserta.PesertaPeriode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>Hapus</button>
          <button className="btn btn-secondary" onClick={() => navigate('/peserta')} style={{ marginLeft: '10px' }}>Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default PesertaDetailPage;
