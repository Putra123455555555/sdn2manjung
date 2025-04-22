import express from "express";
import { register, login, refreshToken, logout, getUsers, updateUser } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", verifyToken, getUsers); // GET daftar user (hanya untuk user yang sudah login)
router.put("/users/:id", verifyToken, updateUser); // Update user berdasarkan ID
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;
