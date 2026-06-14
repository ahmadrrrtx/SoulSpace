'use client';

import { useState } from 'react';
import { ArrowLeft, Award, CheckCircle, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const trainingModules = [
  {
    title: "Boundaries & Safety",
    content: "You are here to listen, not fix. Never give medical advice. If someone is in crisis, guide them to professional help immediately."
  },
  {
    title: "Active Listening",
    content: "Reflect what you hear. Ask open questions like 'How does that feel?' Avoid 'You should...' statements."
  },
  {
    title: "Recognizing Crisis",
    content: "Watch for words like suicide, self-harm, or feeling hopeless. Immediately direct them to the SOS Mode or Crisis page."
  },
  {
    title: "What NOT to Say",
    content: "Avoid: 'Just think positive', 'It could be worse', 'I know how you feel'. Instead say: 'I'm here with you', 'That sounds really hard'."
  }
];

const quizQuestions = [
  {
    q: "What should you do if someone mentions wanting to hurt themselves?",
    options: ["Give advice", "Immediately guide them to professional help", "Change the topic"],
    correct: 1
  },
  {
    q: "Which is the best response?",
    options: ["You should just be grateful", "I'm really sorry you're going through this", "I know exactly how you feel"],
    correct: 1
  },
  {
    q: "Your role as a listener is to:",
    options: ["Fix their problems", "Listen without judgment", "Give medical advice"],
    correct: 1
  }
];

export default function ListenerProgram() {
  const [step, setStep] = useState<'intro' | 'training' | 'quiz' | 'complete'>('intro');
  const [currentModule, setCurrentModule] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleStartTraining = () => setStep('training');
  const handleNextModule = () => {
    if (currentModule < trainingModules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      setStep('quiz');
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    if (index === quizQuestions[quizIndex].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedAnswer(null);
      } else {
        setStep('complete');
        if (score + (index === quizQuestions[quizIndex].correct ? 1 : 0) >= 2) {
          setIsVerified(true);
          localStorage.setItem('soulspace-listener-verified', 'true');
        }
      }
    }, 800);
  };

  const reset = () => {
    setStep('intro');
    setCurrentModule(0);
    setQuizIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4ade80]" /> Listener Program
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'intro' && (
          <>
        <div className="text-center mb-10">
          <Image src="/listener-illustration.png" alt="Listener Program" width={320} height={220} className="mx-auto mb-6 rounded-2xl" />
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Become a Verified Listener</h1>
          <p className="text-xl text-[#047857]">Help others in their hardest moments. Learn how to listen safely and effectively.</p>
        </div>

            <div className="card p-8 mb-8">
              <h3 className="font-semibold text-xl mb-4">What you&apos;ll learn:</h3>
              <ul className="space-y-3 text-[#047857]">
                <li>• How to set healthy boundaries</li>
                <li>• Active listening techniques</li>
                <li>• Recognizing crisis signs</li>
                <li>• What to say (and what not to say)</li>
              </ul>
            </div>

            <button onClick={handleStartTraining} className="btn btn-primary w-full py-4 text-lg">
              Start Training
            </button>
          </>
        )}

        {step === 'training' && (
          <div>
            <div className="mb-6">
              <div className="text-sm text-[#475569]">Module {currentModule + 1} of {trainingModules.length}</div>
            </div>

            <div className="card p-10">
              <h2 className="text-3xl font-semibold mb-6">{trainingModules[currentModule].title}</h2>
              <p className="text-lg text-[#047857] leading-relaxed mb-10">{trainingModules[currentModule].content}</p>

              <button onClick={handleNextModule} className="btn btn-primary w-full">
                {currentModule === trainingModules.length - 1 ? "Start Quiz" : "Next Module"}
              </button>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div>
            <div className="mb-6 text-center">
              <div className="text-sm text-[#475569]">Question {quizIndex + 1} of {quizQuestions.length}</div>
            </div>

            <div className="card p-10">
              <h3 className="text-2xl font-semibold mb-8">{quizQuestions[quizIndex].q}</h3>

              <div className="space-y-3">
                {quizQuestions[quizIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      selectedAnswer === index 
                        ? index === quizQuestions[quizIndex].correct 
                          ? 'border-[#4ade80] bg-[#4ade80]/10' 
                          : 'border-[#f87171] bg-[#f87171]/10'
                        : 'border-[#dcfce7] hover:bg-white shadow-xs border border-[#dcfce7]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-[#4ade80]/10 rounded-3xl flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-[#4ade80]" />
            </div>

            <h2 className="text-4xl font-semibold mb-4">Training Complete</h2>
            
            {isVerified ? (
              <>
                <p className="text-xl text-[#4ade80] mb-8">Congratulations! You are now a Verified Listener.</p>
                <div className="card p-6 inline-block mb-8">
                  <div className="flex items-center gap-3 text-[#4ade80]">
                    <Award className="w-6 h-6" />
                    <span className="font-medium">Verified Listener Badge Earned</span>
                  </div>
                </div>
                <p className="text-[#047857] mb-8">In the future, you will be prioritized when people need support.</p>
              </>
            ) : (
              <p className="text-xl text-[#047857] mb-8">You scored {score} out of {quizQuestions.length}. You can retake the training.</p>
            )}

            <button onClick={reset} className="btn btn-primary px-10">
              {isVerified ? "Back to Home" : "Retake Training"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
