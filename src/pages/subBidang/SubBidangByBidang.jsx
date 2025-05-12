import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSubBidang } from '../../actions/subBidangActions';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../utils/api';
import SubBidangTable from '../../components/subBidang/SubBidangTable';

const SubBidangByBidangPage = () => {
  const { bidangId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subBidang = useSelector((state) => state.subBidang.subBidang);

  useEffect(() => {
    const fetchDataFiltered = async () => {
      try {
        const data = await fetchData(`sub-bidang/filter/${bidangId}`);
        if (data) {
          dispatch(setSubBidang(data));
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data sub bidang.', 'error');
      }
    };
    fetchDataFiltered();
  }, [bidangId, dispatch]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData('sub-bidang', id);
        dispatch(setSubBidang(subBidang.filter((item) => item.SubId !== id)));
        Swal.fire('Terhapus!', 'Data sub bidang telah dihapus.', 'success');
      }
    });
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', maxWidth: '1200px' }}>
      <h3>Daftar Sub Bidang Berdasarkan Bidang ID: {bidangId}</h3>
      <button className="btn btn-secondary mb-3 me-2" onClick={() => navigate(-1)}>
      ← Kembali
      </button>
      <button className="btn btn-success mb-3" onClick={() => navigate(`/sub-bidang/add?bidangId=${bidangId}`)}>
        Tambah Sub Bidang
      </button>
      <SubBidangTable
        data={subBidang}
        onEdit={(item) => navigate(`/sub-bidang/edit/${item.SubId}`)}
        onDelete={handleDelete}
        onDetail={(item) => navigate(`/materi/by-sub-bidang/${item.SubId}`)}
      />
    </div>
  );
};

export default SubBidangByBidangPage;
