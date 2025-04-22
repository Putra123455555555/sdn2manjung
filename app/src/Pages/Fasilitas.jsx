import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient'; // Import apiClient untuk melakukan permintaan API

// Komponen FacilityCard untuk menampilkan setiap fasilitas sekolah
const FacilityCard = ({ name, image }) => (
  <div className="relative group w-full rounded-lg overflow-hidden shadow-lg">
    {/* Menampilkan gambar fasilitas dengan efek zoom saat hover */}
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110" />
    {/* Overlay teks dengan nama fasilitas yang muncul saat hover */}
    <div className="absolute bottom-0 left-0 w-full bg-sky-500 text-white text-center p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <h1 className="text-lg font-semibold">{name}</h1>
    </div>
  </div>
);

// Komponen utama untuk halaman fasilitas sekolah
const Fasilitas = () => {
  // State untuk menyimpan data fasilitas
  const [fasilitas, setFasilitas] = useState([]);
  // State untuk menyimpan nama sekolah
  const [namaSekolah, setNamaSekolah] = useState('');
  // State untuk mengelola status loading
  const [loading, setLoading] = useState(true);

  // useEffect digunakan untuk mengambil data fasilitas saat komponen pertama kali dirender
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data fasilitas dan profil sekolah secara paralel menggunakan Promise.all
        const [fasilitasResponse, profilResponse] = await Promise.all([apiClient.get('/api/data-gambar/fasilitas'), apiClient.get('/api/profil')]);

        // Menyimpan data fasilitas ke dalam state
        setFasilitas(fasilitasResponse.data || []);
        // Menyimpan nama sekolah ke dalam state
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Setelah proses fetch selesai, ubah status loading menjadi false
        setLoading(false);
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen pertama kali dimuat
  }, []); // Dependensi kosong berarti efek ini hanya berjalan sekali setelah mount

  return (
    <div className="w-full">
      {/* Bagian Header dengan background image */}
      <div className="bg-cover bg-center w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: "url('/image/bgheader.jpg')" }}>
        <div className="text-white text-center">
          {/* Judul halaman */}
          <h1 className="text-3xl font-semibold p-3">Fasilitas Sekolah</h1>
          {/* Menampilkan nama sekolah */}
          <p className="text-xl">Fasilitas Sekolah - {namaSekolah}</p>
        </div>
      </div>

      {/* Menampilkan loading jika data masih dalam proses pengambilan */}
      {loading ? (
        <div className="text-center py-10 text-xl font-semibold">Loading fasilitas...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto py-10 px-6 max-w-[1200px]">
          {/* Jika fasilitas tersedia, tampilkan daftar fasilitas */}
          {fasilitas.length > 0 ? (
            fasilitas.map((facility) => <FacilityCard key={facility.id} name={facility.title} image={`${apiClient.defaults.baseURL}/${facility.img}`} />)
          ) : (
            // Jika tidak ada fasilitas yang tersedia, tampilkan pesan informasi
            <p className="text-center text-gray-500 col-span-full">Belum ada fasilitas tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Fasilitas;
