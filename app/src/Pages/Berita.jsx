import React, { useState, useEffect } from 'react'; // Import React dan hooks untuk mengelola state dan efek samping
import { motion } from 'framer-motion'; // Import Framer Motion untuk animasi elemen
import apiClient from '../services/apiClient'; // Import API Client untuk komunikasi dengan backend

const Berita = () => {
  // State untuk menyimpan data berita, prestasi, dan nama sekolah
  const [berita, setBerita] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [namaSekolah, setNamaSekolah] = useState('');

  useEffect(() => {
    // Fungsi async untuk mengambil data dari API saat komponen pertama kali dimuat
    const fetchData = async () => {
      try {
        // Menggunakan Promise.all agar beberapa request API dilakukan secara paralel
        const [beritaResponse, prestasiResponse, profilResponse] = await Promise.all([
          apiClient.get('/api/data-berita/berita'), // Ambil data berita
          apiClient.get('/api/data-berita/prestasi'), // Ambil data prestasi
          apiClient.get('/api/profil'), // Ambil data profil sekolah
        ]);

        // Menyimpan hasil response ke dalam state
        setBerita(beritaResponse.data || []);
        setPrestasi(prestasiResponse.data || []);
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        console.error('Error fetching data:', error); // Menampilkan error jika request gagal
      }
    };

    fetchData(); // Memanggil fungsi fetchData saat komponen dimuat pertama kali
  }, []);

  // Fungsi untuk mendapatkan URL gambar dari path yang diberikan oleh API
  const getImageUrl = (imgPath) => `${apiClient.defaults.baseURL}/${imgPath}`;

  return (

    // sS
    <div className="w-full">
      {/* Bagian Header: Menampilkan judul halaman dengan background gambar */}
      <div className="bg-cover bg-center w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: "url('/image/galeri/bgHeaderBerita.jpg')" }}>
        <div className="text-white text-center bg-black/50 px-5">
          <h1 className="text-3xl font-semibold p-3">Berita Sekolah</h1>
          <p className="text-xl">Informasi Terbaru - {namaSekolah}</p>
        </div>
      </div>

      {/* Bagian Daftar Berita: Menampilkan daftar berita dalam bentuk grid */}
      <div className="w-full flex flex-wrap justify-center pt-6 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div key={item.id} className="shadow-md rounded-lg overflow-hidden bg-white border border-gray-300">
              {/* Gambar Berita: Menyesuaikan ukuran agar tetap proporsional */}
              <div className="w-full aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src={getImageUrl(item.img)} alt={item.title} />
              </div>
              {/* Deskripsi Berita */}
              <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
                <p className="text-gray-600 mt-2">{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Prestasi Siswa: Menampilkan daftar prestasi dalam kartu animasi */}
      <div className="w-full bg-yellow-100 py-10 mt-10">
        <h1 className="text-center text-3xl font-bold text-yellow-800">Prestasi Siswa</h1>
        <div className="flex flex-wrap justify-center gap-5 pt-6 px-10">
          {prestasi.map((item) => (
            <motion.div
              key={item.id}
              className="shadow-lg rounded-lg overflow-hidden bg-white border-2 border-yellow-500 w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
              whileHover={{ scale: 1.05 }} // Efek animasi saat kartu dihover
            >
              {/* Judul Prestasi */}
              <h1 className="text-center text-white bg-yellow-500 font-semibold py-2">{item.title}</h1>
              {/* Gambar Prestasi */}
              <div className="w-full aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src={getImageUrl(item.img)} alt={item.title} />
              </div>
              {/* Deskripsi Prestasi */}
              <p className="text-black p-4 text-sm">{item.deskripsi}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Berita; // Mengekspor komponen agar bisa digunakan di file lain
