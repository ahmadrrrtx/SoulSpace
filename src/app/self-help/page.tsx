'use client';

import { useState } from 'react';
import { ArrowLeft, Wind, Heart, Book, Moon } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    id: 'breathing',
    title: '4-7-8 Breathing',
    desc: 'Calm your nervous system',
    icon: Wind,
    content: 'Inhale for 4 seconds → Hold for 7 seconds → Exhale for 8 seconds. Repeat 4 times.'
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    desc: 'When you feel overwhelmed',
    icon: Heart,
    content: 'Name 5 things you see • 4 you can touch • 3 you hear • 2 you smell • 1 you taste.'
  },
  {
    id: 'journal',
    title: 'Quick Journal Prompt',
    desc: 'Get your thoughts out',
    icon: Book,
    content: 'What is one thing that went okay today? What helped, even a little?'
  },
  {
    id: 'sleep',
    title: 'Calm Down for Sleep',
    desc: 'Wind down routine',
    icon: Moon,
    content: 'Dim lights, do 4-7-8 breathing, write 3 things you’re grateful for, put phone away.'
  }
];

export default function SelfHelp() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Guided Self-Help Tools</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-semibold tracking-tight mb-3">Small tools for hard moments</h1>
        <p className="text-xl text-[#94a3b8] mb-10">Evidence-based techniques you can use right now.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="card p-8 cursor-pointer hover:border-[#4ade80]/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-6 h-6 text-[#4ade80]" />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl mb-1">{tool.title}</h3>
                  <p className="text-[#94a3b8] mb-4">{tool.desc}</p>
                  <div className="text-sm text-[#64748b]">Tap to try</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tool Modal */}
        {activeTool && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
            <div className="card max-w-md w-full p-8 text-center">
              {(() => {
                const tool = tools.find(t => t.id === activeTool)!;
                return (
                  <>
                    <div className="mx-auto w-16 h-16 bg-[#4ade80]/10 rounded-3xl flex items-center justify-center mb-6">
                      <tool.icon className="w-8 h-8 text-[#4ade80]" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-4">{tool.title}</h3>
                    <p className="text-lg text-[#94a3b8] leading-relaxed mb-8">{tool.content}</p>
                  </>
                );
              })()}
              <button 
                onClick={() => setActiveTool(null)}
                className="btn btn-primary w-full"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
