import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faSchool } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/apiClient';

const Kontak = () => {
  const [kontak, setKontak] = useState({
    alamat: '',
    telepon: '',
    email: '',
    linkMaps: '',
  });
  const [namaSekolah, setNamaSekolah] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Menggunakan Promise.all untuk fetch data secara paralel
        const [kontakResponse, profilResponse] = await Promise.all([apiClient.get('/api/kontak-sekolah'), apiClient.get('/api/profil')]);

        setKontak(kontakResponse.data || {});
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        console.error('Error fetching kontak:', error);
      } finally {
        setLoading(false); // Pastikan loading selesai setelah fetch
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-cover bg-center w-full h-[300px] flex items-center justify-center" style={{ backgroundImage: `url('/image/bgheader.jpg')` }}>
        <div className="text-white text-center">
          <h1 className="text-3xl font-semibold p-3">Kontak Sekolah</h1>
          <p className="text-xl">Kontak - {namaSekolah}</p>
        </div>
      </div>

      {/* Jika masih loading, tampilkan pesan loading */}
      {loading ? (
        <div className="text-center py-10 text-xl font-semibold">Loading kontak...</div>
      ) : (
        <>
          {/* Section Deskripsi */}
          <h1 className="text-center text-large pt-10 px-10">Punya pertanyaan? Anda dapat menghubungi kami di Hotline:</h1>

          {/* Section Kontak */}
          <div className="w-full flex flex-wrap justify-center p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Alamat Sekolah */}
              <div className="max-w-80 shadow-lg rounded-lg bg-[#FBFBFB] p-10 text-center">
                <FontAwesomeIcon icon={faSchool} className="text-blue-500 text-6xl mb-4" />
                <h2 className="text-lg text-black">{kontak.alamat || 'Alamat tidak tersedia'}</h2>
              </div>
              {/* Nomor Telepon Sekolah */}
              <div className="max-w-80 shadow-lg rounded-lg bg-[#FBFBFB] p-10 text-center">
                <FontAwesomeIcon icon={faPhone} className="text-blue-500 text-6xl mb-4" />
                <h2 className="text-lg text-black">{kontak.telepon || 'Telepon tidak tersedia'}</h2>
              </div>
              {/* Email Sekolah */}
              <div className="max-w-80 shadow-lg rounded-lg bg-[#FBFBFB] p-10 text-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-6xl mb-4" />
                <h2 className="text-lg text-black">{kontak.email || 'Email tidak tersedia'}</h2>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="pt-6 flex justify-center">
            {kontak.linkMaps ? <iframe className="w-4/5 h-96 pb-5 rounded-lg shadow-lg" src={kontak.linkMaps} loading="lazy"></iframe> : <p className="text-center text-gray-500 pb-5">Lokasi belum tersedia</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Kontak;
