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

import BidangListPage from './pages/bidang/BidangListPage';
import BidangFormPage from './pages/bidang/BidangFormPage';

import SubBidangListPage from './pages/subBidang/SubBidangListPage';
import SubBidangFormPage from './pages/subBidang/SubBidangFormPage';

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
            <Route path="/bidang" element={<BidangListPage />} />      
            <Route path="/bidang/add" element={<BidangFormPage />} />
            <Route path="/bidang/edit/:id" element={<BidangFormPage />} />
            <Route path="/sub-bidang" element={<SubBidangListPage />} />      
            <Route path="/sub-bidang/add" element={<SubBidangFormPage />} />
            <Route path="/sub-bidang/edit/:id" element={<SubBidangFormPage />} />      
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
