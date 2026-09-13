// src/components/tools/BookmarksViewer.jsx
import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function BookmarksViewer({ lang = 'en' }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(dataManager.getBookmarks());
  }, []);

  const handleRemove = (question) => {
    dataManager.toggleBookmark(question);
    setBookmarks(dataManager.getBookmarks());
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            Saved Revision Deck
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'सहेजे गए प्रश्न (Bookmarked Questions)' : 'Bookmarked Questions for Last 24-Hour Revision'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'परीक्षा से पूर्व त्वरित पुनरीक्षण के लिए आपके द्वारा सहेजे गए सभी उच्च-प्राथमिकता वाले प्रश्न।'
              : 'All high-priority questions you flagged during practice or exam simulations for quick last-minute review.'}
          </p>
        </div>

        <div className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl self-start md:self-auto">
          Total Saved: {bookmarks.length}
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="my-6 space-y-4">
        {bookmarks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
            <Bookmark className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Bookmarked Questions Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Click the bookmark icon on any question in the Practice Arena or Mock Tests to save it for quick revision.
            </p>
          </div>
        ) : (
          bookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300">
                    {b.topic}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {b.exam_tag}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(b)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-relaxed">
                {b.question}
              </h4>

              {/* Options */}
              {b.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                  {b.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl text-xs font-medium border ${
                        oIdx === b.correct_option
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {/* Explanation */}
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <strong>Explanation: </strong>{b.explanation}
              </div>

              {b.exam_shortcut && (
                <div className="text-xs font-semibold text-bank-600 dark:text-bank-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Takeaway: {b.exam_shortcut}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
