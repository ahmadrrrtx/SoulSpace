'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LonelinessArticle() {
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
          <span className="px-4 py-1.5 rounded-full bg-[#e6f4ea] text-[#064e3b] text-sm">Loneliness</span>
          <h1 className="text-6xl font-semibold tracking-tighter mt-6 mb-6">Dealing with Loneliness</h1>
          <p className="text-2xl text-[#047857]">Understanding and easing feelings of disconnection</p>
        </div>

        <div className="prose prose-emerald max-w-none text-lg">
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

        <div className="mt-16 pt-8 border-t border-[#dcfce7] text-sm text-[#475569]">
          Sources: World Health Organization, Loneliness research studies
        </div>
      </article>
    </div>
  );
}
