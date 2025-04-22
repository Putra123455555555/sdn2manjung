import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const TambahMisiModal = ({ isOpen, onClose, onMisiAdded }) => {
  const [misiText, setMisiText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTambahMisi = async () => {
    if (!misiText.trim()) return alert('Misi tidak boleh kosong');

    setLoading(true);
    try {
      const response = await apiClient.post('/api/profil/misi', { text: misiText });
      onMisiAdded(response.data.data);
      setMisiText('');
      onClose();
    } catch (error) {
      console.error('Gagal menambah misi:', error);
      alert('Gagal menambah misi');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Tambah Misi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <textarea className="w-full p-3 border rounded-lg transition bg-gray-50 min-h-[100px]" placeholder="Tulis misi baru..." value={misiText} onChange={(e) => setMisiText(e.target.value)} />

        <div className="mt-4 flex justify-end">
          <button onClick={handleTambahMisi} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center space-x-2 disabled:bg-gray-400 shadow-md" disabled={loading}>
            {loading ? (
              'Menambah...'
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} />
                <span>Tambah</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahMisiModal;
