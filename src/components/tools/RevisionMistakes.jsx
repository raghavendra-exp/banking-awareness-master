// src/components/tools/RevisionMistakes.jsx
import React, { useState, useEffect } from 'react';
import { AlertOctagon, CheckCircle2, Trash2, Filter, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function RevisionMistakes({ lang = 'en' }) {
  const [mistakes, setMistakes] = useState([]);
  const [filterTopic, setFilterTopic] = useState('ALL');
  const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(true);

  useEffect(() => {
    setMistakes(dataManager.getMistakes());
  }, []);

  const handleResolve = (qId) => {
    const updated = dataManager.resolveMistake(qId);
    setMistakes(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your mistakes notebook?')) {
      dataManager.clearMistakes();
      setMistakes([]);
    }
  };

  const filtered = mistakes.filter((m) => {
    const matchesTopic = filterTopic === 'ALL' || m.topic === filterTopic;
    const matchesResolved = showOnlyUnresolved ? !m.resolved : true;
    return matchesTopic && matchesResolved;
  });

  const topics = ['ALL', ...new Set(mistakes.map((m) => m.topic).filter(Boolean))];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 mb-2">
            <AlertOctagon className="w-3.5 h-3.5" />
            Error Analytics & Retention
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'मेरी गलतियों की नोटबुक (Revision Notebook)' : 'My Wrong Answer Notebook'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'अभ्यास और मॉक टेस्ट में गलत हुए प्रश्नों का स्वतः संकलन। परीक्षा से पहले इनका दोबारा अभ्यास करें।'
              : 'Automatically logs every mistake from Practice Arena, Speed Lab, and Mocks for focused zero-penalty revision.'}
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-xl hover:bg-rose-100 transition-all self-start md:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear Notebook
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTopic(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterTopic === t
                  ? 'bg-bank-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyUnresolved}
            onChange={(e) => setShowOnlyUnresolved(e.target.checked)}
            className="rounded text-bank-600 focus:ring-bank-500"
          />
          <span>Show Only Unresolved ({mistakes.filter(m => !m.resolved).length})</span>
        </label>
      </div>

      {/* Mistakes List */}
      <div className="my-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Unresolved Mistakes!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Any questions you answer incorrectly during practice sessions or mock exams will automatically appear here for revision.
            </p>
          </div>
        ) : (
          filtered.map((m, idx) => (
            <div
              key={m.questionId || idx}
              className={`p-5 rounded-2xl border transition-all ${
                m.resolved
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 opacity-60'
                  : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300">
                    {m.topic}
                  </span>
                  <span className="text-xs text-slate-400">
                    Reviewed {m.reviewCount || 1} time(s)
                  </span>
                </div>
                {!m.resolved && (
                  <button
                    onClick={() => handleResolve(m.questionId)}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark Resolved
                  </button>
                )}
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2 leading-relaxed">
                {m.question}
              </h4>

              {/* Options breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                <div className="p-3 rounded-xl bg-rose-100/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs">
                  <div className="font-bold text-rose-800 dark:text-rose-300 mb-1">Your Incorrect Selection:</div>
                  <div className="text-rose-900 dark:text-rose-200 font-semibold">
                    {m.options ? m.options[m.chosen_option] : 'Option ' + (m.chosen_option + 1)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-100/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Verified Correct Answer:</div>
                  <div className="text-emerald-900 dark:text-emerald-200 font-semibold">
                    {m.options ? m.options[m.correct_option] : 'Option ' + (m.correct_option + 1)}
                  </div>
                </div>
              </div>

              {/* Explanation & Shortcut */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <strong>Explanation: </strong>{m.explanation}
              </p>

              {m.exam_shortcut && (
                <div className="mt-2 text-xs font-semibold text-bank-600 dark:text-bank-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Takeaway: {m.exam_shortcut}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
