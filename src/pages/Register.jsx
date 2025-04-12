import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password dan konfirmasi tidak cocok!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });

      toast.success(response.data.message || 'Registrasi berhasil!');
      console.log('Response:', response.data);
        window.location.href = '/login';        
    } catch (error) {
      console.error('Gagal registrasi:', error);
      const errorMsg =
      error.response?.data?.message || 'Registrasi gagal. Coba lagi!';
    toast.error(errorMsg);
    }
  };

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">Bimbel Compass</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Daftar akun baru</p>
            <form onSubmit={handleRegister}>
              {/* Username */}
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

              {/* Password */}
              <div className="input-group mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="input-group-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </div>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div className="input-group mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="input-group-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <a href="/login">Sudah punya akun?</a>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
