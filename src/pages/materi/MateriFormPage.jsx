import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Tambahkan import
import { setMateri } from '../../actions/materiActions';
import Swal from 'sweetalert2';
import { fetchData, editData, addData } from '../../utils/api';
import MateriForm from '../../components/materi/MateriForm';
import { useNavigate, useParams } from 'react-router-dom';

const MateriFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const materi = useSelector((state) => state.materi.materi); // Ambil data materi dari Redux

  const [currentMateri, setCurrentMateri] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDataMateri = async () => {
        const data = await fetchData('materi');
        if (data) {
          const materiToEdit = data.find((item) => item.MateriId === parseInt(id));
          setCurrentMateri(materiToEdit);
          console.log("Data materi untuk edit:", materiToEdit);
        }
      };
      fetchDataMateri();
    }
  }, [id]);

  const handleSave = async (data) => {
    if (id) {
      await editData('materi', id, data);
      Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
    } else {
      await addData('materi', data);
      Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
    }
    const newData = await fetchData('materi');
    if (newData) {
      dispatch(setMateri(newData));
    }
    navigate('/materi');
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
    <MateriForm key={id} initialData={currentMateri} onSave={handleSave} onCancel={() => navigate('/materi')} />    </div>
  );
};

export default MateriFormPage;