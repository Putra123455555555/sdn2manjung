import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/apiClient'; // Mengimpor instance API client untuk melakukan request ke backend

const DataGuru = () => {
  // State untuk menyimpan daftar guru yang diperoleh dari API
  const [dataGuru, setDataGuru] = useState([]);

  // State untuk menyimpan informasi profil sekolah
  const [profilSekolah, setProfilSekolah] = useState(null);

  // State untuk menangani input pencarian berdasarkan Nama atau NIP
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk melacak status loading saat data diambil dari API
  const [loading, setLoading] = useState(true);

  // Menggunakan useEffect untuk mengambil data dari API ketika komponen pertama kali dirender
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Menandakan bahwa proses pengambilan data sedang berlangsung

        // Mengambil data guru dari API
        const responseGuru = await apiClient.get('/api/data-guru');
        setDataGuru(responseGuru.data || []); // Menyimpan data guru ke dalam state

        // Mengambil data profil sekolah dari API
        const responseProfil = await apiClient.get('/api/profil');
        setProfilSekolah(responseProfil.data || {}); // Menyimpan data profil sekolah ke dalam state
      } catch (error) {
        console.error('Error fetching data:', error); // Menampilkan error jika request gagal
      } finally {
        setLoading(false); // Menandakan bahwa proses pengambilan data telah selesai
      }
    };

    fetchData(); // Memanggil fungsi untuk mengambil data
  }, []); // Dependensi kosong berarti useEffect hanya berjalan sekali saat komponen pertama kali dimuat

  // Melakukan filtering data guru berdasarkan input pencarian
  const filteredData = dataGuru.filter((guru) => guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) || guru.nip.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full">
      {/* Header Section: Menampilkan gambar header dengan overlay teks */}
      <div className="bg-cover bg-center w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: "url('/image/guru1.png')" }}>
        <div className="text-white text-center bg-black/50 p-10">
          <h1 className="text-3xl font-semibold p-3">Data Guru</h1>
          <p className="text-xl">Daftar Guru - {profilSekolah?.namaSekolah || 'Memuat...'}</p>
        </div>
      </div>

      {/* Search Section: Input pencarian untuk memfilter data berdasarkan Nama atau NIP */}
      <div className="py-6 px-4 md:px-16 flex justify-center">
        <div className="relative w-[600px]">
          {/* Icon pencarian di dalam input */}
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari berdasarkan Nama atau NIP"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Mengubah nilai searchTerm setiap kali pengguna mengetik
          />
        </div>
      </div>

      {/* Grid Section: Menampilkan daftar guru dalam bentuk kartu */}
      <div className="flex flex-wrap justify-center gap-8 py-10 px-4">
        {loading ? (
          <p className="text-center text-lg">Memuat data guru...</p> // Menampilkan pesan loading saat data sedang dimuat
        ) : filteredData.length > 0 ? (
          filteredData.map((guru) => (
            <div
              key={guru.id} // Menggunakan id sebagai key agar setiap elemen memiliki identitas unik
              className="bg-white rounded-lg shadow-md p-4 w-[400px] h-[500px] hover:shadow-lg transition-shadow duration-300"
            >
              {/* Menampilkan gambar guru */}
              <img
                src={`${apiClient.defaults.baseURL}/${guru.img}`} // Path gambar guru diambil dari API
                alt={`Foto ${guru.nama}`}
                className="rounded-t-lg w-full h-[390px] object-cover"
              />
              {/* Menampilkan nama dan NIP guru */}
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">{guru.nama}</p>
                <p className="text-gray-600">NIP: {guru.nip !== '-' ? guru.nip : 'Belum tersedia'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Tidak ada data yang cocok dengan pencarian.</p> // Menampilkan pesan jika tidak ada data yang sesuai dengan kata kunci pencarian
        )}
      </div>
    </div>
  );
};

export default DataGuru; // Mengekspor komponen agar bisa digunakan di file lain
