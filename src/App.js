import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Bidang from './pages/Bidang';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>      
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />      

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/bidang" element={<Bidang />} />            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
