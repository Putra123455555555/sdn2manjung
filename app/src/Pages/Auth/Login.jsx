import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const FormLogin = () => {
  const [formData, setFormData] = useState({
    login: "", // Bisa email atau username
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(""); // State untuk pesan error umum
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.login.trim()) newErrors.login = "Username atau Email wajib diisi.";
    if (!formData.password) newErrors.password = "Password wajib diisi.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Login = async (e) => {
    e.preventDefault();
    setMsg(""); // Reset pesan error sebelum login baru
    if (!validate()) return;

    try {
      const response = await apiClient.post("/api/auth/login", formData);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard/profil");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message || "Login gagal. Coba lagi.");
      } else {
        setMsg("Terjadi kesalahan pada server.");
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm flex justify-center items-center min-h-screen px-6">
      <div className="w-full max-w-lg rounded-sm bg-white shadow-lg p-12 m-6">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-[#101524] mb-2">Login</h1>
          <p className="text-lg text-gray-700">Masukkan akun Anda untuk melanjutkan.</p>
        </div>

        {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

        <form onSubmit={Login}>
          {/* Username atau Email */}
          <div className="mb-3">
            <label htmlFor="login" className="block text-gray-700 font-semibold mb-1">
              Username atau Email
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              autoComplete="username"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full p-3 border border-gray-400 rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#101524] text-white text-xl font-semibold rounded-lg hover:bg-[#263154] transition duration-300 shadow-lg"
          >
            Masuk
          </button>
        </form>


{/* <p className="text-base text-gray-700 text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/auth/register" className="text-red-700 font-bold hover:underline transition">
            Daftar
          </Link>
        </p> */}
        
      </div>
    </div>
  );
};

export default FormLogin;
