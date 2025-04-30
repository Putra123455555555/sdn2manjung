import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import apiClient from '../services/apiClient';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

const socket = io(apiClient.defaults.baseURL, {
  withCredentials: true,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState('');
  const [adminOnline, setAdminOnline] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem('userId', newId);
      setUserId(newId);
    }

    socket.on('connect', () => {
      socket.emit('check admin online');
    });

    socket.on('chat reply', ({ message }) => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: 'admin', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setIsTyping(false);
      }, 1500);
    });

    socket.on('admin online', (status) => {
      setAdminOnline(status);
    });

    socket.on('admin typing', () => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    });

    return () => {
      socket.off('connect');
      socket.off('chat reply');
      socket.off('admin online');
      socket.off('admin typing');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('chat message', {
        userId,
        message: inputMessage,
      });

      setMessages((prev) => [
        ...prev,
        { from: 'me', text: inputMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setInputMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <span>Hubungi kami 👋</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] h-[500px] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white p-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">Selamat Datang 👋</h2>
              <div className="text-sm flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full inline-block ${adminOnline ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                <span>{adminOnline ? 'Admin sedang online' : 'Admin sedang offline'}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-xl">×</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.from === 'me' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-right mt-1 opacity-70">{msg.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-2 text-left italic text-sm text-gray-500">Admin sedang mengetik...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring"
            />
            <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
              <PaperPlaneIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
