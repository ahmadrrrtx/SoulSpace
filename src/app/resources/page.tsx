'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, BookOpen, Heart, Globe, Shield, Sparkles, Search, Compass, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const curatedResources = [
  {
    category: "Immediate Global Hotlines",
    icon: Phone,
    badge: "24/7 Free Support",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    items: [
      { title: "Suicide & Crisis Lifeline (US & Canada)", desc: "Call or text 988 anytime for confidential, immediate crisis counseling.", link: "tel:988", actionText: "Call 988 Now" },
      { title: "International Global Lifelines (IASP)", desc: "Find localized, verified free crisis helplines across over 150 countries.", link: "https://www.iasp.info/", actionText: "Explore Global Hub" },
      { title: "Crisis Text Line (Global)", desc: "Text HOME to 741741 (US & Canada) or 85258 (UK) for free 24/7 text support.", link: "https://www.crisistextline.org/", actionText: "Text Trained Counselor" },
    ]
  },
  {
    category: "Somatic Calm & Grounding Toolkit",
    icon: Sparkles,
    badge: "Interactive Tools",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    items: [
      { title: "4-7-8 Somatic Nervous System Breathing", desc: "Activate your parasympathetic nervous system and lower cortisol in 2 minutes.", link: "/toolkit", actionText: "Start Breathing Timer" },
      { title: "5-4-3-2-1 Somatic Grounding Method", desc: "Anchor yourself in the present room when panic or overthinking floods your chest.", link: "/toolkit", actionText: "Start Grounding Exercise" },
      { title: "CBT Cognitive Reframing Guide", desc: "Identify automatic negative thought traps and restructure them gently.", link: "/toolkit", actionText: "Practice Reframing" },
    ]
  },
  {
    category: "Expert Journal & Psychoeducation",
    icon: BookOpen,
    badge: "Evidence-Based",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
    items: [
      { title: "How to Stop Overthinking & Rumination", desc: "Clinical techniques to quiet racing bedtime thoughts and restore mental focus.", link: "/blog/overthinking", actionText: "Read Expert Guide" },
      { title: "Understanding Somatic Anxiety", desc: "Why your heart races when there is no physical danger, and how to soothe it.", link: "/blog/anxiety", actionText: "Read Expert Guide" },
      { title: "Recovering from Nervous System Burnout", desc: "Recognize the subtle signs of functional chronic fatigue and rebuild boundaries.", link: "/blog/burnout", actionText: "Read Expert Guide" },
    ]
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-[#064e3b] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Premium Sticky Navigation */}
      <div className="border-b border-[#dcfce7] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <ArrowLeft className="w-4 h-4" /> 
            <span>Back to Homepage</span>
          </Link>
          <div className="font-extrabold text-2xl flex items-center gap-2.5 text-[#064e3b]">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <span>Free Mental Health Resources Hub</span>
          </div>
          <Link href="/help-directory" className="btn btn-secondary px-5 py-2 text-xs sm:text-sm shadow-xs flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Full Global Directory</span>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-14 flex-1 w-full">
        {/* Elite Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col lg:flex-row items-center justify-between gap-10 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl"
        >
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-emerald-400/30">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free & Verified Professional Tools</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
              You are completely supported. <br />
              <span className="text-emerald-300">Help is right here.</span>
            </h1>
            <p className="text-emerald-100/90 text-lg sm:text-xl font-medium leading-relaxed mb-8">
              Explore our curated sanctuary of immediate emergency lifelines, evidence-based self-soothing tools, and expert psychoeducational guides curated by clinical professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/help-directory" className="btn bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                <Globe className="w-5 h-5 text-emerald-700" />
                <span>Search Country-Specific Directory</span>
              </Link>
              <Link href="/sos" className="btn bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>Enter Instant SOS Mode</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Live Search Filter Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative shadow-lg rounded-2xl">
            <Search className="absolute left-5 top-5 w-6 h-6 text-emerald-600" />
            <input 
              type="text" 
              placeholder="Filter resources by topic, keyword, or tool..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="input w-full pl-16 py-4 text-lg bg-white/95 rounded-2xl shadow-xs border-emerald-200"
            />
          </div>
        </div>

        {/* Resource Sections */}
        <div className="space-y-16">
          {curatedResources.map((section, index) => {
            const filteredItems = section.items.filter(item => 
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.desc.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length === 0 && searchTerm) return null;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-100">
                  <h2 className="text-3xl font-extrabold flex items-center gap-3 text-[#064e3b]">
                    <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 shadow-2xs">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <span>{section.category}</span>
                  </h2>
                  <span className={`text-xs font-extrabold px-4 py-1.5 rounded-full border shadow-2xs ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredItems.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link 
                        href={item.link} 
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        className="card p-8 bg-white/90 backdrop-blur-xl border border-emerald-100 hover:border-emerald-400 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group"
                      >
                        <div>
                          <h3 className="font-extrabold text-2xl mb-3 text-[#064e3b] group-hover:text-emerald-600 transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-emerald-800/85 text-sm leading-relaxed mb-8 font-medium">
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-5 border-t border-emerald-100 flex items-center justify-between text-sm font-extrabold text-emerald-600 group-hover:text-emerald-700">
                          <span>{item.actionText}</span>
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:translate-x-1 transition-all">
                            {item.link.startsWith('http') ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Directory Teaser Card */}
        <div className="mt-20 card p-10 bg-gradient-to-br from-emerald-800 to-teal-800 text-white rounded-3xl shadow-xl border-none flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-xl">
            <h3 className="text-3xl font-extrabold mb-3">Looking for support in a specific country?</h3>
            <p className="text-emerald-100/90 text-base font-medium leading-relaxed">
              Our comprehensive Global Mental Health Directory contains free, verified helplines and community centers across Pakistan, India, the UK, Germany, Brazil, Canada, Japan, and more.
            </p>
          </div>
          <Link href="/help-directory" className="btn bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold py-4 px-8 rounded-2xl shadow-xl whitespace-nowrap hover:scale-105 transition-transform text-center">
            Open Global Directory Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
