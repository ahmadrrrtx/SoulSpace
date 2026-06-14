'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Shield, AlertTriangle, Sparkles, MessageSquare, Heart, Clock, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const rooms = [
  { 
    id: 'anxiety', 
    name: 'Somatic Anxiety Support', 
    desc: 'A gentle space to ground yourself when worry, chest tightness, or panic feels too heavy.', 
    color: '#10b981',
    activePeersCount: 14,
    tags: ['Grounding', 'Panic Relief', 'Breathwork'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
  { 
    id: 'burnout', 
    name: 'Work & Life Burnout', 
    desc: 'For when your nervous system feels deeply exhausted, chronic fatigue sets in, or you feel emotionally detached.', 
    color: '#059669',
    activePeersCount: 19,
    tags: ['Exhaustion', 'Rest', 'Boundary Setting'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
  { 
    id: 'loneliness', 
    name: 'Deep Modern Loneliness', 
    desc: 'Connect highly vulnerably with empathetic peers who truly understand feeling isolated in a crowded world.', 
    color: '#047857',
    activePeersCount: 22,
    tags: ['Connection', 'Vulnerability', 'Community'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
  { 
    id: 'stress', 
    name: 'Study & Exam Pressure', 
    desc: 'Academic stress, impending deadlines, and academic anxiety can feel suffocating. Lean on peers who get it.', 
    color: '#14b8a6',
    activePeersCount: 16,
    tags: ['Focus', 'Exams', 'De-stress'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
  { 
    id: 'grief', 
    name: 'Grief & Heartache', 
    desc: 'Processing complex non-linear waves of emotional loss, bereavement, or sudden heartbreak.', 
    color: '#0f766e',
    activePeersCount: 11,
    tags: ['Loss', 'Healing', 'Heartbreak'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
  { 
    id: 'general', 
    name: 'The Gentle Tea Room', 
    desc: 'An open, highly welcoming supportive environment to share whatever daily thoughts or small victories are on your mind.', 
    color: '#065f46',
    activePeersCount: 28,
    tags: ['Daily Life', 'Positivity', 'Just Talk'],
    rules: [
      'Be strictly compassionate and non-judgmental',
      'No medical or diagnostic advice — share personal somatic experiences only',
      'If you are in immediate crisis, please click the SOS Emergency button',
      'Respect the absolute privacy and vulnerability of all peers'
    ]
  },
];

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [agreed, setAgreed] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    if (!agreed || !selectedRoom) return;
    setIsJoining(true);
    setTimeout(() => {
      window.location.href = `/rooms/${selectedRoom.id}`;
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-[#064e3b] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Navigation Header */}
      <div className="border-b border-[#dcfce7] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <ArrowLeft className="w-4 h-4" /> 
            <span>Back to Homepage</span>
          </Link>
          <div className="font-extrabold text-2xl flex items-center gap-2.5 text-[#064e3b]">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <span>Supportive Topic Rooms</span>
          </div>
          <Link href="/chat" className="btn btn-primary px-6 py-2 text-sm shadow-xs">
            Start 1-on-1 Chat
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 py-14 flex-1 w-full">
        <div className="mb-14 flex flex-col lg:flex-row items-center justify-between gap-10 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>Real Human Community</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
              Caring Group Support. <br />
              <span className="text-emerald-300">You belong here.</span>
            </h1>
            <p className="text-emerald-100/90 text-lg sm:text-xl font-medium leading-relaxed mb-6">
              Step into intimate, completely anonymous group discussions centered on specific life challenges. Share what feels authentic, receive empathy, and find solace.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs font-extrabold text-emerald-200">
              <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3.5 py-1.5 rounded-xl border border-emerald-700/50">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted Ephemeral Broadcasts</span>
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3.5 py-1.5 rounded-xl border border-emerald-700/50">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lightly Moderated by Volunteers</span>
              </span>
            </div>
          </div>
          <div className="w-full lg:w-auto flex justify-center">
            <Image src="/rooms-illustration.png" alt="Support Rooms" width={320} height={240} className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500 ease-out border border-emerald-600/40" />
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#064e3b]">Select a Sanctuary Room</h2>
          <p className="text-emerald-700 font-medium text-base mt-1">Click any space below to review safety guidelines and enter securely.</p>
        </div>

        {/* Breathtaking Elite Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                onClick={() => {
                  setSelectedRoom(room);
                  setAgreed(false);
                }}
                className="card p-8 cursor-pointer bg-white/90 backdrop-blur-xl border border-emerald-100 hover:border-emerald-400 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-50/60 z-0 group-hover:scale-150 transition-transform duration-700 ease-out" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${room.color}15`, color: room.color }}
                    >
                      <Users className="w-7 h-7" />
                    </div>
                    
                    {/* Professional Real-time Live Badge */}
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200 shadow-2xs group-hover:border-emerald-400 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Active Channel</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-2xl mb-3 text-[#064e3b] group-hover:text-emerald-600 transition-colors leading-snug">
                    {room.name}
                  </h3>
                  
                  <p className="text-emerald-800/85 text-sm leading-relaxed mb-8 font-medium">
                    {room.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-5 border-t border-emerald-100 flex items-center justify-between font-extrabold">
                  <div className="flex flex-wrap gap-1.5">
                    {room.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-[#f5fbf7] text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform text-sm">
                    <span>Enter</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elite Safety Assurance Pledge */}
        <div className="mt-16 card p-8 bg-white border border-emerald-200/80 shadow-lg rounded-3xl text-sm text-emerald-800 font-medium flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#064e3b]">Community Safety Commitment</h4>
              <p className="text-emerald-700 mt-0.5">All Sanctuary rooms are purely anonymous and completely unrecorded. Our volunteer team lightly monitors groups to guarantee kindness.</p>
            </div>
          </div>
          <Link href="/listener" className="btn btn-secondary font-bold whitespace-nowrap shadow-xs">
            Join Volunteer Squad
          </Link>
        </div>
      </div>

      {/* Sanctuary Room Rules Confirmation Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card max-w-lg w-full p-8 sm:p-10 bg-white shadow-2xl border-emerald-200 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-xs">Sanctuary Gateway</span>
                <button onClick={() => setSelectedRoom(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
              </div>

              <h2 className="text-3xl font-extrabold text-[#064e3b] mb-2">{selectedRoom.name}</h2>
              <p className="text-emerald-700 font-medium text-base mb-8 leading-relaxed">{selectedRoom.desc}</p>

              <div className="mb-8 p-6 bg-[#f5fbf7] rounded-2xl border border-emerald-100">
                <div className="font-extrabold mb-3 flex items-center gap-2 text-[#064e3b] text-base">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Required Room Agreements</span>
                </div>
                <ul className="space-y-3 text-sm text-emerald-900 font-semibold">
                  {selectedRoom.rules.map((rule: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-3.5 mb-8 bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/80 cursor-pointer" onClick={() => setAgreed(!agreed)}>
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded-md accent-emerald-600 cursor-pointer shrink-0"
                />
                <label className="text-sm font-extrabold text-[#064e3b] cursor-pointer select-none">
                  I pledge to treat all fellow peers with profound respect, honor their anonymity, and understand this platform is not clinical therapy.
                </label>
              </div>

              <div className="flex gap-4">
                <button 
                  disabled={isJoining}
                  onClick={() => setSelectedRoom(null)}
                  className="btn btn-secondary flex-1 font-extrabold py-4"
                >
                  Return
                </button>
                <button 
                  disabled={!agreed || isJoining}
                  onClick={handleJoin}
                  className="btn btn-primary flex-1 font-extrabold py-4 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed text-center flex items-center justify-center gap-2"
                >
                  {isJoining ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Protected Room</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
