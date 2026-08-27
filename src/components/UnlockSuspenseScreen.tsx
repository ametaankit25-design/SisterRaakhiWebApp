import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, KeyRound } from 'lucide-react';
import { sounds } from '../utils/audio';

interface UnlockSuspenseScreenProps {
  sisterName: string;
  onReveal: () => void;
}

export const UnlockSuspenseScreen: React.FC<UnlockSuspenseScreenProps> = ({
  sisterName,
  onReveal,
}) => {
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  const handleUnlockClick = () => {
    setIsUnlocking(true);
    sounds.playUnlock();
    // Confetti explosion
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#FF4D8D', '#7C3AED', '#E11D48', '#FCD34D'],
    });

    setTimeout(() => {
      onReveal();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center text-center animate-fadeIn">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> All Trials Completed!
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
        🎉 YOU DID IT, {sisterName.toUpperCase()}!
      </h1>
      <p className="text-sm text-slate-600 mb-6 font-medium">
        Both sibling challenges passed with flying colors!
      </p>

      {/* Glowing Safe Lock Box */}
      <div className="glass-panel-gold w-full rounded-3xl p-8 shadow-2xl border-2 border-amber-400 mb-6 flex flex-col items-center relative overflow-hidden">
        {/* Radiant shimmer light */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/20 via-rose-300/20 to-purple-300/20 animate-pulse-glow pointer-events-none" />

        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/30 border-4 border-white animate-bounce-slow">
            {isUnlocking ? (
              <Unlock className="w-12 h-12 text-slate-900 animate-spin" />
            ) : (
              <Lock className="w-12 h-12 text-slate-900" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-2 rounded-full shadow-md text-xs font-bold">
            ✨
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-1">
          {isUnlocking ? "Unsealing Secret Coordinates..." : "Secret Gift Coordinates Locked"}
        </h3>
        <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          {isUnlocking
            ? "Opening the brother-sister security vault..."
            : "Your gift location is ready to be revealed. Press the master key below to unlock!"}
        </p>
      </div>

      {/* CTA Button */}
      <button
        disabled={isUnlocking}
        onClick={handleUnlockClick}
        className="shimmer-btn w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-black text-lg sm:text-xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 border border-yellow-200/60"
      >
        <KeyRound className="w-6 h-6 animate-pulse" />
        <span>{isUnlocking ? "UNLOCKING..." : "REVEAL MY GIFT LOCATION 🔓"}</span>
      </button>
    </div>
  );
};
