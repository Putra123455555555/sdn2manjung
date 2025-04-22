import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUpload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../services/apiClient";

const DEFAULT_IMAGE = "/images/default-avatar.png"; // Path gambar default (sesuaikan dengan struktur proyek)

const TambahGuruModal = ({ isOpen, onClose, onGuruAdded }) => {
  const [formData, setFormData] = useState({ nama: "", nip: "", img: null });
  const [previewImg, setPreviewImg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input teks
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, img: file }));
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  // Handle tambah guru
  const handleTambahGuru = async () => {
    if (!formData.nama.trim() || !formData.nip.trim() || !formData.img) {
      return alert("Semua kolom harus diisi!");
    }

    setLoading(true);
    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("nip", formData.nip);
    form.append("img", formData.img);

    try {
      const response = await apiClient.post("/api/data-guru", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onGuruAdded(response.data.data);
      setFormData({ nama: "", nip: "", img: null });
      setPreviewImg(""); // Reset preview gambar
      onClose();
    } catch (error) {
      console.error("Gagal menambah guru:", error);
      alert("Gagal menambah guru");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Tambah Guru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Upload Foto */}
        <div className="flex flex-col items-center">
          <img src={previewImg || DEFAULT_IMAGE} alt="Foto Guru" className="w-32 h-32 object-cover border rounded-full shadow mb-3" />
          <label htmlFor="guruImg" className="flex items-center justify-center cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition border border-blue-300">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            <span>Pilih Gambar</span>
          </label>
          <input id="guruImg" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        {/* Input Nama */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Nama Guru</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>

        {/* Input NIP */}
        <div className="mt-3">
          <label className="block text-gray-700 font-medium mb-1">NIP</label>
          <input type="text" name="nip" value={formData.nip} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>

        {/* Tombol Simpan */}
        <div className="mt-6">
          <button onClick={handleTambahGuru} className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 shadow-md" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPlus} />}
            <span>{loading ? "Menambah..." : "Tambah"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TambahGuruModal;
