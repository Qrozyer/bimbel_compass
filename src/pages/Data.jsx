import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';

const Data = () => {
  const [mapel, setMapel] = useState([]);

  // Ambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    fetchMapel();
  }, []);

  const fetchMapel = async () => {
    try {
      const token = sessionStorage.getItem('token');
  
      const response = await axios.get('http://localhost:3000/mapel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMapel(response.data);
    } catch (error) {
      console.error('Gagal fetch data:', error.response ? error.response.data : error.message);
      toast.error('Gagal mengambil data mapel! Pastikan token valid.');
    }
  };
  

  const handleEdit = (id) => {
    // Logika edit dummy
    toast.success(`Data dengan ID ${id} berhasil diedit!`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      iconColor: '#dc3545',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulasi hapus
        // Hapus data dari state
        setMapel(mapel.filter((item) => item.id !== id));
        Swal.fire("Data berhasil dihapus!", "", "success");
        toast.success(`Data dengan ID ${id} berhasil dihapus!`);
        // Hapus data dari server

      //   axios
      //     .delete(`http://localhost:3000/mapel/${id}`)
      //     .then(() => {
      //       Swal.fire("Data berhasil dihapus!", "", "success");
      //       toast.success(`Data dengan ID ${id} berhasil dihapus!`);
      //       setMapel(mapel.filter((item) => item.id !== id));
      //     })
      //     .catch((error) => {
      //       console.error('Gagal menghapus data:', error);
      //       toast.error('Gagal menghapus data mapel!');
      //     });
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   toast.info('Data tidak jadi dihapus!');
      }
    });
  };

  return (
    <div className="content pt-3 px-4">
      <div className="container-fluid">
        <h3 className="mb-4">Data</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>No</th>
                <th>Nama Mapel</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mapel.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.kategori}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fas fa-trash"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {mapel.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    Data tidak tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Data;
