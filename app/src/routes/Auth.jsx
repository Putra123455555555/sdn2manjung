import React from 'react'; // Mengimpor pustaka React untuk membuat komponen
import { Routes, Route } from 'react-router-dom'; // Mengimpor Routes dan Route dari react-router-dom untuk menangani navigasi halaman
import FormLogin from '@/Pages/Auth/Login'; // Mengimpor komponen FormLogin dari direktori autentikasi
import FormRegister from '@/Pages/Auth/Register'; // Mengimpor komponen FormRegister dari direktori autentikasi

// Komponen utama AuthApp yang menangani tampilan autentikasi pengguna
const AuthApp = () => {
  return (
    // Membungkus seluruh halaman dalam div dengan latar belakang gambar dan tinggi minimal satu layar penuh
    <div className="bg-[url('/image/bgheader.jpg')] bg-cover bg-center min-h-screen">
      <Routes>
        {/* Menentukan rute untuk halaman login */}
        <Route path="/login" element={<FormLogin />} />
        {/* Menentukan rute untuk halaman registrasi */}
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </div>
  );
};

export default AuthApp; // Mengekspor komponen AuthApp agar dapat digunakan di bagian lain aplikasi
