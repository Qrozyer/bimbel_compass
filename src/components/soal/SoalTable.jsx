import React from 'react';

const SoalTable = ({ data, onEdit, onDelete }) => {
  if (!data || !Array.isArray(data)) { 
    return <div>Data kosong</div>; // Atau tampilkan pesan lain
  }

  console.log("SoalTable data:", data);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Pertanyaan</th>
            <th>Jawaban A</th>
            <th>Jawaban B</th>
            <th>Jawaban C</th>
            <th>Jawaban D</th>
            <th>Jawaban E</th>
            <th>Kunci Jawaban</th>
            <th>Pembahasan</th>
            <th>Video</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.SoalId}>
              <td>{index + 1}</td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalPertanyaan }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalA }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalB }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalC }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalD }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalE }}></td>
              <td>{item.SoalJawaban}</td>
              <td dangerouslySetInnerHTML={{ __html: item.SoalPembahasan }}></td>
              <td>{item.SoalVideo}</td>
              <td width="120">
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.SoalId)}>
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

export default SoalTable;
