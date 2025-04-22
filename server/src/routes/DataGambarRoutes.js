import express from 'express';
import { getAllDataGambar, getDataGambarByKategori, createDataGambar, updateDataGambar, deleteDataGambar } from '../controllers/DataGambarController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllDataGambar);
router.get('/:kategori', getDataGambarByKategori);
router.post('/', upload.single('img'), createDataGambar);
router.put('/:id', upload.single('img'), updateDataGambar);
router.delete('/:id', deleteDataGambar);

export default router;
