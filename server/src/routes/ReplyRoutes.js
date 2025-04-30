import express from 'express';
import { replyManual } from '../controllers/ReplyController.js';

const router = express.Router();

router.post('/reply-manual', replyManual);

export default router;
