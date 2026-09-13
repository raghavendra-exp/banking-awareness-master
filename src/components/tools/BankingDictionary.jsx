// src/components/tools/BankingDictionary.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, AlertCircle, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function BankingDictionary({ lang = 'en' }) {
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [activeTerm, setActiveTerm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data/banking-terminology.json')
      .then(res => res.json())
      .then(data => {
        setTerms(data.terms || []);
        if (data.terms && data.terms.length > 0) setActiveTerm(data.terms[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading terminology:', err);
        setLoading(false);
      });
  }, []);

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = terms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.full_form.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.simple_explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter === 'ALL' || t.term.toUpperCase().startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Statutory Glossary
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग शब्दावली और परिभाषा कोश' : 'Banking Terminology & Definition Dictionary'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? '40+ महत्वपूर्ण बैंकिंग शब्दों की वैधानिक परिभाषा, सरल व्याख्या और परीक्षा ट्रैप्स खोजें।'
              : 'Search 40+ high-frequency terms with dual definitions (Statutory + Layman), exam traps, and real examples.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search term, acronym, definition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bank-500 w-64"
          />
        </div>
      </div>

      {/* A-Z Letter Filter Bar */}
      <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedLetter === letter
                ? 'bg-bank-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Master Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Term List Column */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {filteredTerms.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching banking terms found.
            </div>
          ) : (
            filteredTerms.map((t) => {
              const isSelected = activeTerm?.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTerm(t)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-bank-500 bg-bank-50/70 dark:bg-bank-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {t.term}
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {t.acronym}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {t.full_form}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Term Detail View Column */}
        <div className="lg:col-span-2">
          {activeTerm ? (
            <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-xs font-bold text-bank-600 dark:text-bank-400 uppercase tracking-wider">
                    {activeTerm.acronym}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {activeTerm.term}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeTerm.full_form}
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-bold self-start md:self-auto">
                  PYQ: {activeTerm.pyq_frequency}
                </span>
              </div>

              {/* Statutory Definition */}
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-bank-600" />
                  Statutory / Technical Definition
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {activeTerm.statutory_definition}
                </p>
              </div>

              {/* Simple Layman Explanation */}
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                  Simplified Layman Explanation
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {activeTerm.simple_explanation}
                </p>
              </div>

              {/* Exam Relevance */}
              <div className="p-4 rounded-xl bg-bank-50 dark:bg-bank-950/30 border border-bank-200 dark:border-bank-900/50">
                <div className="text-xs font-bold text-bank-900 dark:text-bank-300 uppercase tracking-wide mb-1">
                  Mains Exam Significance
                </div>
                <p className="text-xs text-bank-800 dark:text-bank-200 leading-relaxed">
                  {activeTerm.exam_relevance}
                </p>
              </div>

              {/* Trap Alert */}
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wide">
                    Common Examiner Trap
                  </div>
                  <p className="text-xs text-rose-800 dark:text-rose-200 mt-1 leading-relaxed">
                    {activeTerm.trap_alert}
                  </p>
                </div>
              </div>

              {/* Real World Example */}
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Concrete Example: </span>
                {activeTerm.example}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 border border-dashed rounded-2xl">
              Select any banking term from the left column to inspect its deep-dive profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
