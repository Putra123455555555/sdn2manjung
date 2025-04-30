import { Route, Routes } from 'react-router-dom'; // Mengimpor komponen Routes dan Route dari react-router-dom untuk menangani navigasi
import DashboardLayout from '../Pages/Dashboard/Layout/Layout'; // Mengimpor layout utama dashboard
import ProtectedRoute from './ProtectedRoute'; // Mengimpor komponen proteksi untuk membatasi akses
import ProfilSekolah from '../Pages/Dashboard/Profil/ProfilSekolah'; // Mengimpor halaman Profil Sekolah
import DetailSekolah from '../Pages/Dashboard/Detail/DetailSekolah'; // Mengimpor halaman Detail Sekolah
import KontakSekolah from '../Pages/Dashboard/Kontak/KontakSekolah'; // Mengimpor halaman Kontak Sekolah
import DataGuru from '../Pages/Dashboard/Guru/DataGuru'; // Mengimpor halaman Data Guru
import DataGambar from '../Pages/Dashboard/Gambar/DataGambar'; // Mengimpor halaman Data Gambar
import DataBerita from '../Pages/Dashboard/Berita/DataBerita'; // Mengimpor halaman Data Berita
import AdminChat from '../Pages/Dashboard/AdminChat/AdminChat';

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Semua route di dalam ProtectedRoute hanya bisa diakses jika pengguna telah login */}
      <Route element={<ProtectedRoute />}>
        {/* Route untuk halaman Profil Sekolah */}
        <Route path="profil" element={<DashboardLayout />}>
          <Route index element={<ProfilSekolah />} />
        </Route>

        {/* Route untuk halaman Detail Sekolah */}
        <Route path="detail-sekolah" element={<DashboardLayout />}>
          <Route index element={<DetailSekolah />} />
        </Route>

        {/* Route untuk halaman Kontak Sekolah */}
        <Route path="kontak-sekolah" element={<DashboardLayout />}>
          <Route index element={<KontakSekolah />} />
        </Route>

        {/* Route untuk halaman Data Guru */}
        <Route path="data-guru" element={<DashboardLayout />}>
          <Route index element={<DataGuru />} />
        </Route>

        {/* Route untuk halaman Data Gambar */}
        <Route path="data-gambar" element={<DashboardLayout />}>
          <Route index element={<DataGambar />} />
        </Route>

        <Route path="admin-chat" element={<DashboardLayout />}>
          <Route index element={<AdminChat />} />
        </Route>

        {/* Route untuk halaman Data Berita */}
        <Route path="data-berita" element={<DashboardLayout />}>
          <Route index element={<DataBerita />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes; // Mengekspor komponen DashboardRoutes agar bisa digunakan di tempat lain
