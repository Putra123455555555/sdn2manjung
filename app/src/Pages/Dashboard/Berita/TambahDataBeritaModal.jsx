import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUpload, faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";

const ModalTambahBerita = ({ isOpen, onClose, onSubmit, kategori }) => {
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deskripsi.trim() || !file) {
      return alert("Semua field harus diisi!");
    }
    setLoading(true);
    onSubmit({ title, deskripsi, file });

    setTimeout(() => {
      setTitle("");
      setDeskripsi("");
      setFile(null);
      setPreviewImg("");
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Tambah {kategori === "berita" ? "Berita" : "Prestasi"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Preview Gambar */}
        <div className="flex flex-col items-center">
          {previewImg ? (
            <img src={previewImg} alt="Preview" className="w-32 h-32 object-cover border rounded-lg shadow mb-3" />
          ) : (
            <div className="w-32 h-32 border rounded-lg flex items-center justify-center text-gray-400 bg-gray-100 mb-3">
              <FontAwesomeIcon icon={faUpload} size="2x" />
            </div>
          )}
          <label htmlFor="gambarUpload" className="flex items-center justify-center cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition border border-blue-300">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            <span>Pilih Gambar</span>
          </label>
          <input id="gambarUpload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        {/* Input Judul */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Judul</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>

        {/* Input Deskripsi */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Deskripsi</label>
          <textarea 
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50"
            rows="3"
          ></textarea>
        </div>

        {/* Tombol Simpan */}
        <div className="mt-6">
          <button onClick={handleSubmit} className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 shadow-md" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPlus} />}
            <span>{loading ? "Menyimpan..." : "Simpan"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTambahBerita;
