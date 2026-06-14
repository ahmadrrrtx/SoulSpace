'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface SavedItem {
  id: string;
  text: string;
  category: string;
  addedAt: string;
}

export default function WhatHelped() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Coping Tool');

  const categories = ['Coping Tool', 'Person to Contact', 'Activity', 'Place', 'Other'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('soulspace-what-helped') || '[]');
    setSavedItems(saved);
  }, []);

  const saveItem = () => {
    if (!newItem.trim()) return;

    const item: SavedItem = {
      id: Date.now().toString(),
      text: newItem.trim(),
      category: selectedCategory,
      addedAt: new Date().toISOString(),
    };

    const updated = [...savedItems, item];
    setSavedItems(updated);
    localStorage.setItem('soulspace-what-helped', JSON.stringify(updated));
    setNewItem('');
  };

  const deleteItem = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('soulspace-what-helped', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl">What Helped Me Before</div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Remember what worked</h1>
          <p className="text-[#94a3b8]">Save the things that helped you in the past so you can come back to them easily.</p>
        </div>

        {/* Add New */}
        <div className="card p-6 mb-8">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="What helped you? (e.g. 4-7-8 breathing, calling my sister...)"
              className="input flex-1"
              onKeyDown={(e) => e.key === 'Enter' && saveItem()}
            />
            <button onClick={saveItem} className="btn btn-primary px-6">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input w-full"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Saved Items */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4ade80]" /> Your Saved Helpers
          </h3>

          {savedItems.length === 0 ? (
            <div className="card p-8 text-center text-[#94a3b8]">
              Nothing saved yet. Add things that helped you when you were feeling better.
            </div>
          ) : (
            <div className="space-y-3">
              {savedItems.slice().reverse().map((item) => (
                <div key={item.id} className="card p-5 flex items-center justify-between group">
                  <div>
                    <div className="font-medium">{item.text}</div>
                    <div className="text-xs text-[#64748b] mt-1">{item.category}</div>
                  </div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="text-[#f87171] opacity-0 group-hover:opacity-100 transition-opacity p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-xs text-[#64748b] text-center">
          This stays private on your device. Come back to this list when you need a reminder.
        </div>
      </div>
    </div>
  );
}
