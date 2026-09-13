// src/components/practice/QuestionSelectionTrainer.jsx
import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function QuestionSelectionTrainer({ lang = 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDecisions, setUserDecisions] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const testSet = [
    {
      id: 1,
      q: 'What is the maximum overdraft limit permitted under Pradhan Mantri Jan Dhan Yojana (PMJDY)?',
      ideal: 'DO NOW',
      facultyReason: 'Direct factual Tier-1 scheme question. Takes < 8 seconds to mark ₹10,000. Pure guaranteed mark.',
      options: ['₹5,000', '₹10,000', '₹15,000', '₹20,000']
    },
    {
      id: 2,
      q: 'Calculate the Primary Deficit if Fiscal Deficit is ₹17.34 Lakh Crore and Interest Payments are ₹10.48 Lakh Crore.',
      ideal: 'REVIEW LATER',
      facultyReason: 'Requires 2-digit subtraction (₹6.86 Lakh Crore). Easy mark, but mark for review to sweep direct facts first.',
      options: ['₹6.86 Lakh Cr', '₹7.12 Lakh Cr', '₹6.24 Lakh Cr', '₹27.82 Lakh Cr']
    },
    {
      id: 3,
      q: 'Which minor urban co-operative bank in rural Vidarbha had its licence cancelled by RBI due to inadequate capital in November 2023?',
      ideal: 'SKIP / AVOID',
      facultyReason: 'Low-yield Tier-5 trivia. Guessing carries a 75% chance of negative marking (-0.25). Immediate skip.',
      options: ['Bank A', 'Bank B', 'Bank C', 'Bank D']
    },
    {
      id: 4,
      q: 'Under Section 24 of the Banking Regulation Act 1949, what is the maximum statutory ceiling for SLR?',
      ideal: 'DO NOW',
      facultyReason: 'Direct statutory fact (40%). Takes under 10 seconds.',
      options: ['20%', '25%', '40%', '50%']
    },
    {
      id: 5,
      q: 'A multi-step statement question on Basel III leverage ratio sub-clauses spanning 12 lines of text.',
      ideal: 'REVIEW LATER',
      facultyReason: 'High reading time (>45s). Leave for Round 2 so you don’t run out of time for simple questions.',
      options: ['Only 1 & 2', 'Only 2 & 3', 'All 1, 2, 3', 'None']
    }
  ];

  const currentQ = testSet[currentIndex];

  const handleDecision = (decision) => {
    setUserDecisions(prev => ({ ...prev, [currentQ.id]: decision }));
    if (currentIndex + 1 < testSet.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let matches = 0;
    testSet.forEach(q => {
      if (userDecisions[q.id] === q.ideal) matches++;
    });
    return matches;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 mb-2">
          <Compass className="w-3.5 h-3.5" />
          Mains Exam Strategy Trainer
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'hi' ? 'प्रश्न चयन रणनीति ट्रेनर (Question Selection Trainer)' : 'Question Selection Strategy Trainer'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'hi'
            ? 'मेन्स परीक्षा के पहले 5 मिनट में तय करें कि किस प्रश्न को तुरंत हल करना है, किसे बाद के लिए छोड़ना है और किसे छोड़ना है।'
            : 'Master the 3-tier triage strategy: "DO NOW", "REVIEW LATER", or "SKIP TO AVOID NEGATIVE".'}
        </p>
      </div>

      {!isFinished ? (
        <div className="my-8 max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Scenario {currentIndex + 1} of {testSet.length}</span>
            <span className="text-bank-600">First 5-Minute Triage Drill</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white leading-relaxed">
              {currentQ.q}
            </h3>

            <div className="text-xs text-slate-500">
              Exam Options Preview: {currentQ.options.join(' | ')}
            </div>
          </div>

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
            What is your immediate triage decision for this question?
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => handleDecision('DO NOW')}
              className="p-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm text-center"
            >
              1. DO NOW (Under 15s)
              <div className="text-[10px] font-normal opacity-80 mt-0.5">100% Certain Fact</div>
            </button>

            <button
              onClick={() => handleDecision('REVIEW LATER')}
              className="p-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all shadow-sm text-center"
            >
              2. REVIEW LATER
              <div className="text-[10px] font-normal opacity-80 mt-0.5">Needs Calculation / Long</div>
            </button>

            <button
              onClick={() => handleDecision('SKIP / AVOID')}
              className="p-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all shadow-sm text-center"
            >
              3. SKIP / AVOID
              <div className="text-[10px] font-normal opacity-80 mt-0.5">Negative Hazard Trap</div>
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Screen */
        <div className="my-8 max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Triage Strategy Score: {calculateScore()} / {testSet.length} Matches
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparing your decisions against the faculty benchmark for high-percentile time management.
            </p>
          </div>

          <div className="space-y-4">
            {testSet.map((q) => {
              const userChoice = userDecisions[q.id];
              const isMatch = userChoice === q.ideal;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isMatch
                      ? 'border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-amber-200 bg-amber-50/30 dark:bg-amber-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-800 dark:text-white">Question {q.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Your Decision: <strong>{userChoice}</strong></span>
                      <span className="text-bank-600">Faculty: <strong>{q.ideal}</strong></span>
                      {isMatch ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">{q.q}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <strong>Faculty Rationale: </strong>{q.facultyReason}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => { setIsFinished(false); setCurrentIndex(0); setUserDecisions({}); }}
            className="w-full py-3 bg-bank-600 hover:bg-bank-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Practice Triage Again
          </button>
        </div>
      )}
    </div>
  );
}
