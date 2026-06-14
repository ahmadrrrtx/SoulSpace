'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LowMoodArticle() {
  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/blog" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="px-4 py-1.5 rounded-full bg-[#e6f4ea] text-[#064e3b] text-sm">Low Mood</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">When You Feel Low</h1>
          <p className="text-2xl text-[#047857]">Gentle, evidence-based ways to support yourself</p>
        </div>

        <div className="prose prose-emerald max-w-none text-lg">
          <p>Everyone experiences periods of low mood. According to the <strong>World Health Organization</strong>, depression is the leading cause of disability worldwide. However, not every low period is clinical depression.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Understanding the Difference</h2>
          <p>Low mood is often temporary and triggered by life events, while depression involves persistent symptoms lasting more than two weeks. The <strong>National Institute of Mental Health</strong> recommends tracking how long these feelings last.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Small Acts of Self-Care</h2>
          <p>Research from positive psychology shows that tiny, consistent actions can improve mood over time:</p>
          <ul className="my-6 space-y-3">
            <li>Getting natural light within 30 minutes of waking</li>
            <li>Moving your body (even a 10-minute walk)</li>
            <li>Connecting with one person, even briefly</li>
            <li>Doing one small thing you usually enjoy</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">The “One Thing” Rule</h2>
          <p>When everything feels overwhelming, choose <strong>one small thing</strong> you can do today. This reduces decision fatigue and builds momentum.</p>

          <div className="card p-8 my-10 bg-[#f0fdf4]">
            <p><strong>Remember:</strong> Feeling low doesn’t mean you’re broken. It means you’re human. Many people recover and find meaning again.</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#dcfce7] text-sm text-[#475569]">
          Sources: World Health Organization, National Institute of Mental Health, Positive Psychology research
        </div>
      </article>
    </div>
  );
}
