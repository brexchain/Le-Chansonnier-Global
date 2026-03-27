import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, X } from 'lucide-react';

interface ChordDiagramProps {
  chord: string;
  guitar: number[];
  piano: number[];
  onClose?: () => void;
  className?: string;
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord, guitar, piano, onClose, className }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const playChordAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioPlaying) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Dynamic frequency calculation (similar to Quiz)
    const noteFreqs: { [key: string]: number } = {
      'C': 261.63, 'C#': 277.18, 'Db': 277.18, 'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
      'E': 329.63, 'F': 349.23, 'F#': 369.99, 'Gb': 369.99, 'G': 392.00, 'G#': 415.30,
      'Ab': 415.30, 'A': 440.00, 'A#': 466.16, 'Bb': 466.16, 'B': 493.88
    };

    const getChordNotes = (chordName: string) => {
      const match = chordName.match(/^([A-G][#b]?)(.*)$/);
      if (!match) return [261.63, 329.63, 392.00];
      const [_, root, type] = match;
      const rootFreq = noteFreqs[root] || 261.63;
      
      let intervals = [0, 4, 7]; // Major
      if (type.includes('m') && !type.includes('maj')) intervals = [0, 3, 7]; // Minor
      if (type.includes('7')) intervals.push(10); // Dominant 7
      if (type.includes('maj7')) intervals[3] = 11; // Major 7
      if (type.includes('sus4')) intervals[1] = 5; // Sus4
      
      return intervals.map(semi => rootFreq * Math.pow(2, semi / 12));
    };

    const chordNotes = getChordNotes(chord);
    
    setIsAudioPlaying(true);
    
    chordNotes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05 + (index * 0.02));
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(audioCtx.currentTime + (index * 0.02));
      osc.stop(audioCtx.currentTime + 2);
    });

    setTimeout(() => {
      setIsAudioPlaying(false);
      audioCtx.close();
    }, 2000);
  };

  const isRelative = className?.includes('relative');
  const isFixed = className?.includes('fixed');

  return (
    <div className={`${isRelative ? 'w-full' : isFixed ? '' : 'relative'}`}>
      <motion.div
        initial={{ opacity: 0, y: isFixed ? 20 : 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isFixed ? 20 : 10, scale: 0.95 }}
        className={`bg-white dark:bg-dark-card border border-ink/10 dark:border-dark-border rounded-[2rem] shadow-2xl z-[100] ${
          isRelative 
            ? 'w-full p-6' 
            : isFixed
              ? 'fixed bottom-8 right-8 w-72 p-8'
              : 'absolute bottom-full left-0 mb-6 w-64 p-6 origin-bottom-left'
        } ${className || ''}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 dark:text-dark-ink/30 mb-1">Chord</span>
            <h4 className="text-2xl font-serif font-bold text-ink dark:text-dark-ink">{chord}</h4>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={playChordAudio}
              className={`p-2 rounded-xl transition-all flex items-center gap-2 px-4 ${
                isAudioPlaying 
                  ? 'bg-gold text-white shadow-lg shadow-gold/20' 
                  : 'bg-olive/5 text-olive dark:text-dark-olive hover:bg-olive hover:text-white'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Listen</span>
            </button>
            {onClose && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 rounded-xl hover:bg-paper dark:hover:bg-dark-paper text-ink/20 dark:text-dark-ink/20 hover:text-ink dark:hover:text-dark-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Guitar Diagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 dark:text-dark-ink/40 font-bold">Guitar Fingering</span>
            </div>
            <div className="relative w-32 h-40 mx-auto bg-paper/30 dark:bg-dark-paper/30 rounded-2xl border border-ink/5 dark:border-dark-border p-4">
              {/* Frets */}
              {[1, 2, 3, 4, 5].map(f => (
                <div key={f} className="absolute left-0 right-0 border-b border-ink/10 dark:border-dark-border" style={{ top: `${f * 20}%` }} />
              ))}
              {/* Strings */}
              <div className="flex justify-between h-full px-2">
                {[0, 1, 2, 3, 4, 5].map(s => (
                  <div key={s} className="w-px bg-ink/10 dark:bg-dark-border relative">
                    {guitar && guitar[s] === 0 && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-600 font-bold">○</div>
                    )}
                    {guitar && guitar[s] === -1 && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-rose-600 font-bold">×</div>
                    )}
                    {guitar && guitar[s] > 0 && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-olive dark:bg-dark-olive rounded-full shadow-md ring-2 ring-white dark:ring-dark-card"
                        style={{ top: `${(guitar[s] - 0.5) * 20}%` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Piano Diagram */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 dark:text-dark-ink/40 font-bold">Piano Keys</span>
            <div className="relative w-full h-12 flex bg-paper/30 dark:bg-dark-paper/30 rounded-xl border border-ink/5 dark:border-dark-border overflow-hidden">
              {/* White Keys */}
              {[0, 2, 4, 5, 7, 9, 11, 12, 14].map((note, i) => (
                <div 
                  key={note} 
                  className={`flex-1 border-r border-ink/5 dark:border-dark-border last:border-0 ${piano?.includes(note % 12) ? 'bg-gold/30' : ''}`}
                />
              ))}
              {/* Black Keys */}
              <div className="absolute inset-0 pointer-events-none">
                {[1, 3, 6, 8, 10, 13, 15].map((note, i) => {
                  const left = note === 1 ? '8%' : 
                               note === 3 ? '19%' : 
                               note === 6 ? '42%' : 
                               note === 8 ? '53%' : 
                               note === 10 ? '64%' : 
                               note === 13 ? '86%' : '97%';
                  return (
                    <div 
                      key={note} 
                      className={`absolute top-0 w-[8%] h-6 bg-ink dark:bg-black border border-ink/20 dark:border-dark-border rounded-b-md ${piano?.includes(note % 12) ? 'bg-gold' : ''}`}
                      style={{ left }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
