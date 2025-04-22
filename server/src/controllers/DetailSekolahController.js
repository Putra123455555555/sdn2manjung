import DetailSekolah from '../models/DetailSekolah.js';

// 🔹 GET - Ambil data detail sekolah (hanya satu, karena ini data tunggal)
export const getDetailSekolah = async (req, res) => {
  try {
    const details = await DetailSekolah.findOne();
    if (!details) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 POST - Tambah data detail sekolah (hanya jika belum ada)
export const createDetailSekolah = async (req, res) => {
  try {
    const existingData = await DetailSekolah.findOne();
    if (existingData) return res.status(400).json({ message: 'Data sudah ada, gunakan PUT untuk update' });

    const { noPendirian, noSertif, noStatistik, npsn, jenjangAkreditas, thDidirikan, thOperasional, statusTanah, luasTanah, statusBangunan, luasBangunan, totalLahan } = req.body;

    const newDetail = await DetailSekolah.create({
      noPendirian,
      noSertif,
      noStatistik,
      npsn,
      jenjangAkreditas,
      thDidirikan,
      thOperasional,
      statusTanah,
      luasTanah,
      statusBangunan,
      luasBangunan,
      totalLahan,
    });

    res.status(201).json({ message: 'Detail Sekolah berhasil ditambahkan', data: newDetail });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 PUT - Update seluruh data detail sekolah (hanya jika sudah ada)
export const updateDetailSekolah = async (req, res) => {
  try {
    const detail = await DetailSekolah.findOne();
    if (!detail) return res.status(404).json({ message: 'Data tidak ditemukan' });

    const { noPendirian, noSertif, noStatistik, npsn, jenjangAkreditas, thDidirikan, thOperasional, statusTanah, luasTanah, statusBangunan, luasBangunan, totalLahan } = req.body;

    await detail.update({
      noPendirian,
      noSertif,
      noStatistik,
      npsn,
      jenjangAkreditas,
      thDidirikan,
      thOperasional,
      statusTanah,
      luasTanah,
      statusBangunan,
      luasBangunan,
      totalLahan,
    });

    res.json({ message: 'Detail Sekolah berhasil diperbarui', data: detail });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 🔹 DELETE - Hapus seluruh data detail sekolah
export const deleteDetailSekolah = async (req, res) => {
  try {
    const deleted = await DetailSekolah.destroy({ where: {} });
    if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json({ message: 'Detail Sekolah berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
