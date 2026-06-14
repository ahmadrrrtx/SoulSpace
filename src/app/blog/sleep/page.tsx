'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SleepArticle() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/blog" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Sleep</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">How to Improve Your Sleep</h1>
          <p className="text-2xl text-[#94a3b8]">Evidence-based strategies for better rest</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Poor sleep affects mood, focus, and emotional regulation. According to the <strong>National Sleep Foundation</strong>, consistent sleep hygiene can dramatically improve mental health.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">The 10-3-2-1-0 Rule</h2>
          <p>A popular evidence-based sleep hygiene method:</p>
          <ul className="my-6 space-y-2">
            <li><strong>10 hours</strong> before bed: No caffeine</li>
            <li><strong>3 hours</strong> before bed: No food</li>
            <li><strong>2 hours</strong> before bed: No work</li>
            <li><strong>1 hour</strong> before bed: No screens</li>
            <li><strong>0</strong> — the number of times you hit snooze</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Wind-Down Routine</h2>
          <p>Research shows that a consistent pre-sleep routine signals the brain that it’s time to rest.</p>

          <div className="card p-8 my-10 bg-[#12151b]">
            <p>Try this 20-minute routine:</p>
            <p>Dim lights → Light stretching or breathing → Journal 3 things → No phone in bed</p>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">When to Seek Help</h2>
          <p>If you consistently struggle with falling or staying asleep, consider speaking with a doctor. Chronic insomnia is treatable.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: National Sleep Foundation, Sleep Research Society
        </div>
      </article>
    </div>
  );
}
