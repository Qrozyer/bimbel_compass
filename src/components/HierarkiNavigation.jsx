// src/components/common/HierarkiNavigation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HierarkiNavigation = ({ current, bidangId, subId }) => {
  const navigate = useNavigate();

  const isActive = (page) =>
    page === current ? '#007bff' : '#999'; // warna biru jika aktif, abu-abu jika tidak

  return (
    // HierarkiNavigation.jsx
<div style={{ marginTop: '100px', marginLeft: '40px', fontSize: '1.1rem' }}>
      <div
        style={{ color: isActive('bidang'), cursor: 'pointer', marginBottom: '10px' }}
        onClick={() => navigate('/bidang-list')}
      >
        Bidang
      </div>
      <div style={{ borderLeft: '2px solid #ccc', height: '20px', marginLeft: '7px' }} />
      <div
        style={{ color: isActive('sub'), cursor: subId || bidangId ? 'pointer' : 'default', marginBottom: '10px' }}
        onClick={() => navigate(-1)}
      >
        Sub Bidang
      </div>
      <div style={{ borderLeft: '2px solid #ccc', height: '20px', marginLeft: '7px' }} />
      <div
        style={{ color: isActive('materi'), cursor: subId ? 'pointer' : 'default' }}
        onClick={() => {
          if (subId) navigate(`/materi/by-sub-bidang/${subId}`);
        }}
      >
        Materi
      </div>
    </div>
  );
};

export default HierarkiNavigation;
