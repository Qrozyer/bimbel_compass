// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const baseURL = process.env.REACT_APP_BASE_URL;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Mengirim request GET untuk mengambil token
        const res = await axios.get(`${baseURL}/token`, {
          headers: {
            'Content-Type': 'application/json',
            'x-username': 'test',
            'x-password': 'testing',
          },
        });

        //Menyimpan token yang diterima dari response API 
        setToken(res.data.token);
      } catch (error) {
        //menangani error jika token tidak berhasil diambil
        console.error('Error:', error);
        toast.error('Gagal mengambil token');
      }
    };

    //memanggil fungsi fetchToken saat komponen pertama kali dimuat
    fetchToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/login/admin`, {
        username : username,
        password : password,
      },
      {
        headers: {
          Authorization: token, // Menggunakan token yang diambil sebelumnya
        }
      });


      // Tampilkan pesan dari response
      toast.success(res.data.message || 'Login berhasil!');
      sessionStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login gagal!';
      toast.error(msg);
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">Bimbel Compass</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Login With Your Account</p>
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
