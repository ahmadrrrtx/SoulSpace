'use client';

import { useState } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const topics = [
  { id: 'exam-stress', label: 'Exam / Study Stress', emoji: '📚' },
  { id: 'breakup', label: 'Breakup or Heartbreak', emoji: '💔' },
  { id: 'grief', label: 'Grief or Loss', emoji: '🕊️' },
  { id: 'family', label: 'Family Problems', emoji: '👨‍👩‍👧' },
  { id: 'work-burnout', label: 'Work Burnout', emoji: '💼' },
  { id: 'panic', label: 'Panic Attacks', emoji: '😰' },
  { id: 'social-anxiety', label: 'Social Anxiety', emoji: '🫣' },
  { id: 'adhd', label: 'ADHD Struggles', emoji: '🧠' },
  { id: 'lgbtq', label: 'LGBTQ+ Support', emoji: '🏳️‍🌈' },
  { id: 'new-parent', label: 'New Parent Struggles', emoji: '👶' },
  { id: 'chronic-illness', label: 'Chronic Illness', emoji: '🩺' },
  { id: 'loneliness', label: 'Deep Loneliness', emoji: '🌑' },
  { id: 'general', label: 'Just Need to Talk', emoji: '💬' },
];

export default function TopicSelection() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const router = useRouter();

  const startMatching = () => {
    if (!selectedTopic) return;
    
    // Store selected topic in sessionStorage for the chat page
    sessionStorage.setItem('selectedTopic', selectedTopic);
    router.push('/chat?mode=topic');
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">Topic-Based Matching</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-[#4ade80]/10 rounded-3xl flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-[#4ade80]" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Find someone who gets it</h1>
          <p className="text-xl text-[#047857]">Choose what you&apos;re going through. We&apos;ll match you with someone who understands.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`card p-6 text-left flex items-center gap-4 transition-all hover:border-[#4ade80]/40 ${
                selectedTopic === topic.id ? 'border-[#4ade80] bg-[#4ade80]/5' : ''
              }`}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <div className="font-medium text-lg">{topic.label}</div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={startMatching}
            disabled={!selectedTopic}
            className="btn btn-primary px-12 py-4 text-lg disabled:opacity-50"
          >
            Find Someone Who Understands
          </button>
        </div>

        <p className="text-center text-sm text-[#475569] mt-6">
          Matching prefers people with similar experiences
        </p>
      </div>
    </div>
  );
}
