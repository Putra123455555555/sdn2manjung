import express from "express";
import { getAllChats,createChat } from "../controllers/ChatController.js";

const router = express.Router();

router.get("/chats", getAllChats);
router.post("/chats", createChat);

export default router;
