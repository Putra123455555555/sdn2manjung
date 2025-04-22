import DataGuru from '../models/DataGuru.js';
import path from 'path';
import fs from 'fs';

// Get all data guru
export const getAllDataGuru = async (req, res) => {
  try {
    const dataGuru = await DataGuru.findAll();

    if (dataGuru.length === 0) {
      return res.status(404).json({ message: 'Belum ada data guru' });
    }

    res.status(200).json(dataGuru);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create data guru
export const createDataGuru = async (req, res) => {
  try {
    const { nama, nip } = req.body;

    if (!nama) {
      return res.status(400).json({ message: 'Nama tidak boleh kosong' });
    }

    let imgPath = null;
    if (req.file) {
      imgPath = path.posix.join('uploads', req.file.filename);
    }

    const newGuru = await DataGuru.create({
      nama,
      nip,
      img: imgPath,
    });

    res.status(201).json({ message: 'DataGuru berhasil ditambahkan', data: newGuru });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update data guru by ID
export const updateDataGuru = async (req, res) => {
  try {
    const { id } = req.params;
    const guru = await DataGuru.findByPk(id);

    if (!guru) {
      return res.status(404).json({ message: 'DataGuru tidak ditemukan' });
    }

    const { nama, nip } = req.body;

    let imgPath = guru.img;
    if (req.file) {
      // Hapus gambar lama jika ada
      if (guru.img && fs.existsSync(guru.img)) {
        fs.unlinkSync(guru.img);
      }

      // Simpan gambar baru
      imgPath = path.posix.join('uploads', req.file.filename);
    }

    // Update data
    guru.nama = nama || guru.nama;
    guru.nip = nip || guru.nip;
    guru.img = imgPath;

    await guru.save();
    res.status(200).json({ message: 'DataGuru berhasil diperbarui', data: guru });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete data guru by ID
export const deleteDataGuru = async (req, res) => {
  try {
    const { id } = req.params;
    const guru = await DataGuru.findByPk(id);

    if (!guru) {
      return res.status(404).json({ message: 'DataGuru tidak ditemukan' });
    }

    // Hapus gambar jika ada
    if (guru.img && fs.existsSync(guru.img)) {
      fs.unlinkSync(guru.img);
    }

    await guru.destroy();
    res.status(200).json({ message: 'DataGuru berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
