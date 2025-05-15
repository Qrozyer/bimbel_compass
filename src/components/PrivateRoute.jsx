// src/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Ambil token dari localStorage atau sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Jika token tidak ditemukan, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika token ditemukan, render outlet (halaman anak)
  return <Outlet />;
};

export default PrivateRoute;
