import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  sisterName: string;
  step: 'landing' | 'rules' | 'quiz' | 'quiz-success' | 'dance' | 'dance-success' | 'unlock-ready' | 'gift-revealed';
  isMuted: boolean;
  onToggleMute: () => void;
  testMode: boolean;
  onToggleTestMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sisterName,
  step,
  isMuted,
  onToggleMute,
  testMode,
  onToggleTestMode,
}) => {
  // Compute progress percentage
  const getProgress = () => {
    switch (step) {
      case 'landing':
        return 5;
      case 'rules':
        return 20;
      case 'quiz':
        return 40;
      case 'quiz-success':
        return 55;
      case 'dance':
        return 75;
      case 'dance-success':
        return 90;
      case 'unlock-ready':
        return 95;
      case 'gift-revealed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 backdrop-blur-md bg-white/70 border-b border-rose-100/60 shadow-xs transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Sibling badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm text-sm font-bold">
            ❤️
          </div>
          <div>
            <div className="text-xs font-semibold text-rose-700 tracking-wider uppercase flex items-center gap-1">
              Rakhi Quest <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="text-[13px] font-bold text-slate-800 leading-tight">
              For {sisterName}
            </div>
          </div>
        </div>

        {/* Action icons (Sound + Demo Speed Toggle) */}
        <div className="flex items-center gap-2">
          {/* Developer / Demo Quick Mode switch */}
          <button
            onClick={onToggleTestMode}
            title={testMode ? "Test Mode: Fast (10s timer)" : "Normal Mode (10m timer)"}
            className={`px-2 py-1 text-[11px] font-bold rounded-full border transition-all ${
              testMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            ⚡ {testMode ? 'Fast Demo (10s)' : '10m Mode'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleMute();
            }}
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center transition-colors"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="max-w-md mx-auto mt-2">
        <div className="w-full bg-rose-100/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>
    </header>
  );
};
