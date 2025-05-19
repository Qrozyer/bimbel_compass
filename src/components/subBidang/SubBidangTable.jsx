import React from 'react';

const SubBidangTable = ({ data, onEdit, onDelete, onDetail }) => {
  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-secondary">
          <tr>
            <th>No</th>
            <th>Nama Sub Bidang</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.SubId}>
              <td>{index + 1}</td>
              <td>{item.SubNama}</td>
              <td dangerouslySetInnerHTML={{ __html: item.SubKeterangan }}></td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => onDetail?.(item)}>
                  <i className="fas fa-eye"></i> Detail
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.SubId)}>
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

export default SubBidangTable;
