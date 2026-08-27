import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Camera, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import type { AppConfig } from '../config';
import { sounds } from '../utils/audio';

interface PhotoQuizScreenProps {
  config: AppConfig['photoQuiz'];
  onPassQuiz: () => void;
}

export const PhotoQuizScreen: React.FC<PhotoQuizScreenProps> = ({ config, onPassQuiz }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [wrongMessage, setWrongMessage] = useState<string>('');

  const handleSubmit = () => {
    if (!selectedOption) return;

    if (selectedOption === config.correctAnswerId) {
      sounds.playSuccess();
      setStatus('correct');
      // Fire vibrant confetti bursts
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF4D8D', '#F59E0B', '#7C3AED', '#10B981', '#F43F5E'],
      });
    } else {
      sounds.playWrong();
      setStatus('wrong');
      const randomMsg =
        config.wrongMessages[Math.floor(Math.random() * config.wrongMessages.length)] ||
        '😂 WRONG! Seriously, sis? Your gift is judging you!';
      setWrongMessage(randomMsg);
    }
  };

  const handleRetry = () => {
    sounds.playClick();
    setSelectedOption(null);
    setStatus('idle');
  };

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Quiz Header */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-black uppercase tracking-wider mb-1 border border-rose-200">
          <Camera className="w-3.5 h-3.5 text-rose-600" /> Challenge 1 of 2
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          📸 The Photo Verification
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          {config.description}
        </p>
      </div>

      {/* Quiz Card */}
      <div className="glass-panel w-full rounded-3xl p-4 sm:p-5 shadow-xl border border-rose-100 mb-4 relative">
        {/* Photo Container */}
        <div className="relative w-full aspect-[16/10] sm:h-60 rounded-2xl overflow-hidden shadow-inner border-2 border-rose-200 mb-3.5 bg-slate-900 flex items-center justify-center">
          <img
            src={config.photoUrl}
            alt="Quiz Target"
            className="w-full h-full object-cover"
          />
          {/* Subtle watermark badge */}
          <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-yellow-400/30">
            🔒 Sibling Memory #001
          </div>
        </div>

        {/* Question */}
        <div className="mb-3 text-left">
          <label className="text-sm sm:text-base font-extrabold text-slate-900 block mb-0.5">
            {config.question}
          </label>
          <span className="text-[11px] text-slate-500">
            Choose the correct option:
          </span>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {config.options.map((option) => {
            const isSelected = selectedOption === option.id;
            let borderClass = 'border-slate-200 hover:border-rose-300 bg-white';
            if (isSelected) {
              borderClass = 'border-rose-500 bg-rose-50/95 shadow-sm ring-2 ring-rose-300';
            }
            if (status === 'correct' && option.id === config.correctAnswerId) {
              borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
            }

            return (
              <button
                key={option.id}
                disabled={status === 'correct'}
                onClick={() => {
                  if (status === 'wrong') setStatus('idle');
                  sounds.playClick();
                  setSelectedOption(option.id);
                }}
                className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-start gap-2.5 active:scale-[0.99] ${borderClass}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {option.id}
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {option.label}
                  </div>
                  {option.subtitle && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {option.subtitle}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Wrong Answer Modal / Callout */}
        {status === 'wrong' && (
          <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-900 mb-3.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm mb-1 text-rose-700">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              WRONG GUESS, SIS! 🤣
            </div>
            <p className="text-xs font-semibold leading-relaxed mb-2.5">
              "{wrongMessage}"
            </p>
            <button
              onClick={handleRetry}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> TRY AGAIN
            </button>
          </div>
        )}

        {/* Correct Success Callout */}
        {status === 'correct' && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 mb-3.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-emerald-800 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              CHALLENGE 1 PASSED! ✓
            </div>
            <p className="text-xs font-semibold leading-relaxed mb-2.5">
              {config.successMessage}
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                onPassQuiz();
              }}
              className="shimmer-btn w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>NEXT: THE DANCE CHALLENGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Initial Submit Button (when idle) */}
        {status === 'idle' && (
          <button
            disabled={!selectedOption}
            onClick={handleSubmit}
            className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
              selectedOption
                ? 'shimmer-btn bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white shadow-md active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>SUBMIT ANSWER</span>
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
