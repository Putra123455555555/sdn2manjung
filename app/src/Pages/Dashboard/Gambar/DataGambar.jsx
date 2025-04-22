import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';
import ModalTambahGambar from './TambahDataGambar';

const DataGambar = () => {
  const [gallery, setGallery] = useState([]);
  const [fasilitas, setFasilitas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [kategori, setKategori] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const galleryResponse = await apiClient.get('/api/data-gambar/gallery');
        setGallery(galleryResponse.data || []);

        const fasilitasResponse = await apiClient.get('/api/data-gambar/fasilitas');
        setFasilitas(fasilitasResponse.data || []);
      } catch (error) {
        console.error('Error fetching data gambar:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (kategori) => {
    setKategori(kategori);
    setModalOpen(true);
  };

  const handleAddImage = async ({ title, file }) => {
    if (!file || !title) return;

    const formData = new FormData();
    formData.append('img', file);
    formData.append('kategori', kategori);
    formData.append('title', title);

    try {
      const response = await apiClient.post('/api/data-gambar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (kategori === 'gallery') {
        setGallery((prev) => [...prev, response.data.data]);
      } else {
        setFasilitas((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Gagal menambahkan gambar:', error);
    }
  };

  const handleDeleteImage = async (id, kategori) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus gambar ini?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/data-gambar/${id}`);

      if (kategori === 'gallery') {
        setGallery((prev) => prev.filter((img) => img.id !== id));
      } else {
        setFasilitas((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (error) {
      console.error('Gagal menghapus gambar:', error);
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
          <li className="text-gray-400 font-semibold">Data Gambar</li>
        </ol>
      </nav>

      {/* Gallery Section */}
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Data Gambar</h2>

        <h3 className="text-2xl font-bold mb-4">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((image) => (
            <div key={image.id} className="w-full">
              <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
                <img src={getImageUrl(image.img)} alt={image.title} className="w-full h-full object-cover rounded-xl" />
                <button onClick={() => handleDeleteImage(image.id, 'gallery')} className="absolute top-2 right-2 w-10 h-10 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition hover:bg-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-center font-semibold text-gray-800 mt-2">{image.title}</p>
            </div>
          ))}
          <div className="w-full">
            <div onClick={() => handleOpenModal('gallery')} className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-md hover:bg-gray-300 transition cursor-pointer">
              <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600 hover:text-gray-800 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Fasilitas Section */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4">Fasilitas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fasilitas.map((image) => (
            <div key={image.id} className="w-full">
              <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl shadow-md">
                <img src={getImageUrl(image.img)} alt={image.title} className="w-full h-full object-cover rounded-xl" />
                <button onClick={() => handleDeleteImage(image.id, 'fasilitas')} className="absolute top-2 right-2 w-10 h-10 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition hover:bg-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-center font-semibold text-gray-800 mt-2">{image.title}</p>
            </div>
          ))}
          <div className="w-full">
            <div onClick={() => handleOpenModal('fasilitas')} className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-md hover:bg-gray-300 transition cursor-pointer">
              <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600 hover:text-gray-800 transition" />
            </div>
          </div>
        </div>
      </div>

      <ModalTambahGambar isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddImage} kategori={kategori} />
    </div>
  );
};

export default DataGambar;
