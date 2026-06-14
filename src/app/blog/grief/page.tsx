'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GriefArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Grief</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">Navigating Grief</h1>
          <p className="text-2xl text-[#94a3b8]">Understanding loss and finding your way forward</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Grief is a natural response to loss. The <strong>American Psychological Association</strong> emphasizes that there is no “right” way to grieve — everyone’s timeline is different.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Common Experiences</h2>
          <p>People often experience shock, sadness, anger, guilt, or even numbness. These feelings can come in waves.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Gentle Ways to Cope</h2>
          <ul className="my-6 space-y-3">
            <li>Allow yourself to feel without judgment</li>
            <li>Talk to someone you trust</li>
            <li>Keep small routines (meals, walks, sleep)</li>
            <li>Express yourself through writing or art</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">When to Reach Out</h2>
          <p>If grief feels overwhelming or you’re struggling to function for extended periods, professional support can help. Many people find grief counseling or support groups valuable.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: American Psychological Association, Grief counseling research
        </div>
      </article>
    </div>
  );
}
