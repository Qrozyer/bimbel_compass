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

import BidangListPage from './pages/bidang/BidangListPage';
import BidangFormPage from './pages/bidang/BidangFormPage';

import SubBidangListPage from './pages/subBidang/SubBidangListPage';
import SubBidangFormPage from './pages/subBidang/SubBidangFormPage';

import MateriListPage from './pages/materi/MateriListPage';
import MateriFormPage from './pages/materi/MateriFormPage';

import SoalListPage from './pages/soal/SoalListPage';
import SoalDetail from './pages/soal/SoalDetail';
import BuatSoal from './pages/soal/BuatSoal';

import PesertaListPage from './pages/peserta/PesertaListPage';
import PesertaFormPage from './pages/peserta/PesertaFormPage';
import PesertaDetailPage from './pages/peserta/PesertaDetailPage';

import SesiUjianListPage from './pages/sesiUjian/SesiUjianListPage';
import SesiUjianFormPage from './pages/sesiUjian/SesiUjianFormPage';

import SesiSoal from './pages/sesiSoal/SesiSoal';
import SesiSoalForm from './pages/sesiSoal/SesiSoalForm';
import SoalMateriForm from './pages/materi/SoalMateriForm';

import SesiSoalPeserta from './pages/sesiUjian/SesiSoalPeserta';
import SesiujianPeserta from './pages/sesiUjian/SesiUjianPeserta';

import TambahSesiPeserta from './pages/sesiPeserta/TambahSesiPeserta';

import BidangPeserta from './pages/bidang/BidangPeserta';
import PesertaBidang from './pages/peserta/PesertaBidang';
import TambahPesertaBidang from './pages/peserta/TambahPesertaBidang';
import EditPesertaBidang from './pages/peserta/EditPesertaBidang';

import Ujian from './pages/ujian/Ujian';
import UjianDetail from './pages/ujian/UjianDetail';
import UjianMateri from './pages/ujian/UjianMateri';
import UjianMateriForm from './pages/ujian/UjianMateriForm';
import UjianUpdateForm from './pages/ujian/UjianUpdateForm';

import HasilUjian from './pages/laporanUjian/HasilUjian';
import HasilDetailUjian from './pages/laporanUjian/HasilDetailUjian';
import LaporanUjianMateri from './pages/laporanUjian/LaporanUjianMateri';
import HasilMateriListPage from './pages/laporanUjian/HasilMateriListPage';
import LaporanUjian from './pages/laporanUjian/LaporanUjian';

import SubBidangByBidangPage from './pages/subBidang/SubBidangByBidang';
import MateriBySubBidang from './pages/materi/MateriBySubBidang';

import SoalByMateri from './pages/materi/SoalByMateri';
import MateriDetail from './pages/materi/MateriDetail';

import AsalPesertaList from './pages/asalPeserta/AsalPesertaList';
import AsalPesertaForm from './pages/asalPeserta/AsalPesertaForm';

