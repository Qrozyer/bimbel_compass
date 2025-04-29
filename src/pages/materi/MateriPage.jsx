  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { setMateri } from '../../actions/materiActions';  // Pastikan action setMateri ada
  import { fetchData, deleteData } from '../../utils/api';
  import MateriTableSubBidang from '../../components/materi/MateriTableSubBidang';  // Import komponen baru
  import { useNavigate } from 'react-router-dom';
  import Swal from 'sweetalert2';

  const MateriPage = () => {
    const { id } = useParams();  // Mengambil SubId dari URL
    const [materi, setMateriData] = useState([]);  // State untuk daftar materi
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Menyiapkan navigasi untuk pindah ke halaman materi

    useEffect(() => {
      const fetchDataMateri = async () => {
        try {
          const data = await fetchData('materi');
          if (data) {
            const filteredMateri = data.filter((item) => item.SubId === parseInt(id));
            setMateriData(filteredMateri);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchDataMateri();
    }, [id]);

    // Jika tidak ada materi untuk SubId yang diberikan
    if (!materi.length) return (
      <div className="pt-4 mb-4 ml-3">
        <h1 className="ml-3 mb-3">Materi untuk Sub Bidang: {id}</h1>
          <button 
              className="btn btn-secondary mb-4 ml-3" 
              onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
          >
              Kembali
          </button>
      </div>
    );

    return (
      <div className="pt-4 mb-4 ml-4">
        <h1 className="ml-3 mb-3">Materi untuk Sub Bidang: {id}</h1>
        
        <button 
          className="btn btn-secondary mb-4 ml-3" 
          onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
        >
          Kembali
        </button>      
        <MateriTableSubBidang 
          data={materi} 
        />
      </div>
    );
  };

  export default MateriPage;
