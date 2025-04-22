import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSchool, faInfoCircle, faContactCard, faChalkboardTeacher, faImage, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  // Daftar menu sidebar
  const sidebarLinks = [
    { id: 1, name: 'Profil', icon: faSchool, link: '/dashboard/profil' },
    { id: 2, name: 'Informasi Sekolah', icon: faInfoCircle, link: '/dashboard/detail-sekolah' },
    { id: 3, name: 'Kontak Sekolah', icon: faContactCard, link: '/dashboard/kontak-sekolah' },
    { id: 4, name: 'Data Guru', icon: faChalkboardTeacher, link: '/dashboard/data-guru' },
    { id: 5, name: 'Data Gambar', icon: faImage, link: '/dashboard/data-gambar' },
    { id: 6, name: 'Data Berita', icon: faNewspaper, link: '/dashboard/data-berita' },
  ];

  useEffect(() => {
    const currentLink = sidebarLinks.find((link) => link.link === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.id);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await apiClient.delete('/api/auth/logout');
      localStorage.removeItem('accessToken'); // Hapus token saat logout
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r bg-[#101524] text-white">
      {/* Logo */}
      <div className="flex justify-center items-center mt-6 mb-8">
        <img src="/image/logosekolah.png" alt="logo" className="w-16 hidden md:block" />
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {sidebarLinks.map((link) => (
          <li key={link.id} className={`font-medium rounded-md py-3 px-5 hover:bg-gray-700 ${activeLink === link.id ? 'bg-gray-700' : ''}`}>
            <Link to={link.link} onClick={() => setActiveLink(link.id)} className="flex justify-center md:justify-start items-center space-x-3">
              <FontAwesomeIcon icon={link.icon} className="text-lg" />
              <span className="text-sm hidden md:block">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-3 px-5 py-3 bg-red-700 text-white rounded-md hover:bg-red-600 transition">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          <span className="hidden md:inline text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
