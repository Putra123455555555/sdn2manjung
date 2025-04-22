import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
// ✅ Register User

// ✅ FUNGSI LOGIN 
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      where: { [Op.or]: [{ email: login }, { username: login }] },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Email/username atau password salah' });
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

    const refreshToken = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    await User.update({ refreshToken }, { where: { id: user.id } });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
};
// ✅ FUNGSI LOGIN 


// ✅ FUNGSI REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        await User.update({ refreshToken: null }, { where: { id: user.id } });
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
        return res.sendStatus(403);
      }

      // 🔥 Auto Logout setelah 30 menit tidak aktif
      const currentTime = Math.floor(Date.now() / 1000);
      const lastActivityTime = decoded.iat; // Waktu token dibuat
      const inactiveLimit = 2 * 60; // 30 menit

      if (currentTime - lastActivityTime > inactiveLimit) {
        await User.update({ refreshToken: null }, { where: { id: user.id } });
        res.clearCookie('refreshToken');
        return res.sendStatus(403);
      }

      // ✅ Jika masih aktif, buat access token baru
      const accessToken = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' } // Access token hanya bertahan 15 menit
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
};
// ✅ FUNGSI REFRESH TOKEN


// ✅ Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(204);

    await User.update({ refreshToken: null }, { where: { id: user.id } });

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat logout' });
  }
};

// ✅ Get Users (Menampilkan daftar user tanpa password)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// ✅ Update User
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
    });

    res.json({ message: 'User berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
