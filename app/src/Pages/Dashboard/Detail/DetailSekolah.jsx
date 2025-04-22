import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import EditDetailModal from './EditDetailModal';
import apiClient from '../../../services/apiClient';

const DetailSekolah = () => {
  const [detailSekolah, setDetailSekolah] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetailSekolah = async () => {
      try {
        const response = await apiClient.get('/api/detail-sekolah');
        setDetailSekolah(response.data);
      } catch (error) {
        console.error('Gagal mengambil data Detail Sekolah:', error);
      }
    };
    fetchDetailSekolah();
  }, []);

  const handleUpdateDetail = (updatedDetail) => {
    setDetailSekolah((prevDetail) => ({
      ...prevDetail,
      ...updatedDetail, // Memastikan hanya yang berubah diperbarui
    }));
  };
  

  if (!detailSekolah) {
    return <div className="text-center text-gray-600 text-lg">Loading...</div>;
  }

  const dataSekolah = [
    ['No Pendirian', detailSekolah.noPendirian],
    ['No Sertifikat', detailSekolah.noSertif],
    ['No Statistik', detailSekolah.noStatistik],
    ['NPSN', detailSekolah.npsn],
    ['Jenjang Akreditasi', detailSekolah.jenjangAkreditas],
    ['Tahun Didirikan', detailSekolah.thDidirikan],
    ['Tahun Operasional', detailSekolah.thOperasional],
    ['Status Tanah', detailSekolah.statusTanah],
    ['Luas Tanah', detailSekolah.luasTanah],
    ['Status Bangunan', detailSekolah.statusBangunan],
    ['Luas Bangunan', detailSekolah.luasBangunan],
    ['Total Lahan', detailSekolah.totalLahan],
  ];

  // Membagi data menjadi 2 kolom
  const splitData = (arr, num) => {
    const perColumn = Math.ceil(arr.length / num);
    return Array.from({ length: num }, (_, i) => arr.slice(i * perColumn, (i + 1) * perColumn));
  };

  const [col1, col2] = splitData(dataSekolah, 2);

  return (
    <div className="p-6 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-400 font-semibold">Detail Sekolah</li>
        </ol>
      </nav>

      {/* Detail Sekolah */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Detail Sekolah</h2>

        {/* Grid 2 Kolom dengan Kotak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom 1 */}
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 space-y-4">
            {col1.map(([label, value], index) => (
              <div key={index} className="border-b pb-4 last:border-none">
                <p className="text-gray-600 font-semibold">{label}</p>
                <p className="text-gray-800 ">{value || 'Tidak tersedia'}</p>
              </div>
            ))}
          </div>

          {/* Kolom 2 */}
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 space-y-4">
            {col2.map(([label, value], index) => (
              <div key={index} className="border-b pb-4 last:border-none">
                <p className="text-gray-600 font-semibold">{label}</p>
                <p className="text-gray-800 ">{value || 'Tidak tersedia'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Edit */}
        <div className="flex justify-start mt-6">
          <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center space-x-2">
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit Detail</span>
          </button>
        </div>
      </div>

      {/* Modal Edit Detail Sekolah */}
      <EditDetailModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} detailSekolah={detailSekolah} onUpdate={handleUpdateDetail} />
    </div>
  );
};

export default DetailSekolah;
