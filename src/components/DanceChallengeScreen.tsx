import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Pause, Flame, Music2, ArrowRight, ShieldAlert, Lock, Unlock, Sparkles, Video, Download, Camera } from 'lucide-react';
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
  // 600 seconds = 10 full minutes (or 10s if test mode is enabled)
  const initialDuration = testMode ? 10 : 600;
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentCheerIndex, setCurrentCheerIndex] = useState<number>(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [isTabInactive, setIsTabInactive] = useState<boolean>(false);

  // Camera & Recording States
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const totalTime = initialDuration;

  // Initialize camera preview on mount if supported
  useEffect(() => {
    let streamTrack: MediaStream | null = null;

    async function initCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
            audio: true,
          });
          streamTrack = stream;
          setCameraStream(stream);
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
          }
        } catch {
          // Camera permission denied or not available; fallback gracefully
          setCameraError('Camera access not granted. You can still dance and complete the timer!');
        }
      }
    }

    initCamera();

    return () => {
      if (streamTrack) {
        streamTrack.getTracks().forEach((track) => track.stop());
      }
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Bind video element whenever stream is available
  useEffect(() => {
    if (videoPreviewRef.current && cameraStream) {
      videoPreviewRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Sync timer if testMode toggles
  useEffect(() => {
    if (!isActive && !isCompleted) {
      setTimeLeft(testMode ? 10 : 600);
    }
  }, [testMode, isActive, isCompleted]);

  // Handle timer countdown
  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Full 10 Minutes Completed!
            handleFinishRecording();
            setIsActive(false);
            setIsCompleted(true);
            sounds.stopDanceBeats();
            sounds.playUnlock();
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#FF4D8D', '#F59E0B', '#10B981', '#7C3AED', '#EC4899', '#FCD34D'],
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

  // Start MediaRecorder
  const startRecording = () => {
    if (!cameraStream) return;
    try {
      recordedChunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/mp4')
        ? 'video/mp4'
        : 'video/webm';

      const recorder = new MediaRecorder(cameraStream, { mimeType });
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const blob = new Blob(recordedChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);
          setRecordedVideoUrl(url);
        }
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
    } catch {
      // safe fallback
    }
  };

  // Stop MediaRecorder on finish
  const handleFinishRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // Tab visibility detection (pauses when user switches tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        setIsActive(false);
        setIsTabInactive(true);
        sounds.stopDanceBeats();
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.pause();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);

  // Rotate cheer messages & dance moves every 6 seconds while dancing
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

    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      startRecording();
    } else if (mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
  };

  const handlePause = () => {
    sounds.playClick();
    setIsActive(false);
    sounds.stopDanceBeats();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
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
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider mb-1 border border-amber-300">
          <Flame className="w-3.5 h-3.5 text-orange-500" /> Live Video Dance Recording Trial
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          🎥 10-Minute Dance Video Challenge
        </h2>
        <p className="text-xs text-slate-600 mt-0.5 max-w-xs mx-auto">
          Record your full 10:00 dance trial live to unlock your gift location!
        </p>
      </div>

      {/* Tab Pause Alert */}
      {isTabInactive && !isCompleted && (
        <div className="w-full p-3 rounded-2xl bg-amber-500 text-white text-xs font-bold mb-3 flex items-center gap-2 shadow-md animate-pulse">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Dance challenge paused because you switched tabs! Resume to continue recording.</span>
        </div>
      )}

      {/* Main Live Camera / Dance Card */}
      <div className="glass-panel w-full rounded-3xl p-4 sm:p-5 shadow-xl border border-amber-200 mb-4 relative">
        {/* Live Camera Recording Viewport */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md border-2 border-amber-400 bg-slate-950 aspect-[4/3] sm:h-72 mb-3.5 flex items-center justify-center">
          {/* Real Live Video Camera Stream */}
          <video
            ref={videoPreviewRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover -scale-x-100 ${
              cameraStream ? 'block' : 'hidden'
            }`}
          />

          {/* Fallback if camera stream is unavailable */}
          {!cameraStream && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 text-white">
              <Camera className="w-12 h-12 text-amber-400 mb-2 animate-bounce-slow" />
              <span className="font-bold text-sm">Camera Ready</span>
              <span className="text-xs text-slate-400 mt-1 max-w-xs">
                {cameraError || 'Tap Start to begin your 10-minute live dance session!'}
              </span>
            </div>
          )}

          {/* Recording & Live Timer Overlays */}
          {isActive && (
            <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>REC LIVE</span>
            </div>
          )}

          {/* Live Floating Timer in Top-Right */}
          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm border border-amber-400/50 text-amber-300 text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-md z-10">
            ⏱️ {formatTime(timeLeft)}
          </div>

          {/* Sibling Festive Watermark Frame */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <span className="text-[10px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              💃 Sibling Dance Arena
            </span>
            <span className="text-[10px] font-bold text-yellow-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              {Math.round(progressPct)}% Recorded
            </span>
          </div>
        </div>

        {/* 10-Minute Countdown Clock Display */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-3.5 text-center text-white shadow-inner border border-slate-700 mb-3.5">
          <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1.5">
            <Music2 className="w-3.5 h-3.5 text-amber-400" /> 10-Minute Dance Countdown
          </div>

          <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-amber-300 drop-shadow-md my-0.5">
            {formatTime(timeLeft)}
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-2.5 overflow-hidden border border-slate-700 relative">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Cheer message */}
          {isActive && (
            <div className="mt-2 text-xs font-bold text-yellow-200 animate-bounce-slow">
              {config.cheerMessages[currentCheerIndex]}
            </div>
          )}
        </div>

        {/* Active Dance Move Card */}
        {isActive && currentMove && (
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 mb-3.5 flex items-center gap-2.5">
            <div className="text-2xl shrink-0 p-1.5 bg-white rounded-xl shadow-xs">
              {currentMove.emoji}
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Dance Step Prompt:
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                {currentMove.name}
              </div>
              <div className="text-[11px] text-slate-600">
                {currentMove.hint}
              </div>
            </div>
          </div>
        )}

        {/* Gift Locked Status Info Box while timer is running */}
        {!isCompleted && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs mb-3.5 flex items-center gap-2.5 text-left">
            <div className="w-7 h-7 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="leading-snug">
              <strong className="text-rose-900 font-bold">Gift Location Locked:</strong> Complete the full 10-minute recorded dance to reveal where your gift is hiding!
            </span>
          </div>
        )}

        {/* 10-Minute Completion & Video Playback / Unlock Box */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 mb-3.5 text-center animate-fadeIn shadow-lg">
            <div className="text-3xl mb-1">🎉</div>
            <div className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 10-Minute Video Verified!
            </div>
            <h3 className="font-black text-base sm:text-lg text-emerald-950">
              DANCE TRIAL CONQUERED! 💃📹
            </h3>
            <p className="text-xs text-emerald-800 font-semibold mt-1 mb-3">
              Full 10-minute performance recorded. Your hidden gift location is unlocked!
            </p>

            {/* Video Download / Review Option */}
            {recordedVideoUrl && (
              <div className="mb-3.5 p-3 rounded-xl bg-white/90 border border-emerald-200 text-left flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">Your Dance Video</span>
                </div>
                <a
                  href={recordedVideoUrl}
                  download="Rakhi_10Min_Dance_Performance.webm"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Video
                </a>
              </div>
            )}

            <button
              onClick={() => {
                sounds.playUnlock();
                onPassDance();
              }}
              className="shimmer-btn w-full py-4 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-black text-sm sm:text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-yellow-200"
            >
              <Unlock className="w-5 h-5" />
              <span>REVEAL MY HIDDEN GIFT LOCATION 🎁</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Start / Pause Controls */}
        {!isCompleted && (
          <div className="flex gap-2">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="shimmer-btn flex-1 py-4 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm sm:text-base shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>{timeLeft < totalTime ? 'RESUME 10-MIN RECORDING' : 'START RECORDING 10-MIN DANCE 📹'}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 py-4 px-4 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Pause className="w-4 h-4" />
                <span>PAUSE RECORDING</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
