import DataBerita from '../models/DataBerita.js';
import path from 'path';
import fs from 'fs';

// Daftar kategori yang valid
const validKategori = ['berita', 'prestasi'];

// Get all data berita
export const getAllDataBerita = async (req, res) => {
  try {
    const dataBerita = await DataBerita.findAll();
    if (dataBerita.length === 0) {
      return res.status(404).json({ message: 'Belum ada data berita' });
    }
    res.status(200).json(dataBerita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get data berita by kategori
export const getDataBeritaByKategori = async (req, res) => {
  try {
    const { kategori } = req.params;

    if (!validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: berita atau prestasi' });
    }

    const dataBerita = await DataBerita.findAll({ where: { kategori } });

    if (dataBerita.length === 0) {
      return res.status(404).json({ message: `Belum ada data berita untuk kategori ${kategori}` });
    }

    res.status(200).json(dataBerita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create data berita
export const createDataBerita = async (req, res) => {
  try {
    const { title, deskripsi, kategori } = req.body;

    if (!title || !deskripsi || !kategori) {
      return res.status(400).json({ message: 'Title, deskripsi, dan kategori wajib diisi' });
    }

    if (!validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: berita atau prestasi' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Gambar wajib diunggah' });
    }

    const imgPath = path.posix.join('uploads', req.file.filename);

    const newData = await DataBerita.create({
      img: imgPath,
      title,
      deskripsi,
      kategori,
    });

    res.status(201).json({ message: 'Data berita berhasil ditambahkan', data: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update data berita by ID
export const updateDataBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBerita = await DataBerita.findByPk(id);

    if (!dataBerita) {
      return res.status(404).json({ message: 'Data berita tidak ditemukan' });
    }

    const { title, deskripsi, kategori } = req.body;

    if (kategori && !validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: berita atau prestasi' });
    }

    let imgPath = dataBerita.img;
    if (req.file) {
      // Hapus gambar lama jika ada
      if (dataBerita.img && fs.existsSync(dataBerita.img)) {
        fs.unlinkSync(dataBerita.img);
      }
      imgPath = path.posix.join('uploads', req.file.filename);
    }

    dataBerita.title = title || dataBerita.title;
    dataBerita.deskripsi = deskripsi || dataBerita.deskripsi;
    dataBerita.kategori = kategori || dataBerita.kategori;
    dataBerita.img = imgPath;

    await dataBerita.save();
    res.status(200).json({ message: 'Data berita berhasil diperbarui', data: dataBerita });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete data berita by ID
export const deleteDataBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBerita = await DataBerita.findByPk(id);

    if (!dataBerita) {
      return res.status(404).json({ message: 'Data berita tidak ditemukan' });
    }

    // Hapus gambar jika ada
    if (dataBerita.img && fs.existsSync(dataBerita.img)) {
      fs.unlinkSync(dataBerita.img);
    }

    await dataBerita.destroy();
    res.status(200).json({ message: 'Data berita berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
