import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        <div className="content p-3">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
