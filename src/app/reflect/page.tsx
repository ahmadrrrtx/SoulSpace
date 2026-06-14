'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Reflection {
  date: string;
  bestMoment: string;
  hardestMoment: string;
  proudOf: string;
}

export default function DailyReflection() {
  const [bestMoment, setBestMoment] = useState('');
  const [hardestMoment, setHardestMoment] = useState('');
  const [proudOf, setProudOf] = useState('');
  const [saved, setSaved] = useState(false);
  const [pastReflections, setPastReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    const savedReflections = JSON.parse(localStorage.getItem('soulspace-reflections') || '[]');
    setPastReflections(savedReflections.slice(-5).reverse()); // Show last 5
  }, []);

  const saveReflection = () => {
    if (!bestMoment && !hardestMoment && !proudOf) return;

    const newReflection: Reflection = {
      date: new Date().toISOString(),
      bestMoment: bestMoment.trim(),
      hardestMoment: hardestMoment.trim(),
      proudOf: proudOf.trim(),
    };

    const existing = JSON.parse(localStorage.getItem('soulspace-reflections') || '[]');
    const updated = [...existing, newReflection];
    localStorage.setItem('soulspace-reflections', JSON.stringify(updated));

    setPastReflections([newReflection, ...pastReflections].slice(0, 5));
    setSaved(true);

    // Clear form
    setTimeout(() => {
      setBestMoment('');
      setHardestMoment('');
      setProudOf('');
      setSaved(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4ade80]" /> Daily Reflection
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-3">How was your day?</h1>
            <p className="text-xl text-[#047857]">A gentle way to process your day and build emotional memory.</p>
          </div>
          <Image src="/reflection-illustration.png" alt="Daily Reflection" width={280} height={200} className="rounded-2xl" />
        </div>

        {/* Today's Reflection */}
        <div className="card p-8 mb-10">
          <h3 className="font-semibold text-xl mb-6">Today&apos;s Reflection</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[#047857] mb-2">What was the best moment today?</label>
              <textarea
                value={bestMoment}
                onChange={(e) => setBestMoment(e.target.value)}
                placeholder="Even a small moment counts..."
                className="input w-full h-24 resize-y"
              />
            </div>

            <div>
              <label className="block text-sm text-[#047857] mb-2">What was the hardest part?</label>
              <textarea
                value={hardestMoment}
                onChange={(e) => setHardestMoment(e.target.value)}
                placeholder="It&apos;s okay to acknowledge the difficult parts..."
                className="input w-full h-24 resize-y"
              />
            </div>

            <div>
              <label className="block text-sm text-[#047857] mb-2">What is one thing you&apos;re proud of?</label>
              <textarea
                value={proudOf}
                onChange={(e) => setProudOf(e.target.value)}
                placeholder="Big or small — you showed up."
                className="input w-full h-24 resize-y"
              />
            </div>
          </div>

          <button 
            onClick={saveReflection}
            disabled={!bestMoment && !hardestMoment && !proudOf}
            className="btn btn-primary w-full mt-8 py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> Save Today&apos;s Reflection
          </button>

          {saved && (
            <div className="text-center mt-4 text-[#4ade80]">✓ Reflection saved</div>
          )}
        </div>

        {/* Past Reflections */}
        {pastReflections.length > 0 && (
          <div>
            <h3 className="font-semibold text-xl mb-6">Recent Reflections</h3>
            <div className="space-y-4">
              {pastReflections.map((reflection, index) => (
                <div key={index} className="card p-6">
                  <div className="text-sm text-[#475569] mb-4">
                    {new Date(reflection.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  {reflection.bestMoment && (
                    <div className="mb-4">
                      <div className="text-xs text-[#4ade80] mb-1">BEST MOMENT</div>
                      <div>{reflection.bestMoment}</div>
                    </div>
                  )}
                  {reflection.hardestMoment && (
                    <div className="mb-4">
                      <div className="text-xs text-[#f87171] mb-1">HARDEST MOMENT</div>
                      <div>{reflection.hardestMoment}</div>
                    </div>
                  )}
                  {reflection.proudOf && (
                    <div>
                      <div className="text-xs text-[#60a5fa] mb-1">PROUD OF</div>
                      <div>{reflection.proudOf}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
