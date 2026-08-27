import React from 'react';
import { Sparkles, CheckCircle2, Flame, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RulesScreenProps {
  onAccept: () => void;
  onBack: () => void;
}

export const RulesScreen: React.FC<RulesScreenProps> = ({ onAccept, onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/90 px-3 py-1 rounded-full mb-2 border border-amber-300">
          <Sparkles className="w-3 h-3 text-amber-600" /> Sibling Rules & Terms
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          The Two Sacred Trials 📜
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Pass both stages to unlock your hidden treasure!
        </p>
      </div>

      {/* Challenge Cards */}
      <div className="w-full space-y-4 mb-6">
        {/* Challenge 1 */}
        <div className="glass-panel rounded-3xl p-5 border-2 border-rose-200 shadow-md relative overflow-hidden transition-transform hover:scale-[1.01]">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            Stage 01
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md shrink-0 text-xl">
              📸
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-1.5">
                PHOTO QUIZ
              </h3>
              <p className="text-xs text-rose-700 font-semibold mb-2">
                "Let's see how well you know your brother."
              </p>
              <div className="bg-rose-50/90 rounded-xl p-2.5 text-xs text-slate-700 border border-rose-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span><strong className="text-slate-900">Requirement:</strong> Identify the photo and pick the 100% correct answer.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="glass-panel rounded-3xl p-5 border-2 border-amber-300 shadow-md relative overflow-hidden transition-transform hover:scale-[1.01]">
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            Stage 02
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-md shrink-0 text-xl">
              💃
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-1.5">
                DANCE CHALLENGE
              </h3>
              <p className="text-xs text-amber-800 font-semibold mb-2">
                "Time to prove your celebration dance skills!"
              </p>
              <div className="bg-amber-50/90 rounded-xl p-2.5 text-xs text-slate-700 border border-amber-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <span><strong className="text-slate-900">Requirement:</strong> Complete the 10-minute festive dance session.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Hint Box */}
        <div className="glass-panel-gold rounded-2xl p-4 text-center border border-amber-300/70">
          <div className="text-xs text-amber-900 font-medium">
            🎁 <strong>Final Reward:</strong> Exact secret coordinates & room clue where the physical gift box is hidden!
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2.5">
        <button
          onClick={() => {
            sounds.playClick();
            onAccept();
          }}
          className="shimmer-btn w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-lg shadow-xl shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>I ACCEPT THE CHALLENGE</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Back to Welcome
        </button>
      </div>
    </div>
  );
};
