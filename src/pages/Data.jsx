// src/pages/Data.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Data = () => {
    const [data, setData] = useState([
        { id: 1, nama: 'Matematika', kategori: 'UTBK Saintek' },
        { id: 2, nama: 'Sejarah', kategori: 'UTBK Soshum' },
        { id: 3, nama: 'Bahasa Inggris', kategori: 'UTBK Campuran' },
      ]);
    
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Menghapus data berdasarkan id yang diberikan.
   * @param {number} id - ID data yang ingin dihapus.
   * @returns {void}
   */
/*******  1d4dfb4e-fbf7-4dd5-86f5-cb7110f76f2e  *******/const handleDelete = (id) => {
        const item = data.find((item) => item.id === id);
    
        Swal.fire({
          title: `Yakin hapus "${item.nama}"?`,
          text: 'Data yang dihapus tidak bisa dikembalikan!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            const filtered = data.filter((d) => d.id !== id);
            setData(filtered);
            toast.success(`"${item.nama}" berhasil dihapus!`);
          }
        });
      };
    
      const handleEdit = (id) => {
        const item = data.find((item) => item.id === id);
        // Simulasi perubahan nama
        const updated = data.map((d) =>
          d.id === id ? { ...d, nama: d.nama + ' (edited)' } : d
        );
        setData(updated);
        toast.info(`"${item.nama}" berhasil diedit!`);
      };
    
      return (
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <h1>Blank Page</h1>
            </div>
          </section>
    
          <section className="content">
            <div className="container-fluid">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Nama Mapel</th>
                    <th>Kategori</th>
                    <th style={{ width: '150px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>{item.kategori}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning mr-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fas fa-trash"></i> Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      );
    };

export default Data;
