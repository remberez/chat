import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username') || 'Аноним';

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/api/chat/${roomId}?username=${encodeURIComponent(username)}`);
    
    ws.onopen = () => {
      console.log('Соединение установлено');
      setSocket(ws);
    };
    
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };
    
    ws.onclose = () => {
      console.log('Соединение закрыто');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return () => {
      ws.close();
    };
  }, [roomId, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && socket?.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Комната: {roomId}</h1>
        <p className="text-sm">Вы: {username}</p>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg max-w-xs md:max-w-md ${msg.username === username ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-white'}`}
          >
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите сообщение..."
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}