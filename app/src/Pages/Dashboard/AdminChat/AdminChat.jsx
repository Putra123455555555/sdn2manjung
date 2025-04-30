import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import apiClient from '../../../services/apiClient';

const socket = io(apiClient.defaults.baseURL, { withCredentials: true });

const AdminChat = () => {
  const [conversations, setConversations] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [unread, setUnread] = useState({});
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit('admin join');

    apiClient.get('/api/chats').then((res) => {
      const grouped = {};
      Object.entries(res.data).forEach(([userId, chatList]) => {
        grouped[userId] = chatList
          .filter((chat) => chat.from === 'admin' || chat.from === 'visitor')
          .map((chat) => ({
            from: chat.from === 'admin' ? 'admin' : 'user',
            text: chat.text,
            time: chat.createdAt,
          }));
      });
      setConversations(grouped);
    });

    socket.on('new visitor message', ({ userId, message }) => {
      setConversations((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), { from: 'user', text: message, time: new Date().toISOString() }],
      }));

      if (userId !== selectedUser) {
        setUnread((prev) => ({ ...prev, [userId]: true }));
      }
    });

    return () => {
      socket.off('new visitor message');
    };
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedUser]);

  const handleSend = () => {
    if (selectedUser && messageInput.trim() !== '') {
      const now = new Date().toISOString();
      const newMessage = { from: 'admin', text: messageInput, time: now };

      socket.emit('admin reply', {
        toUserId: selectedUser,
        message: messageInput,
      });

      setConversations((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), newMessage],
      }));

      apiClient.post('/api/chats', {
        userId: selectedUser,
        message: messageInput,
        sender: 'admin',
      });

      setMessageInput('');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    setUnread((prev) => ({ ...prev, [userId]: false }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="font-semibold text-gray-400">Live Chat</li>
        </ol>
      </nav>

      <div className="bg-white rounded-xl shadow-lg flex overflow-hidden">
        {/* Sidebar User List */}
        <div className="w-1/4 bg-gray-50 border-r p-4 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-3">Pengguna Aktif</h2>
          {Object.keys(conversations).length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada pesan masuk</p>
          ) : (
            Object.entries(conversations)
              .sort(([, a], [, b]) => {
                const timeA = new Date(a[a.length - 1]?.time || 0);
                const timeB = new Date(b[b.length - 1]?.time || 0);
                return timeB - timeA;
              })
              .map(([userId]) => (
                <div key={userId} className={`flex justify-between items-center p-2 rounded-lg cursor-pointer mb-2 transition ${selectedUser === userId ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => handleSelectUser(userId)}>
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-8 h-8 p-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">{userId[0]?.toUpperCase()}</div>
                    <span className="truncate">{userId}</span>
                  </div>
                  {unread[userId] && <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">Baru</span>}
                </div>
              ))
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Chat Header */}
          {selectedUser && (
            <div className="border-b p-4 flex items-center gap-3 bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">{selectedUser[0]?.toUpperCase()}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{selectedUser}</h3>
                <p className="text-xs text-gray-500">Pengguna</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
            {selectedUser && conversations[selectedUser] ? (
              conversations[selectedUser].map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl shadow text-sm ${msg.from === 'admin' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    <div>{msg.text}</div>
                    <div className={`text-[10px] mt-1 text-right ${msg.from === 'admin' ? 'text-white/70' : 'text-gray-500'}`}>
                      {new Date(msg.time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">{selectedUser ? 'Belum ada pesan.' : 'Pilih pengguna untuk memulai percakapan.'}</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          {selectedUser && (
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring"
                placeholder="Ketik balasan..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
                Kirim
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
