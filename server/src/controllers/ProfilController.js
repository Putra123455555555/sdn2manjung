import fs from 'fs';
import path from 'path';
import ProfilSekolah from '../models/Profil.js';
import ImgSlide from '../models/ImgSlide.js';
import Misi from '../models/Misi.js';

// Mendapatkan data profil beserta ImgSlide dan Misi
export const getProfilSekolah = async (req, res) => {
  try {
    const profil = await ProfilSekolah.findOne({
      include: [
        { model: ImgSlide, as: 'imgSlides' },
        { model: Misi, as: 'misi' },
      ],
    });

    if (!profil) return res.status(404).json({ message: 'Profil tidak ditemukan' });

    res.status(200).json(profil);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Membuat profil baru jika belum ada
export const createProfilSekolah = async (req, res) => {
  try {
    const { namaSekolah, motto, kepalaSekolah, tentang, tujuan, strategi, visi } = req.body;
    const strukturImg = req.file ? path.posix.join('uploads', req.file.filename) : null;

    const existingProfil = await ProfilSekolah.findOne();
    if (existingProfil) return res.status(400).json({ message: 'Profil sudah ada, gunakan metode update.' });

    const profil = await ProfilSekolah.create({
      namaSekolah,
      motto,
      kepalaSekolah,
      tentang,
      tujuan,
      strategi,
      visi,
      strukturImg,
    });

    res.status(201).json({ message: 'Profil berhasil dibuat', data: profil });
  } catch (error) {
    res.status(500).json({ message: 'Error creating data', error: error.message });
  }
};

// Memperbarui profil sekolah
export const updateProfilSekolah = async (req, res) => {
  try {
    const { namaSekolah, motto, kepalaSekolah, tentang, tujuan, strategi, visi } = req.body;
    const profil = await ProfilSekolah.findOne();

    if (!profil) return res.status(404).json({ message: 'Profil tidak ditemukan' });

    let updatedData = { namaSekolah, motto, kepalaSekolah, tentang, tujuan, strategi, visi };

    if (req.file) {
      const newImagePath = path.posix.join('uploads', req.file.filename);
      if (profil.strukturImg && fs.existsSync(profil.strukturImg)) {
        fs.unlinkSync(profil.strukturImg);
      }
      updatedData.strukturImg = newImagePath;
    }

    await profil.update(updatedData);
    res.status(200).json({ message: 'Profil berhasil diperbarui', data: profil });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

// Menghapus profil beserta ImgSlide dan Misi
export const deleteProfilSekolah = async (req, res) => {
  try {
    const profil = await ProfilSekolah.findOne();
    if (!profil) return res.status(404).json({ message: 'Profil tidak ditemukan' });

    if (profil.strukturImg && fs.existsSync(profil.strukturImg)) {
      fs.unlinkSync(profil.strukturImg);
    }

    const imgSlides = await ImgSlide.findAll({ where: { profilSekolahId: profil.id } });
    for (const img of imgSlides) {
      const imgPath = path.posix.join('uploads', img.img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    await ImgSlide.destroy({ where: { profilSekolahId: profil.id } });

    await Misi.destroy({ where: { profilSekolahId: profil.id } });

    await profil.destroy();
    res.status(200).json({ message: 'Profil dan semua datanya berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};

// =========================================================
// IMGSLIDE CONTROLLER
// =========================================================

export const addImgSlide = async (req, res) => {
  try {
    const profilSekolah = await ProfilSekolah.findOne();
    if (!profilSekolah) {
      return res.status(404).json({ message: 'ProfilSekolah belum dibuat' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'File gambar diperlukan' });
    }

    const imgSlide = await ImgSlide.create({
      img: path.posix.join('uploads', req.file.filename),
      profilSekolahId: profilSekolah.id,
    });

    res.status(201).json({ message: 'ImgSlide berhasil ditambahkan', data: imgSlide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE GAMBAR SLIDE
export const updateImgSlide = async (req, res) => {
    try {
        const { id } = req.params;
        const imgSlide = await ImgSlide.findByPk(id);

        if (!imgSlide) {
            return res.status(404).json({ message: 'ImgSlide tidak ditemukan' });
        }

        // Path lama sebelum update
        const oldImagePath = imgSlide.img ? path.posix.join('uploads', path.basename(imgSlide.img)) : null;

        if (req.file) {
            // Simpan path lengkap "uploads/nama_file.jpg" ke database
            const newImagePath = path.posix.join('uploads', req.file.filename);
            imgSlide.img = newImagePath;

            // Hapus file lama jika ada dan masih eksis
            if (oldImagePath && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        await imgSlide.save();

        res.status(200).json({ message: 'ImgSlide berhasil diperbarui', data: imgSlide });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  

//  DELETE IMAGE SLIDE
export const deleteImgSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const imgSlide = await ImgSlide.findByPk(id);

    if (!imgSlide) {
      return res.status(404).json({ message: 'ImgSlide tidak ditemukan' });
    }

    // Pastikan path benar dengan mempertimbangkan apakah imgSlide.img hanya menyimpan nama file
    const imgPath = path.posix.join('uploads', path.basename(imgSlide.img));

    // Debugging path sebelum penghapusan
    console.log('Menghapus file:', imgPath);

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    } else {
      console.log('File tidak ditemukan:', imgPath);
    }

    await imgSlide.destroy();
    res.status(200).json({ message: 'ImgSlide berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================================================
// MISI CONTROLLER
// =========================================================

export const addMisi = async (req, res) => {
  try {
    const profilSekolah = await ProfilSekolah.findOne();
    if (!profilSekolah) {
      return res.status(404).json({ message: 'ProfilSekolah belum dibuat' });
    }

    const misi = await Misi.create({
      text: req.body.text,
      profilSekolahId: profilSekolah.id,
    });

    res.status(201).json({ message: 'Misi berhasil ditambahkan', data: misi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMisi = async (req, res) => {
  try {
    const { id } = req.params;
    const misi = await Misi.findByPk(id);

    if (!misi) {
      return res.status(404).json({ message: 'Misi tidak ditemukan' });
    }

    misi.text = req.body.text || misi.text;
    await misi.save();

    res.status(200).json({ message: 'Misi berhasil diperbarui', data: misi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMisi = async (req, res) => {
  try {
    const { id } = req.params;
    const misi = await Misi.findByPk(id);

    if (!misi) {
      return res.status(404).json({ message: 'Misi tidak ditemukan' });
    }

    await misi.destroy();
    res.status(200).json({ message: 'Misi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
