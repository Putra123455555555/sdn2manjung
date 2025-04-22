import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import EditKontakModal from './EditKontakModal';
import apiClient from '../../../services/apiClient';

const KontakSekolah = () => {
  const [kontak, setKontak] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fungsi untuk mengambil data kontak dari server
  const fetchKontak = async () => {
    try {
      const response = await apiClient.get('/api/kontak-sekolah');
      setKontak(response.data);
    } catch (error) {
      console.error('Gagal mengambil data Kontak Sekolah:', error);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  if (!kontak) {
    return <div className="text-center text-gray-600 text-lg">Loading...</div>;
  }

  const dataKontak = [
    ['Alamat', kontak.alamat],
    ['Telepon', kontak.telepon],
    ['Email', kontak.email],
    ['Google Maps', kontak.linkMaps],
    ['Facebook', kontak.linkFacebook],
    ['Twitter', kontak.linkTwitter],
    ['Instagram', kontak.linkInstagram],
    ['PPDB', kontak.linkPpdb],
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-400 font-semibold">Kontak Sekolah</li>
        </ol>
      </nav>

      {/* Kontak Sekolah */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Kontak Sekolah</h2>

        {/* List Data */}
        <div className="space-y-4">
          {dataKontak.map(([label, value], index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col min-h-[60px]">
              <p className="text-gray-600 font-semibold">{label}</p>
              {value?.startsWith('http') ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                  {value}
                </a>
              ) : (
                <p className="text-gray-800 break-words">{value || 'Tidak tersedia'}</p>
              )}
            </div>
          ))}
        </div>

        {/* Tombol Edit */}
        <div className="flex justify-start mt-6">
          <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center space-x-2">
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit Kontak</span>
          </button>
        </div>
      </div>

      {/* Modal Edit Kontak Sekolah */}
      <EditKontakModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        kontak={kontak}
        onUpdate={fetchKontak} // Ambil data terbaru setelah update
      />
    </div>
  );
};

export default KontakSekolah;
