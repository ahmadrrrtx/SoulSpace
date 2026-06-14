'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const rooms = [
  { 
    id: 'anxiety', 
    name: 'Anxiety Support', 
    desc: 'For when worry or panic feels overwhelming', 
    color: '#f87171',
    rules: [
      'Be kind and non-judgmental',
      'No medical advice — share experiences only',
      'If in crisis, use the Crisis Help button',
      'Respect everyone\'s privacy'
    ]
  },
  { 
    id: 'loneliness', 
    name: 'Loneliness Support', 
    desc: 'Connect with others who understand feeling alone', 
    color: '#60a5fa',
    rules: [
      'Be kind and non-judgmental',
      'No medical advice — share experiences only',
      'If in crisis, use the Crisis Help button',
      'Respect everyone\'s privacy'
    ]
  },
  { 
    id: 'stress', 
    name: 'Stress & Overwhelm', 
    desc: 'For when life feels too heavy', 
    color: '#fbbf24',
    rules: [
      'Be kind and non-judgmental',
      'No medical advice — share experiences only',
      'If in crisis, use the Crisis Help button',
      'Respect everyone\'s privacy'
    ]
  },
  { 
    id: 'sleep', 
    name: 'Sleep Struggles', 
    desc: 'Talk about insomnia, racing thoughts at night', 
    color: '#a78bfa',
    rules: [
      'Be kind and non-judgmental',
      'No medical advice — share experiences only',
      'If in crisis, use the Crisis Help button',
      'Respect everyone\'s privacy'
    ]
  },
  { 
    id: 'general', 
    name: 'General Support', 
    desc: 'Open space for anything on your mind', 
    color: '#4ade80',
    rules: [
      'Be kind and non-judgmental',
      'No medical advice — share experiences only',
      'If in crisis, use the Crisis Help button',
      'Respect everyone\'s privacy'
    ]
  },
];

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Peer Support Rooms</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-3">Small support rooms</h1>
            <p className="text-xl text-[#94a3b8]">Join a focused group with others going through similar things.</p>
          </div>
          <Image src="/rooms-illustration.png" alt="Support Rooms" width={280} height={200} className="rounded-2xl" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div 
              key={room.id}
              onClick={() => {
                setSelectedRoom(room);
                setAgreed(false);
              }}
              className="card p-8 cursor-pointer hover:border-[#4ade80]/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${room.color}15` }}
                >
                  <Users className="w-6 h-6" style={{ color: room.color }} />
                </div>
                <div className="text-right">
                  <div className="text-xs px-3 py-1 rounded-full bg-white/5">~8 online</div>
                </div>
              </div>
              <h3 className="font-semibold text-2xl mb-2 group-hover:text-[#4ade80] transition-colors">{room.name}</h3>
              <p className="text-[#94a3b8]">{room.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-white/5 rounded-2xl text-sm text-[#94a3b8]">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" /> These rooms are lightly moderated for safety.
          </div>
          Clear rules apply. Report button is always available.
        </div>
      </div>

      {/* Room Rules Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8">
            <h2 className="text-2xl font-semibold mb-2">{selectedRoom.name}</h2>
            <p className="text-[#94a3b8] mb-6">{selectedRoom.desc}</p>

            <div className="mb-6">
              <div className="font-medium mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Room Rules
              </div>
              <ul className="space-y-2 text-sm text-[#94a3b8]">
                {selectedRoom.rules.map((rule: string, i: number) => (
                  <li key={i} className="flex gap-3">• {rule}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-[#4ade80]"
              />
              <label className="text-sm text-[#94a3b8]">
                I agree to follow the rules and understand this is peer support only.
              </label>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedRoom(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button 
                disabled={!agreed}
                onClick={() => {
                  window.location.href = `/rooms/${selectedRoom.id}`;
                }}
                className="btn btn-primary flex-1 disabled:opacity-50"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
