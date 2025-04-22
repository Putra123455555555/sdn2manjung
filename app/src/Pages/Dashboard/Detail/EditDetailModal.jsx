import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const EditDetailModal = ({ isOpen, onClose, detailSekolah, onUpdate }) => {
  const [formData, setFormData] = useState({ ...detailSekolah });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.put('/api/detail-sekolah/edit', formData);
      onUpdate(response.data); // Langsung update state parent
      onClose(); // Tutup modal
    } catch (error) {
      console.error('Gagal mengupdate detail sekolah:', error);
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
          <h2 className="text-2xl font-bold text-gray-800">Edit Detail Sekolah</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['No Pendirian', 'noPendirian'],
            ['No Sertifikat', 'noSertif'],
            ['No Statistik', 'noStatistik'],
            ['NPSN', 'npsn'],
            ['Jenjang Akreditasi', 'jenjangAkreditas'],
            ['Tahun Didirikan', 'thDidirikan'],
            ['Tahun Operasional', 'thOperasional'],
            ['Status Tanah', 'statusTanah'],
            ['Luas Tanah', 'luasTanah'],
            ['Status Bangunan', 'statusBangunan'],
            ['Luas Bangunan', 'luasBangunan'],
            ['Total Lahan', 'totalLahan'],
          ].map(([label, name], index) => (
            <div key={index}>
              <label htmlFor={name} className="block text-gray-700 font-medium">
                {label}
              </label>
              <input type="text" id={name} name={name} value={formData[name] || ''} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50" />
            </div>
          ))}

          {/* Tombol Simpan & Batal (Dibuat Full Width di Bawah) */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
              Batal
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 disabled:bg-gray-400" disabled={loading}>
              {loading ? (
                <span>Menyimpan...</span>
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

export default EditDetailModal;
