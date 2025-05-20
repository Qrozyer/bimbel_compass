import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">Bimbel ByPASS</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Dashboard */}
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {/* Bidang */}
            <li className="nav-item">
              <Link to="/bidang-list" className="nav-link">
                <i className="nav-icon fas fa-briefcase"></i>
                <p>Bidang</p>
              </Link>
            </li>

            {/* Sub Bidang */}
            <li className="nav-item">
              <Link to="/sub-bidang" className="nav-link">
                <i className="nav-icon fas fa-sitemap"></i>
                <p>Sub Bidang</p>
              </Link>
            </li>

            {/* Materi */}
            <li className="nav-item">
              <Link to="/materi" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Materi</p>
              </Link>
            </li>

            {/* Peserta - Dengan Submenu */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>
                  Peserta
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ms-3">
                <li className="nav-item">
                  <Link to="/peserta" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Daftar Peserta</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/peserta-bidang" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Tentukan Bidang</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/periode" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Periode Peserta</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/asal-peserta" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Asal Peserta</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Soal - Dengan Submenu */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-question-circle"></i>
                <p>
                  Soal
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ms-3">
                <li className="nav-item">
                  <Link to="/buat-soal" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Buat Soal</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/soal" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Daftar Soal</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Ujian - Dengan Submenu */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chalkboard-teacher"></i>
                <p>
                  Ujian
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ms-3">
                <li className="nav-item">
                  <Link to="/sesi-ujian" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Buat Sesi Ujian</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ujian" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Daftar Ujian</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/laporan-ujian" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Hasil Ujian</p>
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
