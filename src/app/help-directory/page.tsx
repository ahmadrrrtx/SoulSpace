'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Phone, Globe, ExternalLink, Copy, Check, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Resource {
  country: string;
  name: string;
  type: string;
  contact: string;
  description: string;
  website?: string;
}

const resources: Resource[] = [
  // International
  { country: "International", name: "IASP (International Association)", type: "International", contact: "iasp.info", description: "Global suicide prevention resources categorized by continent and country", website: "https://www.iasp.info/" },
  { country: "International", name: "Befrienders Worldwide", type: "International", contact: "befrienders.org", description: "Volunteer emotional support helplines across the globe", website: "https://www.befrienders.org/" },
  { country: "International", name: "7 Cups Peer Support", type: "International", contact: "7cups.com", description: "Free online trained active listeners and emotional support chat rooms", website: "https://www.7cups.com/" },

  // Pakistan
  { country: "Pakistan", name: "National Emergency & Rescue", type: "National", contact: "1122", description: "Immediate integrated ambulance, rescue, and emergency medical services" },
  { country: "Pakistan", name: "Umang Mental Health Helpline", type: "National", contact: "0311-7786264", description: "Free 24/7 psychiatric & clinical psychological support by trained clinical psychologists", website: "https://www.umang.com.pk/" },
  { country: "Pakistan", name: "Sehat Kahani Telemedicine", type: "Community", contact: "021-35824429", description: "Accessible online mental health consultations and therapy hub", website: "https://www.sehatkahani.com/" },

  // USA
  { country: "United States", name: "988 Suicide & Crisis Lifeline", type: "National", contact: "988", description: "Confidential 24/7 suicide prevention and emergency mental health crisis Lifeline" },
  { country: "United States", name: "Crisis Text Line", type: "National", contact: "741741", description: "Text HOME to connect instantly with a trained crisis counselor 24/7" },
  { country: "United States", name: "NAMI National HelpDesk", type: "National", contact: "1-800-950-6264", description: "Grassroots mental health information, professional referrals, and family support" },

  // India
  { country: "India", name: "iCall Psychosocial Helpline", type: "National", contact: "022-25521111", description: "Professional, free emotional and mental health counseling by TISS" },
  { country: "India", name: "Vandrevala Foundation", type: "National", contact: "9999666555", description: "Multilingual 24/7 compassionate mental health support helpline" },
  { country: "India", name: "AASRA Crisis Intervention", type: "Community", contact: "91-9820466726", description: "Dedicated 24/7 active listening and suicide prevention helpline" },

  // UK
  { country: "United Kingdom", name: "Samaritans UK", type: "National", contact: "116 123", description: "Completely confidential 24/7 emotional support for anyone in distress" },
  { country: "United Kingdom", name: "NHS 111 Mental Health", type: "National", contact: "111", description: "Direct NHS mental health triaging and emergency urgent support" },
  { country: "United Kingdom", name: "SHOUT Crisis Text Line", type: "National", contact: "85258", description: "Free, silent 24/7 text messaging support for urgent mental health crises" },

  // Canada
  { country: "Canada", name: "Talk Suicide Canada", type: "National", contact: "988", description: "National 24/7 toll-free suicide prevention and urgent crisis support" },
  { country: "Canada", name: "Kids Help Phone", type: "National", contact: "1-800-668-6868", description: "24/7 e-mental health counseling for youth and young adults" },

  // Australia
  { country: "Australia", name: "Lifeline Australia", type: "National", contact: "13 11 14", description: "24/7 crisis support and comprehensive suicide prevention services" },
  { country: "Australia", name: "Beyond Blue", type: "National", contact: "1300 22 4636", description: "Expert mental health support for depression, anxiety, and emotional distress" },

  // Germany
  { country: "Germany", name: "Telefonseelsorge Deutschland", type: "National", contact: "0800 111 0 111", description: "Free 24/7 anonymous emotional support helpline (Christian care network)" },
  { country: "Germany", name: "Nummer gegen Kummer", type: "National", contact: "116 111", description: "Specialized confidential counseling helpline for children and youth" },

  // France
  { country: "France", name: "SOS Amitié France", type: "National", contact: "09 72 39 40 50", description: "Welcoming 24/7 active listening support helpline for anyone facing isolation" },
  { country: "France", name: "Suicide Écoute", type: "National", contact: "01 45 39 40 00", description: "Specialized 24/7 listening service directed at preventing suicide" },

  // Brazil
  { country: "Brazil", name: "CVV (Centro de Valorização da Vida)", type: "National", contact: "188", description: "Completely voluntary 24/7 emotional support and suicide prevention under strict secrecy" },

  // South Africa
  { country: "South Africa", name: "SADAG Careline", type: "National", contact: "0800 567 567", description: "Africa's largest mental health support network and dedicated suicide crisis line" },

  // Philippines
  { country: "Philippines", name: "In Touch Crisis Line", type: "National", contact: "(02) 889-8733", description: "Professional multisectoral emotional counseling and supportive interventions" },

  // Japan
  { country: "Japan", name: "TELL Lifeline Japan", type: "National", contact: "03-5774-0992", description: "Dedicated telephone counseling and clinical support for the international community" },
];

