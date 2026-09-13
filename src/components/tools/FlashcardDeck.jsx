// src/components/tools/FlashcardDeck.jsx
import React, { useState } from 'react';
import { Layers, RotateCcw, Shuffle, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

export default function FlashcardDeck({ lang = 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const cards = [
    {
      topic: 'RBI History',
      front: 'Which commission recommended the creation of the Reserve Bank of India, and in which year?',
      back: 'Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1926. RBI commenced operations on April 1, 1935.',
      shortcut: 'Hilton Young Commission (1926)'
    },
    {
      topic: 'Currency Management',
      front: 'Who signs the One Rupee currency note in India, and which entity issues it?',
      back: 'The One Rupee note is issued directly by the Ministry of Finance, Government of India, and bears the signature of the Finance Secretary (NOT RBI Governor).',
      shortcut: 'Govt of India + Finance Secretary'
    },
    {
      topic: 'Deposit Insurance',
      front: 'What is the maximum insurance limit under DICGC per depositor per bank?',
      back: '₹5,00,000 (₹5 Lakh) covering both Principal + Accrued Interest across all deposit accounts in the same bank.',
      shortcut: '₹5 Lakh per depositor per bank'
    },
    {
      topic: 'Government Schemes',
      front: 'What is the revised annual premium for PMJJBY and PMSBY?',
      back: 'PMJJBY (Life Insurance) = ₹436 per annum.\nPMSBY (Accidental Insurance) = ₹20 per annum.',
      shortcut: 'PMJJBY = ₹436/yr | PMSBY = ₹20/yr'
    },
    {
      topic: 'Payment Systems',
      front: 'What is the maximum per-transaction and wallet limit on UPI Lite?',
      back: 'Per-transaction limit: ₹500.\nMaximum wallet balance: ₹2,00,0 at any point of time. Requires NO UPI PIN.',
      shortcut: '₹500 / tx | ₹2,000 wallet'
    },
    {
      topic: 'Banking Codes',
      front: 'How many characters are in an IFSC code, and what is fixed at the 5th position?',
      back: '11 characters total. The 5th character is strictly numeric ZERO ("0") reserved for future use.',
      shortcut: '11 characters, 5th is "0"'
    },
    {
      topic: 'Stressed Assets',
      front: 'What are the day ranges for SMA-0, SMA-1, and SMA-2?',
      back: 'SMA-0: 1 to 30 days overdue.\nSMA-1: 31 to 60 days overdue.\nSMA-2: 61 to 90 days overdue. Beyond 90 days = NPA.',
      shortcut: 'SMA-0 (1-30d) | SMA-1 (31-60d) | SMA-2 (61-90d)'
    },
    {
      topic: 'Institutions',
      front: 'Where is the permanent headquarters of SIDBI and IRDAI located?',
      back: 'SIDBI: Lucknow, Uttar Pradesh.\nIRDAI: Hyderabad, Telangana (shifted from New Delhi in 2001).',
      shortcut: 'SIDBI = Lucknow | IRDAI = Hyderabad'
    }
  ];

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleMastered = () => {
    setMasteredCount(prev => prev + 1);
    handleNext();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            Active Recall & Spaced Repetition
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग फ़्लैशकार्ड डेक' : 'Banking Awareness Flashcard Deck'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'सक्रिय स्मरण के लिए कार्ड को पलटें। परीक्षा से पहले त्वरित दोहराव।'
              : 'Tap to flip and test memory recall on high-frequency banking facts.'}
          </p>
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-xl">
            Mastered: {masteredCount}
          </span>
        </div>
      </div>

      {/* The 3D Flipping Flashcard */}
      <div className="my-8 max-w-xl mx-auto">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[280px] p-8 rounded-3xl cursor-pointer transition-all duration-300 shadow-md border-2 flex flex-col justify-between select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-bank-600 to-indigo-700 text-white border-bank-500'
              : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-bank-400'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                isFlipped ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {currentCard.topic}
              </span>
              <span className="text-xs opacity-70 flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                {isFlipped ? 'Click to show question' : 'Click to flip answer'}
              </span>
            </div>

            <div className="text-lg md:text-xl font-bold leading-relaxed mt-4">
              {isFlipped ? currentCard.back : currentCard.front}
            </div>
          </div>

          {isFlipped && (
            <div className="pt-4 border-t border-white/20 mt-4">
              <div className="text-[11px] font-bold text-bank-200 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Exam Key:
              </div>
              <div className="text-sm font-black font-mono mt-0.5">{currentCard.shortcut}</div>
            </div>
          )}

          {!isFlipped && (
            <div className="text-xs text-slate-400 text-center pt-4">
              (Tap card to reveal verified fact & exam shortcut)
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleMastered}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            I Know This (Mastered)
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
