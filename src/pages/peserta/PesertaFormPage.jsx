import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPeserta } from '../../actions/pesertaActions';
import Swal from 'sweetalert2';
import { fetchData, editData, addData } from '../../utils/api';
import PesertaForm from '../../components/peserta/PesertaForm';
import { useNavigate, useParams } from 'react-router-dom';

const PesertaFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPeserta, setCurrentPeserta] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDataPeserta = async () => {
        const data = await fetchData('peserta');
        if (data) {
          const pesertaToEdit = data.find((item) => item.peserta_id === parseInt(id));
          setCurrentPeserta(pesertaToEdit);
        }
      };
      fetchDataPeserta();
    }
  }, [id]);

  const handleSave = async (data) => {
    if (id) {
      await editData('peserta', id, data);
      Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
    } else {
      await addData('peserta', data);
      Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
    }
    const newData = await fetchData('peserta');
    if (newData) {
      dispatch(setPeserta(newData));
    }
    navigate('/peserta');
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <PesertaForm key={id} initialData={currentPeserta} onSave={handleSave} onCancel={() => navigate('/peserta')} />
    </div>
  );
};

export default PesertaFormPage;
