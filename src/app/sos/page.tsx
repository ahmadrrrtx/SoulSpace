'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, Phone, Users, Wind } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const issues = [
  { id: 'panic', label: 'Panic attack', emoji: '😰' },
  { id: 'racing', label: 'Racing thoughts', emoji: '🌀' },
  { id: 'crying', label: 'I can\'t stop crying', emoji: '😭' },
  { id: 'selfharm', label: 'I want to hurt myself', emoji: '⚠️' },
  { id: 'numb', label: 'I feel numb', emoji: '🫥' },
  { id: 'sleep', label: 'I can\'t sleep', emoji: '🌙' },
  { id: 'alone', label: 'I feel completely alone', emoji: '💔' },
  { id: 'other', label: 'Something else', emoji: '🫂' },
];

export default function SOSMode() {
  const [step, setStep] = useState<'select' | 'protocol'>('select');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [protocolStep, setProtocolStep] = useState(0);

  const startProtocol = (issueId: string) => {
    setSelectedIssue(issueId);
    setStep('protocol');
    setProtocolStep(0);
  };

  const getProtocol = () => {
    if (selectedIssue === 'panic') {
      return [
        { title: "You're safe right now", desc: "Let's slow your breathing together." },
        { title: "4-7-8 Breathing", desc: "Inhale for 4 seconds → Hold for 7 → Exhale for 8. Repeat 4 times." },
        { title: "Grounding", desc: "Name 5 things you can see around you right now." },
        { title: "How are you feeling?", desc: "A little calmer?" },
      ];
    }
    
    if (selectedIssue === 'selfharm') {
      return [
        { title: "You are not alone", desc: "Please reach out for help right now." },
        { title: "Immediate Help", desc: "Call or text 988 (US) or your local crisis line." },
        { title: "Reach someone", desc: "Text a trusted person or use our crisis resources." },
      ];
    }

    // Default protocol
    return [
      { title: "You're taking a brave step", desc: "Let's get through this moment together." },
      { title: "Breathe with me", desc: "Take 3 slow, deep breaths right now." },
      { title: "Ground yourself", desc: "Feel your feet on the floor. You're here." },
      { title: "Next step", desc: "Would you like to talk to someone?" },
    ];
  };

  const protocol = getProtocol();

  const nextStep = () => {
    if (protocolStep < protocol.length - 1) {
      setProtocolStep(protocolStep + 1);
    } else {
      // End of protocol
      setStep('select');
      setProtocolStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#f87171]" /> SOS Mode
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'select' && (
          <>
        <div className="text-center mb-10">
          <Image src="/sos-illustration.png" alt="SOS Support" width={320} height={220} className="mx-auto mb-6 rounded-2xl" />
          <h1 className="text-5xl font-semibold tracking-tight mb-4">I need help right now</h1>
          <p className="text-xl text-[#047857]">Tell me what you&apos;re going through. I&apos;ll guide you.</p>
        </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {issues.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => startProtocol(issue.id)}
                  className="card p-6 text-left hover:border-[#f87171]/40 transition-all flex items-center gap-4 group"
                >
                  <span className="text-4xl">{issue.emoji}</span>
                  <div className="font-medium text-lg">{issue.label}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/crisis" className="text-sm text-[#f87171] hover:underline">
                Or go directly to crisis resources →
              </Link>
            </div>
          </>
        )}

        {step === 'protocol' && (
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="text-sm text-[#475569] mb-2">STEP {protocolStep + 1} OF {protocol.length}</div>
              <div className="h-1 bg-[#e6f4ea] text-[#064e3b] rounded-full">
                <div 
                  className="h-1 bg-[#4ade80] rounded-full transition-all" 
                  style={{ width: `${((protocolStep + 1) / protocol.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="card p-10 text-center">
              <div className="text-2xl font-semibold mb-4">{protocol[protocolStep].title}</div>
              <p className="text-lg text-[#047857] leading-relaxed mb-10">{protocol[protocolStep].desc}</p>

              <button 
                onClick={nextStep}
                className="btn btn-primary w-full py-4 text-lg"
              >
                {protocolStep === protocol.length - 1 ? "I feel better" : "Next step"}
              </button>
            </div>

            {protocolStep === protocol.length - 1 && (
              <div className="mt-6 text-center space-y-3">
                <Link href="/chat" className="block btn btn-secondary">Talk to someone</Link>
                <Link href="/crisis" className="block text-sm text-[#047857] hover:underline">Need more help →</Link>
              </div>
            )}

            <button 
              onClick={() => { setStep('select'); setProtocolStep(0); }}
              className="mt-6 text-sm text-[#475569] hover:text-[#059669] mx-auto block"
            >
              Exit SOS Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
