import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import TambahMisiModal from './TambahMisiModal';
import EditProfilModal from './EditProfilModal';
import apiClient from '../../../services/apiClient';

const ProfilSekolah = () => {
  // State untuk menyimpan data profil sekolah
  const [profilSekolah, setProfilSekolah] = useState(null);
  // State untuk menyimpan daftar gambar slide
  const [imgSlides, setImgSlides] = useState([]);
  // State untuk mengontrol modal tambah misi
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk mengontrol modal edit profil
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // useEffect untuk mengambil data profil sekolah saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get('/api/profil');
        const data = response.data;
        if (data) {
          setProfilSekolah(data);
          setImgSlides(data.imgSlides || []);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setImgSlides([]);
      }
    };
    fetchProfileData();
  }, []);

  // Fungsi untuk memperbarui data profil setelah diedit
  const handleUpdateProfil = (updatedProfil) => {
    setProfilSekolah(updatedProfil);
  };

  // Fungsi untuk menambahkan misi baru ke dalam profil sekolah
  const handleMisiAdded = (newMisi) => {
    setProfilSekolah((prevState) => ({
      ...prevState,
      misi: [...(prevState.misi || []), newMisi],
    }));
  };

  // Fungsi untuk menghapus misi berdasarkan ID
  const handleDeleteMisi = async (id) => {
    try {
      await apiClient.delete(`/api/profil/misi/${id}`);
      setProfilSekolah((prevState) => ({
        ...prevState,
        misi: prevState.misi.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error('Gagal menghapus misi:', error);
    }
  };

  // Fungsi untuk menambahkan gambar slide baru
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('img', file);

    try {
      const response = await apiClient.post('/api/profil/img-slide', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImgSlides((prevSlides) => [...prevSlides, response.data.data]);
    } catch (error) {
      console.error('Gagal menambahkan gambar slide:', error);
    }
  };

  // Fungsi untuk menghapus gambar slide berdasarkan ID
  const handleDeleteImage = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus gambar ini?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/profil/img-slide/${id}`);
      setImgSlides((prevSlides) => prevSlides.filter((img) => img.id !== id));
    } catch (error) {
      console.error('Gagal menghapus gambar:', error);
    }
  };

  // Menampilkan teks loading jika data belum tersedia
  if (!profilSekolah) {
    return <div className="text-center text-gray-600 text-lg">Loading...</div>;
  }


  return (
    //profile sekolah
    <div className="p-6 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-400 font-semibold">Profil</li>
        </ol>
      </nav>

      {/* Profil Sekolah */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profil Sekolah</h2>
        <div className="space-y-6">
          {[
            ['Nama Sekolah', profilSekolah?.namaSekolah],
            ['Kepala Sekolah', profilSekolah?.kepalaSekolah],
            ['Motto', profilSekolah?.motto],
            ['Tentang', profilSekolah?.tentang],
            ['Tujuan', profilSekolah?.tujuan],
            ['Strategi', profilSekolah?.strategi],
            ['Visi', profilSekolah?.visi],
          ].map(([label, value], index) => (
            <div key={index} className="border-b pb-4 last:border-none">
              <p className="text-gray-600 font-semibold">{label}</p>
              <p className="text-gray-800 text-justify">{value || 'Tidak tersedia'}</p>
            </div>
          ))}


          {/* Misi */}
          <div className="border-b pb-4">
            <p className="text-gray-600 font-semibold mb-2">Misi</p>
            {profilSekolah?.misi?.length > 0 ? (
              <ul className="space-y-2">
                {profilSekolah.misi.map((misi, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow">
                    <span className="text-gray-700">{misi.text}</span>
                    <button onClick={() => handleDeleteMisi(misi.id)} className="text-red-600 hover:text-red-800 transition">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Belum ada misi.</p>
            )}
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(true)} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all flex items-center space-x-2">
                <FontAwesomeIcon icon={faPlus} />
                <span>Tambah Misi</span>
              </button>
            </div>
          </div>

          {/* Tombol Edit */}
          <div className="flex justify-start mt-6">
            <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center space-x-2">
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Struktur Organisasi */}
      {profilSekolah?.strukturImg && (
        <div className="bg-white shadow-xl rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Struktur Organisasi</h2>
          <div className="flex justify-center">
            <img src={`${apiClient.defaults.baseURL}/${profilSekolah.strukturImg}`} alt="Struktur Sekolah" className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto object-cover rounded-xl shadow-md border" />
          </div>
        </div>
      )}

      {/* Gambar Slide */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Gambar Slide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imgSlides.map((image) => (
            <div key={image.id} className="relative group w-full h-80">
              <img src={`${apiClient.defaults.baseURL}/${image.img}`} alt="Gambar Slide" className="w-full h-full object-cover rounded-xl shadow-md border" />
              <button onClick={() => handleDeleteImage(image.id)} className="absolute top-2 right-2 w-12 h-12 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition hover:bg-red-700">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}

          {/* Tombol Tambah Gambar */}
          <label className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition cursor-pointer">
            <input type="file" className="hidden" onChange={handleAddImage} />
            <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600 hover:text-gray-800 transition" />
          </label>
        </div>
      </div>

      {/* Modal Edit Profil */}
      <EditProfilModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} profilSekolah={profilSekolah} onUpdate={handleUpdateProfil} />

      {/* Modal Tambah Misi */}
      <TambahMisiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onMisiAdded={handleMisiAdded} />
    </div>
  );
};

export default ProfilSekolah;
