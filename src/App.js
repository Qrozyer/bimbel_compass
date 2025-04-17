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

import SubBidangPage from './pages/subBidang/SubBidangPage';
import SubBidangListPage from './pages/subBidang/SubBidangListPage';
import SubBidangFormPage from './pages/subBidang/SubBidangFormPage';

import MateriListPage from './pages/materi/MateriListPage';
import MateriFormPage from './pages/materi/MateriFormPage';

import SoalListPage from './pages/soal/SoalListPage';
import SoalFormPage from './pages/soal/SoalFormPage';

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
            <Route path="/materi" element={<MateriListPage />} />
            <Route path="/materi/add" element={<MateriFormPage />} />
            <Route path="/materi/edit/:id" element={<MateriFormPage />} /> 
            <Route path="/soal" element={<SoalListPage />} />
            <Route path="/soal/add" element={<SoalFormPage />} />
            <Route path="/soal/edit/:id" element={<SoalFormPage />} />         
            <Route path="/sub-bidang/:bidangId" element={<SubBidangPage />} /> {/* Rute untuk sub bidang */}         
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
