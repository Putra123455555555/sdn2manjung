import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import apiClient from '../services/apiClient';

const Footer = () => {
  const [profilSekolah, setProfilSekolah] = useState(null);
  const [kontakSekolah, setKontakSekolah] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilRes, kontakRes] = await Promise.all([apiClient.get('/api/profil'), apiClient.get('/api/kontak-sekolah')]);
        setProfilSekolah(profilRes.data || {});
        setKontakSekolah(kontakRes.data || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="footer">
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between gap-8">
          <div className="flex-1 min-w-[350px]">
            <img src="/image/logosekolah.png" alt="Logo Sekolah" className="w-32 h-auto pb-4" />
            <p className="text-sm pb-4">{kontakSekolah?.alamat || 'Alamat belum tersedia'}</p>
            <p className="text-sm font-bold">{kontakSekolah?.telepon || 'Telepon belum tersedia'}</p>
          </div>

          <div className="space-y-4 flex-1 min-w-[150px] pt-10">
            <h3 className="text-lg font-bold text-white">Halaman Umum</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profil" className="hover:text-blue-400">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-blue-400">
                  Berita
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-blue-400">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-blue-400">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 flex-1 min-w-[250px] pt-10">
            <h3 className="text-lg font-bold text-white">Jelajah</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dataguru" className="hover:text-blue-400">
                  Data Guru
                </Link>
              </li>
              <li>
                <Link to="/ppdb" className="hover:text-blue-400">
                  PPDB SD NEGERI 2 MANJUNG
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 flex-1 min-w-[250px] pt-10">
            <h3 className="text-lg font-bold text-white">Sosial Media</h3>
            <div className="flex space-x-4">
              <a href={kontakSekolah?.linkFacebook || '#'} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href={kontakSekolah?.linkTwitter || '#'} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href={kontakSekolah?.linkInstagram || '#'} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} {profilSekolah?.namaSekolah || 'Nama Sekolah'}. All Rights Reserved.
        </div>
      </footer>
    </section>
  );
};

export default Footer;
