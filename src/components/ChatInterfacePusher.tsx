'use client';

import { useEffect, useState, useRef } from 'react';
import { Send, X, AlertTriangle, Heart, Mic, MicOff } from 'lucide-react';
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
    // Subscribe to private channel
    const channel = pusherClient.subscribe(channelName);
    channelRef.current = channel;

    channel.bind('new-message', (data: any) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.text,
        audio: data.audio,
        isMine: data.isMine || false,
        timestamp: new Date(data.timestamp),
        type: data.type || 'text',
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

    // Simulate matching after 3 seconds
    const matchTimer = setTimeout(() => {
      setPartnerOnline(true);
    }, 3000);

    return () => {
      clearTimeout(matchTimer);
      pusherClient.unsubscribe(channelName);
    };
  }, [sessionId]);

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
    <div className="min-h-screen bg-[#0a0c10] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#12151b]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#4ade80] rounded-2xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#0a0c10]" />
              </div>
              <div>
                <div className="font-semibold">SoulSpace Chat</div>
                <div className="text-xs text-[#4ade80]">
                  {partnerOnline ? 'Connected anonymously' : 'Partner left'} • {
                    matchingMode === 'topic' ? topicLabels[topic || ''] : moodLabels[mood || '']
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors ${voiceEnabled ? 'border-[#4ade80] text-[#4ade80]' : 'border-white/10'}`}
            >
              <Mic className="w-4 h-4" /> Voice
            </button>
            
            <button 
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" /> End Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center pt-20">
              <div className="text-[#4ade80] mb-4">
                <Heart className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-xl font-medium">You&apos;re now connected.</p>
              <p className="text-[#94a3b8] mt-2">Be kind. Listen. Share what feels right.</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'text' && msg.text && (
                <div className={`chat-bubble ${msg.isMine ? 'chat-bubble-user' : 'chat-bubble-other'}`}>
                  <div>{msg.text}</div>
                  <div className={`text-[10px] mt-1.5 ${msg.isMine ? 'text-[#0a0c10]/60' : 'text-[#64748b]'}`}>
                    {format(msg.timestamp, 'HH:mm')}
                  </div>
                </div>
              )}

              {msg.type === 'voice' && msg.audio && (
                <div className={`flex items-center gap-3 px-5 py-4 rounded-3xl ${msg.isMine ? 'bg-[#4ade80] text-[#0a0c10]' : 'bg-[#1a1f28] border border-white/10'}`}>
                  <button onClick={() => playAudio(msg.audio!)} className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Voice message</span>
                  </button>
                  <div className="text-[10px] opacity-60">{format(msg.timestamp, 'HH:mm')}</div>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-6 bg-[#12151b]">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input flex-1 text-lg"
              disabled={!partnerOnline}
            />
            
            {voiceEnabled && (
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`btn flex items-center justify-center w-14 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}

            <button 
              type="submit" 
              disabled={!input.trim() || !partnerOnline}
              className="btn btn-primary px-8 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-[#64748b] mt-3">
            This chat will disappear when you leave • Messages are not stored
          </p>
        </div>
      </div>

      {/* End Chat Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="card max-w-sm w-full p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-[#f87171]/10 rounded-3xl flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-[#f87171]" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">End this conversation?</h3>
            <p className="text-[#94a3b8]">All messages will be deleted immediately.</p>
            
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowEndModal(false)} className="btn btn-secondary flex-1">Keep chatting</button>
              <button onClick={endChat} className="btn flex-1 bg-[#f87171] hover:bg-[#ef4444] text-white">End chat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
