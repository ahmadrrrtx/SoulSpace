'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Clock, Sparkles, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  {
    slug: 'overthinking',
    title: "How to Stop Overthinking: Evidence-Based Strategies",
    excerpt: "Learn practical, research-backed techniques to quiet your racing mind, stop rumination, and reduce mental exhaustion.",
    readTime: "12 min",
    category: "Overthinking",
    author: "Dr. Sarah Jenkins, PsyD",
    image: "/article-overthinking.png"
  },
  {
    slug: 'anxiety',
    title: "Understanding Anxiety: What It Is and How to Manage It",
    excerpt: "A clear, highly compassionate guide to understanding somatic anxiety and building effective grounding skills.",
    readTime: "14 min",
    category: "Anxiety Relief",
    author: "Elena Rostova, LCSW",
    image: "/article-anxiety.png"
  },
  {
    slug: 'low-mood',
    title: "When You Feel Low: Gentle Ways to Support Yourself",
    excerpt: "Evidence-based somatic approaches to navigate difficult emotional periods and low energy with true self-compassion.",
    readTime: "11 min",
    category: "Low Mood & Sadness",
    author: "Marcus Vance, Clinical Researcher",
    image: "/article-depression.png"
  },
  {
    slug: 'panic-attacks',
    title: "What to Do During a Panic Attack: Step-by-Step Guide",
    excerpt: "Learn exactly what happens in your nervous system during a panic episode and how to de-escalate effectively.",
    readTime: "9 min",
    category: "Panic Episodes",
    author: "Dr. Sarah Jenkins, PsyD",
    image: "/article-panic.png"
  },
  {
    slug: 'burnout',
    title: "Recovering from Functional Work & Emotional Burnout",
    excerpt: "Recognize the subtle difference between standard tiredness and deep nervous system burnout, with steps to heal.",
    readTime: "16 min",
    category: "Work & Life Burnout",
    author: "David K. Chen, PhD",
    image: "/toolkit-illustration.png"
  },
  {
    slug: 'grief',
    title: "Navigating Grief & Complex Emotional Loss",
    excerpt: "A gentle exploration of the non-linear waves of grief, processing heartache, and honoring what you have lost.",
    readTime: "13 min",
    category: "Grief & Loss",
    author: "Elena Rostova, LCSW",
    image: "/reflection-illustration.png"
  },
  {
    slug: 'loneliness',
    title: "Overcoming Deep Modern Loneliness & Isolation",
    excerpt: "Why we feel profoundly alone even in a hyper-connected world, and how to forge genuine, vulnerable connections.",
    readTime: "15 min",
    category: "Connection & Loneliness",
    author: "Marcus Vance, Clinical Researcher",
    image: "/rooms-illustration.png"
  },
  {
    slug: 'sleep',
    title: "Healing Sleep Anxiety & Nighttime Rumination",
    excerpt: "How to break the frustrating cycle of bedtime overthinking and reset your natural circadian sleep rhythms.",
    readTime: "10 min",
    category: "Sleep & Rest",
    author: "David K. Chen, PhD",
    image: "/insights-illustration.png"
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);

  const categories = ['All', 'Overthinking', 'Anxiety Relief', 'Low Mood & Sadness', 'Work & Life Burnout', 'Grief & Loss'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category.includes(activeCategory.split(' ')[0]));

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-[#064e3b] flex flex-col font-sans">
      {/* Navigation Header */}
      <div className="border-b border-[#dcfce7] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <ArrowLeft className="w-4 h-4" /> 
            <span>Back to SoulSpace</span>
          </Link>
          <div className="font-extrabold text-2xl flex items-center gap-2.5 text-[#064e3b]">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <span>SoulSpace Journal & Insights</span>
          </div>
          <Link href="/chat" className="btn btn-primary px-6 py-2 text-sm">
            Start Support Chat
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-5 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Premium Evidence-Based Mental Health Library</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-[#064e3b]">
            Understand Your Mind. <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Build Clinical-Grade Resilience.
            </span>
          </h1>
          <p className="text-xl text-emerald-800/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore highly compassionate, expert-written guides designed to help you make sense of your somatic emotions and acquire powerful coping strategies.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-300 shadow-2xs ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                  : 'bg-white text-emerald-900 border border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link 
                href={`/blog/${article.slug}`}
                onClick={() => setClickedSlug(article.slug)}
                className="group block h-full"
              >
                <div className={`card overflow-hidden h-full flex flex-col bg-white/90 backdrop-blur-xl border-emerald-200/80 hover:border-emerald-400 shadow-md hover:shadow-2xl transition-all duration-300 relative ${
                  clickedSlug === article.slug ? 'ring-4 ring-emerald-400 scale-[0.99] bg-emerald-50/50' : ''
                }`}>
                  {/* Clicked Ripple Indicator */}
                  {clickedSlug === article.slug && (
                    <div className="absolute inset-0 bg-emerald-600/10 z-20 flex items-center justify-center backdrop-blur-2xs">
                      <div className="bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl animate-bounce">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>Opening instantly...</span>
                      </div>
                    </div>
                  )}

                  <div className="relative h-64 overflow-hidden bg-emerald-50">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className="px-4 py-1.5 rounded-xl bg-emerald-900/80 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-white/50 to-white">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-3">
                        <User className="w-3.5 h-3.5" />
                        <span>{article.author}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-[#064e3b] group-hover:text-emerald-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-emerald-800/80 text-base leading-relaxed mb-8 font-medium">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-5 border-t border-emerald-100 text-sm font-bold">
                      <span className="text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{article.readTime}</span>
                      </span>
                      <span className="text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read Comprehensive Guide</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Professional Guarantee Footer */}
        <div className="mt-20 card p-8 bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-center shadow-xl border-none">
          <div className="flex items-center justify-center gap-2 mb-3 text-emerald-300 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Clinical Rigor & Community Care Guarantee</span>
          </div>
          <p className="text-emerald-100/90 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            All SoulSpace Journal guides are thoroughly reviewed and curated in alignment with cognitive behavioral therapy (CBT), somatic experiencing protocols, and published psychiatric research from the National Institute of Mental Health (NIMH).
          </p>
        </div>
      </div>
    </div>
  );
}
