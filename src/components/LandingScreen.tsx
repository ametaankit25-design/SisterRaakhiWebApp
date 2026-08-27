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
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center text-center animate-fadeIn">
      {/* Festive Rakhi Sibling Illustration Card */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/80 bg-gradient-to-b from-amber-100 to-rose-100 mb-6 group">
        {/* Festive Banner header on image */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full shadow-md z-10 border border-yellow-200 flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5" /> Happy Raksha Bandhan <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* High-res festive Rakhi illustration */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-rose-50 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80"
            alt="Rakhi Celebrations"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-left">
            <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase flex items-center gap-1">
              ✨ Special Gift Mission
            </span>
            <h2 className="text-white text-xl sm:text-2xl font-black drop-shadow-md">
              The {sisterName} & {brotherName} Edition
            </h2>
          </div>
        </div>
      </div>

      {/* Greetings & Suspense text */}
      <div className="glass-panel w-full rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-100/80 flex flex-col items-center mb-6 relative">
        <div className="w-16 h-16 -mt-12 mb-3 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg animate-gift">
          <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-3xl">
            🎁
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Hey {sisterName}! <span className="text-rose-500 inline-block animate-pulse">❤️</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
          Your special Raksha Bandhan gift is waiting for you...
        </p>

        <div className="w-full p-4 rounded-2xl bg-rose-50/90 border border-rose-200/70 text-slate-800 text-sm sm:text-base leading-snug mb-2 flex items-start gap-3 text-left">
          <span className="text-2xl">😈</span>
          <div>
            <span className="font-bold text-rose-700 block mb-0.5">
              But there's a small problem!
            </span>
            You have to complete <span className="font-bold text-rose-600 underline">two challenges</span> before I tell you where your gift is hidden.
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Sibling verification protocol enabled
        </div>
      </div>

      {/* Start CTA Button */}
      <button
        onClick={() => {
          sounds.playClick();
          onStart();
        }}
        className="shimmer-btn w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-lg sm:text-xl shadow-xl shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-3 border border-yellow-200/50"
      >
        <span>START THE CHALLENGE</span>
        <ArrowRight className="w-6 h-6 animate-bounce-horizontal" />
      </button>
    </div>
  );
};
