import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { infoCards } from '../assets/schoolData'; // Import infoCards dari file lokal

const LandingPage = () => {
  const [profilSekolah, setProfilSekolah] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/profil');
        const data = response.data;
        if (data) {
          setProfilSekolah(data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Section Utama Landing Page */}
      <section id="landing">
        {/* Background Header Section */}
        <div className="bg-cover bg-center w-full h-screen flex items-center justify-center" style={{ backgroundImage: "url('/image/bgheader.jpg')" }}>
          <div className="text-center px-8 space-y-8 sm:space-y-4">
            <h1 className="text-6xl font-bold text-white">{profilSekolah?.namaSekolah || 'Nama Sekolah'}</h1>
            <h3 className="text-2xl text-white">{profilSekolah?.motto || 'Motto Sekolah'}</h3>
            <div className="flex space-x-4 mb-10 justify-center ">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <Link to="/kontak">Hubungi Kami</Link>
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                <Link to="/ppdb">Informasi PPDB</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="bg-[#F9FBFD] py-16 px-8 md:px-16">
          <div className="flex flex-wrap -mx-4">
            {/* Profil Sekolah */}
            <div className="w-full md:w-1/2 px-4 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Profil Sekolah</h2>
              <p className="text-gray-600">{profilSekolah?.tentang || 'Deskripsi sekolah belum tersedia.'}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <Link to="/profil">Lihat Selengkapnya</Link>
              </button>
            </div>

            {/* Informasi Pendukung */}
            <div className="w-full pt-4 md:w-1/2 px-4 grid grid-cols-2 gap-4">
              {infoCards.map((card) => (
                <div key={card.id} className="bg-white p-4 rounded-lg shadow-md">
                  <img src={`/image/${card.icon}`} alt={card.title} className="h-16 w-auto my-4" />
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
