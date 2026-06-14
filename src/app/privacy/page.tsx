'use client';

import { useState } from 'react';
import { ArrowLeft, Shield, Download, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyCenter() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dataDeleted, setDataDeleted] = useState(false);

  const handleExportData = () => {
    const checkins = localStorage.getItem('soulspace-checkins') || '[]';
    const safetyPlan = localStorage.getItem('soulspace-safety-plan') || '{}';
    const whatHelped = localStorage.getItem('soulspace-what-helped') || '[]';

    const exportData = {
      exportedAt: new Date().toISOString(),
      checkins: JSON.parse(checkins),
      safetyPlan: JSON.parse(safetyPlan),
      whatHelped: JSON.parse(whatHelped),
      note: "This data is stored only on your device. SoulSpace does not have access to it."
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'soulspace-my-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDeleteAllData = () => {
    localStorage.removeItem('soulspace-checkins');
    localStorage.removeItem('soulspace-safety-plan');
    localStorage.removeItem('soulspace-what-helped');
    
    setDataDeleted(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setDataDeleted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#4ade80]" /> Privacy Center
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-4">Your privacy matters</h1>
            <p className="text-xl text-[#94a3b8]">We built SoulSpace to be private by design. Here&apos;s exactly what that means.</p>
          </div>
          <Image src="/privacy-illustration.png" alt="Privacy" width={280} height={200} className="rounded-2xl" />
        </div>

        {/* What We Store */}
        <div className="card p-8 mb-8">
          <h2 className="font-semibold text-2xl mb-6">What we store</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1"><Check className="w-5 h-5 text-[#4ade80]" /></div>
              <div>
                <div className="font-medium">Daily Check-ins</div>
                <div className="text-sm text-[#94a3b8]">Stored only on your device. We cannot see them.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1"><Check className="w-5 h-5 text-[#4ade80]" /></div>
              <div>
                <div className="font-medium">Safety Plan</div>
                <div className="text-sm text-[#94a3b8]">Stored only on your device. We cannot see it.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1"><Check className="w-5 h-5 text-[#4ade80]" /></div>
              <div>
                <div className="font-medium">What Helped You</div>
                <div className="text-sm text-[#94a3b8]">Stored only on your device.</div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do NOT Store */}
        <div className="card p-8 mb-8 border-[#f87171]/20">
          <h2 className="font-semibold text-2xl mb-6">What we do <span className="text-[#f87171]">NOT</span> store</h2>
          
          <div className="space-y-4 text-[#94a3b8]">
            <div className="flex gap-3"><X className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" /> Your name or email</div>
            <div className="flex gap-3"><X className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" /> Phone number</div>
            <div className="flex gap-3"><X className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" /> Chat messages (1-on-1 or rooms)</div>
            <div className="flex gap-3"><X className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" /> Any identifiable information</div>
            <div className="flex gap-3"><X className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" /> We do not sell or share your data</div>
          </div>
        </div>

        {/* Actions */}
        <div className="card p-8">
          <h2 className="font-semibold text-2xl mb-6">Your data, your control</h2>

          <div className="space-y-4">
            <button 
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <Download className="w-6 h-6 text-[#4ade80]" />
                <div className="text-left">
                  <div className="font-medium">Export my data</div>
                  <div className="text-sm text-[#64748b]">Download everything stored on your device</div>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-[#f87171]/10 border border-white/10 hover:border-[#f87171]/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <Trash2 className="w-6 h-6 text-[#f87171]" />
                <div className="text-left">
                  <div className="font-medium">Delete everything</div>
                  <div className="text-sm text-[#64748b]">Permanently remove all your data from this device</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#64748b]">
          SoulSpace is built with privacy as a core principle.<br />
          We cannot see your personal data because it never leaves your device.
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8">
            {!dataDeleted ? (
              <>
                <div className="text-center mb-6">
                  <Trash2 className="w-12 h-12 mx-auto text-[#f87171] mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Delete all your data?</h3>
                  <p className="text-[#94a3b8]">This will permanently remove your check-ins, safety plan, and saved items from this device. This cannot be undone.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary flex-1">Cancel</button>
                  <button onClick={handleDeleteAllData} className="btn flex-1 bg-[#f87171] hover:bg-[#ef4444] text-white">Yes, delete everything</button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-[#4ade80] mb-4">✓ All data has been deleted from this device.</div>
                <p className="text-sm text-[#64748b]">You can start fresh anytime.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