import PeriodeList from './pages/periode/PeriodeList';
import PeriodeForm from './pages/periode/PeriodeForm';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>              
        <Route path="/login" element={<Login />} />      

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />          
            <Route path="/bidang-list" element={<BidangListPage />} />      
            <Route path="/bidang/add" element={<BidangFormPage />} />
            <Route path="/bidang/edit/:id" element={<BidangFormPage />} />

            <Route path="/sub-bidang" element={<SubBidangListPage />} />      
            <Route path="/sub-bidang/add" element={<SubBidangFormPage />} />
            <Route path="/sub-bidang/add/:BidangId" element={<SubBidangFormPage />} />
            <Route path="/sub-bidang/edit/:id" element={<SubBidangFormPage />} />   
            <Route path="/sub-bidang/by-bidang/:bidangId" element={<SubBidangByBidangPage />} />

            <Route path="/materi" element={<MateriListPage />} />
            <Route path="/materi/add" element={<MateriFormPage />} />
            <Route path="/materi/add/:SubId" element={<MateriFormPage />} />
            <Route path="/materi/edit/:id" element={<MateriFormPage />} /> 
            <Route path="/materi/by-sub-bidang/:subId" element={<MateriBySubBidang />} /> {/* Rute untuk materi berdasarkan SubId */}
            <Route path="/materi/detail/:materiId" element={<MateriDetail />} /> {/* Rute untuk detail materi */}
            <Route path="/soal/by-materi/:materiId" element={<SoalByMateri />} /> {/* Rute untuk soal berdasarkan MateriId */}

            <Route path="/soal" element={<SoalListPage />} />
            <Route path="/detail-soal/:soalId" element={<SoalDetail />} /> {/* Rute untuk detail soal */}
            <Route path="/buat-soal/:soalId" element={<BuatSoal />} />
            <Route path="/buat-soal" element={<BuatSoal />} /> {/* Rute untuk soal berdasarkan MateriId */}

            <Route path="/peserta" element={<PesertaListPage />} />
            <Route path="/peserta/add" element={<PesertaFormPage />} />
            <Route path="/peserta/edit/:id" element={<PesertaFormPage />} />      
            <Route path="/peserta/pilih/:id" element={<PesertaDetailPage />} /> {/* Rute untuk detail peserta */}                      

            <Route path="/sesi-ujian" element={<SesiUjianListPage />} /> {/* Halaman Daftar Sesi Ujian */}
            <Route path="/aktivasi-ujian/:id" element={<SesiUjianFormPage />} /> {/* Halaman Formulir Edit Sesi Ujian */}
            <Route path="/ujian/section/edit/:id" element={<SesiUjianFormPage />} /> {/* Rute untuk form ujian */}
            <Route path="/sesi-ujian/form" element={<SesiUjianFormPage />} /> {/* Halaman Formulir Tambah Sesi Ujian */}
            
            <Route path="/soal/section/:sectionId" element={<SesiSoal />} /> {/* Rute untuk sesi soal ujian */}
            <Route path="/soal-list/:sectionId" element={<SesiSoalForm />} /> {/* Rute untuk form sesi soal ujian */}
            <Route path="/soal-materi/add" element={<UjianMateriForm />} />
            <Route path="/soal-materi/add/:MateriId" element={<SoalMateriForm />} />
            <Route path="/soal-materi/edit/:MateriId" element={<SoalMateriForm />} /> {/* Rute untuk form sesi soal ujian */}

            <Route path="/soal-peserta/section/:sectionId" element={<SesiSoalPeserta />} /> {/* Rute untuk sesi soal peserta ujian */}
            <Route path="/peserta/section/:sectionId" element={<SesiujianPeserta />} /> {/* Rute untuk sesi peserta ujian */}

            <Route path="/bidang-peserta/add" element={<BidangPeserta />} /> {/* Rute untuk bidang peserta */}
            <Route path="/peserta-bidang" element={<PesertaBidang />} /> {/* Rute untuk bidang peserta */}
            <Route path="/peserta-bidang/tambah" element={<TambahPesertaBidang />} />
            <Route path="/peserta-bidang/edit/:bidangId/:pesertaBidangId" element={<EditPesertaBidang />} />

            <Route path="/peserta/section/add/:sectionId" element={<TambahSesiPeserta />} /> {/* Rute untuk menambah peserta ke sesi ujian */}

            <Route path="/ujian" element={<Ujian />} /> {/* Rute untuk halaman ujian */}
            <Route path="/ujian/detail/:id" element={<UjianDetail />} /> {/* Rute untuk detail ujian */}
            <Route path="/ujian-materi" element={<UjianMateri />} /> {/* Rute untuk materi ujian */}
            <Route path="/sesi-ujian/form/:sectionid" element={<UjianUpdateForm />} /> {/* Rute untuk form ujian */}

            {/* Rute untuk halaman hasil ujian */}  
            <Route path="/laporan-ujian" element={<LaporanUjian />} /> {/* Rute untuk hasil ujian */}
            <Route path="/hasil-ujian" element={<HasilUjian />} />
            <Route path="/hasil/ujian/:sectionId" element={<HasilDetailUjian />} />  
            <Route path="/laporan-materi" element={<HasilMateriListPage />} />
            <Route path="/laporan-materi/:materiid" element={<LaporanUjianMateri />} /> {/* Rute untuk laporan ujian materi */}

            <Route path="/asal-peserta" element={<AsalPesertaList />} /> {/* Rute untuk asal peserta */}
            <Route path="/asal-peserta/add" element={<AsalPesertaForm />} /> {/* Rute untuk form asal peserta */}            

            <Route path="/periode" element={<PeriodeList />} /> {/* Rute untuk periode */}
            <Route path="/periode/add" element={<PeriodeForm />} /> {/* Rute untuk form periode */}            
            {/* Rute untuk halaman tidak ditemukan */}  
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
