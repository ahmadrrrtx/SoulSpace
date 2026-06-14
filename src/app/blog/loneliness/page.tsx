'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LonelinessArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm">Loneliness</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">Dealing with Loneliness</h1>
          <p className="text-2xl text-[#94a3b8]">Understanding and easing feelings of disconnection</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg">
          <p>Loneliness is a common human experience. The <strong>World Health Organization</strong> has declared loneliness a global public health priority.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Why Loneliness Hurts</h2>
          <p>Feeling lonely doesn’t always mean being alone. It’s the gap between the connection you want and what you have. Research shows it can affect both mental and physical health.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Small Steps That Help</h2>
          <ul className="my-6 space-y-3">
            <li>Reach out to one person (even with a simple message)</li>
            <li>Join communities with shared interests</li>
            <li>Volunteer or help someone else</li>
            <li>Practice self-compassion</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-4">You’re Not Alone</h2>
          <p>Many people feel lonely at different points in life. Reaching out — whether through our <Link href="/chat">Support Rooms</Link> or <Link href="/sos">SOS Mode</Link> — can make a real difference.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#64748b]">
          Sources: World Health Organization, Loneliness research studies
        </div>
      </article>
    </div>
  );
}
