'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, Heart, Wind, Users } from 'lucide-react';
import Link from 'next/link';

export default function CrisisScreen() {
  const [showBreathing, setShowBreathing] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back to SoulSpace
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-[#f87171]/10 rounded-3xl flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-[#f87171]" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight mb-4">You are not alone.</h1>
          <p className="text-xl text-[#047857]">Right now, the most important thing is that you reach out for help.</p>
        </div>

        {/* Immediate Actions */}
        <div className="card p-8 mb-8">
          <h2 className="font-semibold text-2xl mb-6">Get help right now</h2>
          
          <div className="space-y-4">
            <a 
              href="tel:988" 
              className="flex items-center justify-between p-5 bg-[#f87171]/10 hover:bg-[#f87171]/20 rounded-2xl border border-[#f87171]/30 transition-all"
            >
              <div>
                <div className="font-semibold">🇺🇸 Call or Text 988</div>
                <div className="text-sm text-[#047857]">Suicide & Crisis Lifeline (US)</div>
              </div>
              <Phone className="w-6 h-6 text-[#f87171]" />
            </a>

            <a 
              href="https://www.iasp.info/" 
              target="_blank"
              className="flex items-center justify-between p-5 bg-white shadow-xs border border-[#dcfce7] hover:bg-[#e6f4ea] text-[#064e3b] rounded-2xl border border-[#dcfce7] transition-all"
            >
              <div>
                <div className="font-semibold">🌍 Find Local Help</div>
                <div className="text-sm text-[#047857]">International resources (IASP)</div>
              </div>
              <Phone className="w-6 h-6" />
            </a>

            <a 
              href="tel:1122" 
              className="flex items-center justify-between p-5 bg-white shadow-xs border border-[#dcfce7] hover:bg-[#e6f4ea] text-[#064e3b] rounded-2xl border border-[#dcfce7] transition-all"
            >
              <div>
                <div className="font-semibold">🇵🇰 Emergency (Pakistan)</div>
                <div className="text-sm text-[#047857]">Call 1122</div>
              </div>
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Your Safety Plan */}
        <div className="card p-8 mb-8">
          <h2 className="font-semibold text-2xl mb-4">Your Safety Plan</h2>
          <p className="text-[#047857] mb-6">If you created one, open it now. It can help.</p>
          <Link href="/safety-plan" className="btn btn-primary w-full">
            Open My Safety Plan
          </Link>
        </div>

        {/* Quick Tools */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setShowBreathing(true)}
            className="card p-6 text-left hover:border-[#4ade80]/40 transition-all flex items-center gap-4"
          >
            <Wind className="w-8 h-8 text-[#4ade80]" />
            <div>
              <div className="font-semibold">Do 4-7-8 Breathing</div>
              <div className="text-sm text-[#475569]">Calm your body right now</div>
            </div>
          </button>

          <Link href="/self-help" className="card p-6 text-left hover:border-[#4ade80]/40 transition-all flex items-center gap-4">
            <Heart className="w-8 h-8 text-[#4ade80]" />
            <div>
              <div className="font-semibold">More Coping Tools</div>
              <div className="text-sm text-[#475569]">Grounding, journaling, sleep</div>
            </div>
          </Link>
        </div>

        {/* Talk to Someone */}
        <div className="card p-8 text-center">
          <Users className="w-10 h-10 mx-auto mb-4 text-[#60a5fa]" />
          <h3 className="font-semibold text-xl mb-2">Talk to someone</h3>
          <p className="text-[#047857] mb-6">You don&apos;t have to go through this alone.</p>
          <Link href="/chat" className="btn btn-primary px-10">
            Start Anonymous Chat
          </Link>
        </div>

        <div className="text-center mt-10 text-sm text-[#475569]">
          You matter. Help is available 24/7.
        </div>
      </div>

      {/* Breathing Modal */}
      {showBreathing && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="text-center max-w-xs">
            <div className="text-6xl mb-8">🌬️</div>
            <div className="text-2xl font-semibold mb-4">4-7-8 Breathing</div>
            <p className="text-[#047857] mb-8">Inhale 4s → Hold 7s → Exhale 8s</p>
            <button 
              onClick={() => setShowBreathing(false)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
