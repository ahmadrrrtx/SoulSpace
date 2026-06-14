'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Clock, Sparkles, User, ThumbsUp, MessageSquare, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticlePage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(342);

  const handleVote = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setHelpfulCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-[#064e3b] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Premium Sticky Navigation */}
      <div className="border-b border-[#dcfce7] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <ArrowLeft className="w-4 h-4" /> 
            <span>Back to Journal</span>
          </Link>
          <div className="font-extrabold text-xl hidden sm:flex items-center gap-2 text-[#064e3b]">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>SoulSpace Expert Guide</span>
          </div>
          <Link href="/chat" className="btn btn-primary px-5 py-2 text-xs sm:text-sm shadow-xs">
            Start Live 1-on-1 Chat
          </Link>
        </div>
      </div>

      {/* Main Article Container */}
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full"
      >
        {/* Elite Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-xl text-xs font-bold mb-6 border border-emerald-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Panic Episodes</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#064e3b] leading-tight mb-6">
            What to Do During a Panic Attack
          </h1>
          
          <p className="text-xl sm:text-2xl text-emerald-800 font-medium leading-relaxed mb-8">
            A step-by-step, evidence-based guide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-emerald-700 pt-6 border-t border-emerald-100">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Written by Dr. Sarah Jenkins, PsyD</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>9 min</span>
            </div>
          </div>
        </div>

        {/* Hero Illustration Wrapper */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-16 border border-emerald-200 shadow-xl bg-emerald-50">
          <Image 
            src="/article-panic.png" 
            alt="What to Do During a Panic Attack" 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
        </div>

        {/* Clinical Prose Content */}
        <div className="prose prose-emerald prose-headings:text-[#064e3b] prose-headings:font-extrabold prose-p:text-emerald-900 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-emerald-950 prose-strong:font-bold prose-li:text-emerald-900 prose-li:font-medium max-w-none text-lg sm:text-xl leading-relaxed bg-white/80 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-emerald-200 shadow-lg mb-16">
          <p>A panic attack is a sudden episode of intense fear that triggers severe physical reactions. The <strong>American Psychological Association</strong> reports that many people experience at least one panic attack in their lifetime.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">What Happens in Your Body</h2>
          <p>During a panic attack, your body releases adrenaline. Your heart races, you may feel short of breath, dizzy, or like you’re losing control. This is your nervous system’s alarm system going off.</p>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Immediate Steps</h2>
          <div className="card p-8 my-8 bg-[#f0fdf4]">
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

        <div className="mt-16 pt-8 border-t border-[#dcfce7] text-sm text-[#475569]">
          Sources: American Psychological Association, National Institute of Mental Health, Cognitive Behavioral Therapy protocols
        </div>

        {/* Interactive Feedback Widget */}
        <div className="card p-8 sm:p-10 bg-white border border-[#dcfce7] shadow-xl mb-16 text-center">
          <h3 className="text-2xl font-extrabold text-[#064e3b] mb-2">Did you find this clinical guide helpful?</h3>
          <p className="text-emerald-700 text-sm mb-8 font-medium max-w-md mx-auto">
            Your anonymous feedback helps us curate elite, high-impact mental health support tools for the community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`btn w-full flex items-center justify-center gap-3 font-extrabold py-4 rounded-2xl shadow-md transition-all ${
                hasVoted 
                  ? 'bg-emerald-600 text-white shadow-lg scale-102 cursor-default' 
                  : 'btn-primary hover:scale-105'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${hasVoted ? 'fill-white animate-bounce' : ''}`} />
              <span>{hasVoted ? 'Thank You for Your Feedback!' : 'Yes, This Was Highly Helpful'}</span>
            </button>
          </div>
          <div className="text-xs font-bold font-mono text-emerald-600 mt-4">
            {helpfulCount} community members found this guide transformative
          </div>
        </div>

        {/* Support Call to Action Box */}
        <div className="card p-10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl shadow-2xl border-none flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-lg">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-200 px-3.5 py-1 rounded-xl text-xs font-bold mb-3 border border-emerald-400/40">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Real Human Connection</span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight mb-3 text-white">Need to talk it through?</h3>
            <p className="text-emerald-100/90 text-base leading-relaxed font-medium">
              Reading about mental health is a profound first step, but expressing your feelings naturally with a compassionate peer can bring immediate somatic calm.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <Link href="/chat" className="btn bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold py-4 px-8 rounded-2xl shadow-xl w-full sm:w-auto text-center hover:scale-105 transition-transform">
              Start Anonymous Match
            </Link>
            <Link href="/rooms" className="btn bg-emerald-800/80 text-emerald-100 border border-emerald-600 hover:bg-emerald-700/80 font-bold py-3.5 px-8 rounded-2xl w-full sm:w-auto text-center">
              Explore Topic Rooms
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
