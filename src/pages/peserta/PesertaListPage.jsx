import React from 'react';
import PesertaTable from '../../components/peserta/PesertaTable';
import { useNavigate } from 'react-router-dom';

const AsalPeserta = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/peserta/add'); // Navigasi ke halaman tambah peserta
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <div className="d-flex justify-content-start align-items-center mb-3">
        <button className="btn btn-success" onClick={handleAddClick}>
          Tambah Peserta
        </button>
      </div>
      <PesertaTable />
    </div>
  );
};

export default AsalPeserta;
