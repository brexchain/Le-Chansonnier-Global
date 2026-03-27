import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, ChevronUp, ChevronDown, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MetronomeProps {
  className?: string;
  isDarkMode?: boolean;
}

export const Metronome: React.FC<MetronomeProps> = ({ className, isDarkMode }) => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextTickTimeRef = useRef(0);
  const timerIDRef = useRef<number | null>(null);
  const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1; // How far ahead to schedule audio (in seconds)

  const scheduleTick = useCallback((beatNumber: number, time: number) => {
    if (!audioContextRef.current) return;

    const osc = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    osc.frequency.value = beatNumber % 4 === 0 ? 880 : 440;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.connect(envelope);
    envelope.connect(audioContextRef.current.destination);

    osc.start(time);
    osc.stop(time + 0.1);
  }, []);

  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;

    while (nextTickTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      scheduleTick(currentBeat, nextTickTimeRef.current);
      
      const secondsPerBeat = 60.0 / bpm;
      nextTickTimeRef.current += secondsPerBeat;
      setCurrentBeat(prev => (prev + 1) % 4);
    }
    timerIDRef.current = window.setTimeout(scheduler, lookahead);
  }, [bpm, currentBeat, scheduleTick]);

  const toggleMetronome = () => {
    if (!isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      nextTickTimeRef.current = audioContextRef.current.currentTime + 0.05;
      setIsPlaying(true);
      scheduler();
    } else {
      setIsPlaying(false);
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
      }
      setCurrentBeat(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const adjustBpm = (amount: number) => {
    setBpm(prev => Math.max(40, Math.min(240, prev + amount)));
  };

  return (
    <div className={`flex items-center gap-4 bg-white dark:bg-dark-card border border-ink/5 dark:border-dark-border rounded-2xl px-5 py-2.5 shadow-xl transition-all ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gold/10 dark:bg-dark-gold/10 rounded-xl">
          <Music className={`w-4 h-4 ${isPlaying ? 'text-gold dark:text-dark-gold animate-pulse' : 'text-ink/30 dark:text-dark-ink/30'}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-ink/40 dark:text-dark-ink/40 uppercase tracking-widest leading-none mb-1.5">Metronome</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-ink dark:text-dark-ink w-8">{bpm}</span>
            <span className="text-[10px] text-ink/40 dark:text-dark-ink/40 font-bold uppercase tracking-widest">BPM</span>
          </div>
        </div>
      </div>

      <div className="h-10 w-px bg-ink/5 dark:bg-dark-border" />

      <div className="flex items-center gap-1.5">
        <button 
          onClick={() => adjustBpm(-1)}
          className="p-1.5 hover:bg-gold/10 rounded-lg transition-colors text-ink/40 dark:text-dark-ink/40 hover:text-gold dark:hover:text-dark-gold"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <button 
          onClick={() => adjustBpm(1)}
          className="p-1.5 hover:bg-gold/10 rounded-lg transition-colors text-ink/40 dark:text-dark-ink/40 hover:text-gold dark:hover:text-dark-gold"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={toggleMetronome}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
          isPlaying 
            ? 'bg-rose-500 text-white shadow-rose-500/20' 
            : 'bg-olive dark:bg-dark-olive text-white dark:text-dark-paper hover:scale-105 shadow-olive/20'
        }`}
      >
        {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>

      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: isPlaying && currentBeat === i ? 1.3 : 1,
              backgroundColor: isPlaying && currentBeat === i 
                ? (i === 0 ? '#D4AF37' : '#5A5A40') 
                : (isDarkMode ? '#2D2D2D' : '#F5F5F0')
            }}
            className="w-2 h-2 rounded-full border border-ink/5 dark:border-dark-border"
          />
        ))}
      </div>
    </div>
  );
};
