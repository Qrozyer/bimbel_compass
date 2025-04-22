import React from 'react';

const PesertaTable = ({ data, onEdit, onDelete }) => {
    if (!data || !Array.isArray(data)) { 
        return <div>Data kosong</div>; // Atau tampilkan pesan lain
      }

    console.log("PesertaTable data:", data);

    return (
    <div className="table-responsive">
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Jenis Kelamin</th>
          <th>Alamat</th>
          <th>No HP</th>
          <th>Pendidikan</th>
          <th>Asal Sekolah</th>
          <th>Periode</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.peserta_id}>
            <td>{index + 1}</td>
            <td>{item.peserta_nama}</td>
            <td>{item.peserta_email}</td>
            <td>{item.peserta_jk}</td>
            <td>{item.peserta_alamat}</td>
            <td>{item.peserta_nohp}</td>
            <td>{item.peserta_pendidikanterakhir}</td>
            <td>{item.peserta_asalsekolah}</td>
            <td>{item.peserta_periode}</td>
            <td>
                <button onClick={() => onEdit(item)} className="btn btn-warning mr-2">
                    <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => onDelete(item.peserta_id)} className="btn btn-danger">
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

export default PesertaTable;
