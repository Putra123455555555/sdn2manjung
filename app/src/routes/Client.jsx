import React from 'react'; // Mengimpor React untuk menggunakan komponen React
import { Routes, Route } from 'react-router-dom'; // Mengimpor Routes dan Route untuk mengatur navigasi halaman

// Mengimpor komponen global yang digunakan di setiap halaman
import Navbar from '@/Components/Navbar'; // Navbar untuk navigasi
import Footer from '@/Components/Footer'; // Footer untuk bagian bawah halaman
import ScrollToTop from '@/Components/ScrollToTop'; // Fitur untuk menggulir ke atas saat berpindah halaman
import CrispChat from '@/Components/CrispChat'; // Integrasi fitur live chat Crisp

// Mengimpor komponen halaman utama
import LandingPage from '@/Components/Landing'; // Halaman utama website

// Mengimpor komponen halaman lain
import Galeri from '@/pages/Galeri'; // Halaman galeri
import Berita from '@/pages/Berita'; // Halaman berita
import Kontak from '@/pages/Kontak'; // Halaman kontak
import Profil from '@/pages/Profil'; // Halaman profil sekolah
import DataGuru from '@/pages/Guru'; // Halaman daftar guru
import Fasilitas from '@/pages/Fasilitas'; // Halaman fasilitas sekolah
import Ppdb from '@/pages/PPDB'; // Halaman Penerimaan Peserta Didik Baru (PPDB)
import Struktur from '@/pages/Struktur'; // Halaman struktur organisasi sekolah
import ErrorPage from '@/pages/Error'; // Halaman error untuk menangani rute yang tidak ditemukan

// Komponen utama untuk mengelola routing halaman di sisi klien
const Client = () => {
  return (
    <div className="w-full">
      {' '}
      {/* Membungkus seluruh halaman dengan lebar penuh */}
      <ScrollToTop /> {/* Mengaktifkan fitur scroll ke atas setiap kali halaman berubah */}
      <Navbar /> {/* Menampilkan navbar di setiap halaman */}
      <Routes>
        {' '}
        {/* Mengatur navigasi dengan berbagai rute */}
        <Route path="/" element={<LandingPage />} /> {/* Rute untuk halaman utama */}
        <Route path="/galeri" element={<Galeri />} /> {/* Rute untuk halaman galeri */}
        <Route path="/kontak" element={<Kontak />} /> {/* Rute untuk halaman kontak */}
        <Route path="/berita" element={<Berita />} /> {/* Rute untuk halaman berita */}
        <Route path="/profil" element={<Profil />} /> {/* Rute untuk halaman profil sekolah */}
        <Route path="/dataguru" element={<DataGuru />} /> {/* Rute untuk halaman data guru */}
        <Route path="/fasilitas" element={<Fasilitas />} /> {/* Rute untuk halaman fasilitas */}
        <Route path="/ppdb" element={<Ppdb />} /> {/* Rute untuk halaman pendaftaran siswa baru */}
        <Route path="/struktur" element={<Struktur />} /> {/* Rute untuk halaman struktur organisasi */}
        <Route path="*" element={<ErrorPage />} /> {/* Rute default jika halaman tidak ditemukan */}
      </Routes>
      <CrispChat /> {/* Menampilkan fitur live chat pada setiap halaman */}
      <Footer /> {/* Menampilkan footer di setiap halaman */}
    </div>
  );
};

export default Client; // Mengekspor komponen Client agar dapat digunakan di bagian lain aplikasi
