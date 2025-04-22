import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const EditGuruModal = ({ isOpen, onClose, guru, onGuruUpdated }) => {
  const [nama, setNama] = useState('');
  const [nip, setNip] = useState('');
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guru) {
      setNama(guru.nama || '');
      setNip(guru.nip || '');
      setPreviewImg(guru.img ? `${apiClient.defaults.baseURL}/${guru.img}` : '');
    }
  }, [guru]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleUpdateGuru = async () => {
    if (!nama.trim() || !nip.trim()) return alert('Nama dan NIP tidak boleh kosong');

    setLoading(true);
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('nip', nip);
    if (img) formData.append('img', img);

    try {
      const response = await apiClient.put(`/api/data-guru/${guru.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onGuruUpdated(response.data.data);
      onClose();
    } catch (error) {
      console.error('Gagal mengupdate data guru:', error);
      alert('Gagal mengupdate guru');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !guru) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Edit Guru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Upload Foto */}
        <div className="flex flex-col items-center">
          {previewImg && <img src={previewImg} alt="Foto Guru" className="w-32 h-32 object-cover border rounded-full shadow mb-3" />}
          <label htmlFor="editGuruImg" className="flex items-center justify-center cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-md transition border border-blue-300">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            <span>Pilih Gambar</span>
          </label>
          <input id="editGuruImg" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {/* Input Nama */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Nama Guru</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>

        {/* Input NIP */}
        <div className="mt-3">
          <label className="block text-gray-700 font-medium mb-1">NIP</label>
          <input type="text" value={nip} onChange={(e) => setNip(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>

        {/* Tombol Simpan */}
        <div className="mt-4 flex justify-end">
          <button onClick={handleUpdateGuru} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 shadow-md" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
            <span>{loading ? 'Menyimpan...' : 'Simpan'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditGuruModal;
