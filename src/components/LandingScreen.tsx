import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LandingScreenProps {
  sisterName: string;
  brotherName: string;
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  sisterName,
  brotherName,
  onStart,
}) => {
  return (
    <div className="w-full flex flex-col items-center text-center animate-fadeIn">
      {/* Festive Rakhi Sibling Illustration Card */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-3 border-amber-300 bg-gradient-to-b from-amber-100 to-rose-100 mb-5 group">
        {/* Festive Banner header */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md z-10 border border-yellow-200 flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5" /> Happy Raksha Bandhan <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Happy Raksha Bandhan Festive Family Artwork */}
        <div className="relative w-full aspect-[4/3] sm:h-72 overflow-hidden bg-rose-50 flex items-center justify-center">
          <img
            src="/photos/happy-rakshabandhan-illustration-sister-.jpg"
            alt="Happy Raksha Bandhan Celebration"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Overlay gradient for clean text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent flex flex-col justify-end p-4 text-left">
            <span className="text-amber-300 font-semibold text-[11px] tracking-wider uppercase flex items-center gap-1">
              ✨ Special Gift Mission
            </span>
            <h2 className="text-white text-lg sm:text-xl font-black drop-shadow-sm leading-tight">
              The {sisterName} & {brotherName} Edition
            </h2>
          </div>
        </div>
      </div>

      {/* Greetings & Suspense text */}
      <div className="glass-panel w-full rounded-3xl p-5 sm:p-6 shadow-xl border border-rose-100 mb-5 flex flex-col items-center relative">
        <div className="w-14 h-14 -mt-11 mb-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg animate-gift">
          <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
            🎁
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Hey {sisterName}! <span className="text-rose-500 inline-block animate-pulse">❤️</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-3.5">
          Your special Raksha Bandhan gift is waiting for you...
        </p>

        <div className="w-full p-3.5 rounded-2xl bg-rose-50/95 border border-rose-200 text-slate-800 text-xs sm:text-sm leading-relaxed mb-2 flex items-start gap-2.5 text-left">
          <span className="text-xl shrink-0">😈</span>
          <div>
            <span className="font-bold text-rose-700 block mb-0.5">
              But there's a small problem!
            </span>
            You have to complete <span className="font-bold text-rose-600 underline">two challenges</span> before I tell you where your gift is hidden.
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Sibling verification protocol enabled
        </div>
      </div>

      {/* Start CTA Button */}
      <button
        onClick={() => {
          sounds.playClick();
          onStart();
        }}
        className="shimmer-btn w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-base sm:text-lg shadow-xl shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-yellow-200/50"
      >
        <span>START THE CHALLENGE</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
