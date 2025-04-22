import express from 'express';
import { upload } from '../middleware/upload.js';
import { getProfilSekolah, createProfilSekolah, updateProfilSekolah, deleteProfilSekolah, addImgSlide, updateImgSlide, deleteImgSlide, addMisi, updateMisi, deleteMisi } from '../controllers/ProfilController.js';

const router = express.Router();

router.get('/', getProfilSekolah);
router.post('/', upload.single('strukturImg'), createProfilSekolah);
router.put('/', upload.single('strukturImg'), updateProfilSekolah);
router.delete('/', deleteProfilSekolah);

router.post('/img-slide', upload.single('img'), addImgSlide);
router.put('/img-slide/:id', upload.single('img'), updateImgSlide);
router.delete('/img-slide/:id', deleteImgSlide);

router.post('/misi', addMisi);
router.put('/misi/:id', updateMisi);
router.delete('/misi/:id', deleteMisi);

export default router;
