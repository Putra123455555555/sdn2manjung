import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const EditProfilModal = ({ isOpen, onClose, profilSekolah, onUpdate }) => {
  const [formData, setFormData] = useState({
    namaSekolah: '',
    kepalaSekolah:'',
    motto: '',
    tentang: '',
    tujuan: '',
    strategi: '',
    visi: '',
    strukturImg: null,
  });

  const [previewImg, setPreviewImg] = useState('');
  const [loading, setLoading] = useState(false);

  // Perbarui data saat modal dibuka
  useEffect(() => {
    if (profilSekolah) {
      setFormData({
        namaSekolah: profilSekolah.namaSekolah || '',
        kepalaSekolah: profilSekolah.kepalaSekolah || '',
        motto: profilSekolah.motto || '',
        tentang: profilSekolah.tentang || '',
        tujuan: profilSekolah.tujuan || '',
        strategi: profilSekolah.strategi || '',
        visi: profilSekolah.visi || '',
        strukturImg: null, // Pastikan gambar tidak langsung dikonversi ke file
      });

      setPreviewImg(profilSekolah.strukturImg ? `${apiClient.defaults.baseURL}/${profilSekolah.strukturImg}` : '');
    }
  }, [profilSekolah]);

  // Handle perubahan input teks
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle perubahan file gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, strukturImg: file });
      setPreviewImg(URL.createObjectURL(file)); // Tampilkan preview sementara
    }
  };

  // Handle penyimpanan data
  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) updateData.append(key, formData[key]);
      });

      const response = await apiClient.put('/api/profil', updateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onUpdate(response.data.data);
      onClose();
    } catch (error) {
      console.error('Gagal menyimpan perubahan:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

  


        {/* Form */}
        <div className="space-y-4">
          {['namaSekolah','kepalaSekolah', 'motto', 'tentang', 'tujuan', 'strategi', 'visi'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-gray-700 font-medium capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50 min-h-[120px]"
                placeholder={`Masukkan ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
              />
            </div>
          ))}

          {/* Upload Struktur Organisasi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Struktur Organisasi</h3>
            {previewImg && <img src={previewImg} alt="Struktur Organisasi" className="w-full h-56 object-cover border rounded-lg mb-3" />}
            <label htmlFor="strukturImg" className="flex items-center justify-center cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-md transition border border-blue-300">
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              <span>Pilih Gambar</span>
            </label>
            <input id="strukturImg" type="file" onChange={handleFileChange} className="hidden" />
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="mt-6">
          <button onClick={handleSave} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 shadow-md" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
            <span>{loading ? 'Menyimpan...' : 'Simpan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilModal;
