'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen } from 'lucide-react';

const articles = [
  {
    slug: 'overthinking',
    title: "How to Stop Overthinking: Evidence-Based Strategies",
    excerpt: "Learn practical, research-backed techniques to quiet your racing mind and reduce mental exhaustion.",
    readTime: "12 min",
    category: "Overthinking",
    image: "/article-overthinking.png"
  },
  {
    slug: 'anxiety',
    title: "Understanding Anxiety: What It Is and How to Manage It",
    excerpt: "A clear, compassionate guide to understanding anxiety and building effective coping skills.",
    readTime: "14 min",
    category: "Anxiety",
    image: "/article-anxiety.png"
  },
  {
    slug: 'low-mood',
    title: "When You Feel Low: Gentle Ways to Support Yourself",
    excerpt: "Evidence-based approaches to navigate difficult emotional periods with self-compassion.",
    readTime: "11 min",
    category: "Low Mood",
    image: "/article-depression.png"
  },
  {
    slug: 'panic-attacks',
    title: "What to Do During a Panic Attack: Step-by-Step Guide",
    excerpt: "Learn what happens in your body during a panic attack and how to respond effectively.",
    readTime: "9 min",
    category: "Panic",
    image: "/article-panic.png"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#94a3b8] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to SoulSpace
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4ade80]" /> SoulSpace Journal
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image src="/blog-hero.png" alt="Mental Health Articles" width={380} height={240} className="rounded-2xl" />
          </div>
          <h1 className="text-6xl font-semibold tracking-tighter mb-4">Understanding Yourself Better</h1>
          <p className="text-2xl text-[#94a3b8] max-w-2xl mx-auto">
            Evidence-based articles to help you make sense of your feelings and build real skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href={`/blog/${article.slug}`}
              className="group block"
            >
              <div className="card overflow-hidden h-full flex flex-col">
                <div className="relative h-56">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 rounded-full bg-black/70 text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-semibold tracking-tight mb-4 group-hover:text-[#4ade80] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#94a3b8] text-lg flex-1">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10 text-sm">
                    <span className="text-[#64748b]">{article.readTime} read</span>
                    <span className="text-[#4ade80] group-hover:underline">Read article →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center text-[#64748b] text-sm">
          All articles are based on research from NIMH, WHO, APA, and evidence-based psychological practices.
        </div>
      </div>
    </div>
  );
}
