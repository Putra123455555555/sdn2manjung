// Import React untuk membuat komponen berbasis kelas
import React from "react";

// Import Link dari react-router-dom untuk navigasi antar halaman tanpa reload
import { Link } from "react-router-dom";

// Definisi komponen Navbar sebagai komponen kelas
class Navbar extends React.Component {
  // State untuk menyimpan status menu dan dropdown (apakah terbuka atau tertutup)
  state = {
    isMenuOpen: false, // Status untuk menu navigasi mobile
    isDropdownOpen: false, // Status untuk dropdown di menu profil
  };

  // Fungsi untuk toggle status menu navigasi mobile
  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  // Fungsi untuk toggle status dropdown menu
  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  // Fungsi untuk menutup dropdown menu
  closeDropdown = () => {
    this.setState({ isDropdownOpen: false });
  };

  // Render UI dari komponen Navbar
  render() {
    // Destructuring state untuk kemudahan akses
    const { isMenuOpen, isDropdownOpen } = this.state;

    return (
      // Navbar utama dengan warna background dan posisi sticky
      <nav className="bg-[#101524] shadow-lg sticky top-0 z-50">
        {/* Container untuk konten utama navbar */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Logo sekolah dengan link menuju halaman beranda */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/image/logosekolah.png" // Path gambar logo
              alt="Logo"
              className="h-10 w-auto" // Ukuran logo
            />
          </Link>

          {/* Menu navigasi untuk desktop */}
          <div className="hidden text-sm md:flex space-x-3">
            {/* Link menuju halaman beranda */}
            <Link
              to="/"
              className="text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              BERANDA
            </Link>

            {/* Menu dropdown untuk bagian profil */}
            <div className="relative group">
              <button
                onClick={this.toggleDropdown}
                className="text-white px-3 py-2 rounded-md hover:bg-gray-700 transition focus:outline-none"
              >
                PROFIL
              </button>
              {/* Dropdown menu untuk profil */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg w-48 group-hover:block">
                  <Link
                    to="/profil"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition"
                    onClick={this.closeDropdown}
                  >
                    PROFIL SEKOLAH
                  </Link>
                  <Link
                    to="/fasilitas"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition"
                    onClick={this.closeDropdown}
                  >
                    FASILITAS
                  </Link>
                  <Link
                    to="/struktur"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition"
                    onClick={this.closeDropdown}
                  >
                    STRUKTUR ORGANISASI
                  </Link>
                </div>
              )}
            </div>

            {/* Link menuju halaman berita */}
            <Link
              to="/berita"
              className="text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              BERITA
            </Link>
            {/* Link menuju halaman galeri */}
            <Link
              to="/galeri"
              className="text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              GALERI
            </Link>
            {/* Link menuju halaman kontak */}
            <Link
              to="/kontak"
              className="text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              KONTAK
            </Link>
          </div>

          {/* Tombol untuk membuka menu pada tampilan mobile */}
          <button
            type="button"
            className="md:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={this.toggleMenu}
          >
            {/* Ikon menu berubah antara hamburger dan close */}
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menu navigasi untuk tampilan mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#101524] px-4 py-2 absolute top-full left-0 w-full">
            <Link
              to="/"
              className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
              onClick={this.toggleMenu}
            >
              BERANDA
            </Link>
            {/* Dropdown untuk mobile */}
            <div>
              <button
                onClick={this.toggleDropdown}
                className="block text-white py-2 w-full text-left hover:bg-gray-700 hover:p-3 rounded-md"
              >
                PROFIL
              </button>
              {isDropdownOpen && (
                <div className="ml-4">
                  <Link
                    to="/profil"
                    className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
                    onClick={this.toggleMenu}
                  >
                    Profil Sekolah
                  </Link>
                  <Link
                    to="/struktur"
                    className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
                    onClick={this.toggleMenu}
                  >
                    Struktur Organisasi
                  </Link>
                  <Link
                    to="/fasilitas"
                    className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
                    onClick={this.toggleMenu}
                  >
                    Fasilitas
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/berita"
              className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
              onClick={this.toggleMenu}
            >
              BERITA
            </Link>
            <Link
              to="/galeri"
              className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
              onClick={this.toggleMenu}
            >
              GALERI
            </Link>
            <Link
              to="/kontak"
              className="block text-white py-2 hover:bg-gray-700 hover:p-3 rounded-md"
              onClick={this.toggleMenu}
            >
              KONTAK
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

// Ekspor komponen Navbar agar bisa digunakan di file lain
export default Navbar;
