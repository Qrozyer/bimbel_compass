import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Tambahkan import
import { setSoal } from '../../actions/soalActions';
import Swal from 'sweetalert2';
import { fetchData, editData, addData } from '../../utils/api';
import SoalForm from '../../components/soal/SoalForm';
import { useNavigate, useParams } from 'react-router-dom';

const SoalFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const soal = useSelector((state) => state.soal.soal); // Ambil data soal dari Redux

  const [currentSoal, setCurrentSoal] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDataSoal = async () => {
        const data = await fetchData('soal');
        if (data) {
          const soalToEdit = data.find((item) => item.SoalId === parseInt(id));
          setCurrentSoal(soalToEdit);
          console.log("Data soal untuk edit:", soalToEdit); // Log data yang diterima
        }
      };
      fetchDataSoal();
    }
  }, [id]);
  

  const handleSave = async (data) => {
    console.log('Data yang akan disimpan:', data);
    if (id) {
      await editData('soal', id, data);
      Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
    } else {
      await addData('soal', data);
      Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
    }
    const newData = await fetchData('soal');
    if (newData) {
      dispatch(setSoal(newData));
    }
    navigate('/soal');
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
    <SoalForm key={id} initialData={currentSoal} onSave={handleSave} onCancel={() => navigate('/soal')} />    </div>
  );
};

export default SoalFormPage;