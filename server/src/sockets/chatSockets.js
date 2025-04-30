import Chat from '../models/Chat.js';

// Gunakan userId sebagai kunci utama
export const visitors = {}; // userId -> socket
export const admins = {}; // socket.id -> socket

// ✅ Handle pesan dari visitor
const handleChatMessage = (socket, io) => {
  socket.on('chat message', async ({ userId, message }) => {
    console.log(`[VISITOR ${userId}] Pesan:`, message);

    // Simpan socket berdasarkan userId
    visitors[userId] = socket;

    // Simpan pesan visitor ke database
    await Chat.create({
      socketId: userId,
      message,
      sender: 'visitor',
    });

    // Kirim pesan ke admin
    io.emit('new visitor message', {
      userId,
      message,
      timestamp: new Date().toISOString(),
    });

    const isAdminOnline = Object.keys(admins).length > 0;
    if (isAdminOnline) return;

    // 🤖 Bot auto-reply
    const lower = message.toLowerCase();
    const rules = [
      {
        keyword: ['halo', 'hai', 'selamat', 'assalamu', 'hello'],
        reply: 'Halo! Ada yang bisa kami bantu?',
      },
      {
        keyword: ['terimakasih', 'terima kasih', 'sekian', 'cukup', 'makasih'],
        reply: 'Sama-sama, kak! Senang bisa membantu. Jangan ragu hubungi kami kapan saja.',
      },
      {
        keyword: ['kepala sekolah', 'kepsek'],
        reply: 'Kepala Sekolah kami saat ini adalah Bapak Edi Susilo, S.Pd.',
      },
      {
        keyword: ['biaya', 'bayar', 'harga', 'uang sekolah'],
        reply: 'Informasi lengkap tentang biaya sekolah bisa ditanyakan langsung ke admin kami via WhatsApp: 081-2420-06643.',
      },
      {
        keyword: ['alamat', 'lokasi', 'dimana', 'letak'],
        reply: 'Kami berlokasi di JL. Sawojajar No. II, Manjung Kulon, RT 1 RW 4, Manjung, Wonogiri, Jawa Tengah 57651.',
      },
      {
        keyword: ['kontak', 'hubungi', 'telepon', 'nomor'],
        reply: 'Silakan hubungi kami melalui WhatsApp di nomor 081-2420-06643.',
      },
      {
        keyword: ['pendaftaran', 'daftar', 'registrasi', 'masuk sekolah'],
        reply: 'Pendaftaran dapat dilakukan secara online melalui website kami atau langsung ke sekolah.',
      },
      {
        keyword: ['jadwal', 'jam masuk', 'jam sekolah'],
        reply: 'Jam masuk sekolah mulai pukul 07.00 WIB dari Senin sampai Jumat.',
      },
      {
        keyword: ['kurikulum', 'pembelajaran'],
        reply: 'Kami menggunakan kurikulum nasional yang dikombinasikan dengan metode pembelajaran aktif dan kreatif.',
      },
      {
        keyword: ['ekstrakurikuler', 'ekskul', 'kegiatan tambahan'],
        reply: 'Kami memiliki berbagai kegiatan ekstrakurikuler seperti yang telah kami tampilkan di website kami.',
      },
      {
        keyword: ['fasilitas', 'sarana', 'gedung'],
        reply: 'Keseluruhan Fasilitas yang kami miliki telah disebutkan di website kami.',
      },
    ];

    let response = 'Maaf, kami belum mengerti pertanyaan Anda. Silakan tunggu hingga admin Online.';
    for (const rule of rules) {
      if (rule.keyword.some((k) => lower.includes(k))) {
        response = rule.reply;
        break;
      }
    }

    await Chat.create({
      socketId: userId,
      message: response,
      sender: 'bot',
    });

    socket.emit('chat reply', { message: response });
  });
};

// ✅ Ketika Admin Membalas Manual
const handleAdminReply = (socket) => {
  socket.on('admin reply', async ({ toUserId, message }) => {
    const visitorSocket = visitors[toUserId];

    await Chat.create({
      socketId: toUserId,
      message,
      sender: 'admin',
    });

    if (visitorSocket) {
      visitorSocket.emit('chat reply', { message });
    }
  });
};

// Saat admin sedang mengetik
const handleAdminTyping = (socket) => {
  socket.on('admin typing', ({ toUserId }) => {
    const visitorSocket = visitors[toUserId];
    if (visitorSocket) {
      visitorSocket.emit('admin typing');
    }
  });
};

// ✅ Admin login ke socket
const handleAdminJoin = (socket, io) => {
  socket.on('admin join', () => {
    admins[socket.id] = socket;
    console.log('Admin connected:', socket.id);
    io.emit('admin online', true);
  });
};

// ✅ Disconnect
const handleDisconnect = (socket, io) => {
  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
    delete admins[socket.id];

    // Hapus userId dari visitors jika cocok
    for (const userId in visitors) {
      if (visitors[userId] === socket) {
        delete visitors[userId];
        break;
      }
    }

    if (Object.keys(admins).length === 0) {
      io.emit('admin online', false);
    }
  });
};

// ✅ Fungsi utama
const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New socket connected:', socket.id);

    handleChatMessage(socket, io);
    handleAdminReply(socket);
    handleAdminJoin(socket, io);
    handleDisconnect(socket, io);
    handleAdminTyping(socket);

    socket.on('check admin online', () => {
      const isOnline = Object.keys(admins).length > 0;
      socket.emit('admin online', isOnline);
    });
  });
};

export default chatSocket;
