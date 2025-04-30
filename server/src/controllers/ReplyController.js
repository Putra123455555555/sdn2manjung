import { visitors } from '../sockets/chatSockets.js'; // Import visitors yang tadi dibuat

export const replyManual = (req, res) => {
  const { toSocketId, message } = req.body;

  if (!toSocketId || !message) {
    return res.status(400).json({ message: 'toSocketId dan message harus diisi' });
  }

  const targetSocket = visitors[toSocketId];

  if (!targetSocket) {
    return res.status(404).json({ message: 'Visitor tidak ditemukan atau sudah disconnect' });
  }

  targetSocket.emit('chat reply', message);

  return res.status(200).json({ message: 'Pesan berhasil dikirim ke visitor' });
};
