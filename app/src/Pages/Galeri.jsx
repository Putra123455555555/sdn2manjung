import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const Galeri = () => {
  // State untuk menyimpan daftar gambar dalam galeri
  const [gallery, setGallery] = useState([]);
  // State untuk menyimpan nama sekolah yang akan ditampilkan pada header
  const [namaSekolah, setNamaSekolah] = useState('');
  // State untuk mengontrol tampilan modal
  const [isModalOpen, setModalOpen] = useState(false);
  // State untuk menyimpan URL gambar yang ditampilkan dalam modal
  const [modalImage, setModalImage] = useState('');

  // useEffect digunakan untuk mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Menggunakan Promise.all untuk menjalankan beberapa request API secara bersamaan
        const [galleryResponse, profilResponse] = await Promise.all([
          apiClient.get('/api/data-gambar/gallery'), // Mengambil data gambar
          apiClient.get('/api/profil'), // Mengambil data profil sekolah
        ]);

        // Menyimpan data yang diperoleh ke dalam state
        setGallery(galleryResponse.data || []);
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        // Menangani error jika terjadi kegagalan saat mengambil data dari API
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar hanya dijalankan sekali saat komponen dimuat pertama kali

  // Fungsi untuk mendapatkan URL gambar berdasarkan path yang diberikan dari API
  const getImageUrl = (imgPath) => `${apiClient.defaults.baseURL}/${imgPath}`;

  // Fungsi untuk membuka modal dan menampilkan gambar yang dipilih
  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      {/* Bagian Header dengan gambar latar belakang */}
      <div className="bg-cover bg-center w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: "url('/image/galeri/bgHeaderBerita.jpg')" }}>
        <div className="text-white text-center bg-black/50 p-5">
          <h1 className="text-4xl font-bold">Galeri</h1>
          <p className="text-lg">Album Foto - {namaSekolah}</p>
        </div>
      </div>

      {/* Bagian utama galeri untuk menampilkan daftar gambar */}
      <div className="w-full px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id} // Setiap elemen dalam daftar harus memiliki key unik
              className="relative cursor-pointer group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(getImageUrl(item.img))} // Membuka modal saat gambar diklik
            >
              {/* Menampilkan gambar galeri */}
              <img src={getImageUrl(item.img)} alt={item.title} className="w-full h-[250px] object-cover transform group-hover:scale-110 transition duration-500" />

              {/* Overlay untuk menampilkan judul gambar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Modal untuk menampilkan gambar yang diperbesar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // Menutup modal jika area luar diklik
        >
          <div
            className="relative bg-white rounded-lg p-3 max-w-3xl shadow-xl transform scale-95 transition-all duration-300 animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat bagian dalam diklik
          >
            {/* Tombol untuk menutup modal */}
            <button className="absolute top-3 right-3 text-white p-2 hover:bg-red-700 transition" onClick={closeModal}>
              ✕
            </button>

            {/* Menampilkan gambar dalam modal */}
            <img src={modalImage} alt="Zoomed" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeri;
