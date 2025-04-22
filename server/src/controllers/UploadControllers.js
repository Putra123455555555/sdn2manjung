import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah!' });
  }

  res.status(200).json({
    message: 'Gambar berhasil diunggah!',
    filePath: `/uploads/${req.file.filename}`,
  });
};
export const deleteImage = (req, res) => {
  const { filePath } = req.body;
  if (!filePath || path.basename(filePath) !== filePath) {
    return res.status(400).json({ message: 'Path file tidak valid!' });
  }
  const fullPath = path.resolve('uploads', filePath);
  console.log('Path yang akan dihapus:', fullPath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('Error saat menghapus file:', err.message);
      return res.status(500).json({ message: 'Gagal menghapus file!', error: err.message });
    }
    res.status(200).json({ message: 'Gambar berhasil dihapus!' });
  });
};
