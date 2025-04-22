import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = 'uploads/';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      return cb(err, null);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});


export { upload };
