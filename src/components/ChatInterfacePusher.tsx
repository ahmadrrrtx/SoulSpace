'use client';

import { useEffect, useState, useRef } from 'react';
import { Send, X, AlertTriangle, Heart, Mic, MicOff, Shield, User } from 'lucide-react';
import { format } from 'date-fns';
import { detectCrisis, crisisResources } from '../lib/crisisDetection';
import { pusherClient } from '../lib/pusher';

interface Message {
  id: string;
  text?: string;
  audio?: string;
  isMine: boolean;
  timestamp: Date;
  type: 'text' | 'voice';
  senderId?: string;
}

interface ChatInterfacePusherProps {
  sessionId: string;
  mood?: string;
  topic?: string;
  matchingMode?: 'mood' | 'topic';
  onEndChat: () => void;
}

export function ChatInterfacePusher({ 
  sessionId, 
  mood, 
  topic, 
  matchingMode = 'mood', 
  onEndChat 
}: ChatInterfacePusherProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [partnerOnline, setPartnerOnline] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [mySenderId] = useState(() => crypto.randomUUID());

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  const channelName = `private-chat-${sessionId}`;

  const moodLabels: Record<string, string> = {
    anxiety: 'Anxiety / Panic',
    loneliness: 'Loneliness',
    stress: 'Stress / Overwhelmed',
    sadness: 'Sadness / Low mood',
    justtalk: 'Just need to talk',
    other: 'Other',
  };

  const topicLabels: Record<string, string> = {
    'exam-stress': 'Exam / Study Stress',
    'breakup': 'Breakup or Heartbreak',
    'grief': 'Grief or Loss',
    'family': 'Family Problems',
    'work-burnout': 'Work Burnout',
    'panic': 'Panic Attacks',
    'social-anxiety': 'Social Anxiety',
    'adhd': 'ADHD Struggles',
    'lgbtq': 'LGBTQ+ Support',
    'new-parent': 'New Parent Struggles',
    'chronic-illness': 'Chronic Illness',
    'loneliness': 'Deep Loneliness',
    'general': 'Just Need to Talk',
  };

  // Connect to Pusher
  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);
    channelRef.current = channel;

    channel.bind('new-message', (data: any) => {
      // Prevent echoing our own message
      if (data.senderId === mySenderId) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.text,
        audio: data.audio,
        isMine: false,
        timestamp: new Date(data.timestamp || Date.now()),
        type: data.type || 'text',
        senderId: data.senderId,
      };
      setMessages(prev => [...prev, newMessage]);
    });

    channel.bind('partner-left', () => {
      setPartnerOnline(false);
      setTimeout(() => {
        alert("Your chat partner has left. The conversation is now over.");
        onEndChat();
      }, 1200);
    });

    // Simulate partner online
    const matchTimer = setTimeout(() => {
      setPartnerOnline(true);
    }, 2500);

    return () => {
      clearTimeout(matchTimer);
      pusherClient.unsubscribe(channelName);
    };
  }, [sessionId, mySenderId]);

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
      type: 'text',
      senderId: mySenderId,
    };

    setMessages(prev => [...prev, newMessage]);

    // Send via API
    try {
      await fetch('/api/pusher/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: channelName,
          text,
          type: 'text',
          senderId: mySenderId,
        }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    setInput('');
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          
          const newMessage: Message = {
            id: Date.now().toString(),
            audio: base64Audio,
            isMine: true,
            timestamp: new Date(),
            type: 'voice',
            senderId: mySenderId,
          };
          setMessages(prev => [...prev, newMessage]);

          // Send voice message
          try {
            await fetch('/api/pusher/send-message', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                channel: channelName,
                audio: base64Audio,
                type: 'voice',
                senderId: mySenderId,
              }),
            });
          } catch (error) {
            console.error('Failed to send voice message:', error);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setVoiceEnabled(true);
    } catch (err) {
      alert("Microphone access needed.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = (base64Audio: string) => {
    const audio = new Audio(base64Audio);
    audio.play();
  };

  const endChat = () => {
    onEndChat();
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col font-sans">
      {/* Header */}
      <div className="border-b border-[#dcfce7] bg-white shadow-2xs">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xs">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="font-extrabold text-[#064e3b] text-base">SoulSpace 1-on-1 Peer Chat</div>
                <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${partnerOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  {partnerOnline ? 'Connected anonymously' : 'Partner disconnected'} • {
                    matchingMode === 'topic' ? topicLabels[topic || ''] : moodLabels[mood || '']
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors font-semibold ${voiceEnabled ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-[#dcfce7] bg-white text-[#064e3b]'}`}
            >
              <Mic className="w-4 h-4" /> Voice
            </button>
            
            <button 
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors font-bold shadow-xs"
            >
              <X className="w-4 h-4" /> End Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center pt-24 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-center justify-center mb-6 shadow-xs">
                <Heart className="w-10 h-10 text-emerald-600 fill-emerald-600 animate-pulse" />
              </div>
              <p className="text-2xl font-extrabold text-[#064e3b]">You&apos;re now connected.</p>
              <p className="text-emerald-700 font-medium mt-2 max-w-md mx-auto">
                Be kind. Listen without judgment. Feel free to share whatever is on your mind.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.type === 'text' && msg.text && (
                <div className={`chat-bubble ${msg.isMine ? 'chat-bubble-user font-medium shadow-md' : 'chat-bubble-other bg-white shadow-xs border border-[#dcfce7]'}`}>
                  <div className="text-base">{msg.text}</div>
                  <div className={`text-[11px] mt-2 font-mono flex items-center justify-end ${msg.isMine ? 'text-emerald-100 font-medium' : 'text-slate-400'}`}>
                    {format(msg.timestamp, 'HH:mm')}
                  </div>
                </div>
              )}

              {msg.type === 'voice' && msg.audio && (
                <div className={`flex items-center gap-3 px-6 py-4 rounded-3xl shadow-sm ${msg.isMine ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-[#dcfce7] text-[#064e3b]'}`}>
                  <button onClick={() => playAudio(msg.audio!)} className="flex items-center gap-3 group">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${msg.isMine ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                      <Mic className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-sm font-bold">Play Voice Note</span>
                  </button>
                  <div className={`text-xs font-mono ml-4 ${msg.isMine ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {format(msg.timestamp, 'HH:mm')}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[#dcfce7] p-6 bg-white shadow-lg">
          <form onSubmit={sendMessage} className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={partnerOnline ? "Type a kind message..." : "Partner left. Please end chat..."}
              className="input flex-1 text-base bg-[#f8fbf9] shadow-inner font-medium py-3.5 px-5 rounded-2xl"
              disabled={!partnerOnline}
            />
            
            {voiceEnabled && (
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`btn flex items-center justify-center w-14 h-14 rounded-2xl shadow-xs transition-all ${isRecording ? 'bg-rose-500 hover:bg-rose-600 text-white animate-bounce' : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}
                title={isRecording ? "Click to stop and send" : "Click to record voice note"}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
            )}

            <button 
              type="submit" 
              disabled={!input.trim() || !partnerOnline}
              className="btn btn-primary h-14 px-8 rounded-2xl font-bold shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 text-center text-xs text-emerald-700 font-medium mt-3">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Messages are purely ephemeral and automatically deleted when session ends</span>
          </div>
        </div>
      </div>

      {/* End Chat Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-sm w-full p-8 text-center bg-white shadow-2xl border-rose-200">
            <div className="mx-auto w-16 h-16 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center mb-6 shadow-xs">
              <AlertTriangle className="w-8 h-8 text-rose-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-[#064e3b]">End this conversation?</h3>
            <p className="text-emerald-700 font-medium text-sm mb-8">All ephemeral chat messages will be wiped instantly.</p>
            
            <div className="flex gap-3">
              <button onClick={() => setShowEndModal(false)} className="btn btn-secondary flex-1 font-bold py-3.5">Keep Chatting</button>
              <button onClick={endChat} className="btn flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 shadow-md">Yes, Leave</button>
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
