import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './src/config/Database.js';
import authRoutes from './src/routes/AuthRoutes.js';
import profilRoutes from './src/routes/ProfilRoutes.js';
import detailSekolahRoutes from './src/routes/DetailSekolahRoutes.js';
import kontakSekolahRoutes from './src/routes/KontakSekolahRoutes.js';
import dataGuruRoutes from './src/routes/DataGuruRoutes.js';
import dataGambarRoutes from './src/routes/DataGambarRoutes.js';
import dataBeritaRoutes from './src/routes/DataBeritaRoutes.js';

// Konfigurasi dotenv untuk mengakses variabel lingkungan
dotenv.config();

const app = express();

// Middleware CORS dengan pengaturan fleksibel
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
};
app.use(cors(corsOptions));

// Middleware parsing body dan cookie
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Koneksi ke database
const connectToDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Server berhenti jika koneksi gagal
  }
};

connectToDatabase();

// Middleware untuk akses static files (misalnya upload)
app.use('/uploads', express.static('uploads'));

//Routing
app.use('/api/auth', authRoutes);
app.use('/api/profil', profilRoutes);
app.use('/api/detail-sekolah', detailSekolahRoutes);
app.use('/api/kontak-sekolah', kontakSekolahRoutes);
app.use('/api/data-guru', dataGuruRoutes);
app.use('/api/data-gambar', dataGambarRoutes);
app.use('/api/data-berita', dataBeritaRoutes);

// Opsional: Sinkronisasi model database hanya untuk non-production
if (process.env.NODE_ENV !== 'production') {
  //db.sync({ alter: true }) // Bisa diaktifkan jika perlu sinkronisasi
  // .then(() => console.log('Database synchronized'))
  // .catch((error) => console.error('Error syncing database:', error));
}
// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
