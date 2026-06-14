'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Phone, Globe } from 'lucide-react';

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
  { country: "International", name: "IASP", type: "International", contact: "iasp.info", description: "Global suicide prevention resources by country", website: "https://www.iasp.info/" },
  { country: "International", name: "Befrienders Worldwide", type: "International", contact: "befrienders.org", description: "Emotional support helplines worldwide", website: "https://www.befrienders.org/" },
  { country: "International", name: "7 Cups", type: "International", contact: "7cups.com", description: "Free online emotional support & listeners", website: "https://www.7cups.com/" },

  // Pakistan
  { country: "Pakistan", name: "Emergency Helpline", type: "National", contact: "1122", description: "Rescue, ambulance & emergency services" },
  { country: "Pakistan", name: "Mental Health Helpline", type: "National", contact: "0800-39393", description: "Free mental health support" },
  { country: "Pakistan", name: "Sehat Kahani", type: "Community", contact: "sehatkahani.com", description: "Mental health consultations", website: "https://www.sehatkahani.com/" },

  // USA
  { country: "United States", name: "988 Suicide & Crisis Lifeline", type: "National", contact: "988", description: "24/7 suicide prevention & crisis support" },
  { country: "United States", name: "Crisis Text Line", type: "National", contact: "Text HOME to 741741", description: "Free 24/7 text-based crisis support" },
  { country: "United States", name: "NAMI Helpline", type: "National", contact: "1-800-950-NAMI", description: "Mental health information & support" },

  // India
  { country: "India", name: "iCall Helpline", type: "National", contact: "022-25521111", description: "Professional emotional support" },
  { country: "India", name: "Vandrevala Foundation", type: "National", contact: "9999666555", description: "24/7 mental health support" },
  { country: "India", name: "AASRA", type: "Community", contact: "91-9820466726", description: "Suicide prevention helpline" },

  // UK
  { country: "United Kingdom", name: "Samaritans", type: "National", contact: "116 123", description: "24/7 emotional support" },
  { country: "United Kingdom", name: "NHS Mental Health", type: "National", contact: "nhs.uk/mental-health", description: "NHS mental health services" },

  // Canada
  { country: "Canada", name: "Canada Suicide Prevention", type: "National", contact: "1-833-456-4566", description: "24/7 crisis support" },
  { country: "Canada", name: "Talk Suicide Canada", type: "National", contact: "988", description: "National suicide prevention" },

  // Australia
  { country: "Australia", name: "Lifeline", type: "National", contact: "13 11 14", description: "24/7 crisis support" },
  { country: "Australia", name: "Beyond Blue", type: "National", contact: "1300 22 4636", description: "Mental health support" },

  // Germany
  { country: "Germany", name: "Telefonseelsorge", type: "National", contact: "0800 111 0 111", description: "24/7 emotional support" },
  { country: "Germany", name: "Nummer gegen Kummer", type: "National", contact: "116 111", description: "Youth helpline" },

  // France
  { country: "France", name: "SOS Amitié", type: "National", contact: "09 72 39 40 50", description: "Emotional support helpline" },
  { country: "France", name: "Suicide Écoute", type: "National", contact: "01 45 39 40 00", description: "Suicide prevention" },

  // Brazil
  { country: "Brazil", name: "CVV", type: "National", contact: "188", description: "24/7 emotional support" },

  // South Africa
  { country: "South Africa", name: "SADAG", type: "National", contact: "0800 567 567", description: "Mental health support" },
  { country: "South Africa", name: "Suicide Crisis Line", type: "National", contact: "0800 567 567", description: "Crisis support" },

  // Nigeria
  { country: "Nigeria", name: "Lagos State Mental Health", type: "National", contact: "0800 900 1000", description: "Mental health helpline" },

  // Philippines
  { country: "Philippines", name: "In Touch", type: "National", contact: "(02) 889-8733", description: "Emotional support" },

  // Japan
  { country: "Japan", name: "TELL Japan", type: "National", contact: "03-5774-0992", description: "English & Japanese support" },

  // South Korea
  { country: "South Korea", name: "Korea Suicide Prevention", type: "National", contact: "1577-0199", description: "24/7 crisis support" },

  // Italy
  { country: "Italy", name: "Telefono Amico", type: "National", contact: "02 2327 2327", description: "Emotional support helpline" },

  // Spain
  { country: "Spain", name: "Teléfono de la Esperanza", type: "National", contact: "717 003 717", description: "24/7 emotional support" },

  // Netherlands
  { country: "Netherlands", name: "113 Zelfmoordpreventie", type: "National", contact: "113", description: "Suicide prevention" },

  // Sweden
  { country: "Sweden", name: "Mind Självmordslinjen", type: "National", contact: "90101", description: "Suicide prevention" },

  // Norway
  { country: "Norway", name: "Mental Helse", type: "National", contact: "116 123", description: "Mental health support" },

  // Mexico
  { country: "Mexico", name: "SAPTEL", type: "National", contact: "55 5259 8121", description: "Emotional support" },

  // Argentina
  { country: "Argentina", name: "Línea 135", type: "National", contact: "135", description: "Suicide prevention" },

  // Egypt
  { country: "Egypt", name: "Mental Health Egypt", type: "National", contact: "16328", description: "Mental health support" },

  // Saudi Arabia
  { country: "Saudi Arabia", name: "National Mental Health", type: "National", contact: "920033360", description: "Mental health helpline" },

  // Turkey
  { country: "Turkey", name: "Aile ve Sosyal Hizmetler", type: "National", contact: "183", description: "Social support & mental health" },

  // Indonesia
  { country: "Indonesia", name: "Into The Light", type: "Community", contact: "intothelight.org", description: "Youth mental health support" },

  // Thailand
  { country: "Thailand", name: "Samaritans Thailand", type: "National", contact: "02 713 5999", description: "Emotional support" },

  // Vietnam
  { country: "Vietnam", name: "Vietnam Mental Health", type: "National", contact: "1900 6046", description: "Mental health support" },

  // Russia
  { country: "Russia", name: "Psikhologicheskaya Pomoshch", type: "National", contact: "8 800 2000 122", description: "Psychological help" },

  // China
  { country: "China", name: "Beijing Suicide Research", type: "National", contact: "800-810-1117", description: "Suicide prevention" },

  // Bangladesh
  { country: "Bangladesh", name: "National Mental Health", type: "National", contact: "09666-771100", description: "Mental health support" },

  // Kenya
  { country: "Kenya", name: "Befrienders Kenya", type: "National", contact: "020 206 1323", description: "Emotional support" },

  // Ghana
  { country: "Ghana", name: "Mental Health Ghana", type: "National", contact: "0800 900 900", description: "Mental health helpline" },

  // Colombia
  { country: "Colombia", name: "Línea 106", type: "National", contact: "106", description: "Suicide prevention" },

  // Chile
  { country: "Chile", name: "Salud Mental", type: "National", contact: "600 360 7777", description: "Mental health support" },

  // More countries can be added
];

export default function HelpDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

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

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#4ade80]" /> Global Mental Health Directory
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-3">Free Mental Health Support Worldwide</h1>
          <p className="text-xl text-[#047857]">Find helplines, organizations, and support services by country.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-[#475569]" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full pl-12"
              />
            </div>
          </div>

          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="input w-full md:w-64"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="input w-full md:w-48"
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div key={index} className="card p-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-xl">{resource.name}</span>
                    <span className="px-3 py-0.5 text-xs rounded-full bg-[#e6f4ea] text-[#064e3b]">{resource.type}</span>
                  </div>
                  <p className="text-[#047857] mb-2">{resource.description}</p>
                  <div className="flex items-center gap-2 text-sm text-[#4ade80]">
                    <Phone className="w-4 h-4" /> {resource.contact}
                  </div>
                </div>
                
                {resource.website && (
                  <a 
                    href={resource.website} 
                    target="_blank" 
                    className="btn btn-secondary px-6 whitespace-nowrap"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <p className="text-[#047857]">No resources found matching your filters.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-sm text-[#475569]">
          This directory is a starting point. Always verify current contact information before use.
        </div>
      </div>
    </div>
  );
}