export default function HelpDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const countries = ['All', ...Array.from(new Set(resources.map(r => r.country)))];
  const types = ['All', ...Array.from(new Set(resources.map(r => r.type)))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || resource.country === selectedCountry;
    const matchesType = selectedType === 'All' || resource.type === selectedType;

    return matchesSearch && matchesCountry && matchesType;
  });

  const handleCopy = (contact: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact);
    setCopiedContact(contact);
    setTimeout(() => setCopiedContact(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-[#064e3b] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Navigation Header */}
      <div className="border-b border-[#dcfce7] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/resources" className="flex items-center gap-2.5 font-bold text-emerald-800 hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <ArrowLeft className="w-4 h-4" /> 
            <span>Back to Resources</span>
          </Link>
          <div className="font-extrabold text-2xl flex items-center gap-2.5 text-[#064e3b]">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <span>Global Mental Health Helplines Directory</span>
          </div>
          <Link href="/chat" className="btn btn-primary px-5 py-2 text-xs sm:text-sm shadow-xs">
            Start Free Chat
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-14 flex-1 w-full">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-extrabold mb-4 border border-emerald-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Over 30 Global Helplines & Rescue Hubs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-[#064e3b]">
            Free Mental Health Support Worldwide
          </h1>
          <p className="text-xl text-emerald-800 font-medium">
            Quickly find immediate crisis hotlines, voluntary listening networks, and professional clinical counseling organizations across the globe.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="card p-6 bg-white shadow-xl border-emerald-200 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-4 w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="Search directory by organization name, keyword, or care type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full pl-14 py-3.5 bg-[#f5fbf7] text-base border-emerald-200"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none">
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="input w-full md:w-56 py-3.5 bg-[#f5fbf7] text-base font-bold text-emerald-900 border-emerald-200 cursor-pointer"
              >
                {countries.map(country => (
                  <option key={country} value={country}>🌍 {country}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 md:flex-none">
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="input w-full md:w-48 py-3.5 bg-[#f5fbf7] text-base font-bold text-emerald-900 border-emerald-200 cursor-pointer"
              >
                {types.map(type => (
                  <option key={type} value={type}>⚡ {type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Breathtaking Results List */}
        <div className="space-y-5">
          <AnimatePresence>
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={`${resource.name}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="card p-7 bg-white/90 backdrop-blur-xl border border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-3 mb-2.5">
                        <span className="font-extrabold text-2xl text-[#064e3b] group-hover:text-emerald-600 transition-colors">
                          {resource.name}
                        </span>
                        <span className="px-3.5 py-1 text-xs rounded-xl font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                          {resource.type} Care
                        </span>
                        <span className="px-3.5 py-1 text-xs rounded-xl font-bold bg-[#f5fbf7] text-emerald-800 border border-emerald-100">
                          📍 {resource.country}
                        </span>
                      </div>
                      <p className="text-emerald-800/90 text-base leading-relaxed mb-4 font-medium max-w-3xl">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <a 
                          href={`tel:${resource.contact.replace(/[^\d+]/g, '')}`} 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xs transition-transform hover:scale-102"
                        >
                          <Phone className="w-4 h-4 fill-white" />
                          <span>Call: {resource.contact}</span>
                        </a>

                        <button
                          onClick={(e) => handleCopy(resource.contact, e)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                            copiedContact === resource.contact
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                              : 'bg-[#f5fbf7] border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                          }`}
                        >
                          {copiedContact === resource.contact ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Copied successfully!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 shrink-0 text-emerald-700" />
                              <span>Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {resource.website && (
                      <div className="shrink-0 pt-4 md:pt-0 border-t border-emerald-100 md:border-none">
                        <a 
                          href={resource.website} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn btn-secondary font-extrabold px-7 py-4 whitespace-nowrap shadow-xs hover:scale-105 flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                          <span>Visit Official Website</span>
                          <ExternalLink className="w-4 h-4 text-emerald-600" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="card p-16 text-center bg-white border border-emerald-200 shadow-lg"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-emerald-700">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#064e3b] mb-2">No Helplines Matching Your Query</h3>
                <p className="text-emerald-700 max-w-md mx-auto text-base font-medium">
                  We could not find any organization matching &quot;{searchTerm}&quot; in {selectedCountry}. Please try searching with a different keyword or select &quot;All&quot;.
                </p>
                <button onClick={() => { setSearchTerm(''); setSelectedCountry('All'); setSelectedType('All'); }} className="btn btn-primary mt-8 font-bold">
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center text-sm font-bold text-emerald-700 bg-white p-6 rounded-2xl border border-emerald-200 shadow-xs">
          <Shield className="w-4 h-4 inline text-emerald-600 mr-2" />
          <span>SoulSpace provides anonymous peer listening. If you are in physical danger or clinical distress, please utilize the professional helplines listed above.</span>
        </div>
      </div>
    </div>
  );
}
