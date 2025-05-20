import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, editData } from '../../utils/api';
import Swal from 'sweetalert2';
import UjianForm from '../../components/ujian/UjianForm';

const UjianAktivasiForm = () => {
  const { id, sectionid } = useParams();
  const navigate = useNavigate();
  const [ujianData, setUjianData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (sectionid) {
          // Ambil semua data section
          const allSectionData = await fetchData(`/ujian/data/section`);
          const found = allSectionData.find(item => item.SectionID === parseInt(sectionid));
          if (found) {
            // Adaptasi field agar match dengan struktur UjianForm
            const adaptedData = {
              Id: found.Id,
              SectionID: found.SectionID,
              SectionNama: found.SectionNama,
              TglUjian: found.TglUjian,
              Mulai: found.AwalUjian,
              Akhir: found.AkhirUjian,
              Durasi: found.Durasi,
              Tampil: found.Tampil,
            };
            setUjianData(adaptedData);
          } else {
            Swal.fire('Not Found', 'Data dengan SectionID tersebut tidak ditemukan.', 'warning');
          }
        } else if (id) {
          const data = await fetchData(`/ujian/data/pilih/${id}`);
          setUjianData(data);
        }
      } catch (err) {
        Swal.fire('Error', 'Gagal mengambil data ujian.', 'error');
      }
    };
    loadData();
  }, [id, sectionid]);

  const handleSave = async (updatedData) => {
    try {
      const dataId = id || ujianData?.Id;
      await editData(`/ujian/data/update`, dataId, updatedData);
      Swal.fire('Sukses', 'Data ujian berhasil diperbarui.', 'success');
      navigate('/ujian');
    } catch (err) {
      Swal.fire('Error', 'Gagal memperbarui data ujian.', 'error');
    }
  };

  return (
    <div className="container" style={{ marginTop: '0 auto', padding: '50px', maxWidth: '1000px' }}>
      <div>
        <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left mr-2"></i> Kembali
        </button>
      </div>
      <UjianForm initialData={ujianData} onSave={handleSave} onCancel={() => navigate(-1)} />
    </div>
  );
};

export default UjianAktivasiForm;
