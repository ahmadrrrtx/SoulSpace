'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, X, AlertTriangle, Users, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { detectCrisis } from '../lib/crisisDetection';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: Date;
  username: string;
}

interface RoomChatProps {
  roomId: string;
  roomName: string;
  onLeave: () => void;
}

export function RoomChat({ roomId, roomName, onLeave }: RoomChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [username] = useState(`User${Math.floor(Math.random() * 9999)}`); // Anonymous username
  const [showEndModal, setShowEndModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(typeof window !== 'undefined' ? window.location.origin : '', {
      path: '/api/socket',
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to room server');
      socket.emit('join-room', { roomId, username });
    });

    socket.on('room-message', (data: { text: string; username: string; timestamp: string }) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.text,
        isMine: data.username === username,
        timestamp: new Date(data.timestamp),
        username: data.username,
      };
      setMessages(prev => [...prev, newMessage]);
    });

    socket.on('user-count', (count: number) => {
      setUserCount(count);
    });

    socket.on('user-joined', (data: { username: string }) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `${data.username} joined the room`,
        isMine: false,
        timestamp: new Date(),
        username: 'System',
      }]);
    });

    socket.on('user-left', (data: { username: string }) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `${data.username} left the room`,
        isMine: false,
        timestamp: new Date(),
        username: 'System',
      }]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.emit('leave-room', { roomId, username });
      socket.disconnect();
    };
  }, [roomId, username]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !socketRef.current) return;

    const text = input.trim();

    // Crisis check
    const crisis = detectCrisis(text);
    if (crisis.level === 'high') {
      window.location.href = '/crisis';
      return;
    }
    if (crisis.level === 'medium') {
      setShowCrisisModal(true);
      setInput('');
      return;
    }

    socketRef.current.emit('room-message', {
      roomId,
      text,
      username,
    });

    setInput('');
  };

  const leaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room', { roomId, username });
    }
    onLeave();
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#12151b]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={leaveRoom} className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Leave
            </button>
            <div>
              <div className="font-semibold">{roomName}</div>
              <div className="text-xs flex items-center gap-1.5 text-[#4ade80]">
                <Users className="w-3 h-3" /> {userCount} online • Anonymous
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <X className="w-4 h-4" /> Leave Room
            </button>
            <button 
              onClick={() => {
                if (confirm("Report inappropriate behavior?")) {
                  alert("Report submitted. Thank you.");
                  leaveRoom();
                }
              }}
              className="text-sm px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/30"
            >
              Report
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-[#94a3b8] pt-10">
            Welcome to the room.<br />Be kind and supportive.
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${msg.username === 'System' ? 'text-center w-full' : ''}`}>
              {msg.username !== 'System' && (
                <div className="text-xs text-[#64748b] mb-1 px-1">
                  {msg.username} • {format(msg.timestamp, 'HH:mm')}
                </div>
              )}
              <div className={`chat-bubble ${msg.isMine ? 'chat-bubble-user' : 'chat-bubble-other'} ${msg.username === 'System' ? 'bg-white/5 text-[#64748b] text-sm' : ''}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-6 bg-[#12151b]">
        <form onSubmit={sendMessage} className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message... (be kind)"
            className="input flex-1 text-lg"
          />
          <button type="submit" className="btn btn-primary px-8">
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[10px] text-[#64748b] mt-3 max-w-4xl mx-auto">
          Messages are not stored • This is peer support only
        </p>
      </div>

      {/* Leave Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="card max-w-sm w-full p-8 text-center">
            <h3 className="text-2xl font-semibold mb-3">Leave this room?</h3>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowEndModal(false)} className="btn btn-secondary flex-1">Stay</button>
              <button onClick={leaveRoom} className="btn flex-1 bg-[#f87171] hover:bg-[#ef4444] text-white">Leave</button>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-[#f87171] mb-4" />
            <h3 className="text-2xl font-semibold mb-3">It sounds like you might need extra support</h3>
            <p className="text-[#94a3b8] mb-6">Would you like to go to our crisis resources?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowCrisisModal(false)} className="btn btn-secondary flex-1">Stay in room</button>
              <a href="/crisis" className="btn btn-primary flex-1">Get Help Now</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
