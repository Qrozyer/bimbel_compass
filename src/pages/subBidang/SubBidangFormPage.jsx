import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, editData, addData } from '../../utils/api';
import SubBidangForm from '../../components/subBidang/SubBidangForm';
import { useNavigate, useParams } from 'react-router-dom';

const SubBidangFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, BidangId: bidangIdParam } = useParams(); // ambil BidangId dari param
  const subBidang = useSelector((state) => state.subBidang.subBidang);

  const [currentSubBidang, setCurrentSubBidang] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDataSubBidang = async () => {
        const data = await fetchData('sub-bidang');
        if (data) {
          const subBidangToEdit = data.find((item) => item.SubId === parseInt(id));
          setCurrentSubBidang(subBidangToEdit);
          console.log("Data sub bidang untuk edit:", subBidangToEdit);
        }
      };
      fetchDataSubBidang();
    }
  }, [id]);

  const handleSave = async (data) => {
    if (id) {
      await editData('sub-bidang', id, data);
      Swal.fire('Success', 'Data berhasil diperbarui.', 'success');
    } else {
      await addData('sub-bidang', data);
      Swal.fire('Success', 'Data berhasil ditambahkan.', 'success');
    }

    const updatedData = await fetchData('sub-bidang');
    if (updatedData) {
      dispatch(setSubBidang(updatedData));
    }

    navigate(`/sub-bidang/by-bidang/${data.BidangId}`);
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <SubBidangForm
        key={id}
        BidangId={bidangIdParam}
        initialData={currentSubBidang}
        onSave={handleSave}
        onCancel={() =>
          navigate(`/sub-bidang/by-bidang/${currentSubBidang?.BidangId || bidangIdParam}`)
        }
      />
    </div>
  );
};

export default SubBidangFormPage;
