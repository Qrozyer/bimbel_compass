import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bidang = () => {
  const [bidang, setBidang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBidang = async () => {
      try {
        // Ambil token dari sessionStorage
        const token = sessionStorage.getItem('adminToken');
        
        // Pastikan token ada
        if (!token) {
          toast.error('Anda harus login terlebih dahulu!');
          return;
        }

        // Request data bidang dengan menggunakan token di header Authorization
        const response = await axios.get('http://202.10.35.175:8080/bidang', {
          headers: {
            Authorization: `Bearer ${token}`  // Menambahkan token pada header
          }
        });

        setBidang(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Gagal mengambil data bidang!');
      } finally {
        setLoading(false);
      }
    };

    fetchBidang();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Daftar Bidang</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Bidang</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {bidang.map((item, index) => (
              <tr key={item.BidangId}>
                <td>{index + 1}</td>
                <td>{item.BidangNama}</td>
                <td>{item.BidangKeterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bidang;
//               