'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

const resources = {
  global: [
    { name: "IASP – International Resources", desc: "Find help in your country", link: "https://www.iasp.info/" },
    { name: "Befrienders Worldwide", desc: "Emotional support helplines", link: "https://www.befrienders.org/" },
    { name: "7 Cups", desc: "Free online emotional support", link: "https://www.7cups.com/" },
  ],
  pakistan: [
    { name: "Emergency Helpline", desc: "1122 – Rescue & Emergency", link: "tel:1122" },
    { name: "Mental Health Helpline", desc: "Pakistan: 0800-39393", link: "tel:080039393" },
    { name: "Sehat Kahani", desc: "Mental health support", link: "https://www.sehatkahani.com/" },
    { name: "Karachi Relief", desc: "Crisis support services", link: "#" },
  ],
  usa: [
    { name: "988 Suicide & Crisis Lifeline", desc: "Call or text 988", link: "tel:988" },
    { name: "Crisis Text Line", desc: "Text HOME to 741741", link: "#" },
    { name: "NAMI Helpline", desc: "1-800-950-NAMI", link: "tel:18009506264" },
  ],
  india: [
    { name: "iCall Helpline", desc: "022-25521111", link: "tel:02225521111" },
    { name: "Vandrevala Foundation", desc: "9999666555", link: "tel:9999666555" },
  ],
};

export default function LocalHelpFinder() {
  const [selectedCountry, setSelectedCountry] = useState<'global' | 'pakistan' | 'usa' | 'india'>('global');

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#4ade80]" /> Local Help Finder
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-3">Find real help near you</h1>
          <p className="text-xl text-[#94a3b8]">Hotlines, services, and support in your region.</p>
        </div>

        {/* Country Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: 'global', label: 'Global', icon: Globe },
            { key: 'pakistan', label: 'Pakistan', icon: MapPin },
            { key: 'usa', label: 'United States', icon: MapPin },
            { key: 'india', label: 'India', icon: MapPin },
          ].map((country) => (
            <button
              key={country.key}
              onClick={() => setSelectedCountry(country.key as any)}
              className={`px-6 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                selectedCountry === country.key 
                  ? 'bg-[#4ade80] text-[#0a0c10]' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <country.icon className="w-4 h-4" />
              {country.label}
            </button>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-4">
          {resources[selectedCountry].map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              target="_blank"
              className="card p-6 flex items-center justify-between hover:border-[#4ade80]/40 transition-all group"
            >
              <div>
                <div className="font-semibold text-lg">{resource.name}</div>
                <div className="text-[#94a3b8]">{resource.desc}</div>
              </div>
              <div className="text-[#4ade80] group-hover:translate-x-1 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-[#64748b]">
          These are starting points. If you&apos;re in crisis, please use our SOS Mode or Crisis page.
        </div>
      </div>
    </div>
  );
}
