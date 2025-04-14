import React from 'react';
import { Link } from 'react-router-dom';
const baseURL = process.env.REACT_APP_BASE_URL;

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <span className="brand-text font-weight-light">Bimbel UTBK</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/data" className="nav-link">
                <i className="nav-icon fas fa-file"></i>
                <p>Data</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bidang" className="nav-link">
                <i className="nav-icon fas fa-file"></i>
                <p>Bidang</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
