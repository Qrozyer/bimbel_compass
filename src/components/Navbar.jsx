import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  // Fungsi logout
  const handleLogout = async () => {
    try {

      // Menghapus token di sessionStorage
      sessionStorage.removeItem('token');
      
      // Arahkan ke halaman login setelah logout
      navigate('/login');

      toast.success('Berhasil logout');
    } catch (error) {
      console.error('Error logout:', error);
      toast.error('Gagal logout');
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center' }}>
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">Home</a>
        </li>
      </ul>
      
      {/* Tombol Logout Pindah ke Paling Kanan */}
      <ul className="navbar-nav ml-auto mr-3" style={{ display: 'flex', alignItems: 'center' }}>
        <li className="nav-item">
          <button 
            className="btn btn-danger" 
            style={{ borderRadius: '5px' }}
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
