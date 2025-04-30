// import model Chat
import Chat from '../models/Chat.js';

// ✅ Ambil semua chat & kelompokkan berdasarkan socketId
export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.findAll({
      order: [['createdAt', 'ASC']],
    });

    // Kelompokkan berdasarkan socketId
    const grouped = {};
    chats.forEach((chat) => {
      if (!grouped[chat.socketId]) grouped[chat.socketId] = [];
      grouped[chat.socketId].push({
        from: chat.sender,
        text: chat.message,
        createdAt: chat.createdAt,
      });
    });

    res.json(grouped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data chat' });
  }
};

// ✅ Simpan chat baru dari admin atau user
export const createChat = async (req, res) => {
  try {
    const { socketId, message, sender } = req.body;

    // Validasi input
    if (!socketId || !message || !sender) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Simpan ke database
    const chat = await Chat.create({
      socketId,
      message,
      sender,
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menyimpan data chat' });
  }
};
