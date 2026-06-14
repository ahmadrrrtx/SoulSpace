'use client';

import { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Users, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ChatInterfacePusher } from '../../components/ChatInterfacePusher';

const moods = [
  { id: 'anxiety', label: 'Anxiety / Panic', emoji: '😰' },
  { id: 'loneliness', label: 'Loneliness', emoji: '😔' },
  { id: 'stress', label: 'Stress / Overwhelmed', emoji: '😫' },
  { id: 'sadness', label: 'Sadness / Low mood', emoji: '💔' },
  { id: 'justtalk', label: 'Just need to talk', emoji: '💬' },
  { id: 'other', label: 'Other', emoji: '🌱' },
];

export default function ChatPage() {
  const [stage, setStage] = useState<'landing' | 'select-mood' | 'select-topic' | 'matching' | 'chatting'>('landing');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [matchingMode, setMatchingMode] = useState<'mood' | 'topic'>('mood');

  useEffect(() => {
    // Check if coming from topic selection
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    
    if (mode === 'topic') {
      const savedTopic = sessionStorage.getItem('selectedTopic');
      if (savedTopic) {
        setSelectedTopic(savedTopic);
        setMatchingMode('topic');
        setStage('matching');
        
        const newSession = crypto.randomUUID();
        setSessionId(newSession);
        
        setTimeout(() => {
          setStage('chatting');
        }, Math.random() * 6000 + 5000);
      }
    }
  }, []);

  const startMoodMatching = (mood: string) => {
    const newSession = crypto.randomUUID();
    setSessionId(newSession);
    setSelectedMood(mood);
    setMatchingMode('mood');
    setStage('matching');
    
    setTimeout(() => {
      setStage('chatting');
    }, Math.random() * 5000 + 4000);
  };

  const endChat = () => {
    setStage('landing');
    setSessionId('');
    setSelectedMood('');
    setSelectedTopic('');
    sessionStorage.removeItem('selectedTopic');
  };

  if (stage === 'chatting') {
    return (
      <ChatInterfacePusher 
        sessionId={sessionId} 
        mood={selectedMood} 
        topic={selectedTopic}
        matchingMode={matchingMode}
        onEndChat={endChat} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-[#94a3b8] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 text-sm text-[#4ade80]">
            <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
            SoulSpace
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        {stage === 'landing' && (
          <div className="max-w-md w-full text-center">
            <div className="mx-auto w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
              <Heart className="w-10 h-10 text-[#4ade80]" />
            </div>

            <h1 className="text-5xl font-semibold tracking-tighter mb-4">Ready to talk?</h1>
            <p className="text-xl text-[#94a3b8] mb-10">You&apos;ll be matched with someone who understands what you&apos;re going through.</p>

            <button 
              onClick={() => setStage('select-mood')}
              className="btn btn-primary w-full text-xl py-5 flex items-center justify-center gap-3"
            >
              Start Random Chat
              <Users className="w-6 h-6" />
            </button>

            <div className="mt-8 text-xs text-[#64748b] flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Average wait: 5-12 seconds
            </div>
          </div>
        )}

        {stage === 'select-mood' && (
          <div className="max-w-lg w-full">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-semibold tracking-tight mb-3">How are you feeling?</h2>
              <p className="text-[#94a3b8]">This helps us match you with someone similar.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => startMoodMatching(mood.id)}
                  className="card p-6 text-left hover:border-[#4ade80]/50 transition-all flex items-center gap-4 group"
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <div>
                    <div className="font-medium text-lg">{mood.label}</div>
                    <div className="text-sm text-[#64748b]">Match with similar feelings</div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-[#64748b] mt-8">
              You can always change this later
            </p>
          </div>
        )}

        {stage === 'matching' && (
          <div className="text-center max-w-sm">
            <div className="matching mx-auto w-20 h-20 border-[6px] border-[#4ade80] border-t-transparent rounded-full mb-10" />
            
            <h2 className="text-4xl font-semibold tracking-tight mb-3">Finding someone for you...</h2>
            <p className="text-[#94a3b8]">We&apos;re looking for someone who might understand what you&apos;re feeling.</p>
            
            <div className="mt-10 text-xs text-[#64748b]">
              This may take up to 15 seconds
            </div>
          </div>
        )}
      </div>

      {/* Safety footer */}
      <div className="border-t border-white/10 py-5 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748b]">
          <AlertTriangle className="w-3.5 h-3.5" />
          If you feel unsafe or need real help, please leave and contact a crisis line.
        </div>
      </div>
    </div>
  );
}
