import { useState, useEffect } from 'react';
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
  const [testMode, setTestMode] = useState<boolean>(true); // Fast demo toggle

  // Automatically scroll to top whenever changing steps for smooth mobile UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

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
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Dynamic Festive Background */}
      <FestiveBackground />

      {/* Main Content Container with standard vertical scroll */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky App Header */}
        <Header
          sisterName={appConfig.sisterName}
          step={currentStep}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          testMode={testMode}
          onToggleTestMode={handleToggleTestMode}
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 w-full max-w-md mx-auto px-3 sm:px-4 py-4 pb-20">
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
        <footer className="w-full text-center py-3.5 px-4 text-[11px] text-slate-500 font-medium border-t border-rose-200/50 bg-white/70 backdrop-blur-xs mt-auto">
          Made with ❤️ by {appConfig.brotherName} for {appConfig.sisterName} • Happy Raksha Bandhan 2026
        </footer>
      </div>
    </div>
  );
}

export default App;
