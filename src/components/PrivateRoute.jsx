import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
   
  const token = sessionStorage.getItem('token');

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  return <Outlet />;
};

export default PrivateRoute;
