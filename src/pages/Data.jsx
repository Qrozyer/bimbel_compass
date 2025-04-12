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

  const handleAddData = () => {
    Swal.fire({
      title: 'Tambah Mata Pelajaran',
      html: `
        <input id="swal-input-nama" class="swal2-input" placeholder="Nama Mapel" />
        <input id="swal-input-kategori" class="swal2-input" placeholder="Kategori" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nama = document.getElementById('swal-input-nama').value;
        const kategori = document.getElementById('swal-input-kategori').value;
  
        // Pastikan kedua field diisi
        if (!nama || !kategori) {
          toast.error('Semua field harus diisi!');
          return false; // Menghentikan form jika data tidak valid
        }
  
        return { nama, kategori }; // Mengembalikan data valid dari form
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { nama, kategori } = result.value; // Ambil data yang diinputkan
  
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }
  
        // Kirim data ke server menggunakan axios
        axios
          .post(
            'http://localhost:3000/mapel',
            { nama, kategori }, // Data yang akan ditambahkan
            {
              headers: {
                Authorization: `Bearer ${token}`, // Sertakan token di header
              },
            }
          )
          .then((response) => {
            toast.success(response.data.message || 'Data berhasil ditambahkan!');
            
            // Update state mapel dengan data yang baru ditambahkan
            const newMapel = { id: response.data.id, nama, kategori };
            setMapel((prevMapel) => [...prevMapel, newMapel]);
  
            // Menutup SweetAlert setelah berhasil
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: response.data.message || 'Data berhasil ditambahkan!',
            });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || 'Gagal menambah data!';
            toast.error(errorMessage);
          });
      }
    });
  };
  
  

  const handleEdit = (item) => {
    Swal.fire({
      title: 'Edit Mata Pelajaran',
      html: `
        <input id="swal-input-nama" class="swal2-input" placeholder="Nama Mapel" value="${item.nama}" />
        <input id="swal-input-kategori" class="swal2-input" placeholder="Kategori" value="${item.kategori}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nama = document.getElementById('swal-input-nama').value;
        const kategori = document.getElementById('swal-input-kategori').value;
  
        // Pastikan kedua field diisi
        if (!nama || !kategori) {
          toast.error('Semua field harus diisi!');
          return false;
        }
  
        return { id: item.id, nama, kategori }; // Mengembalikan data yang diedit
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { id, nama, kategori } = result.value; // Ambil data yang diedit
  
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }
  
        // Kirim data yang sudah diubah ke server menggunakan axios
        axios
          .put(
            `http://localhost:3000/mapel/${id}`,
            { nama, kategori }, // Data yang akan diperbarui
            {
              headers: {
                Authorization: `Bearer ${token}`, // Sertakan token di header
              },
            }
          )
          .then((response) => {
            toast.success(response.data.message || 'Data berhasil diperbarui!');
            
            // Update state mapel dengan data yang sudah diperbarui
            setMapel((prevMapel) =>
              prevMapel.map((item) =>
                item.id === id ? { ...item, nama, kategori } : item
              )
            );
  
            // Menutup SweetAlert setelah berhasil
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: response.data.message || 'Data berhasil diperbarui!',
            });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui data!';
            toast.error(errorMessage);
          });
      }
    });
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
        const token = sessionStorage.getItem('token'); // Ambil token dari sessionStorage
  
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }
  
        // Mengirim permintaan DELETE ke backend
        axios
          .delete(`http://localhost:3000/mapel/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token untuk otentikasi
            },
          })
          .then((response) => {
            // Ambil pesan dari response API
            const message = response.data.message || `Data dengan ID ${id} berhasil dihapus!`;
  
            // Menghapus data dari state setelah berhasil dihapus dari server
            setMapel(mapel.filter((item) => item.id !== id));
  
            // Menampilkan pesan sukses menggunakan Swal dan toast
            Swal.fire(message, '', 'success');
            toast.success(message); // Menampilkan toast dengan pesan dari API
          })
          .catch((error) => {
            // Ambil pesan dari response error API
            const errorMessage = error.response?.data?.message || 'Gagal menghapus data mapel!';
            console.error('Gagal menghapus data:', error);
            toast.error(errorMessage); // Menampilkan toast dengan pesan error dari API
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info('Data tidak jadi dihapus!');
      }
    });
  };
  

  return (
    <div className="content pt-3 px-4">
      <div className="container-fluid">
        <h3 className="mb-4">Data</h3>

        <button className="btn btn-success mb-3" onClick={handleAddData}>
          Tambah Data
        </button>


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
                      onClick={() => handleEdit(item)}
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
