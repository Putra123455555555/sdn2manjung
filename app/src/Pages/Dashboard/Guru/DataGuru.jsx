import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import TambahGuruModal from './TambahGuruModal';
import EditGuruModal from './EditGuruModal';
import apiClient from '../../../services/apiClient';

const DataGuru = () => {
  const [dataGuru, setDataGuru] = useState([]);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [guruToEdit, setGuruToEdit] = useState(null);

  useEffect(() => {
    const fetchDataGuru = async () => {
      try {
        const response = await apiClient.get('/api/data-guru');
        setDataGuru(response.data);
      } catch (error) {
        console.error('Error fetching data guru:', error);
        setDataGuru([]);
      }
    };
    fetchDataGuru();
  }, []);

  const handleGuruAdded = (newGuru) => {
    setDataGuru((prev) => [...prev, newGuru]);
  };

  const handleGuruUpdated = (updatedGuru) => {
    setDataGuru((prev) => prev.map((guru) => (guru.id === updatedGuru.id ? updatedGuru : guru)));
  };

  const handleDeleteGuru = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus guru ini?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/data-guru/${id}`);
      setDataGuru((prev) => prev.filter((guru) => guru.id !== id));
    } catch (error) {
      console.error('Gagal menghapus guru:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-400 font-semibold">Data Guru</li>
        </ol>
      </nav>

      {/* Tabel Data Guru */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Data Guru</h2>
        {dataGuru.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Foto</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">NIP</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataGuru.map((guru) => (
                <tr key={guru.id} className="border-b">
                  <td className="p-3">
                    <img src={`${apiClient.defaults.baseURL}/${guru.img}`} alt={guru.nama} className="w-16 h-16 object-cover rounded-full shadow" />
                  </td>
                  <td className="p-3">{guru.nama}</td>
                  <td className="p-3">{guru.nip}</td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => {
                        setGuruToEdit(guru);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition text-xl"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteGuru(guru.id)} className="text-red-600 hover:text-red-800 transition text-xl">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">Belum ada data guru.</p>
        )}

        {/* Tombol Tambah */}
        <div className="flex justify-start mt-6">
          <button onClick={() => setIsTambahModalOpen(true)} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlus} />
            <span>Tambah Guru</span>
          </button>
        </div>
      </div>

      {/* Modal Tambah Guru */}
      <TambahGuruModal isOpen={isTambahModalOpen} onClose={() => setIsTambahModalOpen(false)} onGuruAdded={handleGuruAdded} />

      {/* Modal Edit Guru */}
      <EditGuruModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} guru={guruToEdit} onGuruUpdated={handleGuruUpdated} />
    </div>
  );
};

export default DataGuru;
