import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MapPin, Sparkles, Heart, Copy, Check, RotateCcw } from 'lucide-react';
import type { AppConfig } from '../config';
import { sounds } from '../utils/audio';

interface GiftRevealScreenProps {
  config: AppConfig['giftReveal'];
  sisterName: string;
  brotherName: string;
  onReset: () => void;
}

export const GiftRevealScreen: React.FC<GiftRevealScreenProps> = ({
  config,
  sisterName,
  brotherName: _brotherName,
  onReset,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Grand celebration confetti burst on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#FF4D8D', '#F59E0B', '#10B981', '#7C3AED', '#E11D48'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyLocation = () => {
    sounds.playClick();
    navigator.clipboard.writeText(`${config.locationText} (Clue: ${config.clue})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCelebrateMore = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF4D8D', '#F59E0B', '#7C3AED', '#3B82F6'],
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center animate-fadeIn">
      {/* Top Victory Ribbon */}
      <div className="w-full text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-black uppercase tracking-widest shadow-md mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Raksha Bandhan 2026 Special
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          🎉 YOU DID IT, {sisterName.toUpperCase()}!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          You've officially earned your Raksha Bandhan surprise!
        </p>
      </div>

      {/* Main Gift Location Card */}
      <div className="glass-panel-gold w-full rounded-3xl p-6 shadow-2xl border-2 border-amber-400 mb-5 relative overflow-hidden text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center text-2xl shadow-lg shrink-0 animate-gift">
            🎁
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-rose-700 block">
              MISSION ACCOMPLISHED
            </span>
            <h2 className="text-lg font-black text-slate-900">
              YOUR GIFT IS WAITING!
            </h2>
          </div>
        </div>

        {/* Clue Box */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-xs mb-3">
          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-1">
            🔎 Secret Clue
          </div>
          <div className="text-xs text-slate-700 italic font-medium">
            "{config.clue}"
          </div>
        </div>

        {/* Exact Location Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 text-white shadow-lg mb-4">
          <div className="text-xs font-bold uppercase tracking-wider opacity-90 flex items-center gap-1.5 mb-1 text-yellow-200">
            <MapPin className="w-4 h-4" /> Exact Hidden Coordinates
          </div>
          <div className="text-base sm:text-lg font-black leading-snug">
            {config.locationText}
          </div>
          {config.giftItemHint && (
            <div className="mt-2 text-xs bg-black/20 p-2 rounded-xl text-yellow-100 font-medium">
              💡 {config.giftItemHint}
            </div>
          )}
        </div>

        {/* Copy / Celebrate Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopyLocation}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-amber-300 text-slate-800 text-xs font-bold shadow-xs hover:bg-amber-50 transition-all flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Clue Copied!' : 'Copy Clue'}</span>
          </button>

          <button
            onClick={handleCelebrateMore}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1"
          >
            <span>Confetti 🎊</span>
          </button>
        </div>
      </div>

      {/* Personal Sibling Emotional Message Card */}
      <div className="glass-panel w-full rounded-3xl p-6 shadow-xl border border-rose-200 mb-5 text-left relative">
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center absolute -top-4 right-6 shadow-sm border border-rose-200">
          <Heart className="w-4 h-4 fill-current" />
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
          <span>{config.personalMessageTitle}</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
          "{config.personalMessageBody}"
        </p>

        <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
          <div className="text-xs font-bold text-rose-700 whitespace-pre-line">
            {config.brotherSignature}
          </div>
          <div className="text-2xl">
            🪔✨
          </div>
        </div>
      </div>

      {/* Go Find It Big Action */}
      <div className="w-full flex flex-col gap-3 mb-6">
        <a
          href="#find"
          onClick={(e) => {
            e.preventDefault();
            sounds.playSuccess();
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
          }}
          className="shimmer-btn w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-500/25 active:scale-95 transition-all text-center flex items-center justify-center gap-2 border border-emerald-300/40"
        >
          <span>GO FIND YOUR GIFT NOW! 🏃‍♀️💨</span>
        </a>

        <button
          onClick={() => {
            sounds.playClick();
            onReset();
          }}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Replay Challenge Flow
        </button>
      </div>
    </div>
  );
};
