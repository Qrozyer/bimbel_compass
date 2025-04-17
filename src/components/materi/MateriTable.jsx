import React from 'react';

const MateriTable = ({ data, onEdit, onDelete }) => {
  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }

  console.log("MateriTable data:", data);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Judul Materi</th>
            <th>Isi Materi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.MateriId}>
              <td>{index + 1}</td>
              <td>{item.MateriJudul}</td>
              <td dangerouslySetInnerHTML={{ __html: item.MateriIsi }}></td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.MateriId)}>
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

export default MateriTable;