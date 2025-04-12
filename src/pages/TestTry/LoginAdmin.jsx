import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Menyiapkan data untuk dikirim ke API untuk mengambil token
    const tokenData = {
      username: 'test',  // ganti dengan username yang sesuai
      password: 'testing', // ganti dengan password yang sesuai
    };

    try {
      // Tahap 1: Mendapatkan Token
      const tokenResponse = await axios.get('http://202.10.35.175:8080/token', {
        headers: {
          'x-username': tokenData.username,
          'x-password': tokenData.password,
        },
      });

      const token = tokenResponse.data.token;
      if (!token) {
        toast.error('Token tidak ditemukan!');
        return;
      }

      // Tahap 2: Login dengan token
      const loginData = {
        username: username,  // Menggunakan input username dari pengguna
        password: password,  // Menggunakan input password dari pengguna
      };

      const loginResponse = await axios.post('http://202.10.35.175:8080/login/admin', loginData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Menambahkan token pada header Authorization
        },
      });

      if (loginResponse.data.code === 200) {
        toast.success(loginResponse.data.msg || 'Login berhasil!');
        sessionStorage.setItem('adminToken', loginResponse.data.Token);
        navigate('/list-bidang');
      } else {
        toast.error(loginResponse.data.msg || 'Login gagal!');
      }
    } catch (error) {
      toast.error('Login gagal. Periksa koneksi atau coba lagi!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">Login Admin</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Login dengan akun admin</p>
            <form onSubmit={handleLogin}>
              {/* Username Input */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Mengambil input username
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Mengambil input password
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
