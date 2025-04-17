import React from 'react';

const BidangTable = ({ data, onEdit, onDelete }) => {
  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }
  
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Nama Bidang</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.BidangId}>
              <td>{index + 1}</td>
              <td>{item.BidangNama}</td>
              <td dangerouslySetInnerHTML={{ __html: item.BidangKeterangan }}></td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.BidangId)}>
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

export default BidangTable;