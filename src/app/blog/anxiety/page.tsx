'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AnxietyArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Anxiety</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">Understanding Anxiety</h1>
          <p className="text-2xl text-[#94a3b8]">What it is and how to manage it effectively</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Anxiety is one of the most common mental health experiences worldwide. According to the <strong>World Health Organization</strong>, anxiety disorders affect nearly 4% of the global population.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">What Anxiety Actually Is</h2>
          <p>Anxiety is your body’s natural response to stress. It’s the “fight or flight” system activating when there’s no immediate danger. The <strong>National Institute of Mental Health (NIMH)</strong> describes it as excessive worry that interferes with daily life.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">The 4-7-8 Breathing Technique</h2>
          <p>Developed by Dr. Andrew Weil, this technique activates the parasympathetic nervous system:</p>
          <ul className="my-6 space-y-2">
            <li>Inhale quietly through your nose for <strong>4 seconds</strong></li>
            <li>Hold your breath for <strong>7 seconds</strong></li>
            <li>Exhale completely through your mouth for <strong>8 seconds</strong></li>
            <li>Repeat 4 times</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Grounding When Anxiety Feels Overwhelming</h2>
          <p>The <strong>5-4-3-2-1 technique</strong> is recommended by many therapists:</p>
          <div className="card p-8 my-8 bg-[#12151b]">
            <p>Name 5 things you can see<br />
            Name 4 things you can touch<br />
            Name 3 things you can hear<br />
            Name 2 things you can smell<br />
            Name 1 thing you can taste</p>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">When to Seek Help</h2>
          <p>If anxiety is affecting your sleep, work, or relationships consistently, consider reaching out to a mental health professional. Early support makes a significant difference.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: World Health Organization, National Institute of Mental Health, Cognitive Behavioral Therapy research
        </div>
      </article>
    </div>
  );
}
