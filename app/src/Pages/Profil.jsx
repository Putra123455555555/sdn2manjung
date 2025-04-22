import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../Components/ProfilSlider';
import apiClient from '../services/apiClient';
import ProfilDetail from '../Components/ProfilDetail';

const Profil = () => {
  // State untuk menyimpan data profil sekolah
  const [profilSekolah, setProfilSekolah] = useState({
    namaSekolah: '',
    visi: '',
    tujuan: '',
    strategi: '',
    misi: [],
    imgSlides: [],
  });

  // State untuk menyimpan kontak sekolah
  const [kontakSekolah, setKontakSekolah] = useState({});

  // State untuk menyimpan detail tambahan sekolah
  const [detailSekolah, setDetailSekolah] = useState({});

  // useEffect untuk mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Menggunakan Promise.all agar pemanggilan API dilakukan secara paralel untuk efisiensi
        const [profilResponse, kontakResponse, detailResponse] = await Promise.all([apiClient.get('/api/profil'), apiClient.get('/api/kontak-sekolah'), apiClient.get('/api/detail-sekolah')]);

        // Menyimpan data yang diterima ke dalam state masing-masing
        setProfilSekolah(profilResponse.data ?? { misi: [], imgSlides: [] });
        setKontakSekolah(kontakResponse.data ?? {});
        setDetailSekolah(detailResponse.data ?? {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Memanggil fungsi fetchData untuk mengambil data dari API
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Bagian Header dengan gambar latar */}
      <div className="bg-cover bg-center w-full h-screen flex flex-col items-center" style={{ backgroundImage: "url('/image/bgheader.jpg')" }}>
        {/* Nama sekolah ditampilkan pada header */}
        <h1 className="text-3xl font-semibold text-white pt-12">{profilSekolah.namaSekolah || 'Nama Sekolah'}</h1>

        {/* Komponen slider untuk menampilkan gambar dari API */}
        <Slider slides={profilSekolah.imgSlides} />
      </div>

      {/* Bagian Visi, Misi, dan Tujuan */}
      <h1 className="text-2xl font-bold text-black text-center pt-10 bg-white">VISI, MISI DAN TUJUAN</h1>

      <div className="flex flex-col lg:flex-row gap-6 px-6 py-10 justify-center items-center">
        {/* Kartu untuk menampilkan Visi */}
        <div className="basis-1/2 sm:basis-1/3 bg-gray-200 text-black rounded-lg shadow-md py-12 px-6 flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold mb-4">Visi</h1>
          <p className="text-lg">{profilSekolah.visi || 'Visi belum tersedia'}</p>
        </div>

        {/* Kartu untuk menampilkan Misi dalam bentuk daftar */}
        <div className="basis-1/2 sm:basis-1/4 bg-gray-200 text-black rounded-lg shadow-md py-8 px-6 flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold mb-4">Misi</h1>
          <ul className="list-disc text-lg text-left px-4">{profilSekolah.misi.length > 0 ? profilSekolah.misi.map((item, index) => <li key={index}>{item.text}</li>) : <li>Misi belum tersedia</li>}</ul>
        </div>
      </div>

      {/* Bagian Tujuan dan Strategi Sekolah */}
      <div className="flex flex-col space-y-6 p-6 gap-6 bg-white items-center">
        {/* Kartu Tujuan Sekolah */}
        <div className="w-auto sm:w-auto md:w-[1100px] bg-gray-200 text-black text-justify rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold m-6 text-center">Tujuan Sekolah pada Tahun 2025 Diharapkan :</h1>
          <p className="text-lg leading-relaxed m-6 text-center">{profilSekolah.tujuan || 'Tujuan belum tersedia'}</p>
        </div>

        {/* Kartu Strategi Sekolah */}
        <div className="w-auto sm:w-auto md:w-[1100px] bg-gray-200 text-black text-justify rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold m-6 text-center">Strategi Sekolah :</h1>
          <p className="text-lg leading-relaxed m-6 text-center">{profilSekolah.strategi || 'Strategi belum tersedia'}</p>
        </div>
      </div>

      {/* Nama Sekolah di tengah halaman */}
      <h1 className="text-2xl font-bold text-black text-center p-10 bg-gray-100">{profilSekolah.namaSekolah}</h1>

      {/* Bagian Grid untuk menampilkan informasi sekolah */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl p-4">
          {/* Kolom pertama berisi informasi kontak sekolah */}
          <div className="col-span-1 row-span-3 bg-blue-500 text-white px-4 py-2 md:py-6 sm:py-8 flex flex-col items-center justify-center rounded-lg shadow-lg space-y-4">
            <img src="/image/icon5.png" className="bg-white rounded-full h-20 p-2" />
            <h1 className="text-lg font-semibold text-center">Nama Sekolah </h1>
            <p className="text-md">{profilSekolah.namaSekolah || 'Nama sekolah belum tersedia'}</p>

            <h1 className="text-lg font-semibold text-center">Kepala Sekolah </h1>
            <p className="text-md">{profilSekolah.kepalaSekolah || 'Kepala sekolah belum tersedia'}</p>

            <img src="/image/icon2.png" className="bg-white rounded-full h-20 p-4 mt-8" />
            <h1 className="text-lg font-semibold text-center">Alamat</h1>
            <p className="text-md text-center">{kontakSekolah.alamat || 'Alamat belum tersedia'}</p>

            <img src="/image/icon7.png" className="bg-white rounded-full h-20 p-4" />
            <h1 className="text-lg font-semibold text-center">Website & Email</h1>
            <p className="text-md text-center">{kontakSekolah.email || 'Email belum tersedia'}</p>

            <h1 className="text-lg font-semibold text-center">No. Telp</h1>
            <p className="text-md text-center">{kontakSekolah.telepon || 'No.Telp belum tersedia'}</p>
          </div>

          {/* Komponen tambahan untuk detail sekolah */}
          <ProfilDetail detailSekolah={detailSekolah} />
        </div>
      </div>

      {/* Tombol untuk melihat struktur organisasi sekolah */}
      <div className="flex justify-center py-2 bg-gray-100">
        <button className="px-4 py-2 rounded-lg hover:text-blue-600">
          <Link to="/struktur">Lihat Struktur Organisasi {'>>'}</Link>
        </button>
      </div>
    </div>
  );
};

export default Profil;
