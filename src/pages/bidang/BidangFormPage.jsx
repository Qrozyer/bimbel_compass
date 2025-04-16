import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Tambahkan import
import { setBidang } from '../../actions/bidangActions';
import Swal from 'sweetalert2';
import { fetchData, editData, addData } from '../../utils/api';
import BidangForm from '../../components/bidang/BidangForm';
import { useNavigate, useParams } from 'react-router-dom';

const BidangFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const bidang = useSelector((state) => state.bidang.bidang); // Ambil data bidang dari Redux

  const [currentBidang, setCurrentBidang] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDataBidang = async () => {
        const data = await fetchData('bidang');
        if (data) {
          const bidangToEdit = data.find((item) => item.BidangId === parseInt(id));
          setCurrentBidang(bidangToEdit);
          console.log("Data bidang untuk edit:", bidangToEdit);
        }
      };
      fetchDataBidang();
    }
  }, [id]);

  const handleSave = async (data) => {
    if (id) {
      await editData('bidang', id, data);
      Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
    } else {
      await addData('bidang', data);
      Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
    }
    const newData = await fetchData('bidang');
    if (newData) {
      dispatch(setBidang(newData));
    }
    navigate('/bidang');
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
    <BidangForm key={id} initialData={currentBidang} onSave={handleSave} onCancel={() => navigate('/bidang')} />    </div>
  );
};

export default BidangFormPage;