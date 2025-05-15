import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

const SesiUjianTable = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate(); // Inisialisasi navigate

  if (!data || !Array.isArray(data)) {
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }

  const handleSectionClick = (sectionId) => {
    // Navigasi ke halaman buat soal dengan SectionId
    navigate(`/soal-peserta/section/${sectionId}`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Nama Sesi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.SectionId}>
              <td>{index + 1}</td>
              <td 
                onClick={() => handleSectionClick(item.SectionId)} 
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {item.SectionNama}
              </td>
              <td>
                {item.SectionTampil === 1 ? (
                  <span className="badge bg-success">Aktif</span>
                ) : (
                  <span className="badge bg-danger">Tidak Aktif</span>
                )}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.SectionId)}>
                  <i className="fas fa-trash-alt"></i> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SesiUjianTable;
