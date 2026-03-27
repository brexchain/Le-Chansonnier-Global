import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Languages, 
  Info,
  Library,
  Sparkles,
  Music,
  ShoppingCart,
  Download,
  ExternalLink,
  Search,
  PlayCircle,
  PauseCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronUp,
  ChevronDown,
  Heart,
  Volume2,
  Moon,
  Sun,
  Gamepad2
} from 'lucide-react';
import { EBOOKS } from './data';
import { Ebook, Page } from './types';
import { EMOJI_GLOSSARY, UI_TRANSLATIONS, CHORD_FINGERINGS, LANGUAGE_FLAGS } from './constants';
import { ChordDiagram } from './components/ChordDiagram';
import { Metronome } from './components/Metronome';
import { ChordQuiz } from './components/ChordQuiz';

export default function App() {
  const [selectedEbookId, setSelectedEbookId] = useState<string | null>(EBOOKS.length > 0 ? EBOOKS[0].id : null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [visibleLanguages, setVisibleLanguages] = useState<string[]>(() => {
    const saved = localStorage.getItem('polyglot-visible-languages');
    return saved ? JSON.parse(saved) : ['fr', 'en'];
  });
  const [displayLanguage, setDisplayLanguage] = useState(() => {
    return localStorage.getItem('polyglot-display-language') || 'en';
  });
  const [showChords, setShowChords] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [transposeOffset, setTransposeOffset] = useState(0);
  const [activeChordDiagram, setActiveChordDiagram] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('polyglot-dark-mode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('polyglot-dark-mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [showQuiz, setShowQuiz] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const mainEuroLangs = ['en', 'es', 'de', 'fr', 'it'];

  // Close chord diagram when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveChordDiagram(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('polyglot-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('polyglot-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('polyglot-display-language', displayLanguage);
  }, [displayLanguage]);

  useEffect(() => {
    localStorage.setItem('polyglot-visible-languages', JSON.stringify(visibleLanguages));
  }, [visibleLanguages]);

  const toggleFavorite = (id: string, e: any) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredEbooks = useMemo(() => {
    const filtered = EBOOKS.filter(ebook => 
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort by recommended first, then by title
    return [...filtered].sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [searchQuery]);

  const selectedEbook = useMemo(() => 
    EBOOKS.find(b => b.id === selectedEbookId) || null, 
    [selectedEbookId]
  );

  const availableLanguages = useMemo(() => {
    if (!selectedEbook || !selectedEbook.pages || selectedEbook.pages.length === 0) return [];
    return Object.keys(selectedEbook.pages?.[0]?.translations || {});
  }, [selectedEbook]);

  const sortedLanguages = useMemo(() => {
    return [...availableLanguages].sort((a, b) => {
      if (a === displayLanguage) return -1;
      if (b === displayLanguage) return 1;
      return 0;
    });
  }, [availableLanguages, displayLanguage]);

  const sortedVisibleLanguages = useMemo(() => {
    return [...visibleLanguages].sort((a, b) => {
      if (a === displayLanguage) return -1;
      if (b === displayLanguage) return 1;
      return 0;
    });
  }, [visibleLanguages, displayLanguage]);

  const pageEmojis = useMemo(() => {
    if (!selectedEbook || !selectedEbook.pages || !selectedEbook.pages?.[currentPageIndex]) return [];
    const page = selectedEbook.pages?.[currentPageIndex];
    const allText = Object.keys(page.translations)
      .flatMap(lang => page.translations[lang].paragraphs.map(p => p.text))
      .join(' ');
    
    // Regex to extract emojis
    const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    const matches = allText.match(emojiRegex) || [];
    // Filter out duplicates and only include those we have in our glossary
    return Array.from(new Set(matches)).filter(emoji => EMOJI_GLOSSARY[emoji]);
  }, [selectedEbook, currentPageIndex]);

  const toggleLanguage = (lang: string) => {
    // If clicking the current display language, toggle its visibility (if not the only one)
    if (displayLanguage === lang) {
      setVisibleLanguages(prev => {
        if (prev.includes(lang) && prev.length > 1) {
          const next = prev.filter(l => l !== lang);
          setDisplayLanguage(next[next.length - 1]);
          return next;
        }
        return prev;
      });
    } else {
      // If clicking a different language, set it as display language and ensure it's visible
      setDisplayLanguage(lang);
      setVisibleLanguages(prev => {
        if (!prev.includes(lang)) {
          return [...prev, lang];
        }
        return prev;
      });
    }
  };

  const t = (key: keyof typeof UI_TRANSLATIONS) => {
    return UI_TRANSLATIONS[key][displayLanguage] || UI_TRANSLATIONS[key]['en'];
  };

  const transposeChord = (chord: string, offset: number) => {
    if (offset === 0) return chord;
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;
    const [_, note, suffix] = match;
    
    // Normalize flats to sharps for lookup
    const normalizedNote = note === 'Db' ? 'C#' : 
                           note === 'Eb' ? 'D#' : 
                           note === 'Gb' ? 'F#' : 
                           note === 'Ab' ? 'G#' : 
                           note === 'Bb' ? 'A#' : note;

    const index = notes.indexOf(normalizedNote);
    if (index === -1) return chord;
    let newIndex = (index + offset) % 12;
    if (newIndex < 0) newIndex += 12;
    return notes[newIndex] + suffix;
  };

  const uniqueChords = useMemo(() => {
    if (!selectedEbook || !selectedEbook.pages || !selectedEbook.pages?.[currentPageIndex]) return [];
    const page = selectedEbook.pages?.[currentPageIndex];
    const chordsSet = new Set<string>();
    
    // Get chords from any translation (they should be the same)
    const translations = page.translations;
    const firstLang = Object.keys(translations)[0];
    if (!firstLang) return [];
    
    const translation = translations[firstLang];
    
    translation.paragraphs.forEach(p => {
      if (p.chords) {
        const parts = p.chords.split(/(\[[^\]]+\])/g);
        parts.forEach(part => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const chord = part.slice(1, -1);
            chordsSet.add(transposeChord(chord, transposeOffset));
          }
        });
      }
    });
    
    return Array.from(chordsSet);
  }, [selectedEbook, currentPageIndex, transposeOffset]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => window.speechSynthesis.getVoices();
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;

    const langMap: Record<string, string> = {
      en: 'en-US',
      hr: 'hr-HR',
      es: 'es-ES',
      de: 'de-DE',
      fr: 'fr-FR',
      it: 'it-IT',
      ar: 'ar-SA',
      tr: 'tr-TR',
      zh: 'zh-CN',
      ru: 'ru-RU',
    };

    const bcp47 = langMap[lang] || lang;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = bcp47;
    
    // Try to find the best matching voice
    const voices = window.speechSynthesis.getVoices();
    const exactMatch = voices.find(v => v.lang.toLowerCase().replace('_', '-') === bcp47.toLowerCase());
    if (exactMatch) {
      utterance.voice = exactMatch;
    } else {
      const langMatch = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
      if (langMatch) {
        utterance.voice = langMatch;
      }
    }

    // Adjust rate and pitch for clarity
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
          contentArea.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  const handleEbookSelect = (id: string) => {
    setSelectedEbookId(id);
    setCurrentPageIndex(0);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <div className={`flex h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink font-sans overflow-hidden selection:bg-gold/20 selection:text-gold ${isDarkMode ? 'dark' : ''}`}>
      <AnimatePresence>
        {showQuiz && <ChordQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 320 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          x: isSidebarOpen ? 0 : -320
        }}
        className={`bg-white dark:bg-dark-card border-r border-ink/5 dark:border-dark-border flex flex-col h-full z-40 fixed lg:relative overflow-hidden shadow-2xl`}
      >
        <div className="p-6 border-b border-ink/5 dark:border-dark-border flex items-center justify-between bg-paper/30 dark:bg-dark-paper/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-olive/5 dark:bg-dark-olive/10 rounded-xl">
              <BookOpen className="w-6 h-6 text-olive dark:text-dark-olive" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-olive dark:text-dark-olive tracking-tight leading-none">Chansonnier</h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold dark:text-dark-gold mt-1">Melodic & Harmonic</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-paper dark:hover:bg-dark-paper rounded-full text-ink/20 dark:text-dark-ink/20 hover:text-ink dark:hover:text-dark-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-ink/5 dark:border-dark-border">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 dark:text-dark-ink/20 group-focus-within:text-olive transition-colors" />
            <input 
              type="text" 
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-paper dark:bg-dark-paper border border-ink/5 dark:border-dark-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 transition-all dark:text-dark-ink"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
          {filteredEbooks.map(ebook => (
            <div
              key={ebook.id}
              onClick={() => {
                setSelectedEbookId(ebook.id);
                setCurrentPageIndex(0);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedEbookId(ebook.id);
                  setCurrentPageIndex(0);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }
              }}
              role="button"
              tabIndex={0}
              className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer flex flex-col gap-3 group border outline-none focus:ring-2 focus:ring-olive/20 ${
                selectedEbookId === ebook.id 
                  ? 'bg-olive/5 dark:bg-dark-olive/10 border-olive/20 dark:border-dark-olive/30 text-olive dark:text-dark-olive shadow-sm' 
                  : 'hover:bg-paper dark:hover:bg-dark-paper border-transparent text-ink/60 dark:text-dark-ink/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl group-hover:scale-110 transition-transform">{ebook.coverEmoji}</span>
                <div className="flex items-center gap-2">
                  {selectedEbookId === ebook.id && (
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-olive/10 dark:bg-dark-olive/10 text-olive dark:text-dark-olive px-2 py-0.5 rounded-full">
                      {t('reading')}
                    </span>
                  )}
                  {ebook.isRecommended && (
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-gold/10 dark:bg-dark-gold/10 text-gold dark:text-dark-gold px-2 py-0.5 rounded-full">
                      {t('recommended')}
                    </span>
                  )}
                  <button 
                    onClick={(e) => toggleFavorite(ebook.id, e)}
                    className={`transition-colors p-1 rounded-lg hover:bg-rose-500/10 ${favorites.includes(ebook.id) ? 'text-rose-500' : 'text-ink/10 dark:text-dark-ink/10 group-hover:text-ink/30 dark:group-hover:text-dark-ink/30'}`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(ebook.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className={`font-serif font-bold text-lg leading-tight mb-1 ${selectedEbookId === ebook.id ? 'text-olive dark:text-dark-olive' : 'text-ink dark:text-dark-ink'}`}>
                  {ebook.title}
                </h3>
                <p className="text-xs opacity-60 font-medium italic font-serif">{ebook.author}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-paper/30 dark:bg-dark-paper/30 border-t border-ink/5 dark:border-dark-border space-y-6">
          <div className="space-y-4">
            <Metronome isDarkMode={isDarkMode} displayLanguage={displayLanguage} />
            
            <div className="p-5 bg-white dark:bg-dark-card rounded-[2rem] border border-ink/5 dark:border-dark-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gold/10 dark:bg-dark-gold/10 rounded-lg">
                    <Languages className="w-4 h-4 text-gold dark:text-dark-gold" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 dark:text-dark-ink/40">{t('language')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <AnimatePresence mode="popLayout">
                  {sortedLanguages.map(lang => (
                    <motion.button
                      layout
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                        displayLanguage === lang
                          ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20'
                          : visibleLanguages.includes(lang)
                            ? 'bg-gold/5 text-gold border-gold/20 dark:bg-dark-gold/5 dark:text-dark-gold dark:border-dark-gold/20'
                            : 'bg-paper dark:bg-dark-paper text-ink/40 border-transparent dark:text-dark-ink/40 hover:text-ink dark:hover:text-dark-ink'
                      }`}
                    >
                      <img 
                        src={`https://flagcdn.com/w40/${LANGUAGE_FLAGS[lang] || 'un'}.png`}
                        alt={lang}
                        className="w-4 h-3 object-cover rounded-sm shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      {lang}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <button className="w-full py-4 bg-olive dark:bg-dark-olive text-white dark:text-dark-paper rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-olive/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t('addNew')}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-ink/5 dark:border-dark-border bg-white/80 dark:bg-dark-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-paper dark:hover:bg-dark-paper rounded-lg transition-colors text-ink/60 dark:text-dark-ink/60"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {!isSidebarOpen && (
              <div className="flex items-center gap-2 mr-2">
                <div className="p-1.5 bg-olive/5 dark:bg-dark-olive/10 rounded-lg">
                  <BookOpen className="w-4 h-4 text-olive dark:text-dark-olive" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-bold text-olive dark:text-dark-olive tracking-tight leading-none">Chansonnier</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gold dark:text-dark-gold">Melodic & Harmonic</span>
                </div>
              </div>
            )}

            {/* Dark Mode Switcher */}
            <div className="flex bg-paper dark:bg-dark-paper p-1 rounded-xl border border-ink/5 dark:border-dark-border">
              <button 
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isDarkMode ? 'bg-white dark:bg-dark-card text-olive dark:text-dark-gold shadow-sm' : 'text-ink/40 dark:text-dark-ink/40'}`}
              >
                <Moon className="w-3 h-3" />
                {t('dark')}
              </button>
              <button 
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${!isDarkMode ? 'bg-white dark:bg-dark-card text-olive dark:text-dark-gold shadow-sm' : 'text-ink/40 dark:text-dark-ink/40'}`}
              >
                <Sun className="w-3 h-3" />
                {t('light')}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center flex-1 mx-4">
            {selectedEbook && (
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/30 dark:text-dark-ink/30 mb-0.5 whitespace-nowrap">
                  {selectedEbook.title}
                </span>
                <span className="text-sm font-serif font-bold text-olive dark:text-dark-olive whitespace-nowrap">
                  {selectedEbook.pages[currentPageIndex]?.translations[displayLanguage]?.title || 
                   selectedEbook.pages[currentPageIndex]?.translations['fr']?.title || 
                   'Song'}
                  <span className="ml-2 text-[10px] font-sans font-normal text-ink/20 dark:text-dark-ink/20">
                    ({currentPageIndex + 1}/{selectedEbook.pages.length})
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCheatSheetOpen(!isCheatSheetOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                isCheatSheetOpen 
                  ? 'bg-olive text-white border-olive' 
                  : 'bg-olive/10 dark:bg-dark-olive/10 text-olive dark:text-dark-olive border-olive/20 hover:bg-olive/20'
              }`}
            >
              <Music className="w-4 h-4" />
              {t('chords')}
            </button>
            <button 
              onClick={() => setShowQuiz(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 dark:bg-dark-gold/10 text-gold dark:text-dark-gold rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all border border-gold/20"
            >
              <Gamepad2 className="w-4 h-4" />
              {t('quiz')}
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        {selectedEbook && (
          <div className="h-1 bg-ink/5 dark:bg-dark-border w-full relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentPageIndex + 1) / selectedEbook.pages.length) * 100}%` }}
              className="absolute top-0 left-0 h-full bg-gold dark:bg-dark-gold"
            />
          </div>
        )}

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-ink/5 dark:border-dark-border px-6 py-2 sticky top-16 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 w-full sm:w-auto">
            <Languages className="w-4 h-4 text-olive dark:text-dark-olive flex-shrink-0" />
            <AnimatePresence mode="popLayout">
              {(showAllLanguages || sortedLanguages.length <= 7 ? sortedLanguages : sortedLanguages.filter(l => mainEuroLangs.includes(l))).map(lang => (
                <motion.button
                  layout
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    displayLanguage === lang
                      ? 'bg-olive dark:bg-dark-olive text-white dark:text-dark-paper shadow-lg shadow-olive/20 border-olive'
                      : visibleLanguages.includes(lang)
                        ? 'bg-olive/10 dark:bg-dark-olive/10 text-olive dark:text-dark-olive border-olive/20'
                        : 'bg-paper dark:bg-dark-paper text-ink/40 dark:text-dark-ink/40 border-transparent hover:text-ink dark:hover:text-dark-ink'
                  }`}
                >
                  <img 
                    src={`https://flagcdn.com/w40/${LANGUAGE_FLAGS[lang] || 'un'}.png`}
                    alt={lang}
                    className="w-4 h-3 object-cover rounded-sm shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {lang.toUpperCase()}
                </motion.button>
              ))}
            </AnimatePresence>
            {!showAllLanguages && availableLanguages.length > 7 && availableLanguages.some(l => !mainEuroLangs.includes(l)) && (
              <button
                onClick={() => setShowAllLanguages(true)}
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-paper dark:bg-dark-paper text-ink/40 dark:text-dark-ink/40 hover:text-ink dark:hover:text-dark-ink transition-all border border-dashed border-ink/20"
              >
                + More
              </button>
            )}
            {showAllLanguages && (
              <button
                onClick={() => setShowAllLanguages(false)}
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-paper dark:bg-dark-paper text-ink/40 dark:text-dark-ink/40 hover:text-ink dark:hover:text-dark-ink transition-all border border-dashed border-ink/20"
              >
                - Less
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`p-2 rounded-xl transition-all flex items-center gap-2 border ${
                isAutoScrolling 
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                  : 'bg-paper dark:bg-dark-paper text-ink/40 dark:text-dark-ink/40 border-transparent hover:text-ink dark:hover:text-dark-ink'
              }`}
              title={t('autoScroll')}
            >
              {isAutoScrolling ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">{t('autoScroll')}</span>
            </button>

            <button
              onClick={() => setShowChords(!showChords)}
              className={`p-2 rounded-xl transition-all flex items-center gap-2 border ${
                showChords 
                  ? 'bg-olive/10 text-olive border-olive/20' 
                  : 'bg-paper dark:bg-dark-paper text-ink/40 dark:text-dark-ink/40 border-transparent hover:text-ink dark:hover:text-dark-ink'
              }`}
              title={showChords ? t('hideChords') : t('showChords')}
            >
              <Music className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{t('chords')}</span>
            </button>

            {/* Transpose Controls */}
            <div className="flex items-center gap-1 bg-paper dark:bg-dark-paper p-1 rounded-xl border border-ink/5 dark:border-dark-border">
              <button
                onClick={() => setTransposeOffset(prev => prev - 1)}
                className="p-1.5 hover:bg-olive/10 rounded-lg text-olive dark:text-dark-olive transition-colors"
                title={t('transpose')}
              >
                <ArrowDownCircle className="w-4 h-4" />
              </button>
              <div className="flex flex-col items-center px-1 min-w-[32px]">
                <span className="text-[8px] uppercase font-bold text-ink/30 dark:text-dark-ink/30 leading-none mb-0.5">{t('transpose')}</span>
                <span className="text-[10px] font-bold text-ink dark:text-dark-ink leading-none">
                  {transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
                </span>
              </div>
              <button
                onClick={() => setTransposeOffset(prev => prev + 1)}
                className="p-1.5 hover:bg-olive/10 rounded-lg text-olive dark:text-dark-olive transition-colors"
                title={t('transpose')}
              >
                <ArrowUpCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="h-8 w-px bg-ink/5 dark:bg-dark-border hidden sm:block" />

            <span className="text-xs font-serif font-bold text-ink/40 dark:text-dark-ink/40">
              {currentPageIndex + 1} / {selectedEbook?.pages?.length || 0}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div id="content-area" className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            {selectedEbook ? (
              <motion.div
                key={`${selectedEbook.id}-${currentPageIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                {currentPageIndex === 0 && (
                  <div className="text-center mb-16">
                    <div className="inline-block p-4 bg-white dark:bg-dark-card rounded-3xl shadow-xl border border-ink/5 dark:border-dark-border mb-6 scale-110">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl">{selectedEbook.coverEmoji}</span>
                        <div className="w-px h-12 bg-ink/10 dark:bg-dark-border" />
                        <img 
                          src={`https://flagcdn.com/w160/${LANGUAGE_FLAGS[displayLanguage] || 'un'}.png`}
                          alt={displayLanguage}
                          className="w-16 h-10 object-cover rounded shadow-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-2 text-olive dark:text-dark-olive tracking-tight">{selectedEbook.title}</h1>
                    <div className="flex flex-col items-center mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold dark:text-dark-gold">
                        {selectedEbook.pages?.[currentPageIndex]?.translations?.[displayLanguage]?.languageName || 'Melodic & Harmonic'}
                      </span>
                      <div className="h-px w-12 bg-gold/30 mt-2"></div>
                    </div>
                    <p className="text-xl text-ink/40 dark:text-dark-ink/40 italic font-serif">{selectedEbook.author}</p>
                  </div>
                )}

                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <img 
                      src={`https://flagcdn.com/w40/${LANGUAGE_FLAGS[displayLanguage] || 'un'}.png`}
                      alt={displayLanguage}
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold dark:text-dark-gold">
                      {selectedEbook.pages?.[currentPageIndex]?.translations?.[displayLanguage]?.languageName || displayLanguage}
                    </span>
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-ink dark:text-dark-ink mb-4">
                    {selectedEbook.pages?.[currentPageIndex]?.translations?.[displayLanguage]?.title || 
                     selectedEbook.pages?.[currentPageIndex]?.translations?.[availableLanguages[0]]?.title}
                  </h2>
                  <div className="h-1 w-12 bg-gold dark:bg-dark-gold mx-auto rounded-full opacity-30"></div>
                </div>

                {/* Emoji Glossary - Moved to First Place */}
                {pageEmojis.length > 0 && (
                  <div id="emoji-glossary" className="mb-16 pb-12 border-b border-ink/5 dark:border-dark-border">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-2.5 bg-gold/10 dark:bg-dark-gold/10 rounded-xl">
                        <Sparkles className="w-5 h-5 text-gold dark:text-dark-gold" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-ink dark:text-dark-ink tracking-tight">{t('glossary')}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {pageEmojis.map(emoji => {
                        const glossaryEntry = EMOJI_GLOSSARY[emoji];
                        if (!glossaryEntry) return null;
                        
                        const sortedGlossaryLangs = Object.keys(glossaryEntry).sort((a, b) => {
                          if (a === displayLanguage) return -1;
                          if (b === displayLanguage) return 1;
                          return 0;
                        });

                        return (
                          <motion.div 
                            key={emoji}
                            whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.4)', backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                            className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-ink/5 dark:border-dark-border flex flex-col items-center text-center transition-all shadow-lg group cursor-pointer relative overflow-hidden"
                          >
                            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                            <div className="space-y-2 w-full">
                              {sortedGlossaryLangs.map(lang => {
                                const info = glossaryEntry[lang];
                                if (!info) return null;
                                return (
                                  <div 
                                    key={lang} 
                                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${displayLanguage === lang ? 'bg-gold/10 dark:bg-dark-gold/10 border border-gold/20' : 'hover:bg-paper dark:hover:bg-dark-paper border border-transparent'}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDisplayLanguage(lang);
                                      if (!visibleLanguages.includes(lang)) {
                                        setVisibleLanguages(prev => [...prev, lang]);
                                      }
                                      speak(info.name, lang);
                                    }}
                                  >
                                    <div className="flex items-center gap-1">
                                      <img 
                                        src={`https://flagcdn.com/w40/${LANGUAGE_FLAGS[lang] || 'un'}.png`}
                                        alt={lang}
                                        className="w-3 h-2 object-cover rounded-sm opacity-60 group-hover:opacity-100"
                                        referrerPolicy="no-referrer"
                                      />
                                      <span className="text-[9px] font-bold uppercase text-gold dark:text-dark-gold opacity-60">{lang}</span>
                                      <span className="text-xs font-serif font-bold text-ink dark:text-dark-ink leading-tight">{info.name}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <AnimatePresence mode="popLayout">
                    {sortedVisibleLanguages.map(langCode => {
                      const translation = selectedEbook.pages?.[currentPageIndex]?.translations?.[langCode];
                      if (!translation) return null;

                      const isMain = langCode === displayLanguage;

                      return (
                        <motion.div 
                          layout
                          key={langCode}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`bg-white dark:bg-dark-card border-2 rounded-3xl p-8 shadow-2xl flex flex-col h-full transition-all group relative ${
                            isMain 
                              ? 'border-gold bg-gold/[0.03] dark:bg-dark-gold/[0.03] shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] z-10' 
                              : 'border-ink/5 dark:border-dark-border hover:border-gold/20'
                          }`}
                        >
                          {isMain && (
                            <div className="absolute -top-3 -right-3 bg-gold text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-20 uppercase tracking-widest">
                              Active
                            </div>
                          )}
                          <div className="mb-8 pb-4 border-b border-ink/5 dark:border-dark-border">
                            <div className="flex items-center gap-2 mb-2">
                              <img 
                                src={`https://flagcdn.com/w40/${LANGUAGE_FLAGS[langCode] || 'un'}.png`}
                                alt={langCode}
                                className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                              <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${getLangColor(langCode)}`}>
                                {translation.languageName}
                              </h3>
                            </div>
                            <h4 className="text-2xl font-serif font-bold text-ink dark:text-dark-ink leading-tight">
                              {translation.title}
                            </h4>
                          </div>
                        <div className="space-y-8">
                          {translation.paragraphs.map((p, i) => (
                            <div 
                              key={i} 
                              className={p.type === 'dialog' 
                                ? 'italic text-ink/70 dark:text-dark-ink/70 bg-paper/50 dark:bg-dark-paper/50 p-6 border-l-4 border-gold dark:border-dark-gold rounded-r-2xl leading-relaxed font-serif text-lg' 
                                : 'leading-relaxed text-ink/80 dark:text-dark-ink/80 text-lg'
                              }
                            >
                              {showChords && p.chords ? (
                                <div className="flex flex-wrap items-end gap-x-0 gap-y-12 pt-12">
                                  {(() => {
                                    const parts = p.chords.split(/(\[[^\]]+\])/g);
                                    const segments: { chord?: string; text: string }[] = [];
                                    let currentChord: string | undefined;

                                    parts.forEach(part => {
                                      if (part.startsWith('[') && part.endsWith(']')) {
                                        currentChord = part.slice(1, -1);
                                      } else if (part || currentChord) {
                                        segments.push({ chord: currentChord, text: part });
                                        currentChord = undefined;
                                      }
                                    });

                                    return segments.map((s, idx) => {
                                      const transposedChord = s.chord ? transposeChord(s.chord, transposeOffset) : null;
                                      const fingering = transposedChord ? CHORD_FINGERINGS[transposedChord] : null;
                                      const chordId = `${langCode}-${i}-${idx}`;

                                      return (
                                        <span key={idx} className="relative inline-block group/chord">
                                          {s.chord && (
                                            <>
                                              <button 
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveChordDiagram(activeChordDiagram === chordId ? null : chordId);
                                                }}
                                                className="absolute -top-8 left-0 text-[11px] font-bold text-gold dark:text-dark-gold font-mono bg-gold/5 dark:bg-dark-gold/10 px-2 py-0.5 rounded-lg border border-gold/20 dark:border-dark-gold/30 whitespace-nowrap z-10 select-none cursor-help hover:bg-gold dark:hover:bg-dark-gold hover:text-white dark:hover:text-dark-paper transition-all"
                                              >
                                                {transposedChord}
                                              </button>
                                              
                                              <AnimatePresence>
                                                {activeChordDiagram === chordId && transposedChord && fingering && (
                                                  <ChordDiagram 
                                                    chord={transposedChord}
                                                    guitar={fingering.guitar}
                                                    piano={fingering.piano}
                                                    onClose={() => setActiveChordDiagram(null)}
                                                    className="fixed"
                                                  />
                                                )}
                                              </AnimatePresence>
                                            </>
                                          )}
                                          <span className="text-ink/80 dark:text-dark-ink/80 whitespace-pre-wrap leading-[3]">
                                            {s.text || '\u00A0'}
                                          </span>
                                        </span>
                                      );
                                    });
                                  })()}
                                </div>
                              ) : (
                                p.text
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

                {/* End of Ebook CTA - Now Always Visible at Bottom of Scroll for this Ebook */}
                {selectedEbook.id === 'comptines-francaises' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 bg-white dark:bg-dark-card rounded-[3rem] border-2 border-dashed border-gold/30 dark:border-dark-gold/30 text-center shadow-2xl relative overflow-hidden group"
                  >
                    {/* PDF Background with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                      style={{ backgroundImage: 'url(https://storage.googleapis.com/static.antigravity.dev/ais-build/pdf-screenshots/ba6dd985-8c6a-4ae3-97da-73eaa2f7f9e2/1.png)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white/80 dark:from-dark-card/80 dark:via-dark-card/95 dark:to-dark-card/80" />

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 dark:bg-dark-gold/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/5 dark:bg-dark-gold/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gold/10 dark:bg-dark-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShoppingCart className="w-10 h-10 text-gold dark:text-dark-gold" />
                      </div>
                      <h3 className="text-4xl font-serif font-bold text-ink dark:text-dark-ink mb-4">{t('premiumTitle')}</h3>
                      <p className="text-lg text-ink/60 dark:text-dark-ink/60 mb-10 max-w-xl mx-auto leading-relaxed">
                        {t('premiumDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a 
                          href="https://storage.googleapis.com/static.antigravity.dev/ais-build/pdf-screenshots/ba6dd985-8c6a-4ae3-97da-73eaa2f7f9e2/1.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-10 py-5 bg-gold dark:bg-dark-gold text-white dark:text-dark-paper rounded-2xl font-bold text-lg shadow-2xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 no-underline"
                        >
                          <Download className="w-6 h-6" />
                          {t('downloadPdf')}
                        </a>
                        <button className="px-10 py-5 bg-ink/5 dark:bg-dark-ink/5 text-ink dark:text-dark-ink rounded-2xl font-bold text-lg hover:bg-ink/10 dark:hover:bg-dark-ink/10 transition-all flex items-center gap-3">
                          {t('learnMore')}
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="mt-8 text-xs text-ink/30 dark:text-dark-ink/30 uppercase tracking-widest font-bold">
                        {t('secureCheckout')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-ink/20 dark:text-dark-ink/20">
                <BookOpen className="w-20 h-20 mb-6 opacity-20" />
                <p className="text-xl font-serif italic">{t('selectStory')}</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <footer className="h-24 border-t border-ink/5 dark:border-dark-border bg-white dark:bg-dark-card flex items-center justify-center gap-12 px-6 pb-20 lg:pb-0">
          <button
            disabled={currentPageIndex === 0}
            onClick={() => setCurrentPageIndex(prev => prev - 1)}
            className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-paper dark:bg-dark-paper hover:bg-ink/5 dark:hover:bg-dark-paper/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-ink/5 dark:border-dark-border group"
          >
            <ChevronLeft className="w-5 h-5 text-ink/40 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest text-ink/60 dark:text-dark-ink/60">{t('previous')}</span>
          </button>

          <button
            disabled={!selectedEbook || currentPageIndex === (selectedEbook.pages?.length || 0) - 1}
            onClick={() => setCurrentPageIndex(prev => prev + 1)}
            className="flex flex-col items-end gap-1 px-10 py-4 rounded-2xl bg-olive dark:bg-dark-olive text-white dark:text-dark-paper disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-2xl shadow-olive/20 group min-w-[240px] hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-2xl font-serif font-bold tracking-tight leading-none">
                  {t('nextSong')}
                </span>
                {selectedEbook && (
                  <span className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] mt-1">
                    {currentPageIndex + 1} / {selectedEbook.pages?.length || 0}
                  </span>
                )}
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </footer>
      </main>
      
      {/* Cheat Sheet Sidebar */}
      <AnimatePresence>
        {isCheatSheetOpen && (
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-dark-card border-l border-ink/5 dark:border-dark-border z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-ink/5 dark:border-dark-border flex items-center justify-between bg-paper/30 dark:bg-dark-paper/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-xl">
                  <Music className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif font-bold text-xl text-ink dark:text-dark-ink">{t('cheatSheet')}</h3>
              </div>
              <button 
                onClick={() => setIsCheatSheetOpen(false)}
                className="p-2 hover:bg-paper dark:hover:bg-dark-paper rounded-full text-ink/20 dark:text-dark-ink/20 hover:text-ink dark:hover:text-dark-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {uniqueChords.length > 0 ? (
                <div className="space-y-8">
                  <p className="text-xs font-bold text-ink/40 dark:text-dark-ink/40 uppercase tracking-widest">
                    {t('chordsInPage')}
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    {uniqueChords.map(chord => {
                      const fingering = CHORD_FINGERINGS[chord];
                      if (!fingering) return null;
                      return (
                        <div 
                          key={chord} 
                          className="flex flex-col items-center bg-paper/30 dark:bg-dark-paper/30 p-4 rounded-3xl border border-ink/5 dark:border-dark-border"
                        >
                          <span className="text-sm font-bold text-gold dark:text-dark-gold uppercase tracking-widest mb-4">{chord}</span>
                          <ChordDiagram 
                            chord={chord} 
                            guitar={fingering.guitar}
                            piano={fingering.piano}
                            className="relative"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <Music className="w-12 h-12" />
                  <p className="text-sm font-serif italic">No chords on this page</p>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark-card border-t border-ink/5 dark:border-dark-border flex items-center justify-around px-4 z-30 shadow-2xl">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className={`flex flex-col items-center gap-1 ${isSidebarOpen ? 'text-olive dark:text-dark-olive' : 'text-ink/30 dark:text-dark-ink/30'}`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('library')}</span>
        </button>
        <button 
          onClick={() => {
            setIsSidebarOpen(false);
            // Scroll to top
            document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${!isSidebarOpen ? 'text-olive dark:text-dark-olive' : 'text-ink/30 dark:text-dark-ink/30'}`}
        >
          <Music className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('chords')}</span>
        </button>
        <button 
          onClick={() => {
            setIsSidebarOpen(false);
            // Scroll to glossary
            const glossary = document.getElementById('emoji-glossary');
            glossary?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-ink/30 dark:text-dark-ink/30"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t('glossary')}</span>
        </button>
      </nav>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a3345;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3a4355;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function getLangColor(lang: string) {
  const colors: Record<string, string> = {
    hr: 'text-blue-600 dark:text-blue-400',
    es: 'text-pink-600 dark:text-pink-400',
    de: 'text-emerald-600 dark:text-emerald-400',
    en: 'text-gold dark:text-dark-gold',
    fr: 'text-rose-700 dark:text-rose-400',
    it: 'text-cyan-600 dark:text-cyan-400',
    ar: 'text-olive dark:text-dark-olive',
    tr: 'text-orange-600 dark:text-orange-400',
    zh: 'text-amber-600 dark:text-amber-400',
    ru: 'text-sky-600 dark:text-sky-400',
  };
  return colors[lang] || 'text-olive dark:text-dark-olive';
}
