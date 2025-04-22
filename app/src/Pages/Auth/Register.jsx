import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const FormRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username wajib diisi.';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid.';
    if (!formData.password) newErrors.password = 'Password wajib diisi.';
    if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password tidak cocok.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Register = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await apiClient.post('/api/auth/register', formData);
      navigate('/auth/login');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm flex justify-center items-center min-h-screen px-6">
      <div className="w-full max-w-lg rounded-sm bg-white shadow-lg p-12 m-6">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-[#101524] mb-2">Register</h1>
          <p className="text-lg text-gray-700">Silakan daftar untuk melanjutkan.</p>
        </div>

        {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

        <form onSubmit={Register}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Konfirmasi Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#101524] text-white text-xl font-semibold rounded-lg hover:bg-[#263154] transition duration-300 shadow-lg"
          >
            Daftar
          </button>
        </form>

        <p className="text-base text-gray-700 text-center mt-4">
          Sudah memiliki akun?{' '}
          <Link to="/auth/login" className="text-red-700 font-bold hover:underline transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormRegister;
