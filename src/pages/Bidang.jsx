import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;

const Bidang = () => {
  const [bidang, setBidang] = useState([]);

  // Ambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    fetchBidang();
  }, []);

  const fetchBidang = async () => {
    try {
      const token = sessionStorage.getItem('token');
  
      const response = await axios.get(`${baseURL}/bidang`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setBidang(response.data);
    } catch (error) {
      console.error('Gagal fetch data:', error.response ? error.response.data : error.message);
      toast.error('Gagal mengambil data bidang! Pastikan token valid.');
    }
  };

  const handleAddData = () => {
    Swal.fire({
      title: 'Tambah Mata Pelajaran',
      html: `
        <input id="swal-input-BidangNama" class="swal2-input" placeholder="Nama Bidang" />
        <input id="swal-input-BidangKeterangan" class="swal2-input" placeholder="Keterangan" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const BidangNama = document.getElementById('swal-input-BidangNama').value;
        const BidangKeterangan = document.getElementById('swal-input-BidangKeterangan').value;
  
        // Pastikan kedua field diisi
        if (!BidangNama || !BidangKeterangan) {
          toast.error('Semua field harus diisi!');
          return false; // Menghentikan form jika data tidak valid
        }
  
        return { BidangNama, BidangKeterangan }; // Mengembalikan data valid dari form
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { BidangNama, BidangKeterangan } = result.value; // Ambil data yang diinputkan
  
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }
  
        // Kirim data ke server menggunakan axios
        axios
          .post(
            `${baseURL}/bidang`,
            { BidangNama, BidangKeterangan }, // Data yang akan ditambahkan
            {
              headers: {
                Authorization: `Bearer ${token}`, // Sertakan token di header
              },
            }
          )
          .then((response) => {
            toast.success(response.data.message || 'Data berhasil ditambahkan!');
            
            // Update state Bidang dengan data yang baru ditambahkan
            const newBidang = { id: response.data.id, BidangNama, BidangKeterangan };
            setBidang((prevBidang) => [...prevBidang, newBidang]);
  
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
        <input id="swal-input-BidangNama" class="swal2-input" placeholder="Nama Bidang" value="${item.BidangNama}" />
        <input id="swal-input-BidangKeterangan" class="swal2-input" placeholder="Keterangan" value="${item.BidangKeterangan}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const BidangNama = document.getElementById('swal-input-BidangNama').value;
        const BidangKeterangan = document.getElementById('swal-input-BidangKeterangan').value;
  
        // Pastikan kedua field diisi
        if (!BidangNama || !BidangKeterangan) {
          toast.error('Semua field harus diisi!');
          return false;
        }
  
        return { BidangId: item.BidangId, BidangNama, BidangKeterangan }; // Mengembalikan data yang diedit
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { BidangId, BidangNama, BidangKeterangan } = result.value; // Ambil data yang diedit
  
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }
  
        // Kirim data yang sudah diubah ke server menggunakan axios
        axios
          .put(
            `${baseURL}/bidang/${BidangId}`,
            { BidangNama, BidangKeterangan }, // Data yang akan diperbarui
            {
              headers: {
                Authorization: `Bearer ${token}`, // Sertakan token di header
              },
            }
          )
          .then((response) => {
            toast.success(response.data.message || 'Data berhasil diperbarui!');
            
            // Update state Bidang dengan data yang sudah diperbarui
            setBidang((prevBidang) =>
              prevBidang.map((item) =>
                item.BidangId === BidangId ? { ...item, BidangNama, BidangKeterangan } : item
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
  

  const handleDelete = (BidangId) => {
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
          .delete(`${baseURL}/bidang/${BidangId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token untuk otentikasi
            },
          })
          .then((response) => {
            // Ambil pesan dari response API
            const message = response.data.message || `Data dengan ID ${BidangId} berhasil dihapus!`;
  
            // Menghapus data dari state setelah berhasil dihapus dari server
            setBidang(bidang.filter((item) => item.BidangId !== BidangId));
  
            // Menampilkan pesan sukses menggunakan Swal dan toast
            Swal.fire(message, '', 'success');
            toast.success(message); // Menampilkan toast dengan pesan dari API
          })
          .catch((error) => {
            // Ambil pesan dari response error API
            const errorMessage = error.response?.data?.message || 'Gagal menghapus data Bidang!';
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
        <h3 className="mb-4">Daftar Bidang</h3>

        <button className="btn btn-success mb-3" onClick={handleAddData}>
          Tambah Data Bidang
        </button>


        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>No</th>
                <th>Nama Bidang</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bidang.map((item, index) => (
                <tr key={item.BidangId}>
                  <td>{index + 1}</td>
                  <td>{item.BidangNama}</td>
                  <td>{item.BidangKeterangan}</td>
                  <td>
                    <button   
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.BidangId)}
                    >
                      <i className="fas fa-trash"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {bidang.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    List Bidang tidak tersedia.
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

export default Bidang;
