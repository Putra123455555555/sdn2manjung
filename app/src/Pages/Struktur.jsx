import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const Struktur = () => {
  // State untuk menyimpan URL gambar struktur organisasi
  const [strukturImg, setStrukturImg] = useState('');

  // State untuk menyimpan nama sekolah
  const [namaSekolah, setNamaSekolah] = useState('');

  // State untuk status loading agar tahu kapan data selesai dimuat
  const [loading, setLoading] = useState(true);

  // State untuk skala gambar (untuk fitur zoom)
  const [scale, setScale] = useState(1);

  // Menggunakan useEffect untuk mengambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    const fetchData = async () => {
      try {
         // Menggunakan Promise.all agar kedua request berjalan bersamaan
        const [profilResponse] = await Promise.all([apiClient.get('/api/profil')]);

        // Menyimpan URL gambar struktur organisasi ke dalam state
        setStrukturImg(profilResponse.data.strukturImg || '');

        // Menyimpan nama sekolah ke dalam state
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        // Menangani error jika gagal mengambil data
        console.error('Error fetching struktur organisasi:', error);
      } finally {
        // Setelah selesai mengambil data, ubah status loading menjadi false
        setLoading(false);
      }
    };

    // Memanggil fungsi fetchData saat komponen dipasang
    fetchData();
  }, []);

  // Fungsi untuk menangani zoom gambar saat disentuh pada perangkat mobile
  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      event.preventDefault();

      // Mengambil posisi dua jari yang menyentuh layar
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      // Menghitung jarak antara dua jari
      const distance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);

      // Menyesuaikan skala gambar dengan batas minimal 1x dan maksimal 2x
      setScale(Math.min(Math.max(distance / 200, 1), 2));
    }
  };

  return (
    <div className="w-full">
      {/* Bagian header dengan background gambar dan teks overlay */}
      <div className="bg-cover bg-center bg-no-repeat w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: "url('/image/guru1.png')" }}>
        <div className="text-white text-center bg-black/50 p-4">
          <h1 className="text-3xl font-semibold">Struktur Organisasi</h1>
          <p className="text-lg md:text-xl">Profil - Struktur Organisasi - {namaSekolah}</p>
        </div>
      </div>

      {/* Jika masih loading, tampilkan pesan "Loading..." */}
      {loading ? (
        <div className="text-center py-10 text-xl font-semibold">Loading struktur organisasi...</div>
      ) : (
        // Menampilkan gambar struktur organisasi jika tersedia
        <div className="flex items-center justify-center my-16">
          {strukturImg ? (
            <img
              src={`${apiClient.defaults.baseURL}/${strukturImg}`}
              alt="Struktur Organisasi"
              className="w-full max-w-[1100px] h-auto object-cover transition-transform duration-300"
              style={{ transform: `scale(${scale})` }}
              onTouchMove={handleTouchMove} // Menangani zoom saat di mobile
            />
          ) : (
            // Jika tidak ada gambar yang tersedia, tampilkan pesan alternatif
            <p className="text-gray-500 text-lg">Struktur organisasi belum tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Struktur;
