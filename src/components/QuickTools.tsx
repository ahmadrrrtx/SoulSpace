'use client';

import { useState, useEffect, useRef } from 'react';
import { Wind, Heart, X } from 'lucide-react';

export function QuickTools() {
  const [activeTool, setActiveTool] = useState<'none' | 'breathing' | 'grounding'>('none');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);
  const phaseRef = useRef(breathingPhase);

  useEffect(() => {
    phaseRef.current = breathingPhase;
  }, [breathingPhase]);

  useEffect(() => {
    if (activeTool !== 'breathing') return;

    setBreathingPhase('inhale');
    setCount(4);

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          const currentPhase = phaseRef.current;
          if (currentPhase === 'inhale') {
            setBreathingPhase('hold');
            return 7;
          } else if (currentPhase === 'hold') {
            setBreathingPhase('exhale');
            return 8;
          } else {
            setBreathingPhase('inhale');
            return 4;
          }
        }
        return prevCount - 1;
      });
    }, 1000);

    const autoStop = setTimeout(() => {
      clearInterval(timer);
      setActiveTool('none');
    }, 120000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoStop);
    };
  }, [activeTool]);

  const groundingSteps = [
    "Name 5 things you can see",
    "Name 4 things you can touch",
    "Name 3 things you can hear",
    "Name 2 things you can smell",
    "Name 1 thing you can taste"
  ];

  return (
    <div className="card p-6 border border-[#dcfce7] bg-white shadow-xs">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Wind className="w-4 h-4 text-emerald-700" />
        </div>
        <h3 className="font-semibold text-[#064e3b]">Quick Support Tools</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          onClick={() => setActiveTool('breathing')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-[#f8fbf9] hover:bg-[#f0fdf4] border border-[#dcfce7] text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Wind className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="font-semibold text-[#064e3b]">4-7-8 Breathing</div>
            <div className="text-xs text-[#475569]">Calm your nervous system</div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('grounding')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-[#f8fbf9] hover:bg-[#f0fdf4] border border-[#dcfce7] text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="font-semibold text-[#064e3b]">5-4-3-2-1 Grounding</div>
            <div className="text-xs text-[#475569]">For feel-overwhelmed moments</div>
          </div>
        </button>
      </div>

      {/* Breathing Modal */}
      {activeTool === 'breathing' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-sm w-full p-8 text-center bg-white shadow-2xl border-emerald-200">
            <div className="flex justify-end mb-2">
              <button onClick={() => setActiveTool('none')} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-7xl mb-6 transition-all duration-500 transform hover:scale-110">
              {breathingPhase === 'inhale' && '🌬️'}
              {breathingPhase === 'hold' && '⏸️'}
              {breathingPhase === 'exhale' && '💨'}
            </div>
            
            <div className="text-6xl font-bold tabular-nums text-emerald-600 mb-2">{count}</div>
            <div className="text-2xl font-semibold capitalize text-[#064e3b] mb-8">
              {breathingPhase === 'inhale' && 'Inhale deeply...'}
              {breathingPhase === 'hold' && 'Hold your breath...'}
              {breathingPhase === 'exhale' && 'Exhale slowly...'}
            </div>
            
            <button 
              onClick={() => setActiveTool('none')}
              className="btn btn-secondary w-full py-3"
            >
              Finish Exercise
            </button>
          </div>
        </div>
      )}

      {/* Grounding Modal */}
      {activeTool === 'grounding' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-md w-full p-8 bg-white shadow-2xl border-emerald-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#064e3b]">5-4-3-2-1 Grounding</h3>
              <button onClick={() => setActiveTool('none')} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {groundingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-[#f8fbf9] border border-emerald-100 rounded-2xl hover:border-emerald-200 transition-all">
                  <div className="font-mono text-emerald-700 bg-emerald-100 font-bold w-8 h-8 rounded-xl flex items-center justify-center text-lg shadow-xs">
                    {5 - index}
                  </div>
                  <div className="text-[#064e3b] font-medium">{step}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setActiveTool('none')}
              className="btn btn-primary w-full mt-8 py-3.5 font-bold shadow-md"
            >
              I Feel Grounded
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
