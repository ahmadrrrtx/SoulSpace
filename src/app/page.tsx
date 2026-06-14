'use client';

import { useState } from 'react';
import { Heart, Users, Shield, Clock, ArrowRight, Wind } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0c10]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="SoulSpace" width={140} height={40} className="dark:invert" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="text-[#94a3b8] hover:text-white transition-colors">How it works</a>
            <a href="#safety" className="text-[#94a3b8] hover:text-white transition-colors">Safety</a>
            <Link href="/resources" className="text-[#94a3b8] hover:text-white transition-colors">Resources</Link>
            <Link href="/sos" className="text-[#f87171] hover:text-white transition-colors font-medium">SOS Mode</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/chat" className="btn btn-primary px-6 py-2 text-sm">Start Chat</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo.png" 
            alt="SoulSpace" 
            width={180} 
            height={60} 
            className="dark:invert"
          />
        </div>

        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1 rounded-full text-sm mb-6 border border-white/10">
          <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
          Free • Anonymous • Peer Support
        </div>

        <h1 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
          Talk to someone<br />who gets it.
        </h1>
        
        <p className="text-2xl text-[#94a3b8] max-w-lg mx-auto mb-8">
          Connect instantly with another person for a private, anonymous conversation.
        </p>

        <div className="flex justify-center mb-12">
          <Image 
            src="/hero-illustration.png" 
            alt="People connecting" 
            width={420} 
            height={280}
            className="opacity-90"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/chat"
            className="btn btn-primary text-lg px-10 py-4 flex items-center justify-center gap-3 group"
          >
            Start Random Chat
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/resources"
            className="btn btn-secondary text-lg px-8"
          >
            Browse Resources
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#64748b]">
          No signup • No data stored • Completely free
        </p>
      </div>

      {/* Trust Bar */}
      <div className="border-y border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> 100% Anonymous
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> Ephemeral chats
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Real people listening
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div id="how" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold tracking-tight mb-3">How it works</h2>
          <p className="text-[#94a3b8]">Simple. Private. Supportive.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Join the queue", desc: "Click start and wait a few seconds to be matched with someone." },
            { icon: Heart, title: "Have a real talk", desc: "Chat anonymously. Be kind. Listen without judgment." },
            { icon: Clock, title: "Chat ends naturally", desc: "When either person leaves, the conversation is gone forever." },
          ].map((step, i) => (
            <div key={i} className="card p-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-[#4ade80]" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-[#94a3b8] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Section */}
      <div id="safety" className="bg-[#12151b] py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mx-auto w-16 h-16 bg-[#4ade80]/10 rounded-3xl flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-[#4ade80]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Your safety comes first</h2>
          <p className="text-[#94a3b8] text-lg mb-8 max-w-md mx-auto">
            This is peer support only — not therapy or crisis counseling.
          </p>
          
          <div className="bg-[#0a0c10] border border-white/10 rounded-3xl p-8 text-left max-w-md mx-auto">
            <p className="font-medium mb-4">If you&apos;re in crisis or having thoughts of self-harm:</p>
            <div className="space-y-2 text-sm">
              <div>• Call or text <span className="font-mono text-[#4ade80]">988</span> (US)</div>
              <div>• Visit <a href="https://www.iasp.info/" target="_blank" className="underline">iasp.info</a> for local resources</div>
              <div>• Talk to a trusted friend or family member</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-[#64748b]">
        SoulSpace is a free peer support platform. We are not mental health professionals.
      </footer>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8">
            <h3 className="text-2xl font-semibold mb-4">Important Disclaimer</h3>
            <div className="text-[#94a3b8] space-y-4 text-[15px]">
              <p>SoulSpace provides <strong>peer-to-peer emotional support</strong> only.</p>
              <p>It is <strong>not a substitute</strong> for professional therapy, counseling, or medical advice.</p>
              <p>Our volunteers and users are regular people offering a listening ear.</p>
              <p className="pt-2 border-t border-white/10 text-sm">By continuing, you understand this is not therapy.</p>
            </div>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowDisclaimer(false)}
                className="btn btn-secondary flex-1"
              >
                Close
              </button>
              <Link 
                href="/chat" 
                className="btn btn-primary flex-1"
              >
                I understand
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
