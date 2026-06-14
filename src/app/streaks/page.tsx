'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Flame, Calendar, Award } from 'lucide-react';
import Link from 'next/link';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null;
  totalCheckIns: number;
}

export default function SupportStreaks() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
    totalCheckIns: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('soulspace-streaks');
    if (saved) {
      setStreakData(JSON.parse(saved));
    } else {
      // Initialize if no data
      const initialData: StreakData = {
        currentStreak: 0,
        longestStreak: 0,
        lastCheckIn: null,
        totalCheckIns: 0,
      };
      localStorage.setItem('soulspace-streaks', JSON.stringify(initialData));
      setStreakData(initialData);
    }
  }, []);

  const checkInToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = streakData.lastCheckIn;

    let newCurrentStreak = streakData.currentStreak;

    if (!lastDate) {
      newCurrentStreak = 1;
    } else {
      const last = new Date(lastDate);
      const diffTime = new Date(today).getTime() - last.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newCurrentStreak = streakData.currentStreak + 1;
      } else if (diffDays > 1) {
        newCurrentStreak = 1; // Reset streak
      }
      // If diffDays === 0, they already checked in today
    }

    const newLongest = Math.max(newCurrentStreak, streakData.longestStreak);
    const newTotal = streakData.totalCheckIns + 1;

    const newData: StreakData = {
      currentStreak: newCurrentStreak,
      longestStreak: newLongest,
      lastCheckIn: today,
      totalCheckIns: newTotal,
    };

    localStorage.setItem('soulspace-streaks', JSON.stringify(newData));
    setStreakData(newData);
  };

  const hasCheckedInToday = () => {
    if (!streakData.lastCheckIn) return false;
    const today = new Date().toISOString().split('T')[0];
    return streakData.lastCheckIn === today;
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#fbbf24]" /> Gentle Streaks
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-[#fbbf24]/10 rounded-3xl flex items-center justify-center mb-6">
            <Flame className="w-10 h-10 text-[#fbbf24]" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight mb-3">Your gentle progress</h1>
          <p className="text-xl text-[#94a3b8]">Showing up for yourself, one day at a time.</p>
        </div>

        {/* Current Streak */}
        <div className="card p-10 text-center mb-8">
          <div className="text-sm text-[#64748b] mb-2">CURRENT STREAK</div>
          <div className="text-8xl font-semibold text-[#fbbf24] tabular-nums">{streakData.currentStreak}</div>
          <div className="text-xl text-[#94a3b8] mt-2">days</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="card p-6 text-center">
            <Award className="w-8 h-8 mx-auto text-[#4ade80] mb-3" />
            <div className="text-4xl font-semibold">{streakData.longestStreak}</div>
            <div className="text-sm text-[#64748b] mt-1">Longest Streak</div>
          </div>
          <div className="card p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto text-[#60a5fa] mb-3" />
            <div className="text-4xl font-semibold">{streakData.totalCheckIns}</div>
            <div className="text-sm text-[#64748b] mt-1">Total Check-ins</div>
          </div>
          <div className="card p-6 text-center">
            <Flame className="w-8 h-8 mx-auto text-[#fbbf24] mb-3" />
            <div className="text-lg font-medium mt-3">
              {hasCheckedInToday() ? "Checked in today ✓" : "Not checked in today"}
            </div>
          </div>
        </div>

        {/* Action */}
        {!hasCheckedInToday() && (
          <button 
            onClick={checkInToday}
            className="btn btn-primary w-full py-4 text-lg"
          >
            Check in for today
          </button>
        )}

        {hasCheckedInToday() && (
          <div className="text-center text-[#4ade80] py-4">
            You&apos;ve already checked in today. Great job.
          </div>
        )}

        <div className="mt-10 text-center text-sm text-[#64748b]">
          These streaks are here to celebrate your effort — not pressure you.<br />
          Missing a day is completely okay.
        </div>
      </div>
    </div>
  );
}
