import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Music, Volume2, ArrowRight, RefreshCw, Star } from 'lucide-react';
import { CHORD_FINGERINGS } from '../constants';
import { ChordDiagram } from './ChordDiagram';

interface ChordQuizProps {
  onClose: () => void;
}

type QuizState = 'start' | 'question' | 'feedback' | 'result';
type QuestionType = 'audio' | 'visual';

export const ChordQuiz: React.FC<ChordQuizProps> = ({ onClose }) => {
  const [state, setState] = useState<QuizState>('start');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(10);
  const [targetChord, setTargetChord] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [questionType, setQuestionType] = useState<QuestionType>('audio');

  const allChords = Object.keys(CHORD_FINGERINGS);

  const generateQuestion = useCallback(() => {
    const target = allChords[Math.floor(Math.random() * allChords.length)];
    const others = allChords
      .filter(c => c !== target)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const newOptions = [target, ...others].sort(() => 0.5 - Math.random());
    
    setTargetChord(target);
    setOptions(newOptions);
    setSelectedOption(null);
    setIsCorrect(false);
    setShowDiagram(false);
    setQuestionType(Math.random() > 0.5 ? 'audio' : 'visual');
    setState('question');
  }, [allChords]);

  const startQuiz = () => {
    setScore(0);
    setCurrentQuestion(1);
    generateQuestion();
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === targetChord;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setState('feedback');
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      generateQuestion();
    } else {
      setState('result');
    }
  };

  const playChord = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Base frequencies for notes
    const noteFreqs: { [key: string]: number } = {
      'C': 261.63, 'C#': 277.18, 'Db': 277.18, 'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
      'E': 329.63, 'F': 349.23, 'F#': 369.99, 'Gb': 369.99, 'G': 392.00, 'G#': 415.30,
      'Ab': 415.30, 'A': 440.00, 'A#': 466.16, 'Bb': 466.16, 'B': 493.88
    };

    const getChordNotes = (chordName: string) => {
      const match = chordName.match(/^([A-G][#b]?)(.*)$/);
      if (!match) return [261.63];
      const [_, root, type] = match;
      const rootFreq = noteFreqs[root] || 261.63;
      
      // Simplified intervals (semitones)
      let intervals = [0, 4, 7]; // Major
      if (type.includes('m') && !type.includes('maj')) intervals = [0, 3, 7]; // Minor
      if (type.includes('7')) intervals.push(10); // Dominant 7
      if (type.includes('maj7')) intervals[3] = 11; // Major 7
      if (type.includes('sus4')) intervals[1] = 5; // Sus4
      
      return intervals.map(semi => rootFreq * Math.pow(2, semi / 12));
    };

    const chordNotes = getChordNotes(targetChord);
    
    chordNotes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05 + (index * 0.02));
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + (index * 0.02));
      osc.stop(audioCtx.currentTime + 1.5);
    });

    setTimeout(() => audioCtx.close(), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-dark-card w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-ink/5 dark:border-dark-border"
      >
        {/* Header */}
        <div className="p-6 border-b border-ink/5 dark:border-dark-border flex items-center justify-between bg-paper/50 dark:bg-dark-paper/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/10 rounded-xl">
              <Music className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-ink dark:text-dark-ink">Chord Master Quiz</h3>
              {state !== 'start' && state !== 'result' && (
                <p className="text-xs text-ink/40 dark:text-dark-ink/40 font-bold uppercase tracking-wider">
                  Question {currentQuestion} of {totalQuestions}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-paper dark:hover:bg-dark-paper rounded-full text-ink/20 dark:text-dark-ink/20 hover:text-ink dark:hover:text-dark-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {state === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-12 h-12 text-gold animate-pulse" />
                </div>
                <h4 className="text-3xl font-serif font-bold text-ink dark:text-dark-ink">Ready to test your ears?</h4>
                <p className="text-ink/60 dark:text-dark-ink/60 max-w-xs mx-auto">
                  Identify 10 chords correctly to become a Chord Master.
                </p>
                <button 
                  onClick={startQuiz}
                  className="w-full py-4 bg-olive text-white rounded-2xl font-bold text-lg shadow-lg shadow-olive/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Start Quiz
                </button>
              </motion.div>
            )}

            {state === 'question' && (
              <motion.div 
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-8"
              >
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-ink/40 dark:text-dark-ink/40">
                    {questionType === 'audio' ? 'Which chord is this?' : 'Identify this chord diagram'}
                  </p>
                  
                  {questionType === 'audio' ? (
                    <button 
                      onClick={playChord}
                      className="p-8 bg-gold/10 rounded-3xl text-gold hover:bg-gold/20 transition-all group"
                    >
                      <Volume2 className="w-16 h-16 group-hover:scale-110 transition-transform" />
                    </button>
                  ) : (
                    <div className="flex justify-center bg-paper/30 dark:bg-dark-paper/30 p-6 rounded-3xl border border-ink/5 dark:border-dark-border">
                      <ChordDiagram 
                        chord={targetChord}
                        guitar={CHORD_FINGERINGS[targetChord]?.guitar}
                        piano={CHORD_FINGERINGS[targetChord]?.piano}
                        className="relative"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="py-6 bg-paper dark:bg-dark-paper border border-ink/5 dark:border-dark-border rounded-2xl font-serif font-bold text-2xl text-ink dark:text-dark-ink hover:border-olive/40 hover:bg-olive/5 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {state === 'feedback' && (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {isCorrect ? <Star className="w-10 h-10 fill-current" /> : <X className="w-10 h-10" />}
                </div>
                
                <div>
                  <h4 className={`text-3xl font-serif font-bold mb-2 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isCorrect ? 'Perfect!' : 'Not quite...'}
                  </h4>
                  <p className="text-ink/60 dark:text-dark-ink/60">
                    The chord was <span className="font-bold text-ink dark:text-dark-ink">{targetChord}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setShowDiagram(!showDiagram)}
                    className="text-sm font-bold text-olive hover:underline"
                  >
                    {showDiagram ? 'Hide Fingering' : 'Show Fingering'}
                  </button>
                  
                  {showDiagram && (
                    <div className="flex justify-center">
                      <ChordDiagram 
                        chord={targetChord}
                        guitar={CHORD_FINGERINGS[targetChord]?.guitar}
                        piano={CHORD_FINGERINGS[targetChord]?.piano}
                        className="relative"
                      />
                    </div>
                  )}
                </div>

                <button 
                  onClick={nextQuestion}
                  className="w-full py-4 bg-ink dark:bg-dark-ink text-white dark:text-dark-paper rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  {currentQuestion < totalQuestions ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="relative">
                  <Trophy className="w-24 h-24 text-gold mx-auto" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-2 -right-2 bg-olive text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white dark:border-dark-card"
                  >
                    {score}
                  </motion.div>
                </div>

                <div>
                  <h4 className="text-4xl font-serif font-bold text-ink dark:text-dark-ink mb-2">
                    {score >= 8 ? 'Chord Master!' : score >= 5 ? 'Great Job!' : 'Keep Practicing!'}
                  </h4>
                  <p className="text-ink/60 dark:text-dark-ink/60">
                    You got {score} out of {totalQuestions} chords correct.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={startQuiz}
                    className="w-full py-4 bg-olive text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink rounded-2xl font-bold hover:bg-paper/80 transition-all"
                  >
                    Back to Library
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {state !== 'start' && state !== 'result' && (
          <div className="px-8 py-4 bg-paper/30 dark:bg-dark-paper/30 border-t border-ink/5 dark:border-dark-border">
            <div className="w-full h-1.5 bg-ink/5 dark:bg-dark-ink/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                className="h-full bg-gold"
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
