import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const EditKontakModal = ({ isOpen, onClose, kontak, onUpdate }) => {
  const [formData, setFormData] = useState({ ...kontak });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(kontak);
  }, [kontak]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.put('/api/kontak-sekolah/edit', formData);
      await onUpdate();
      onClose();
    } catch (error) {
      console.error('Gagal mengupdate kontak sekolah:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Edit Kontak Sekolah</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Alamat & Google Maps menggunakan textarea agar teks panjang pindah ke baris baru */}
          {[
            ['Alamat', 'alamat'],
            ['Google Maps', 'linkMaps'],
          ].map(([label, name], index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <textarea
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50 resize-none min-h-[70px] break-words whitespace-pre-wrap"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              />
            </div>
          ))}

          {/* Input lainnya tetap menggunakan input text */}
          {[
            ['Telepon', 'telepon'],
            ['Email', 'email'],
            ['Facebook', 'linkFacebook'],
            ['Twitter', 'linkTwitter'],
            ['Instagram', 'linkInstagram'],
            ['PPDB', 'linkPpdb'],
          ].map(([label, name], index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50 min-h-[50px] break-words whitespace-pre-wrap"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              />
            </div>
          ))}

          {/* Tombol Simpan & Batal */}
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
              Batal
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 disabled:bg-gray-400" disabled={loading}>
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  <span>Simpan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKontakModal;
