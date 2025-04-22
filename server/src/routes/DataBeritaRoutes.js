import express from 'express';
import { getAllDataBerita, getDataBeritaByKategori, createDataBerita, updateDataBerita, deleteDataBerita } from '../controllers/DataBeritaController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllDataBerita);
router.get('/:kategori', getDataBeritaByKategori);
router.post('/', upload.single('img'), createDataBerita);
router.put('/:id', upload.single('img'), updateDataBerita);
router.delete('/:id', deleteDataBerita);

export default router;
