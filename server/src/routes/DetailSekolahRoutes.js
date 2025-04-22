import express from 'express';
import { getDetailSekolah, createDetailSekolah, updateDetailSekolah, deleteDetailSekolah } from '../controllers/DetailSekolahController.js';

const router = express.Router();

router.get('/', getDetailSekolah);
router.post('/', createDetailSekolah);
router.put('/edit', updateDetailSekolah);
router.delete('/', deleteDetailSekolah);

export default router;
