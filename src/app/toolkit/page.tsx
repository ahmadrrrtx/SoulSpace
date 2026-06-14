'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Mic, Music, MessageCircle, Target, Trash2, Play } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

// Fix Image conflict
const Image = NextImage;

interface ToolkitItem {
  id: string;
  type: 'quote' | 'reason' | 'photo' | 'voice' | 'song' | 'person' | 'goal';
  content: string;
  addedAt: string;
}

export default function RecoveryToolkit() {
  const [items, setItems] = useState<ToolkitItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState<ToolkitItem['type']>('quote');
  const [newItemContent, setNewItemContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: Heart },
    { id: 'quote', label: 'Quotes & Messages', icon: MessageCircle },
    { id: 'reason', label: 'Reasons to Stay', icon: Heart },
    { id: 'photo', label: 'Photos', icon: MessageCircle },
    { id: 'voice', label: 'Voice Notes', icon: Mic },
    { id: 'song', label: 'Songs & Sounds', icon: Music },
    { id: 'person', label: 'People to Reach', icon: MessageCircle },
    { id: 'goal', label: 'Future Goals', icon: Target },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('soulspace-toolkit') || '[]');
    setItems(saved);
  }, []);

  const saveItem = (type: ToolkitItem['type'], content: string) => {
    const newItem: ToolkitItem = {
      id: Date.now().toString(),
      type,
      content,
      addedAt: new Date().toISOString(),
    };

    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem('soulspace-toolkit', JSON.stringify(updated));
    setNewItemContent('');
    setShowAddModal(false);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('soulspace-toolkit', JSON.stringify(updated));
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.type === activeCategory);

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          saveItem('voice', base64);
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access needed for voice notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const playVoice = (base64: string) => {
    const audio = new Audio(base64);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4ade80]" /> Recovery Toolkit
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-2">Your emotional first aid</h1>
            <p className="text-xl text-[#047857]">Things that comfort you, saved for when you need them most.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Something
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <Image src="/toolkit-illustration.png" alt="Recovery Toolkit" width={380} height={240} className="rounded-2xl" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-[#4ade80] text-[#0a0c10]' 
                      : 'bg-white shadow-xs border border-[#dcfce7] hover:bg-[#e6f4ea] text-[#064e3b]'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="card p-12 text-center">
            <Heart className="w-12 h-12 mx-auto text-[#4ade80] mb-4" />
            <p className="text-xl text-[#047857]">Nothing saved yet. Add things that bring you comfort.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="card p-6 group relative">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm text-[#475569] capitalize">{item.type}</div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#f87171] transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {item.type === 'quote' || item.type === 'reason' || item.type === 'goal' || item.type === 'person' ? (
                  <div className="text-lg leading-relaxed">{item.content}</div>
                ) : null}

                {item.type === 'photo' && (
                  <img src={item.content} alt="Comfort photo" className="rounded-xl w-full" />
                )}

                {item.type === 'voice' && (
                  <button 
                    onClick={() => playVoice(item.content)}
                    className="flex items-center gap-3 text-[#4ade80]"
                  >
                    <div className="w-10 h-10 bg-[#4ade80]/10 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5" />
                    </div>
                    <span>Play voice note</span>
                  </button>
                )}

                {item.type === 'song' && (
                  <a href={item.content} target="_blank" className="text-[#4ade80] hover:underline flex items-center gap-2">
                    <Music className="w-5 h-5" /> Open song
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="card max-w-md w-full p-8">
            <h3 className="text-2xl font-semibold mb-6">Add to your toolkit</h3>

            <div className="space-y-4 mb-6">
              <select 
                value={newItemType} 
                onChange={(e) => setNewItemType(e.target.value as ToolkitItem['type'])}
                className="input w-full"
              >
                <option value="quote">Comforting Quote / Message</option>
                <option value="reason">Reason to Stay</option>
                <option value="goal">Future Goal</option>
                <option value="person">Person to Text</option>
                <option value="song">Song Link (YouTube/Spotify)</option>
              </select>

              {newItemType === 'voice' ? (
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`btn w-full ${isRecording ? 'bg-red-500' : 'btn-primary'}`}
                >
                  {isRecording ? 'Stop Recording' : 'Record Voice Note'}
                </button>
              ) : (
                <textarea
                  value={newItemContent}
                  onChange={(e) => setNewItemContent(e.target.value)}
                  placeholder="Write or paste here..."
                  className="input w-full h-32 resize-y"
                />
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-1">Cancel</button>
              <button 
                onClick={() => {
                  if (newItemType === 'voice') return;
                  if (newItemContent.trim()) {
                    saveItem(newItemType, newItemContent.trim());
                  }
                }}
                className="btn btn-primary flex-1"
                disabled={newItemType !== 'voice' && !newItemContent.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
