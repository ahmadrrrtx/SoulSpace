'use client';

import { useState } from 'react';
import { Heart, Users, Shield, Clock, ArrowRight, Wind, Sparkles, MessageSquare, BookOpen, Activity, Calendar, Compass, Flame } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QuickTools } from '../components/QuickTools';

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b] flex flex-col">
      {/* Premium Navbar */}
      <nav className="border-b border-[#dcfce7] bg-white/95 shadow-xs backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-bold text-xl group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
              SoulSpace
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link href="/rooms" className="text-[#064e3b] hover:text-[#059669] transition-colors">Support Rooms</Link>
            <Link href="/toolkit" className="text-[#064e3b] hover:text-[#059669] transition-colors">Toolkit</Link>
            <Link href="/check-in" className="text-[#064e3b] hover:text-[#059669] transition-colors">Daily Check-in</Link>
            <Link href="/blog" className="text-[#064e3b] hover:text-[#059669] transition-colors">Articles</Link>
            <Link href="/resources" className="text-[#064e3b] hover:text-[#059669] transition-colors">Resources</Link>
            <Link href="/sos" className="text-[#ef4444] hover:text-[#dc2626] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 transition-colors font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              SOS Mode
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDisclaimer(true)}
              className="btn btn-primary px-6 py-2.5 text-sm font-bold shadow-md hover:shadow-lg"
            >
              Start Free Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center flex-1">
        <div className="inline-flex items-center gap-2.5 bg-emerald-50 text-emerald-800 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-200 shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
          Free • Anonymous • Kind Peer Support
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-none mb-8 text-[#064e3b]">
          A safe space for your <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            mind & emotional health.
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-emerald-800/80 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
          Connect instantly with real, empathetic people for private 1-on-1 conversations, explore soothing mental health tools, and find calm.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-16">
          <button 
            onClick={() => setShowDisclaimer(true)}
            className="btn btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3 group font-bold w-full sm:w-auto shadow-lg"
          >
            Start Random Chat
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <Link 
            href="/rooms"
            className="btn btn-secondary text-lg px-8 py-4 font-semibold w-full sm:w-auto shadow-xs"
          >
            Join Topic Rooms
          </Link>
        </div>

        {/* Quick Tools Floating Section */}
        <div className="max-w-2xl mx-auto text-left mb-20">
          <QuickTools />
        </div>

        {/* Explore Hub Grid */}
        <div className="border-t border-[#dcfce7] pt-16 text-left">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#064e3b]">Explore SoulSpace</h2>
              <p className="text-emerald-700 font-medium mt-1">Everything you need to reflect, connect, and recover.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '1-on-1 Peer Chat', desc: 'Random anonymous match to share whatever is on your mind naturally.', link: '/chat', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { title: 'Support Rooms', desc: 'Join supportive topic-based group rooms (Burnout, Anxiety, Grief, Family).', link: '/rooms', icon: Users, color: 'text-teal-600 bg-teal-50 border-teal-200' },
              { title: 'Calm Toolkit', desc: 'Interactive tools: 4-7-8 breathing, 5-4-3-2-1 grounding, and CBT reframing.', link: '/toolkit', icon: Wind, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
              { title: 'Daily Check-In', desc: 'Track your mood, emotional energy, and log daily positive highlights.', link: '/check-in', icon: Activity, color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { title: 'Reflection Journal', desc: 'Private journaling space with guided emotional prompts for self-discovery.', link: '/reflect', icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { title: 'Community Trends', desc: 'See anonymous real-time emotional trends and what is helping others grow.', link: '/trends', icon: Flame, color: 'text-purple-600 bg-purple-50 border-purple-200' },
              { title: 'Crisis Safety Plan', desc: 'Build an interactive, downloadable step-by-step crisis personal safety plan.', link: '/safety-plan', icon: Shield, color: 'text-rose-600 bg-rose-50 border-rose-200' },
              { title: 'Curated Resources', desc: 'Expert mental health resources, free hotlines, and professional support hubs.', link: '/resources', icon: Compass, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
              { title: 'Live Events', desc: 'Explore scheduled peer supportive listening sessions and group check-ins.', link: '/events', icon: Calendar, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
            ].map((item, index) => (
              <Link key={index} href={item.link} className="card p-7 hover:-translate-y-1 transition-all flex flex-col justify-between group border-[#dcfce7] bg-white">
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-[#064e3b] mb-2 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                    {item.title}
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-emerald-800/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-[#dcfce7] bg-white py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 text-base text-emerald-800 font-semibold">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl"><Shield className="w-5 h-5 text-emerald-600" /></div>
            100% Secure & Anonymous
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl"><Clock className="w-5 h-5 text-emerald-600" /></div>
            Ephemeral Chats (No database storage)
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl"><Users className="w-5 h-5 text-emerald-600" /></div>
            Real, Empathetic Community
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how" className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-[#064e3b]">How SoulSpace Works</h2>
          <p className="text-lg text-emerald-700 max-w-xl mx-auto">Designed to be highly accessible, 100% private, and incredibly gentle.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: Users, title: "1. Join the Queue", desc: "Select your mood or topic and click start. We match you with an empathetic peer instantly." },
            { icon: Heart, title: "2. Have a Real Talk", desc: "Chat safely. Be kind, express your genuine feelings, and support each other without judgment." },
            { icon: Clock, title: "3. Leave When Ready", desc: "When either person leaves, the session ends naturally and all messages disappear forever." },
          ].map((step, i) => (
            <div key={i} className="card p-8 bg-white border border-[#dcfce7] shadow-xs">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-xl mb-3 text-[#064e3b]">{step.title}</h3>
              <p className="text-emerald-800/80 leading-relaxed text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Section */}
      <div id="safety" className="bg-[#f0fdf4] py-20 border-t border-[#dcfce7]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mb-6 border border-emerald-200 shadow-sm">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-[#064e3b]">Your safety comes first</h2>
          <p className="text-emerald-800 text-lg mb-10 max-w-lg mx-auto font-medium">
            SoulSpace provides peer emotional support — it is not professional medical therapy or crisis counseling.
          </p>
          
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 text-left max-w-lg mx-auto shadow-md">
            <p className="font-extrabold mb-4 text-[#064e3b] text-lg">If you are in immediate crisis or having thoughts of self-harm:</p>
            <div className="space-y-3 text-base text-emerald-900 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Call or text <span className="font-mono bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md font-bold">988</span> (US & Canada Lifeline)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Visit <a href="https://www.iasp.info/" target="_blank" rel="noreferrer" className="underline font-bold text-emerald-700 hover:text-emerald-800">iasp.info</a> for local global helplines
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Reach out to a trusted loved one or go to the nearest hospital
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#dcfce7] bg-white py-10 px-6 text-center text-sm text-emerald-700 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-extrabold text-base text-[#064e3b]">SoulSpace</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-emerald-900 transition-colors">Privacy Policy</Link>
            <Link href="/listener" className="hover:text-emerald-900 transition-colors">Become a Volunteer</Link>
            <Link href="/local-help" className="hover:text-emerald-900 transition-colors">Find Local Help</Link>
            <Link href="/what-helped" className="hover:text-emerald-900 transition-colors">Community Tips</Link>
          </div>
          <div className="text-xs text-emerald-600">
            © {new Date().getFullYear()} SoulSpace. Free anonymous peer support.
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card max-w-md w-full p-8 bg-white shadow-2xl border-emerald-200">
            <h3 className="text-2xl font-extrabold mb-4 text-[#064e3b]">Important Disclaimer</h3>
            <div className="text-emerald-800 space-y-4 text-base font-medium">
              <p>SoulSpace provides <strong className="text-emerald-900">peer-to-peer emotional support</strong> only.</p>
              <p>It is <strong className="text-rose-600">not a substitute</strong> for professional therapy, counseling, or medical advice.</p>
              <p>Our volunteers and users are regular, supportive people offering a listening ear.</p>
              <p className="pt-4 border-t border-emerald-100 text-sm text-emerald-600">By continuing, you understand and agree that this platform is not clinical therapy.</p>
            </div>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowDisclaimer(false)}
                className="btn btn-secondary flex-1 font-bold py-3"
              >
                Cancel
              </button>
              <Link 
                href="/chat" 
                className="btn btn-primary flex-1 font-bold py-3 text-center"
              >
                I Understand
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
