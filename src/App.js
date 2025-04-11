import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery'

import Data from './pages/Data'; // Buat halaman ini

function App() {
  return (
      <Router>
          <div className="wrapper">
              <Header />
              <Sidebar />
              <div className="content-wrapper">
                  <Routes>
                      <Route path="/" element={<Data />} />
                      {/* Tambahkan rute halaman lain di sini */}
                  </Routes>
              </div>
              <Footer />
          </div>
      </Router>
  );
}

export default App;