import express from 'express';
import { getKontakSekolah, createKontakSekolah, updateKontakSekolah, deleteKontakSekolah } from '../controllers/KontakSekolahController.js';

const router = express.Router();

router.get('/', getKontakSekolah);
router.post('/', createKontakSekolah);
router.put('/edit', updateKontakSekolah);
router.delete('/', deleteKontakSekolah);

export default router;
