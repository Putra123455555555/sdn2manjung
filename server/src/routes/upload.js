import express from 'express';
import { upload } from '../middleware/upload.js';
import { uploadImage, deleteImage } from '../controllers/UploadController.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);
router.delete('/upload', deleteImage);

export default router;
