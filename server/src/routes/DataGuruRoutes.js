import express from 'express';
import { getAllDataGuru, createDataGuru, updateDataGuru, deleteDataGuru } from '../controllers/DataGuruController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllDataGuru);
router.post('/', upload.single('img'), createDataGuru);
router.put('/:id', upload.single('img'), updateDataGuru);
router.delete('/:id', deleteDataGuru);

export default router;
