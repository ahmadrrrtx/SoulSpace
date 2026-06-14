'use client';

import { useState } from 'react';
import { ArrowLeft, TrendingUp, Heart, Wind, Users } from 'lucide-react';
import Link from 'next/link';

export default function CheckIn() {
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [stress, setStress] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [actionPlan, setActionPlan] = useState<string[]>([]);

  const generateActionPlan = (m: number, e: number, s: number, st: number) => {
    const suggestions: string[] = [];

    if (m <= 4) suggestions.push("Do 5 minutes of 4-7-8 breathing");
    if (e <= 4) suggestions.push("Step outside for fresh air (even 5 mins helps)");
    if (s <= 4) suggestions.push("Try a short wind-down routine before bed tonight");
    if (st >= 7) suggestions.push("Write down 3 things on your mind right now");
    if (m >= 7 && e >= 6) suggestions.push("Message someone you care about");

    // Default gentle suggestions
    if (suggestions.length === 0) {
      suggestions.push("Drink a glass of water", "Take 3 deep breaths");
    }

    return suggestions.slice(0, 3); // Max 3 suggestions
  };

  const handleSubmit = () => {
    const entry = {
      date: new Date().toISOString(),
      mood,
      energy,
      sleep,
      stress,
    };
    const existing = JSON.parse(localStorage.getItem('soulspace-checkins') || '[]');
    existing.push(entry);
    localStorage.setItem('soulspace-checkins', JSON.stringify(existing));

    // Generate personalized action plan
    const plan = generateActionPlan(mood, energy, sleep, stress);
    setActionPlan(plan);
    setShowActionPlan(true);
    setSubmitted(true);
  };

  const closeActionPlan = () => {
    setShowActionPlan(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Daily Check-in</div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        {!showActionPlan ? (
          <>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">How are you today?</h1>
            <p className="text-[#94a3b8] mb-10">This takes 15 seconds. Your answers stay on your device.</p>

            <div className="space-y-8">
              {[
                { label: 'Mood', value: mood, set: setMood, low: 'Very low', high: 'Great' },
                { label: 'Energy', value: energy, set: setEnergy, low: 'Exhausted', high: 'Full of energy' },
                { label: 'Sleep last night', value: sleep, set: setSleep, low: 'Terrible', high: 'Excellent' },
                { label: 'Stress level', value: stress, set: setStress, low: 'Very calm', high: 'Extremely stressed' },
              ].map((item, index) => (
                <div key={index} className="card p-8">
                  <div className="flex justify-between mb-4">
                    <div className="font-semibold">{item.label}</div>
                    <div className="font-mono text-[#4ade80]">{item.value}/10</div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={item.value}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="w-full accent-[#4ade80]"
                  />
                  <div className="flex justify-between text-xs text-[#64748b] mt-1">
                    <div>{item.low}</div>
                    <div>{item.high}</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSubmit}
              className="btn btn-primary w-full mt-10 py-4 text-lg"
            >
              Save Today&apos;s Check-in
            </button>

            {submitted && !showActionPlan && (
              <div className="text-center mt-4 text-[#4ade80]">✓ Saved</div>
            )}

            <div className="mt-8 text-center">
              <Link href="/trends" className="inline-flex items-center gap-2 text-sm text-[#4ade80] hover:underline">
                <TrendingUp className="w-4 h-4" /> View my trends &amp; insights
              </Link>
            </div>
          </>
        ) : (
          // Personalized Action Plan
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-[#4ade80]/10 rounded-3xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#4ade80]" />
              </div>
              <h2 className="text-3xl font-semibold mb-2">Here&apos;s what might help today</h2>
              <p className="text-[#94a3b8]">Small steps, based on how you&apos;re feeling.</p>
            </div>

            <div className="space-y-4 mb-10">
              {actionPlan.map((action, index) => (
                <div key={index} className="card p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Wind className="w-5 h-5 text-[#4ade80]" />}
                    {index === 1 && <Heart className="w-5 h-5 text-[#4ade80]" />}
                    {index === 2 && <Users className="w-5 h-5 text-[#4ade80]" />}
                  </div>
                  <div className="font-medium">{action}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={closeActionPlan} className="btn btn-secondary flex-1">
                Done for now
              </button>
              <Link href="/self-help" className="btn btn-primary flex-1">
                Open Tools
              </Link>
            </div>

            <div className="text-center mt-6 text-xs text-[#64748b]">
              These are gentle suggestions. You know yourself best.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
