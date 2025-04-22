import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import apiClient from '../services/apiClient';

const Ppdb = () => {
  const [kontak, setKontak] = useState({ linkPpdb: '' });
  const [namaSekolah, setNamaSekolah] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kontakResponse, profilResponse] = await Promise.all([
          apiClient.get('/api/kontak-sekolah'),
          apiClient.get('/api/profil')
        ]);

        // Cek apakah datanya langsung atau nested
        setKontak(kontakResponse.data || {}); // <- Sesuaikan jika responsenya nested
        setNamaSekolah(profilResponse.data.namaSekolah || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Bagian Header */}
      <div
        className="bg-cover bg-center w-full h-[500px] flex items-center justify-center"
        style={{ backgroundImage: "url('/image/bgheader.jpg')" }}
      >
        <div className="text-white text-center">
          <h1 className="text-3xl font-semibold p-3 text-center">
            Selamat Datang Calon Peserta Didik Baru <br />
            {namaSekolah || 'SD Negeri 2 Manjung'}<br />
            Tahun Pelajaran 2025-2026
          </h1>
          <p className="text-xl pb-8">PPDB - {namaSekolah || 'SD N 2 Manjung'} Wonogiri</p>

          {/* Hanya tampilkan tombol jika link tersedia */}
          {kontak.linkPpdb && (
            <button className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-lg hover:bg-blue-600">
              <Link to={kontak.linkPpdb} target="_blank" rel="noopener noreferrer">
                Daftar Sekarang
              </Link>
            </button>
          )}
        </div>
      </div>

      {/* Bagian Informasi Pendaftaran */}
      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-[700px] bg-white bg-opacity-80 border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">INFORMASI</h1>
          <p className="text-md text-gray-700 text-center leading-relaxed">
            Sebagai informasi, pendaftaran untuk periode 2025-2026 untuk jalur
            <strong> Afirmasi</strong>, <strong>Perpindahan Orangtua/Wali</strong>, dan 
            <strong> Prestasi</strong> akan dibuka pada tanggal 
            <strong> 30 Juni s.d 4 Juli 2025</strong>, sedangkan untuk jalur 
            <strong> Zonasi</strong> akan dibuka pada tanggal 
            <strong> 5 Juli – 9 Juli 2025</strong>. <br /><br />
            Simulasi pendaftaran sudah dibuka, namun di luar tanggal yang
            disebutkan di atas, akan dihapus kembali. <br /><br />
            Terima Kasih.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ppdb;
