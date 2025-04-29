import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import BidangListPage from './pages/bidang/BidangListPage';
import BidangFormPage from './pages/bidang/BidangFormPage';
import BidangPage from './pages/bidang/BidangPage';

import SubBidangPage from './pages/subBidang/SubBidangPage';
import SubBidangListPage from './pages/subBidang/SubBidangListPage';
import SubBidangFormPage from './pages/subBidang/SubBidangFormPage';

import MateriListPage from './pages/materi/MateriListPage';
import MateriFormPage from './pages/materi/MateriFormPage';
import MateriPage from './pages/materi/MateriPage';

import SoalListPage from './pages/soal/SoalListPage';
import SoalFormPage from './pages/soal/SoalFormPage';
import SoalPage from './pages/soal/SoalPage';

import PesertaListPage from './pages/peserta/PesertaListPage';
import PesertaFormPage from './pages/peserta/PesertaFormPage';
import PesertaDetailPage from './pages/peserta/PesertaDetailPage';

import SesiUjianListPage from './pages/sesiUjian/SesiUjianListPage';
import SesiUjianFormPage from './pages/sesiUjian/SesiUjianFormPage';

import SesiSoal from './pages/sesiSoal/SesiSoal';
import SesiSoalForm from './pages/sesiSoal/SesiSoalForm';

import BidangPeserta from './pages/bidang/BidangPeserta';
import PesertaBidang from './pages/peserta/PesertaBidang';
import TambahPesertaBidang from './pages/peserta/TambahPesertaBidang';
import EditPesertaBidang from './pages/peserta/EditPesertaBidang';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>      
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />      

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bidang" element={<BidangPage />} /> {/* Rute untuk bidang */}
            <Route path="/bidang-list" element={<BidangListPage />} />      
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
            <Route path="/peserta" element={<PesertaListPage />} />
            <Route path="/peserta/add" element={<PesertaFormPage />} />
            <Route path="/peserta/edit/:id" element={<PesertaFormPage />} />      
            <Route path="/peserta/pilih/:id" element={<PesertaDetailPage />} /> {/* Rute untuk detail peserta */}            
            
            <Route path="/sub-bidang/:id" element={<SubBidangPage />} /> {/* Rute untuk sub bidang */}         
            <Route path="/materi/:id" element={<MateriPage />} /> {/* Rute untuk materi berdasarkan SubId */}       
            <Route path="/soal/:id" element={<SoalPage />} /> {/* Rute untuk soal berdasarkan MateriId */}       

            <Route path="/sesi-ujian" element={<SesiUjianListPage />} /> {/* Halaman Daftar Sesi Ujian */}
            <Route path="/sesi-ujian/form/:id" element={<SesiUjianFormPage />} /> {/* Halaman Formulir Edit Sesi Ujian */}
            <Route path="/sesi-ujian/form" element={<SesiUjianFormPage />} /> {/* Halaman Formulir Tambah Sesi Ujian */}
            
            <Route path="/soal/section/:sectionId" element={<SesiSoal />} /> {/* Rute untuk sesi soal ujian */}
            <Route path="/soal-list/:sectionId" element={<SesiSoalForm />} /> {/* Rute untuk form sesi soal ujian */}

            <Route path="/bidang-peserta/add" element={<BidangPeserta />} /> {/* Rute untuk bidang peserta */}
            <Route path="/peserta-bidang/:BidangId" element={<PesertaBidang />} /> {/* Rute untuk bidang peserta */}
            <Route path="/peserta/bidang/:BidangId/tambah" element={<TambahPesertaBidang />} />
            <Route path="/peserta-bidang/edit/:id" element={<EditPesertaBidang />} /> {/* Rute untuk edit peserta bidang */}

            {/* Rute untuk halaman tidak ditemukan */}  
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
