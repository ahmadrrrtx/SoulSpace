'use client';

import { useState } from 'react';
import { ArrowLeft, Wind, Heart, Moon, Brain, Users } from 'lucide-react';
import Link from 'next/link';

const paths = [
  {
    id: 'panic',
    title: 'Panic / Anxiety',
    icon: Wind,
    color: '#f87171',
    description: 'Feeling overwhelmed or having panic symptoms',
    tools: [
      '4-7-8 Breathing (start here)',
      '5-4-3-2-1 Grounding',
      'Cold water on face or hands',
      'Name 5 things you can see right now'
    ],
    tip: 'You are safe. This feeling will pass.'
  },
  {
    id: 'lonely',
    title: 'Loneliness',
    icon: Users,
    color: '#60a5fa',
    description: 'Feeling disconnected or alone',
    tools: [
      'Text or call one person',
      'Write down 3 things you’re grateful for',
      'Join a SoulSpace chat room',
      'Do something kind for yourself'
    ],
    tip: 'Connection helps. Even small contact matters.'
  },
  {
    id: 'sleep',
    title: 'Can’t Sleep',
    icon: Moon,
    color: '#a78bfa',
    description: 'Struggling to fall or stay asleep',
    tools: [
      '4-7-8 Breathing in bed',
      'No screens 30 mins before bed',
      'Write down worries on paper',
      'Progressive muscle relaxation'
    ],
    tip: 'Your body knows how to rest.'
  },
  {
    id: 'overthink',
    title: 'Overthinking / Rumination',
    icon: Brain,
    color: '#fbbf24',
    description: 'Mind racing with thoughts',
    tools: [
      'Set a 5-minute worry timer',
      'Write the thought and ask “Is this helpful?”',
      'Do a physical activity (walk, stretch)',
      'Name the thought and let it pass'
    ],
    tip: 'Thoughts are not facts.'
  }
];

export default function SupportPaths() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Personalized Support Paths</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-3">What are you struggling with right now?</h1>
          <p className="text-xl text-[#94a3b8]">Choose a path and get targeted, gentle tools.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className="card p-8 cursor-pointer hover:border-[#4ade80]/40 transition-all group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${path.color}15` }}
                >
                  <path.icon className="w-7 h-7" style={{ color: path.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl mb-1 group-hover:text-[#4ade80] transition-colors">{path.title}</h3>
                  <p className="text-[#94a3b8]">{path.description}</p>
                </div>
              </div>
              <div className="text-sm text-[#64748b]">Tap to see tools →</div>
            </div>
          ))}
        </div>

        {/* Selected Path Modal */}
        {selectedPath && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
            <div className="card max-w-lg w-full p-8">
              {(() => {
                const path = paths.find(p => p.id === selectedPath)!;
                return (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${path.color}15` }}
                      >
                        <path.icon className="w-7 h-7" style={{ color: path.color }} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">{path.title}</h2>
                        <p className="text-[#94a3b8]">{path.description}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 mb-6">
                      <div className="font-medium mb-4 text-[#4ade80]">Try these tools:</div>
                      <ul className="space-y-3 text-sm">
                        {path.tools.map((tool, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#12151b] border border-white/10 rounded-2xl p-5 text-sm mb-8">
                      💡 {path.tip}
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => setSelectedPath(null)}
                        className="btn btn-secondary flex-1"
                      >
                        Close
                      </button>
                      <Link 
                        href="/self-help" 
                        className="btn btn-primary flex-1"
                      >
                        Open Full Tools
                      </Link>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
