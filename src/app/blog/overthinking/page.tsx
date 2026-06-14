'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OverthinkingArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Overthinking</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">How to Stop Overthinking</h1>
          <p className="text-2xl text-[#94a3b8]">Evidence-based strategies to quiet your racing mind</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Overthinking is one of the most common mental struggles people face today. It often shows up as replaying conversations, worrying about the future, or analyzing every possible outcome of a situation.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Why We Overthink</h2>
          <p>According to research from the <strong>American Psychological Association</strong>, overthinking is often a protective mechanism. Your brain is trying to keep you safe by preparing for every possible scenario. However, this strategy usually backfires and increases anxiety.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">The 5-4-3-2-1 Grounding Technique</h2>
          <p>When you notice yourself spiraling, try this:</p>
          <ul className="space-y-3 my-6">
            <li><strong>5 things you can see</strong></li>
            <li><strong>4 things you can touch</strong></li>
            <li><strong>3 things you can hear</strong></li>
            <li><strong>2 things you can smell</strong></li>
            <li><strong>1 thing you can taste</strong></li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">The "Worry Time" Method</h2>
          <p>Research published in the <strong>Journal of Anxiety Disorders</strong> shows that scheduling a specific 15-minute "worry time" each day can significantly reduce overall rumination.</p>

          <div className="card p-8 my-10 bg-[#12151b]">
            <h3 className="font-semibold mb-4">Try This Exercise</h3>
            <p>1. Set a timer for 15 minutes<br />
            2. Write down everything you're worried about<br />
            3. When the timer ends, close the notebook<br />
            4. Tell yourself: "I'll come back to this tomorrow"</p>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Final Thought</h2>
          <p>Overthinking is not a character flaw. It's a habit your brain learned. Like any habit, it can be changed with consistent, gentle practice.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: American Psychological Association, Journal of Anxiety Disorders, NIMH
        </div>
      </article>
    </div>
  );
}
