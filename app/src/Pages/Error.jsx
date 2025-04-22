import React from "react";
import { useNavigate } from "react-router-dom"; // Jika menggunakan React Router

const ErrorPage = () => {
  const navigate = useNavigate(); // Untuk tombol kembali ke beranda

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Ilustrasi 404 */}
      <img
        src="/image/error-illustration.png" // Gantilah dengan ilustrasi yang sesuai
        alt="404 Not Found"
        className="w-72 md:w-96 mb-6"
      />

      {/* Pesan Error */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau tidak ada.
      </p>

      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default ErrorPage;
