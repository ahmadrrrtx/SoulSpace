'use client';

import { useState } from 'react';
import { Wind, Heart, BookOpen, X } from 'lucide-react';

export function QuickTools() {
  const [activeTool, setActiveTool] = useState<'none' | 'breathing' | 'grounding'>('none');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);

  const startBreathing = () => {
    setActiveTool('breathing');
    setBreathingPhase('inhale');
    setCount(4);

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          if (breathingPhase === 'inhale') {
            setBreathingPhase('hold');
            return 4;
          } else if (breathingPhase === 'hold') {
            setBreathingPhase('exhale');
            return 6;
          } else {
            setBreathingPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    // Auto stop after 2 minutes
    setTimeout(() => {
      clearInterval(interval);
      setActiveTool('none');
    }, 120000);
  };

  const groundingSteps = [
    "Name 5 things you can see",
    "Name 4 things you can touch",
    "Name 3 things you can hear",
    "Name 2 things you can smell",
    "Name 1 thing you can taste"
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-[#4ade80]/10 rounded-xl flex items-center justify-center">
          <Wind className="w-4 h-4 text-[#4ade80]" />
        </div>
        <h3 className="font-semibold">Quick Support Tools</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          onClick={startBreathing}
          className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
        >
          <Wind className="w-5 h-5 text-[#4ade80]" />
          <div>
            <div className="font-medium">4-7-8 Breathing</div>
            <div className="text-xs text-[#64748b]">Calm your nervous system</div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('grounding')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
        >
          <Heart className="w-5 h-5 text-[#4ade80]" />
          <div>
            <div className="font-medium">5-4-3-2-1 Grounding</div>
            <div className="text-xs text-[#64748b]">For when you feel overwhelmed</div>
          </div>
        </button>
      </div>

      {/* Breathing Modal */}
      {activeTool === 'breathing' && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="text-center max-w-xs">
            <div className="text-6xl mb-8 transition-all duration-700">
              {breathingPhase === 'inhale' && '🌬️'}
              {breathingPhase === 'hold' && '⏸️'}
              {breathingPhase === 'exhale' && '💨'}
            </div>
            
            <div className="text-5xl font-semibold tabular-nums mb-2">{count}</div>
            <div className="text-2xl font-medium capitalize mb-8">{breathingPhase}</div>
            
            <button 
              onClick={() => setActiveTool('none')}
              className="btn btn-secondary"
            >
              Stop Exercise
            </button>
          </div>
        </div>
      )}

      {/* Grounding Modal */}
      {activeTool === 'grounding' && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">5-4-3-2-1 Grounding</h3>
            
            <div className="space-y-4">
              {groundingSteps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="font-mono text-[#4ade80] font-bold w-6">{5 - index}</div>
                  <div>{step}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setActiveTool('none')}
              className="btn btn-primary w-full mt-8"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
