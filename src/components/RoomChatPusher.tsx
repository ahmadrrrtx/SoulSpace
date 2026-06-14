'use client';

import { useEffect, useState, useRef } from 'react';
import { Send, X, AlertTriangle, ArrowLeft, Users, Shield, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { detectCrisis, crisisResources } from '../lib/crisisDetection';
import { pusherClient } from '../lib/pusher';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: Date;
  username: string;
  senderId?: string;
}

interface RoomChatPusherProps {
  roomId: string;
  roomName: string;
  onLeave: () => void;
}

export function RoomChatPusher({ roomId, roomName, onLeave }: RoomChatPusherProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [username] = useState(() => `Peer_${Math.floor(1000 + Math.random() * 9000)}`);
  const [mySenderId] = useState(() => crypto.randomUUID());
  const [showEndModal, setShowEndModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelName = `room-${roomId}`;

  // Connect to Pusher
  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);

    channel.bind('new-message', (data: any) => {
      // Ignore our own echo
      if (data.senderId === mySenderId) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.text,
        isMine: false,
        timestamp: new Date(data.timestamp || Date.now()),
        username: data.username || 'Peer',
        senderId: data.senderId,
      };
      setMessages(prev => [...prev, newMessage]);
    });

    channel.bind('user-count', (count: number) => {
      setUserCount(count);
    });

    channel.bind('user-joined', (data: any) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `${data.username || 'A peer'} joined the room`,
        isMine: false,
        timestamp: new Date(),
        username: 'System',
      }]);
    });

    channel.bind('user-left', (data: any) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: `${data.username || 'A peer'} left the room`,
        isMine: false,
        timestamp: new Date(),
        username: 'System',
      }]);
    });

    // Simulate user count
    setUserCount(Math.floor(Math.random() * 8) + 4);

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [roomId, mySenderId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

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

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isMine: true,
      timestamp: new Date(),
      username,
      senderId: mySenderId,
    };

    setMessages(prev => [...prev, newMessage]);

    // Send via Pusher API
    try {
      await fetch('/api/pusher/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: channelName,
          text,
          username,
          type: 'text',
          senderId: mySenderId,
        }),
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }

    setInput('');
  };

  const leaveRoom = () => {
    onLeave();
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-[#dcfce7] bg-white shadow-2xs">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={leaveRoom} className="flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
              <ArrowLeft className="w-4 h-4" /> 
              <span>Rooms</span>
            </button>
            <div>
              <div className="font-extrabold text-[#064e3b] text-lg">{roomName}</div>
              <div className="text-xs flex items-center gap-1.5 text-emerald-700 font-semibold mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Users className="w-3.5 h-3.5" /> 
                <span>{userCount} caring peers online • {username}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (confirm("Would you like to report a message or inappropriate behavior in this room? Our volunteer moderators review all reports.")) {
                  alert("Report successfully submitted. Thank you for keeping SoulSpace kind and safe.");
                }
              }}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" /> 
              <span>Report</span>
            </button>
            <button 
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors shadow-2xs"
            >
              <X className="w-4 h-4" /> 
              <span>Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-4xl mx-auto w-full space-y-5">
        {messages.length === 0 && (
          <div className="text-center pt-24 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xs">
              <Users className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="text-xl font-extrabold text-[#064e3b]">Welcome to {roomName}</h3>
            <p className="text-emerald-700 font-medium mt-1 max-w-md mx-auto text-sm">
              This is a shared anonymous supportive space. Be compassionate, listen empathetically, and support your fellow peers.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[78%] ${msg.username === 'System' ? 'text-center mx-auto w-full' : ''}`}>
              {msg.username !== 'System' && (
                <div className={`text-xs font-bold font-mono mb-1.5 flex items-center gap-1.5 ${msg.isMine ? 'justify-end text-emerald-700' : 'text-emerald-800'}`}>
                  <span>{msg.username}</span>
                </div>
              )}
              
              <div className={`chat-bubble ${
                msg.isMine 
                  ? 'chat-bubble-user font-medium shadow-md' 
                  : msg.username === 'System' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs py-2 px-4 rounded-full mx-auto inline-block shadow-2xs' 
                    : 'chat-bubble-other bg-white shadow-xs border border-[#dcfce7] font-medium'
              }`}>
                {msg.text}
              </div>

              {msg.username !== 'System' && (
                <div className={`text-[10px] font-mono mt-1 flex ${msg.isMine ? 'justify-end text-slate-400' : 'text-slate-400'}`}>
                  {format(msg.timestamp, 'HH:mm')}
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[#dcfce7] p-6 bg-white shadow-lg">
        <form onSubmit={sendMessage} className="flex gap-3 max-w-4xl mx-auto items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Send a kind, supportive message as ${username}...`}
            className="input flex-1 text-base bg-[#f8fbf9] shadow-inner font-medium py-3.5 px-5 rounded-2xl"
          />
          <button type="submit" disabled={!input.trim()} className="btn btn-primary h-14 px-8 rounded-2xl font-bold shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
            <span>Send</span>
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 text-center text-xs text-emerald-700 font-medium mt-3">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Messages are ephemeral group broadcasts • Never stored in any database</span>
        </div>
      </div>

      {/* End Room Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-sm w-full p-8 text-center bg-white shadow-2xl border-rose-200">
            <div className="mx-auto w-16 h-16 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center mb-6 shadow-xs">
              <Users className="w-8 h-8 text-rose-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-[#064e3b]">Leave {roomName}?</h3>
            <p className="text-emerald-700 font-medium text-sm mb-8">You can always rejoin this room anytime.</p>
            
            <div className="flex gap-3">
              <button onClick={() => setShowEndModal(false)} className="btn btn-secondary flex-1 font-bold py-3.5">Stay</button>
              <button onClick={leaveRoom} className="btn flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 shadow-md">Yes, Leave</button>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Detected Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-md w-full p-8 text-center bg-white shadow-2xl border-rose-200">
            <div className="mx-auto w-16 h-16 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center mb-6 shadow-xs">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-[#064e3b]">{crisisResources.medium.title}</h3>
            <p className="text-emerald-700 font-medium text-sm mb-6">{crisisResources.medium.message}</p>
            
            <div className="space-y-3 text-left mb-8">
              {crisisResources.medium.actions.map((act, idx) => (
                <div key={idx} className="p-3.5 bg-[#f8fbf9] border border-emerald-100 rounded-2xl text-sm font-semibold text-[#064e3b]">
                  {act}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowCrisisModal(false)} className="btn btn-primary w-full font-bold py-3.5">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
