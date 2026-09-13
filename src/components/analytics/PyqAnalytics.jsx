// src/components/analytics/PyqAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Target, Award, Sparkles } from 'lucide-react';

export default function PyqAnalytics({ lang = 'en' }) {
  const [pyqData, setPyqData] = useState(null);

  useEffect(() => {
    fetch('./data/pyq.json')
      .then(res => res.json())
      .then(data => setPyqData(data))
      .catch(err => console.error('Error loading pyq data:', err));
  }, []);

  if (!pyqData) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading PYQ analytics...</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          Shift Analysis & Exam Intelligence
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'hi' ? 'PYQ इंटेलिजेंस और 5-टियर प्राथमिकता मैट्रिक्स' : 'PYQ Intelligence & 5-Tier Priority Matrix (2020 - 2026)'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'hi'
            ? 'SBI क्लर्क, IBPS क्लर्क और RRB OA मेन्स परीक्षाओं के प्रश्न पैटर्न और वेटेज का विस्तृत विश्लेषण।'
            : 'Shift-by-shift empirical analysis of topic weightage, recurring examiner traps, and priority tiers.'}
        </p>
      </div>

      {/* Target Score & Strategic Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-bank-50/70 to-indigo-50/50 dark:from-slate-800/40 dark:to-slate-800/20 border border-bank-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-bank-600 dark:text-bank-400 uppercase tracking-wide mb-1">
          <Target className="w-4 h-4" />
          Mains Benchmark Target
        </div>
        <div className="text-lg font-bold text-slate-900 dark:text-white">
          {pyqData.overall_pattern_and_shift_evolution?.ideal_target_score}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {pyqData.overall_pattern_and_shift_evolution?.historical_trend}
        </p>
      </div>

      {/* Topic Weightage Visual Breakdown */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-bank-600" />
          Topic Weightage Share Across Mains Shifts
        </h3>
        <div className="space-y-3">
          {pyqData.topic_weightage_distribution?.map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {t.topic}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-bank-600 dark:text-bank-400">{t.share_percentage}% Weightage</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {t.difficulty}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-bank-600 rounded-full"
                  style={{ width: `${t.share_percentage * 2.5}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                <strong>Trend: </strong>{t.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Tier Priority Matrix */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-bank-600" />
          The 5-Tier Preparation Priority Matrix
        </h3>
        <div className="space-y-4">
          {pyqData.five_tier_priority_matrix?.map((tier, idx) => {
            let badgeColor = 'bg-bank-100 text-bank-700 dark:bg-bank-950/60 dark:text-bank-300 border-bank-200';
            if (idx === 0) badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
            if (idx === 4) badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';

            return (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${badgeColor}`}>
                    {tier.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {tier.description}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                    Constituent Syllabus Areas:
                  </div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {tier.topics?.map((topicItem, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5">
                        <span className="text-bank-600 font-bold">•</span>
                        <span>{topicItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-white">Exam Strategy: </strong>{tier.preparation_strategy}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Common Examiner Traps */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          Top Recurring Examiner Traps (PYQ Analysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pyqData.common_exam_traps?.map((trap, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-rose-50/30 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
              <div className="font-bold text-xs text-rose-900 dark:text-rose-300">
                {trap.trap_name}
              </div>
              <div className="text-xs text-rose-800 dark:text-rose-400">
                <strong>Examiner Trick: </strong>{trap.examiner_trick}
              </div>
              <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <strong>Correct Principle: </strong>{trap.correct_principle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
