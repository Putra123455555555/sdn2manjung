import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';
import ModalTambahBerita from './TambahDataBeritaModal';

const DataBerita = () => {
  const [berita, setBerita] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [kategori, setKategori] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beritaResponse = await apiClient.get('/api/data-berita/berita');
        setBerita(beritaResponse.data || []);

        const prestasiResponse = await apiClient.get('/api/data-berita/prestasi');
        setPrestasi(prestasiResponse.data || []);
      } catch (error) {
        console.error('Error fetching data berita:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (kategori) => {
    setKategori(kategori);
    setModalOpen(true);
  };

  const handleAddBerita = async ({ title, deskripsi, file }) => {
    if (!file || !title || !deskripsi) return;

    const formData = new FormData();
    formData.append('img', file);
    formData.append('kategori', kategori);
    formData.append('title', title);
    formData.append('deskripsi', deskripsi);

    try {
      const response = await apiClient.post('/api/data-berita', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (kategori === 'berita') {
        setBerita((prev) => [...prev, response.data.data]);
      } else {
        setPrestasi((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Gagal menambahkan berita:', error);
    }
  };

  const handleDeleteBerita = async (id, kategori) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus berita ini?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/data-berita/${id}`);

      if (kategori === 'berita') {
        setBerita((prev) => prev.filter((item) => item.id !== id));
      } else {
        setPrestasi((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Gagal menghapus berita:', error);
    }
  };

  const getImageUrl = (imgPath) => `${apiClient.defaults.baseURL}/${imgPath}`;

  return (
    <div className="p-6 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-400 font-semibold">Data Berita</li>
        </ol>
      </nav>

      {/* Berita Section */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Data Berita</h2>

        <h3 className="text-2xl font-bold mb-4">Berita</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div key={item.id} className="w-full">
              <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
                <img src={getImageUrl(item.img)} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                <button onClick={() => handleDeleteBerita(item.id, 'berita')} className="absolute top-2 right-2 w-10 h-10 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition hover:bg-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-center font-semibold text-gray-800 mt-2">{item.title}</p>
              <p className="text-center text-gray-600 text-sm">{item.deskripsi}</p>
            </div>
          ))}
          <div className="w-full">
            <div onClick={() => handleOpenModal('berita')} className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-md hover:bg-gray-300 transition cursor-pointer">
              <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600 hover:text-gray-800 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Prestasi Section */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">Prestasi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {prestasi.map((item) => (
            <div key={item.id} className="w-full">
              <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
                <img src={getImageUrl(item.img)} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                <button onClick={() => handleDeleteBerita(item.id, 'prestasi')} className="absolute top-2 right-2 w-10 h-10 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition hover:bg-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-center font-semibold text-gray-800 mt-2">{item.title}</p>
              <p className="text-center text-gray-600 text-sm">{item.deskripsi}</p>
            </div>
          ))}
          <div className="w-full">
            <div onClick={() => handleOpenModal('prestasi')} className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-md hover:bg-gray-300 transition cursor-pointer">
              <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600 hover:text-gray-800 transition" />
            </div>
          </div>
        </div>
      </div>

      <ModalTambahBerita isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddBerita} kategori={kategori} />
    </div>
  );
};

export default DataBerita;
