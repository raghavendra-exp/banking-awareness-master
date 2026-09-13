// src/components/tools/DailyCapsule.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, CheckCircle2, Flame, HelpCircle, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataManager } from '../../utils/dataManager';

export default function DailyCapsule({ lang = 'en' }) {
  const [completed, setCompleted] = useState(dataManager.isDailyCapsuleCompleted());
  const [streak, setStreak] = useState(dataManager.getStreak());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'facts' | 'quiz' | 'terms'

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dailyNews = [
    { title: 'RBI Issues Revised Framework for Project Finance Loans', summary: 'Proposed phased provisioning up to 5.0% during construction phase to fortify bank buffers against delayed infra projects.' },
    { title: 'Liquidity Coverage Ratio (LCR) Run-off Factors Recalibrated', summary: 'Additional 5% run-off factor introduced for retail deposits accessible via internet and mobile banking.' },
    { title: 'UPI Interoperability with Central Bank Digital Currency (e₹)', summary: 'Users can now scan standard merchant UPI QR codes directly from their Digital Rupee token wallets.' },
    { title: 'Tarun Plus Category Introduced under MUDRA Yojana', summary: 'Government raises the maximum loan limit from ₹10 Lakh to ₹20 Lakh for entrepreneurs who have repaid Tarun loans.' },
    { title: 'Mandatory Key Fact Statement (KFS) Enforced for MSME Loans', summary: 'Commercial banks and NBFCs must furnish an all-inclusive Annual Percentage Rate (APR) before loan execution.' }
  ];

  const dailyFacts = [
    { fact: 'Under Section 24 of the RBI Act 1934, RBI has the legal power to issue banknotes up to denomination ₹10,000.' },
    { fact: 'The 5th character of the 11-character Indian Financial System Code (IFSC) is strictly NUMERIC ZERO ("0").' },
    { fact: 'Agricultural crop loans turn into NPAs after 2 crop seasons for short duration crops and 1 crop season for long duration crops.' },
    { fact: 'The Standing Deposit Facility (SDF) rate is fixed exactly 25 basis points below the Policy Repo Rate without collateral.' },
    { fact: 'DICGC deposit insurance covers principal plus accrued interest up to ₹5 Lakh per depositor per bank within 90 days.' }
  ];

  const dailyQuiz = [
    {
      id: 1,
      q: 'What is the minimum transaction threshold for an outward fund transfer via RTGS?',
      options: ['₹50,000', '₹1,00,000', '₹2,00,000', '₹5,00,000'],
      correct: 2,
      exp: 'RTGS has a statutory minimum of ₹2,00,000 (₹2 Lakh). No upper ceiling.'
    },
    {
      id: 2,
      q: 'Where is the permanent headquarters of SIDBI located?',
      options: ['Mumbai', 'New Delhi', 'Lucknow', 'Kolkata'],
      correct: 2,
      exp: 'SIDBI is headquartered in Lucknow, Uttar Pradesh.'
    },
    {
      id: 3,
      q: 'What is the revised annual premium for PMJJBY effective since June 2022?',
      options: ['₹330', '₹436', '₹20', '₹500'],
      correct: 1,
      exp: 'PMJJBY annual premium is ₹436 per annum.'
    }
  ];

  const dailyTerms = [
    { term: 'CASA Ratio', exp: 'Current Account Savings Account deposits divided by total deposits. Higher CASA lowers cost of funds.' },
    { term: 'Nostro Account', exp: 'An account held by an Indian bank with a foreign bank abroad in foreign currency ("Ours with you").' },
    { term: 'Primary Deficit', exp: 'Fiscal Deficit minus Interest Payments on past debt liabilities.' }
  ];

  const handleSelectQuiz = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCompleteCapsule = () => {
    dataManager.markDailyCapsuleComplete();
    const newStreak = dataManager.updateStreak();
    setCompleted(true);
    setStreak(newStreak);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            High-Yield Daily Routine
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'आज का बैंकिंग कैप्सूल' : 'Today’s Banking Capsule'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{todayStr}</span>
          </p>
        </div>

        {/* Streak & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 text-orange-700 dark:text-orange-400">
            <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider">Study Streak</div>
              <div className="text-base font-black font-mono">{streak} Days</div>
            </div>
          </div>
          {completed && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Capsule Section Tabs */}
      <div className="flex gap-2 py-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'news' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          5 High-Yield News
        </button>
        <button
          onClick={() => setActiveTab('facts')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'facts' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          5 Official Facts
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quiz' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          3 Quick MCQs
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'terms' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          3 Essential Terms
        </button>
      </div>

      {/* Tab Contents */}
      <div className="my-6">
        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-3">
            {dailyNews.map((n, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  {i + 1}. {n.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {n.summary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Facts Tab */}
        {activeTab === 'facts' && (
          <div className="space-y-3">
            {dailyFacts.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {f.fact}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {dailyQuiz.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const hasAnswered = selectedOpt !== undefined;
              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                    Q{idx + 1}: {q.q}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correct;
                      const isChosen = selectedOpt === oIdx;
                      let btnStyle = 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800';
                      if (hasAnswered) {
                        if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                        else if (isChosen) btnStyle = 'bg-rose-600 text-white border-rose-600';
                      }
                      return (
                        <button
                          key={oIdx}
                          disabled={hasAnswered}
                          onClick={() => handleSelectQuiz(q.id, oIdx)}
                          className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {hasAnswered && (
                    <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                      <strong>Explanation: </strong>{q.exp}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Terms Tab */}
        {activeTab === 'terms' && (
          <div className="space-y-3">
            {dailyTerms.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-bank-600 dark:text-bank-400 mb-1">
                  {t.term}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t.exp}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completion Button */}
      {!completed && (
        <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleCompleteCapsule}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20"
          >
            Mark Today’s Capsule Complete (+1 Day Streak)
          </button>
        </div>
      )}
    </div>
  );
}
