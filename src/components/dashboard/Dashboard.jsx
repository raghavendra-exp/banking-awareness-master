// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Flame, Award, Sliders, Zap, BookOpen, AlertOctagon, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function Dashboard({ onNavigate, lang = 'en' }) {
  const [progress, setProgress] = useState(dataManager.getProgress());
  const [streak, setStreak] = useState(dataManager.getStreak());
  const [mistakes, setMistakes] = useState(dataManager.getMistakes());
  const [capsuleDone, setCapsuleDone] = useState(dataManager.isDailyCapsuleCompleted());

  useEffect(() => {
    setProgress(dataManager.getProgress());
    setStreak(dataManager.getStreak());
    setMistakes(dataManager.getMistakes());
    setCapsuleDone(dataManager.isDailyCapsuleCompleted());
  }, []);

  const readiness = progress.readinessScore || 45;

  let readinessLevel = { label: 'Developing', color: 'text-amber-500', bar: 'bg-amber-500' };
  if (readiness >= 75) {
    readinessLevel = { label: 'Exam Ready (35+ Marks)', color: 'text-emerald-500', bar: 'bg-emerald-500' };
  } else if (readiness >= 55) {
    readinessLevel = { label: 'Competitive', color: 'text-bank-600', bar: 'bg-bank-600' };
  }

  const rates = [
    { label: 'Repo Rate', value: '6.50%' },
    { label: 'SDF', value: '6.25%' },
    { label: 'MSF', value: '6.75%' },
    { label: 'Bank Rate', value: '6.75%' },
    { label: 'CRR', value: '4.50%' },
    { label: 'SLR', value: '18.00%' }
  ];

  return (
    <div className="space-y-6">
      {/* Live Benchmark Rates Ticker Bar */}
      <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-bank-900 to-indigo-950 text-white text-xs overflow-x-auto scrollbar-none shadow-sm">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-bank-300 whitespace-nowrap shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-bank-400" />
          <span>Active RBI Rates:</span>
        </div>
        <div className="flex items-center gap-6 whitespace-nowrap text-xs">
          {rates.map((r, i) => (
            <div key={i} className="flex items-center gap-1.5 font-mono">
              <span className="text-slate-400">{r.label}:</span>
              <span className="font-bold text-emerald-400">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Welcome & Readiness Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Readiness Gauge */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                SBI Clerk • IBPS Clerk/CSA • RRB OA Mains
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-800/40">
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                <span>{streak} Day Streak</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Banking Awareness Master
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Target 35+ Marks out of 50 with high-yield concepts, interactive visualizers, and authentic PYQ drills.
            </p>
          </div>

          {/* Readiness Meter */}
          <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Banking Readiness Score:
              </div>
              <div className="text-sm font-black font-mono text-bank-600 dark:text-bank-400">
                {readiness} / 100 ({readinessLevel.label})
              </div>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${readinessLevel.bar}`}
                style={{ width: `${readiness}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>0 (Beginner)</span>
              <span>50 (Competitive)</span>
              <span>100 (Exam Topper)</span>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('practice')}
              className="px-5 py-3 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Practice Arena</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('visualizers')}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-bank-600" />
              <span>Interactive Visualizers</span>
            </button>
            <button
              onClick={() => onNavigate('mocks')}
              className="px-5 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Take Full Mock</span>
            </button>
          </div>
        </div>

        {/* Daily Capsule & Streak Widget */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/50 to-bank-50/30 dark:from-slate-900 dark:to-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-bank-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-bank-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Today’s Banking Capsule
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              5 News + 5 Facts + 3 MCQs + 3 Terms to complete your daily routine in under 7 minutes.
            </p>

            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              capsuleDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
            }`}>
              <span>{capsuleDone ? 'Completed for Today! 🎉' : 'Pending for Today ⏳'}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('daily_capsule')}
            className="w-full mt-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Open Today’s Capsule</span>
            <ArrowRight className="w-4 h-4 text-bank-600" />
          </button>
        </div>
      </div>

      {/* Topic Mastery Heatmap */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-bank-600" />
          <span>Topic Mastery Heatmap (Mains Syllabus Coverage)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(progress.topicsMastery || {}).map(([topic, val]) => (
            <div key={topic} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 dark:text-white line-clamp-1">{topic}</span>
                <span className="font-mono font-bold text-bank-600 dark:text-bank-400">{val}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-bank-600 rounded-full transition-all duration-300"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('confusion_buster')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-left transition-all group"
        >
          <div className="text-amber-500 font-bold text-xs uppercase mb-1">High-Frequency</div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600">Confusion Buster</div>
          <div className="text-xs text-slate-500 mt-1">15+ Pairs (Nostro vs Vostro, Repo vs SDF)</div>
        </button>

        <button
          onClick={() => onNavigate('speed_lab')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-400 text-left transition-all group"
        >
          <div className="text-orange-500 font-bold text-xs uppercase mb-1">Velocity Training</div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-600">Speed Lab</div>
          <div className="text-xs text-slate-500 mt-1">10s & 15s lightning drills with combo multipliers</div>
        </button>

        <button
          onClick={() => onNavigate('mistakes')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 text-left transition-all group"
        >
          <div className="text-rose-500 font-bold text-xs uppercase mb-1">Zero Penalty</div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-600">Wrong Answer Notebook</div>
          <div className="text-xs text-slate-500 mt-1">{mistakes.length} errors logged for revision</div>
        </button>

        <button
          onClick={() => onNavigate('pyq_analytics')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-left transition-all group"
        >
          <div className="text-indigo-500 font-bold text-xs uppercase mb-1">Exam Intelligence</div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">PYQ Shift Analytics</div>
          <div className="text-xs text-slate-500 mt-1">5-Tier Priority Matrix & Topic Weights</div>
        </button>
      </div>
    </div>
  );
}
