import KontakSekolah from '../models/KontakSekolah.js';

// 🔹 GET - Ambil data kontak sekolah (hanya satu, karena ini data tunggal)
export const getKontakSekolah = async (req, res) => {
  try {
    const kontak = await KontakSekolah.findOne();
    if (!kontak) return res.status(404).json({ message: 'Data kontak tidak ditemukan' });

    res.json(kontak);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 POST - Tambah data kontak sekolah (hanya jika belum ada)
export const createKontakSekolah = async (req, res) => {
  try {
    const existingData = await KontakSekolah.findOne();
    if (existingData) return res.status(400).json({ message: 'Data sudah ada, gunakan PUT untuk update' });

    const kontak = await KontakSekolah.create(req.body);
    res.status(201).json({ message: 'Kontak Sekolah berhasil ditambahkan', data: kontak });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 PUT - Update data kontak sekolah
export const updateKontakSekolah = async (req, res) => {
  try {
    const kontak = await KontakSekolah.findOne();
    if (!kontak) return res.status(404).json({ message: 'Data kontak tidak ditemukan' });

    await kontak.update(req.body);
    res.json({ message: 'Kontak Sekolah berhasil diperbarui', data: kontak });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 DELETE - Hapus data kontak sekolah
export const deleteKontakSekolah = async (req, res) => {
  try {
    const deleted = await KontakSekolah.destroy({ where: {} });
    if (!deleted) return res.status(404).json({ message: 'Data kontak tidak ditemukan' });

    res.json({ message: 'Kontak Sekolah berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
