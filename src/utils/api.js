// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_BASE_URL;

// Fungsi untuk mengambil token dari localStorage atau sessionStorage
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const fetchData = async (endpoint) => {
  try {
    const token = getToken();
    const response = await axios.get(`${baseURL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    toast.error(`Gagal mengambil data ${endpoint}!`);
    return null;
  }
};

export const addData = async (endpoint, data) => {
  try {
    const token = getToken();
    const response = await axios.post(`${baseURL}/${endpoint}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || `Gagal menambah data ${endpoint}`;
    toast.error(errorMsg);
    return null;
  }
};

export const editData = async (endpoint, id, data) => {
  try {
    const token = getToken();
    const response = await axios.put(`${baseURL}/${endpoint}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || `Gagal memperbarui data ${endpoint}`;
    toast.error(errorMsg);
    return null;
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${baseURL}/${endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || `Gagal menghapus data ${endpoint}.`;
    toast.error(errorMsg);
    return null;
  }
};

export const fetchHasilUjianSafe = async (endpoint) => {
  try {
    const token = getToken();
    const response = await axios.get(`${baseURL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Tidak tampilkan toast di sini
    return null;
  }
};
