'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PanicAttacksArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Panic Attacks</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">What to Do During a Panic Attack</h1>
          <p className="text-2xl text-[#94a3b8]">A step-by-step, evidence-based guide</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>A panic attack is a sudden episode of intense fear that triggers severe physical reactions. The <strong>American Psychological Association</strong> reports that many people experience at least one panic attack in their lifetime.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">What Happens in Your Body</h2>
          <p>During a panic attack, your body releases adrenaline. Your heart races, you may feel short of breath, dizzy, or like you’re losing control. This is your nervous system’s alarm system going off.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Immediate Steps</h2>
          <div className="card p-8 my-8 bg-[#12151b]">
            <ol className="space-y-4">
              <li><strong>1. Remind yourself:</strong> “This is a panic attack. It will pass.”</li>
              <li><strong>2. Breathe slowly:</strong> Try 4-7-8 breathing (inhale 4, hold 7, exhale 8)</li>
              <li><strong>3. Ground yourself:</strong> Press your feet into the floor. Feel the surface beneath you.</li>
              <li><strong>4. Cold water:</strong> Splash cold water on your face or hold an ice cube.</li>
            </ol>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">After the Attack</h2>
          <p>Once the intensity decreases, be kind to yourself. Many people feel exhausted afterward. Rest if you can. The <strong>National Institute of Mental Health</strong> recommends seeking professional support if panic attacks become frequent.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: American Psychological Association, National Institute of Mental Health, Cognitive Behavioral Therapy protocols
        </div>
      </article>
    </div>
  );
}
