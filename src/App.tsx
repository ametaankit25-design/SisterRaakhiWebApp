import { useState } from 'react';
import { config as defaultConfig, type AppConfig } from './config';
import { FestiveBackground } from './components/FestiveBackground';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { RulesScreen } from './components/RulesScreen';
import { PhotoQuizScreen } from './components/PhotoQuizScreen';
import { DanceChallengeScreen } from './components/DanceChallengeScreen';
import { UnlockSuspenseScreen } from './components/UnlockSuspenseScreen';
import { GiftRevealScreen } from './components/GiftRevealScreen';
import { sounds } from './utils/audio';

export type FlowStep =
  | 'landing'
  | 'rules'
  | 'quiz'
  | 'quiz-success'
  | 'dance'
  | 'dance-success'
  | 'unlock-ready'
  | 'gift-revealed';

export function App() {
  const [appConfig] = useState<AppConfig>(defaultConfig);
  const [currentStep, setCurrentStep] = useState<FlowStep>('landing');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(true); // Default true for fast previewing, easily toggleable

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleTestMode = () => {
    sounds.playClick();
    setTestMode(!testMode);
  };

  const handleStartLanding = () => {
    setCurrentStep('rules');
  };

  const handleAcceptRules = () => {
    setCurrentStep('quiz');
  };

  const handlePassQuiz = () => {
    setCurrentStep('dance');
  };

  const handlePassDance = () => {
    setCurrentStep('unlock-ready');
  };

  const handleRevealGift = () => {
    setCurrentStep('gift-revealed');
  };

  const handleReset = () => {
    setCurrentStep('landing');
  };

  return (
    <div className="relative min-h-screen bg-slate-900 flex flex-col justify-between font-sans selection:bg-rose-500 selection:text-white">
      {/* Dynamic Festive Background */}
      <FestiveBackground />

      {/* Main Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky App Header with sibling details, progress, sound & demo controls */}
        <Header
          sisterName={appConfig.sisterName}
          step={currentStep}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          testMode={testMode}
          onToggleTestMode={handleToggleTestMode}
        />

        {/* Content Screens */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-6">
          {currentStep === 'landing' && (
            <LandingScreen
              sisterName={appConfig.sisterName}
              brotherName={appConfig.brotherName}
              onStart={handleStartLanding}
            />
          )}

          {currentStep === 'rules' && (
            <RulesScreen
              onAccept={handleAcceptRules}
              onBack={() => setCurrentStep('landing')}
            />
          )}

          {currentStep === 'quiz' && (
            <PhotoQuizScreen
              config={appConfig.photoQuiz}
              onPassQuiz={handlePassQuiz}
            />
          )}

          {currentStep === 'dance' && (
            <DanceChallengeScreen
              config={appConfig.danceChallenge}
              testMode={testMode}
              onPassDance={handlePassDance}
            />
          )}

          {currentStep === 'unlock-ready' && (
            <UnlockSuspenseScreen
              sisterName={appConfig.sisterName}
              onReveal={handleRevealGift}
            />
          )}

          {currentStep === 'gift-revealed' && (
            <GiftRevealScreen
              config={appConfig.giftReveal}
              sisterName={appConfig.sisterName}
              brotherName={appConfig.brotherName}
              onReset={handleReset}
            />
          )}
        </main>

        {/* Festive Footer */}
        <footer className="w-full text-center py-3 text-[11px] text-slate-500 font-medium z-10 border-t border-rose-100/50 bg-white/40 backdrop-blur-xs">
          Made with ❤️ by {appConfig.brotherName} for {appConfig.sisterName} • Happy Raksha Bandhan 2026
        </footer>
      </div>
    </div>
  );
}

export default App;
