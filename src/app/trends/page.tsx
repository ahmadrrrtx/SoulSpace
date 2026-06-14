'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CheckIn {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
}

export default function Trends() {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const data: CheckIn[] = JSON.parse(localStorage.getItem('soulspace-checkins') || '[]');
    setCheckins(data.slice(-14));

    // Generate simple insights
    if (data.length >= 3) {
      const avgMood = data.reduce((sum, c) => sum + c.mood, 0) / data.length;
      const avgSleep = data.reduce((sum, c) => sum + c.sleep, 0) / data.length;
      const avgStress = data.reduce((sum, c) => sum + c.stress, 0) / data.length;

      const newInsights: string[] = [];

      if (avgMood < 5) newInsights.push("Your mood has been lower than usual recently.");
      if (avgSleep < 5) newInsights.push("Sleep seems to be affecting how you feel.");
      if (avgStress > 6) newInsights.push("Stress levels have been high on average.");
      if (avgMood > 6) newInsights.push("You've been having more good days lately.");

      // Simple correlation insight
      const lowMoodDays = data.filter(d => d.mood <= 4);
      const highStressOnLowMood = lowMoodDays.filter(d => d.stress >= 7).length;
      if (lowMoodDays.length > 2 && highStressOnLowMood / lowMoodDays.length > 0.6) {
        newInsights.push("When stress is high, your mood tends to drop.");
      }

      if (newInsights.length === 0) {
        newInsights.push("Your mood has been relatively stable.");
      }

      setInsights(newInsights);
    }
  }, []);

  const avg = (key: keyof CheckIn) => {
    if (checkins.length === 0) return 0;
    return (checkins.reduce((sum, c) => sum + (c[key] as number), 0) / checkins.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Your Trends &amp; Insights</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-8">Last 14 check-ins</h1>

        {checkins.length === 0 ? (
          <div className="card p-8 text-center text-[#047857]">
            No check-ins yet. Start tracking from the Daily Check-in page.
          </div>
        ) : (
          <>
            {/* Averages */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {['mood', 'energy', 'sleep', 'stress'].map((key) => (
                <div key={key} className="card p-6 text-center">
                  <div className="text-sm text-[#475569] capitalize">{key}</div>
                  <div className="text-4xl font-semibold mt-2 text-[#4ade80]">{avg(key as keyof CheckIn)}</div>
                  <div className="text-xs text-[#475569] mt-1">Average</div>
                </div>
              ))}
            </div>

            {/* Pattern Insights */}
            <div className="card p-8 mb-8">
              <h3 className="font-semibold text-xl mb-6">What we noticed</h3>
              <div className="space-y-4 text-[#047857]">
                {insights.map((insight, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="text-[#4ade80] mt-1">•</div>
                    <div>{insight}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-[#475569] mt-6">These are gentle observations from your data.</div>
            </div>

            {/* Recent Entries */}
            <div className="card p-8">
              <h3 className="font-semibold mb-6">Recent Entries</h3>
              <div className="space-y-4 text-sm">
                {checkins.slice().reverse().map((entry, i) => (
                  <div key={i} className="flex justify-between border-b border-[#dcfce7] pb-4 last:border-none last:pb-0">
                    <div>{new Date(entry.date).toLocaleDateString()}</div>
                    <div className="flex gap-6 text-[#047857]">
                      <span>Mood {entry.mood}</span>
                      <span>Energy {entry.energy}</span>
                      <span>Sleep {entry.sleep}</span>
                      <span>Stress {entry.stress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
