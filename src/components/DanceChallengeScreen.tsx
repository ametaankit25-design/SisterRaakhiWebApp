import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Flame, Music2, ArrowRight, ShieldAlert } from 'lucide-react';
import type { AppConfig } from '../config';
import { sounds } from '../utils/audio';

interface DanceChallengeScreenProps {
  config: AppConfig['danceChallenge'];
  testMode: boolean;
  onPassDance: () => void;
}

export const DanceChallengeScreen: React.FC<DanceChallengeScreenProps> = ({
  config,
  testMode,
  onPassDance,
}) => {
  const initialDuration = testMode ? 10 : config.durationSeconds; // 10s if test mode, else 600s (10 min)
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentCheerIndex, setCurrentCheerIndex] = useState<number>(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [isTabInactive, setIsTabInactive] = useState<boolean>(false);

  const totalTime = initialDuration;

  // Handle timer countdown
  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Completed!
            setIsActive(false);
            setIsCompleted(true);
            sounds.stopDanceBeats();
            sounds.playSuccess();
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#FF4D8D', '#F59E0B', '#10B981', '#7C3AED', '#EC4899'],
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Tab visibility detection (FR-08: pause when user leaves the tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        setIsActive(false);
        setIsTabInactive(true);
        sounds.stopDanceBeats();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);

  // Rotate cheer messages & dance moves every 6 seconds while active
  useEffect(() => {
    if (!isActive) return;

    const cheerInterval = window.setInterval(() => {
      setCurrentCheerIndex((prev) => (prev + 1) % config.cheerMessages.length);
      setCurrentMoveIndex((prev) => (prev + 1) % config.danceMoves.length);
    }, 6000);

    return () => clearInterval(cheerInterval);
  }, [isActive, config.cheerMessages.length, config.danceMoves.length]);

  // Start challenge handler
  const handleStart = () => {
    sounds.playClick();
    setIsActive(true);
    setIsTabInactive(false);
    sounds.startDanceBeats();
  };

  const handlePause = () => {
    sounds.playClick();
    setIsActive(false);
    sounds.stopDanceBeats();
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPct = ((totalTime - timeLeft) / totalTime) * 100;
  const currentMove = config.danceMoves[currentMoveIndex];

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-1.5 border border-amber-300">
          <Flame className="w-3.5 h-3.5 text-orange-500" /> Challenge 2 of 2
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          💃 {config.title}
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
          {config.subtitle}
        </p>
      </div>

      {/* Tab Pause Alert */}
      {isTabInactive && !isCompleted && (
        <div className="w-full p-3 rounded-2xl bg-amber-500/90 text-white text-xs font-bold mb-3 flex items-center gap-2 shadow-md animate-pulse">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Hey! You left the tab. Challenge paused. Resume to keep dancing!</span>
        </div>
      )}

      {/* Main Dance Card */}
      <div className="glass-panel w-full rounded-3xl p-5 shadow-xl border border-amber-200/80 mb-4 relative">
        {/* Video / Visualizer Player */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 bg-slate-950 aspect-video mb-4 flex items-center justify-center">
          {isActive ? (
            <iframe
              className="w-full h-full object-cover"
              src={config.videoUrl}
              title="Rakhi Dance Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900">
              <div className="w-14 h-14 rounded-full bg-rose-500/90 text-white flex items-center justify-center text-2xl shadow-lg mb-2 border-2 border-white/40 animate-pulse">
                💃
              </div>
              <span className="text-white font-bold text-sm">
                Festive Dance Arena Ready
              </span>
              <span className="text-amber-300 text-xs mt-0.5 font-medium">
                {testMode ? '⚡ Fast 10-Second Demo Active' : '⏱️ 10:00 Full Challenge'}
              </span>
            </div>
          )}
        </div>

        {/* 10-Minute Countdown Clock */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-4 text-center text-white shadow-inner border border-slate-700 mb-4">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
            <Music2 className="w-3 h-3 text-amber-400" /> Time Remaining
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-amber-300 drop-shadow-sm">
            {formatTime(timeLeft)}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Cheer message */}
          {isActive && (
            <div className="mt-3 text-xs font-bold text-yellow-200 animate-bounce-slow">
              {config.cheerMessages[currentCheerIndex]}
            </div>
          )}
        </div>

        {/* Active Dance Move Card */}
        {isActive && currentMove && (
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 mb-4 flex items-center gap-3">
            <div className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-xs">
              {currentMove.emoji}
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Current Move:
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {currentMove.name}
              </div>
              <div className="text-xs text-slate-600">
                {currentMove.hint}
              </div>
            </div>
          </div>
        )}

        {/* Completion Announcement */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 mb-4 text-center animate-bounce-slow">
            <div className="text-2xl mb-1">🎉</div>
            <h3 className="font-extrabold text-base text-emerald-900">
              YOU SURVIVED THE DANCE TRIAL!
            </h3>
            <p className="text-xs text-emerald-800 font-semibold mt-1 mb-3">
              Full 10 minutes verified. Sibling honor certified! ✓
            </p>
            <button
              onClick={() => {
                sounds.playUnlock();
                onPassDance();
              }}
              className="shimmer-btn w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>UNLOCK MY GIFT LOCATION 🔓</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Start / Pause Controls */}
        {!isCompleted && (
          <div className="flex gap-2.5">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="shimmer-btn flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{timeLeft < totalTime ? 'RESUME DANCE' : 'START DANCE CHALLENGE'}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Pause className="w-4 h-4" />
                <span>PAUSE CHALLENGE</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
