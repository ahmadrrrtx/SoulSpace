'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BurnoutArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Burnout</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">Recovering from Burnout</h1>
          <p className="text-2xl text-[#94a3b8]">Understanding exhaustion and rebuilding your energy</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress. The <strong>World Health Organization</strong> officially recognized burnout as an occupational phenomenon in 2019.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Signs of Burnout</h2>
          <ul className="my-6 space-y-2">
            <li>Feeling drained most of the time</li>
            <li>Loss of motivation or sense of purpose</li>
            <li>Feeling detached or cynical</li>
            <li>Reduced performance and concentration</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Recovery Steps</h2>
          <div className="card p-8 my-8 bg-[#12151b]">
            <p><strong>1. Rest without guilt</strong><br />
            <strong>2. Set boundaries</strong> (especially with work)<br />
            <strong>3. Reconnect with small joys</strong><br />
            <strong>4. Ask for support</strong></p>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Prevention</h2>
          <p>Regular check-ins with yourself, taking breaks, and maintaining a support system can help prevent burnout from returning.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: World Health Organization, Occupational Health research
        </div>
      </article>
    </div>
  );
}
