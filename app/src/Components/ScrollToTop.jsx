// Import hook bawaan React untuk efek samping
import { useEffect } from "react";

// Import useLocation dari react-router-dom untuk mendapatkan informasi tentang lokasi (URL) saat ini
import { useLocation } from "react-router-dom";

// Komponen ScrollToTop
const ScrollToTop = () => {
  // Mengambil properti `pathname` dari objek lokasi saat ini
  // `pathname` adalah URL path yang aktif saat ini, misalnya "/beranda" atau "/kontak"
  const { pathname } = useLocation();

  // Hook useEffect dijalankan setiap kali nilai `pathname` berubah
  useEffect(() => {
    // Menggulung halaman ke posisi paling atas (x=0, y=0)
    // Hal ini dilakukan untuk memastikan setiap kali pengguna berpindah halaman,
    // tampilan dimulai dari atas halaman.
    window.scrollTo(0, 0);
  }, [pathname]); // Dependensi berupa `pathname`, sehingga efek hanya dijalankan ketika URL path berubah

  // Komponen ini tidak menampilkan elemen apa pun, hanya melakukan efek samping
  return null;
};

// Ekspor komponen ScrollToTop agar dapat digunakan di file lain
export default ScrollToTop;
