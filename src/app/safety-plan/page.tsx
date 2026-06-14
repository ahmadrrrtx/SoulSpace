'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertTriangle, Phone } from 'lucide-react';
import Link from 'next/link';

interface SafetyPlan {
  warningSigns: string;
  copingSteps: string;
  peopleToContact: string;
  professionalHelp: string;
  crisisNumbers: string;
}

export default function SafetyPlan() {
  const [plan, setPlan] = useState<SafetyPlan>({
    warningSigns: '',
    copingSteps: '',
    peopleToContact: '',
    professionalHelp: '',
    crisisNumbers: '',
  });
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('soulspace-safety-plan');
    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  const savePlan = () => {
    localStorage.setItem('soulspace-safety-plan', JSON.stringify(plan));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: keyof SafetyPlan, value: string) => {
    setPlan(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">My Safety Plan</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#4ade80]" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Your Personal Safety Plan</h1>
          </div>
          <p className="text-[#94a3b8] text-lg">
            This stays private on your device only. Fill it out when you&apos;re feeling okay — it can help during hard moments.
          </p>
        </div>

        <div className="space-y-8">
          {/* Warning Signs */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-2">Warning Signs</h3>
            <p className="text-sm text-[#64748b] mb-4">What thoughts, feelings, or situations tell you things are getting worse?</p>
            <textarea
              value={plan.warningSigns}
              onChange={(e) => updateField('warningSigns', e.target.value)}
              placeholder="Example: I start isolating, stop eating, feel numb..."
              className="input w-full h-28 resize-y"
            />
          </div>

          {/* Coping Steps */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-2">Things I Can Do to Cope</h3>
            <p className="text-sm text-[#64748b] mb-4">What helps you feel a little better? (breathing, music, walk, etc.)</p>
            <textarea
              value={plan.copingSteps}
              onChange={(e) => updateField('copingSteps', e.target.value)}
              placeholder="Example: Do 4-7-8 breathing, listen to my calm playlist, text a friend..."
              className="input w-full h-28 resize-y"
            />
          </div>

          {/* People to Contact */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-2">People I Can Reach Out To</h3>
            <p className="text-sm text-[#64748b] mb-4">Friends or family who support you (name + how to contact)</p>
            <textarea
              value={plan.peopleToContact}
              onChange={(e) => updateField('peopleToContact', e.target.value)}
              placeholder="Example: Sarah (sister) - +92 300 1234567"
              className="input w-full h-28 resize-y"
            />
          </div>

          {/* Professional Help */}
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-2">Professional Help</h3>
            <p className="text-sm text-[#64748b] mb-4">Therapist, counselor, doctor, or helpline you trust</p>
            <textarea
              value={plan.professionalHelp}
              onChange={(e) => updateField('professionalHelp', e.target.value)}
              placeholder="Example: Dr. Ahmed - 042-1234567 (therapist)"
              className="input w-full h-28 resize-y"
            />
          </div>

          {/* Crisis Numbers */}
          <div className="card p-8 bg-[#12151b] border-[#f87171]/30">
            <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Crisis Resources (One-tap)
            </h3>
            <div className="text-sm text-[#94a3b8] mb-4">Add your local emergency numbers here</div>
            <textarea
              value={plan.crisisNumbers}
              onChange={(e) => updateField('crisisNumbers', e.target.value)}
              placeholder="988 (US) • Local emergency: 1122 (Pakistan) • Your therapist hotline..."
              className="input w-full h-24 resize-y"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={savePlan}
            className="btn btn-primary px-10 py-4 text-lg flex items-center gap-3"
          >
            <Save className="w-5 h-5" /> Save My Safety Plan
          </button>
        </div>

        {saved && (
          <div className="text-center mt-4 text-[#4ade80] text-sm">
            ✓ Saved privately on your device
          </div>
        )}

        <div className="mt-12 text-center text-xs text-[#64748b]">
          This plan is stored only on your phone/browser. We never see it.
        </div>
      </div>
    </div>
  );
}
