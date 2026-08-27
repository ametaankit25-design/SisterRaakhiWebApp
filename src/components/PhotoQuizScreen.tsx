import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Camera, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Eye } from 'lucide-react';
import type { AppConfig } from '../config';
import { sounds } from '../utils/audio';

interface PhotoQuizScreenProps {
  config: AppConfig['photoQuiz'];
  onPassQuiz: () => void;
}

export const PhotoQuizScreen: React.FC<PhotoQuizScreenProps> = ({ config, onPassQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [wrongMessage, setWrongMessage] = useState<string>('');

  const currentQuestion = config.questions[currentQuestionIndex];
  const totalQuestions = config.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const isRevealed = status === 'correct';

  const handleSubmit = () => {
    if (!selectedOption || !currentQuestion) return;

    if (selectedOption === currentQuestion.correctAnswerId) {
      sounds.playSuccess();
      setStatus('correct');
      // Fire celebratory confetti bursts
      confetti({
        particleCount: isLastQuestion ? 120 : 60,
        spread: isLastQuestion ? 80 : 55,
        origin: { y: 0.6 },
        colors: ['#FF4D8D', '#F59E0B', '#7C3AED', '#10B981', '#F43F5E'],
      });
    } else {
      sounds.playWrong();
      setStatus('wrong');
      const randomMsg =
        currentQuestion.wrongMessages[
          Math.floor(Math.random() * currentQuestion.wrongMessages.length)
        ] || '😂 WRONG! Seriously, sis? Your gift is judging you!';
      setWrongMessage(randomMsg);
    }
  };

  const handleRetry = () => {
    sounds.playClick();
    setSelectedOption(null);
    setStatus('idle');
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (isLastQuestion) {
      onPassQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus('idle');
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Quiz Progress & Header */}
      <div className="text-center mb-3 w-full">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-black uppercase tracking-wider border border-rose-200">
            <Camera className="w-3.5 h-3.5 text-rose-600" /> Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Done
          </span>
        </div>

        {/* Mini 5-dot Progress Bar */}
        <div className="flex items-center gap-1.5 w-full mb-2">
          {config.questions.map((q, idx) => (
            <div
              key={q.id}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                idx < currentQuestionIndex
                  ? 'bg-emerald-500'
                  : idx === currentQuestionIndex
                  ? 'bg-rose-500 ring-2 ring-rose-300'
                  : 'bg-rose-200/80'
              }`}
            />
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          📸 {config.title}
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          {isRevealed
            ? '✨ Photo Unblurred! Look at that glorious memory!'
            : '🔎 The photo is blurred! Guess correctly to unblur & reveal!'}
        </p>
      </div>

      {/* Quiz Card */}
      <div className="glass-panel w-full rounded-3xl p-4 sm:p-5 shadow-xl border border-rose-100 mb-4 relative">
        {/* Photo Container with Mystery Blur effect */}
        <div className="relative w-full aspect-[16/10] sm:h-56 rounded-2xl overflow-hidden shadow-inner border-2 border-rose-200 mb-3.5 bg-slate-950 flex items-center justify-center">
          <img
            key={currentQuestion.photoUrl}
            src={currentQuestion.photoUrl}
            alt={`Quiz Photo ${currentQuestionIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isRevealed
                ? 'filter-none scale-100'
                : 'filter blur-md scale-105 brightness-90'
            }`}
            loading="eager"
          />

          {/* Mystery / Revealed Badge overlay */}
          {!isRevealed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 backdrop-blur-[2px] pointer-events-none p-3 text-center">
              <div className="px-3 py-1 rounded-full bg-slate-950/75 border border-yellow-400/40 text-yellow-300 text-xs font-bold shadow-md flex items-center gap-1.5 animate-pulse">
                <Eye className="w-3.5 h-3.5" /> Mystery Photo Locked 🔒
              </div>
              <span className="text-[10px] text-white/90 font-semibold drop-shadow-md mt-1">
                (Select correct answer to reveal)
              </span>
            </div>
          ) : (
            <div className="absolute top-2.5 right-2.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-emerald-300 shadow-md animate-bounce-slow flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-200" /> Photo Unlocked!
            </div>
          )}
        </div>

        {/* Question Title */}
        <div className="mb-3 text-left">
          <label className="text-sm sm:text-base font-extrabold text-slate-900 block mb-0.5">
            {currentQuestion.question}
          </label>
          <span className="text-[11px] text-slate-500">
            Select the single true answer:
          </span>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            let borderClass = 'border-slate-200 hover:border-rose-300 bg-white';
            if (isSelected) {
              borderClass = 'border-rose-500 bg-rose-50/95 shadow-sm ring-2 ring-rose-300';
            }
            if (status === 'correct' && option.id === currentQuestion.correctAnswerId) {
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

        {/* Correct Success Callout with Unblurred Photo Celebration */}
        {status === 'correct' && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 mb-3.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-emerald-800 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {isLastQuestion ? 'ALL 5 QUIZZES CONQUERED! ✓' : `QUESTION ${currentQuestionIndex + 1} PASSED! ✓`}
            </div>
            <p className="text-xs font-semibold leading-relaxed mb-2.5">
              {currentQuestion.successMessage}
            </p>
            <button
              onClick={handleNextQuestion}
              className="shimmer-btn w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{isLastQuestion ? 'PROCEED TO DANCE TRIAL 💃' : `NEXT QUESTION (${currentQuestionIndex + 2}/${totalQuestions}) →`}</span>
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
            <span>SUBMIT & UNBLUR PHOTO</span>
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
