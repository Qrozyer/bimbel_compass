import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman sesuai dengan menu yang dipilih
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Dashboard</h1>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
        {/* Card Menu: Bidang */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/bidang-list')}
          >
            <div className="card-body">
              <i className="fas fa-briefcase fa-3x mb-3"></i>
              <h5 className="card-title">Bidang</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Sub Bidang */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/sub-bidang')}
          >
            <div className="card-body">
              <i className="fas fa-sitemap fa-3x mb-3"></i>
              <h5 className="card-title">Sub Bidang</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Materi */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/materi')}
          >
            <div className="card-body">
              <i className="fas fa-book fa-3x mb-3"></i>
              <h5 className="card-title">Materi</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Soal */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/soal')}
          >
            <div className="card-body">
              <i className="fas fa-question-circle fa-3x mb-3"></i>
              <h5 className="card-title">Soal</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Peserta */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/peserta')}
          >
            <div className="card-body">
              <i className="fas fa-users fa-3x mb-3"></i>
              <h5 className="card-title">Peserta</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Buat Soal */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/buat-soal')}
          >
            <div className="card-body">
              <i className="fas fa-pen fa-3x mb-3"></i>
              <h5 className="card-title">Buat Soal</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Sesi Ujian */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/sesi-ujian')}
          >
            <div className="card-body">
              <i className="fas fa-chalkboard-teacher fa-3x mb-3"></i>
              <h5 className="card-title">Sesi Ujian</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Hasil Ujian */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/ujian')}
          >
            <div className="card-body">
              <i className="fas fa-poll fa-3x mb-3"></i>
              <h5 className="card-title">Hasil Ujian</h5>
            </div>
          </div>
        </div>

        {/* Card Menu: Masukkan Peserta */}
        <div className="col">
          <div
            className="card text-center h-100 menu-card"
            onClick={() => navigateTo('/peserta-bidang')}
          >
            <div className="card-body">
              <h5 className="card-title">Tentukan Bidang Peserta</h5>
              <i className="fas fa-user-plus fa-3x mb-3"></i>
            </div>
          </div>
        </div>

        <div className="col">
  <div
    className="card text-center h-100 menu-card"
    onClick={() => navigateTo('/asal-peserta')}
  >
    <div className="card-body">
      <i className="fas fa-school fa-3x mb-3"></i>
      <h5 className="card-title">Asal Peserta</h5>
    </div>
  </div>
</div>

{/* Card Menu: Periode Peserta */}
<div className="col">
  <div
    className="card text-center h-100 menu-card"
    onClick={() => navigateTo('/periode')}
  >
    <div className="card-body">
      <i className="fas fa-calendar-alt fa-3x mb-3"></i>
      <h5 className="card-title">Periode Peserta</h5>
    </div>
  </div>
</div>
      </div>

      {/* Menambahkan tag <style> untuk CSS */}
      <style jsx>{`
        /* Styling untuk card menu */
        .menu-card {
          cursor: pointer; /* Menambahkan pointer agar kursor berubah saat hover */
          transition: transform 0.3s ease, box-shadow 0.3s ease; /* Menambahkan transisi */
        }

        /* Efek hover pada card */
        .menu-card:hover {
          transform: scale(1.05); /* Memberikan efek memperbesar card saat hover */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Menambahkan bayangan saat hover */
        }

        /* Styling untuk icon */
        .card i {
          color: #007bff; /* Warna biru untuk ikon */
        }

        /* Menambahkan margin pada card title */
        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
