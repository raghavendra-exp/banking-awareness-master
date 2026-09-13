// src/components/practice/PracticeArena.jsx
import React, { useState, useEffect } from 'react';
import { Target, Bookmark, BookmarkCheck, AlertCircle, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Filter, Languages } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import { questionGenerator } from '../../utils/questionGenerator';

export default function PracticeArena({ lang = 'en', onToggleLang }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [bookmarked, setBookmarked] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  // Load static questions + dynamic questions
  useEffect(() => {
    fetch('./data/questions.json')
      .then(res => res.json())
      .then(data => {
        const staticQs = data.questions || [];
        const dynamicQs = questionGenerator.generatePracticeSet(15, 'all');
        const combined = [...staticQs, ...dynamicQs].sort(() => 0.5 - Math.random());
        setQuestions(combined);
      })
      .catch(err => {
        console.error('Error loading questions:', err);
        const fallback = questionGenerator.generatePracticeSet(20, 'all');
        setQuestions(fallback);
      });
  }, []);

  const filteredQuestions = selectedTopic === 'ALL'
    ? questions
    : questions.filter(q => q.topic === selectedTopic);

  const currentQ = filteredQuestions[currentIndex] || questions[0];

  useEffect(() => {
    if (currentQ) {
      setBookmarked(dataManager.isBookmarked(currentQ.id));
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [currentIndex, currentQ]);

  const topics = ['ALL', 'RBI & Monetary Policy', 'Government Schemes', 'Payment Systems', 'Banking Regulations', 'Financial Markets', 'Banking Terminology', 'Institutions & Committees'];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correct_option;
    setStats(prev => ({
      total: prev.total + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct
    }));

    // Record in dataManager
    dataManager.recordPracticeResult(currentQ.topic, isCorrect);

    // If incorrect, log to mistakes notebook automatically
    if (!isCorrect) {
      dataManager.logMistake(currentQ, idx);
    }
  };

  const handleToggleBookmark = () => {
    if (!currentQ) return;
    const newState = dataManager.toggleBookmark(currentQ);
    setBookmarked(newState);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!currentQ) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading questions...</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
            <Target className="w-3.5 h-3.5" />
            Adaptive Exam Practice
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग अभ्यास अखाड़ा (Practice Arena)' : 'Banking Awareness Practice Arena'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'SBI, IBPS और RRB मेन्स स्तर के द्विभाषी प्रश्नों का अभ्यास करें।'
              : 'Authentic exam questions with instant provenance tags, bilingual view, and mistake recording.'}
          </p>
        </div>

        {/* Action Controls & Session Score */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            Session: {stats.correct} / {stats.total} ({stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
          </div>

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            title="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5 text-bank-600" />
            <span>{lang === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border transition-all ${
              bookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300'
                : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-600'
            }`}
            title="Save for Revision"
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => { setSelectedTopic(t); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedTopic === t
                ? 'bg-bank-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="my-6 space-y-6">
        {/* Metadata badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300">
              {currentQ.topic}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {currentQ.provenance}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              {currentQ.exam_tag}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Question {currentIndex + 1} of {filteredQuestions.length}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {lang === 'hi' && currentQ.question_hi ? currentQ.question_hi : currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {(lang === 'hi' && currentQ.options_hi ? currentQ.options_hi : currentQ.options)?.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correct_option;

            let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-bank-400';
            if (isAnswered) {
              if (isCorrect) {
                optStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected) {
                optStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold';
              } else {
                optStyle = 'border-slate-200 dark:border-slate-800 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-center justify-between ${optStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Dual Explanation & Exam Trap (Revealed after answering) */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
            {/* Standard Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                Standard Verified Explanation:
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>

            {/* Direct Exam Shortcut */}
            {currentQ.exam_shortcut && (
              <div className="p-4 rounded-xl bg-bank-50 dark:bg-bank-950/30 border border-bank-200 dark:border-bank-900/50 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-bank-600 dark:text-bank-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-bank-900 dark:text-bank-300 uppercase tracking-wide">
                    Direct Exam Key Takeaway:
                  </div>
                  <div className="text-xs text-bank-800 dark:text-bank-200 mt-1 font-semibold">
                    {currentQ.exam_shortcut}
                  </div>
                </div>
              </div>
            )}

            {/* Trap Alert */}
            {currentQ.trap_alert && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wide">
                    Examiner Trap Alert (Where candidates lose 0.25 marks):
                  </div>
                  <div className="text-xs text-rose-800 dark:text-rose-200 mt-1">
                    {currentQ.trap_alert}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {isAnswered && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-attempt
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredQuestions.length - 1}
            className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-xs font-bold transition-all disabled:opacity-40 shadow-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
