import React from 'react';

const MateriTable = ({ data, onEdit, onDelete, onSoal, onDetail }) => {
  if (!data || !Array.isArray(data)) {
    return <div>Data kosong</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-secondary text-dark">
          <tr>
            <th>No</th>
            <th>Judul Materi</th>
            <th>Isi Materi</th>
            <th>Detail</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.MateriId}>
              <td>{index + 1}</td>
              <td>{item.MateriJudul}</td>
              <td dangerouslySetInnerHTML={{ __html: item.MateriIsi }}></td>
              <td width={180}>
                <button
                  className="btn btn-info btn-sm me-2"
                  title="Lihat Detail"
                  onClick={() => onDetail(item)}
                >
                  <i className="fas fa-eye"></i> Materi Detail
                </button>
                <button
                  className="btn btn-primary btn-sm me-2"
                  title="Lihat Soal"
                  onClick={() => onSoal(item)}
                >
                  <i className="fas fa-file-alt"></i> Soal
                </button>                
              </td>
              <td width={150}>
              <button
                  className="btn btn-warning btn-sm me-2"
                  title="Edit Materi"
                  onClick={() => onEdit(item)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  title="Hapus Materi"
                  onClick={() => onDelete(item.MateriId)}
                >
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
