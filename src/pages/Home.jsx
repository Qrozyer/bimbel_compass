import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();  // Menggunakan useNavigate untuk navigasi

  // Fungsi untuk mengarahkan ke halaman lain saat tombol diklik
  const handleGetStarted = () => {
    navigate('/dashboard'); // Mengarahkan ke halaman "Get Started"
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary text-white text-center">
      <div className="bg-dark p-4 rounded shadow-lg">
        <h1 className="display-4 mb-3">Selamat Datang</h1>
        <h2 className="mb-4">di Aplikasi Kami</h2>
        <p className="text-muted mb-4">
          Temukan berbagai kemudahan dalam mengelola aplikasi ini. Jelajahi fitur-fitur yang kami tawarkan dan nikmati pengalaman baru!
        </p>
        <button onClick={handleGetStarted} className="btn btn-success btn-lg">
          Mulai
        </button>
      </div>
    </div>
  );
};

export default Home;
