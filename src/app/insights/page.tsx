'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CheckIn {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
}

export default function EmotionalGPS() {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data: CheckIn[] = JSON.parse(localStorage.getItem('soulspace-checkins') || '[]');
    setCheckins(data);

    if (data.length >= 4) {
      generateInsights(data);
    }
    setLoading(false);
  }, []);

  const generateInsights = (data: CheckIn[]) => {
    const newInsights: string[] = [];
    const recent = data.slice(-7); // Last 7 entries
    const avgMood = recent.reduce((sum, c) => sum + c.mood, 0) / recent.length;
    const avgStress = recent.reduce((sum, c) => sum + c.stress, 0) / recent.length;
    const avgSleep = recent.reduce((sum, c) => sum + c.sleep, 0) / recent.length;

    // Pattern 1: Day of week patterns
    const dayAverages: { [key: string]: number[] } = {};
    data.forEach(entry => {
      const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!dayAverages[day]) dayAverages[day] = [];
      dayAverages[day].push(entry.mood);
    });

    Object.entries(dayAverages).forEach(([day, moods]) => {
      const avg = moods.reduce((a, b) => a + b, 0) / moods.length;
      if (avg < 4.5 && moods.length >= 2) {
        newInsights.push(`Your mood tends to be lower on ${day}s.`);
      }
      if (avg > 7 && moods.length >= 2) {
        newInsights.push(`${day}s are often good days for you.`);
      }
    });

    // Pattern 2: Stress & Mood relationship
    const highStressDays = data.filter(d => d.stress >= 7);
    const lowMoodOnHighStress = highStressDays.filter(d => d.mood <= 4).length;
    if (highStressDays.length >= 3 && lowMoodOnHighStress / highStressDays.length > 0.6) {
      newInsights.push("When your stress is high, your mood often drops.");
    }

    // Pattern 3: Sleep impact
    const poorSleepDays = data.filter(d => d.sleep <= 4);
    if (poorSleepDays.length >= 3) {
      newInsights.push("Poor sleep appears to affect how you feel the next day.");
    }

    // Pattern 4: Overall trend
    if (avgMood > 6.5) {
      newInsights.push("You've been having more good days recently.");
    } else if (avgMood < 4.5) {
      newInsights.push("Things have felt heavier lately. You're not alone.");
    }

    // Pattern 5: Energy & Mood
    const lowEnergyDays = data.filter(d => d.energy <= 4);
    if (lowEnergyDays.length >= 3) {
      newInsights.push("Low energy days often coincide with lower mood.");
    }

    // Default positive insight
    if (newInsights.length === 0) {
      newInsights.push("Your check-ins show you're paying attention to how you feel. That's powerful.");
    }

    setInsights(newInsights.slice(0, 5));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading insights...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4ade80]" /> Emotional GPS
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-3">Your Emotional GPS</h1>
            <p className="text-xl text-[#94a3b8]">Understanding your patterns, gently.</p>
          </div>
          <Image src="/insights-illustration.png" alt="Emotional Insights" width={280} height={200} className="rounded-2xl" />
        </div>

        {checkins.length < 4 ? (
          <div className="card p-10 text-center">
            <Calendar className="w-12 h-12 mx-auto text-[#4ade80] mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Not enough data yet</h3>
            <p className="text-[#94a3b8] mb-6">Check in for at least 4 days to see your personal insights.</p>
            <Link href="/check-in" className="btn btn-primary">Start Daily Check-in</Link>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="card p-6 text-center">
                <div className="text-sm text-[#64748b]">Recent Average Mood</div>
                <div className="text-5xl font-semibold mt-2 text-[#4ade80]">
                  {(checkins.slice(-7).reduce((sum, c) => sum + c.mood, 0) / Math.min(7, checkins.length)).toFixed(1)}
                </div>
              </div>
              <div className="card p-6 text-center">
                <div className="text-sm text-[#64748b]">Recent Average Stress</div>
                <div className="text-5xl font-semibold mt-2 text-[#fbbf24]">
                  {(checkins.slice(-7).reduce((sum, c) => sum + c.stress, 0) / Math.min(7, checkins.length)).toFixed(1)}
                </div>
              </div>
              <div className="card p-6 text-center">
                <div className="text-sm text-[#64748b]">Recent Average Sleep</div>
                <div className="text-5xl font-semibold mt-2 text-[#60a5fa]">
                  {(checkins.slice(-7).reduce((sum, c) => sum + c.sleep, 0) / Math.min(7, checkins.length)).toFixed(1)}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-[#4ade80]" />
                <h2 className="text-2xl font-semibold">What we noticed</h2>
              </div>

              <div className="space-y-5">
                {insights.map((insight, index) => (
                  <div key={index} className="flex gap-4 p-5 bg-white/5 rounded-2xl">
                    <div className="text-[#4ade80] mt-1">•</div>
                    <div className="text-lg text-[#e2e8f0]">{insight}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-[#64748b]">
                These insights are generated from your own check-ins. They&apos;re here to help you understand yourself better.
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/check-in" className="text-sm text-[#4ade80] hover:underline">
                Continue checking in to get better insights →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
