import DataGambar from '../models/DataGambar.js';
import path from 'path';
import fs from 'fs';

// Daftar kategori yang valid
const validKategori = ['gallery', 'fasilitas'];

// Get all data gambar
export const getAllDataGambar = async (req, res) => {
  try {
    const dataGambar = await DataGambar.findAll();
    if (dataGambar.length === 0) {
      return res.status(404).json({ message: 'Belum ada data gambar' });
    }
    res.status(200).json(dataGambar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get data gambar by kategori
export const getDataGambarByKategori = async (req, res) => {
  try {
    const { kategori } = req.params;

    if (!validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: gallery atau fasilitas' });
    }

    const dataGambar = await DataGambar.findAll({ where: { kategori } });

    if (dataGambar.length === 0) {
      return res.status(404).json({ message: `Belum ada data gambar untuk kategori ${kategori}` });
    }

    res.status(200).json(dataGambar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create data gambar
export const createDataGambar = async (req, res) => {
  try {
    const { title, kategori } = req.body;

    if (!title || !kategori) {
      return res.status(400).json({ message: 'Title dan kategori wajib diisi' });
    }

    if (!validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: gallery atau fasilitas' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Gambar wajib diunggah' });
    }

    const imgPath = path.posix.join('uploads', req.file.filename);

    const newData = await DataGambar.create({
      img: imgPath,
      title,
      kategori,
    });

    res.status(201).json({ message: 'Data gambar berhasil ditambahkan', data: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update data gambar by ID
export const updateDataGambar = async (req, res) => {
  try {
    const { id } = req.params;
    const dataGambar = await DataGambar.findByPk(id);

    if (!dataGambar) {
      return res.status(404).json({ message: 'Data gambar tidak ditemukan' });
    }

    const { title, kategori } = req.body;

    if (kategori && !validKategori.includes(kategori)) {
      return res.status(400).json({ message: 'Kategori tidak valid. Pilih: gallery atau fasilitas' });
    }

    let imgPath = dataGambar.img;
    if (req.file) {
      // Hapus gambar lama jika ada
      if (fs.existsSync(dataGambar.img)) {
        fs.unlinkSync(dataGambar.img);
      }
      imgPath = path.posix.join('uploads', req.file.filename);
    }

    dataGambar.title = title || dataGambar.title;
    dataGambar.kategori = kategori || dataGambar.kategori;
    dataGambar.img = imgPath;

    await dataGambar.save();
    res.status(200).json({ message: 'Data gambar berhasil diperbarui', data: dataGambar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete data gambar by ID
export const deleteDataGambar = async (req, res) => {
  try {
    const { id } = req.params;
    const dataGambar = await DataGambar.findByPk(id);

    if (!dataGambar) {
      return res.status(404).json({ message: 'Data gambar tidak ditemukan' });
    }

    // Hapus gambar jika ada
    if (dataGambar.img && fs.existsSync(dataGambar.img)) {
      fs.unlinkSync(dataGambar.img);
    }

    await dataGambar.destroy();
    res.status(200).json({ message: 'Data gambar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
