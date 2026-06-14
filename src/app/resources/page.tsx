'use client';

import { ArrowLeft, Phone, BookOpen, Heart } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    category: "Immediate Help",
    items: [
      { title: "Suicide & Crisis Lifeline", desc: "Call or text 988 (US)", link: "tel:988" },
      { title: "International Resources", desc: "Find help in your country", link: "https://www.iasp.info/" },
      { title: "Crisis Text Line", desc: "Text HOME to 741741 (US)", link: "#" },
    ]
  },
  {
    category: "Coping Tools",
    items: [
      { title: "4-7-8 Breathing", desc: "Calm your nervous system in 2 minutes" },
      { title: "5-4-3-2-1 Grounding", desc: "When you feel overwhelmed" },
      { title: "Progressive Muscle Relaxation", desc: "Release physical tension" },
    ]
  },
  {
    category: "Understanding Your Feelings",
    items: [
      { title: "What is Anxiety?", desc: "Common signs and gentle explanations" },
      { title: "Dealing with Loneliness", desc: "Small steps that actually help" },
      { title: "When You're Feeling Hopeless", desc: "You are not alone in this" },
    ]
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">SoulSpace Resources</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-3">You are not alone.</h1>
          <p className="text-xl text-[#047857]">Here are some tools and resources that might help right now.</p>
        </div>

        <div className="space-y-12">
          {resources.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-white/30" />
                {section.category}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, i) => (
                  <div key={i} className="card p-6 hover:border-[#4ade80]/30 transition-colors">
                    <div className="font-semibold text-lg mb-1">{item.title}</div>
                    <div className="text-[#047857] text-sm mb-4">{item.desc}</div>
                    
                    {'link' in item && item.link && item.link.startsWith('http') && (
                      <a 
                        href={item.link} 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm text-[#4ade80] hover:underline"
                      >
                        Visit resource <BookOpen className="w-4 h-4" />
                      </a>
                    )}
                    
                    {'link' in item && item.link && item.link.startsWith('tel:') && (
                      <a 
                        href={item.link}
                        className="inline-flex items-center gap-2 text-sm text-[#4ade80] hover:underline"
                      >
                        Call now <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[#dcfce7] text-center text-sm text-[#475569]">
          These resources are here to support you. SoulSpace is peer support only — not a replacement for professional help.
        </div>
      </div>
    </div>
  );
}
