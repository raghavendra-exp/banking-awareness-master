// src/components/common/GlobalSearchModal.jsx
import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Award, Landmark, Sliders, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  const searchableIndex = [
    { title: 'Repo Rate, SDF & MSF', category: 'Visualizer', target: 'visualizers', desc: 'Simulate policy rate changes and LAF corridor transmission' },
    { title: 'NPA Lifecycle & SMA-0/1/2', category: 'Visualizer', target: 'visualizers', desc: 'Stressed asset days overdue and provisioning norms' },
    { title: 'UPI Transaction Flow & UPI Lite', category: 'Visualizer', target: 'visualizers', desc: 'NPCI switch packet routing & offline wallet' },
    { title: 'Basel III Capital Pyramid & CRAR', category: 'Visualizer', target: 'visualizers', desc: 'CET1, Tier 1, Tier 2, CCB buffer, and PCA triggers' },
    { title: 'Nostro vs Vostro vs Loro Accounts', category: 'Tool', target: 'confusion_buster', desc: 'Foreign currency vs Indian rupee inter-bank accounts' },
    { title: 'PMJDY (Jan Dhan Yojana)', category: 'Scheme', target: 'schemes', desc: 'Zero balance, ₹10,000 OD (age 18-65), ₹2 Lakh accident cover' },
    { title: 'PMJJBY & PMSBY Premiums', category: 'Scheme', target: 'schemes', desc: 'PMJJBY ₹436/yr (18-50 age) vs PMSBY ₹20/yr (18-70 age)' },
    { title: 'Pradhan Mantri MUDRA Yojana (PMMY)', category: 'Scheme', target: 'schemes', desc: 'Shishu, Kishore, Tarun, and Tarun Plus up to ₹20 Lakh' },
    { title: 'SIDBI Headquarters & Mandate', category: 'Institution', target: 'institutions', desc: 'Headquarters in Lucknow, UP. Apex MSME DFI' },
    { title: 'IRDAI Headquarters & History', category: 'Institution', target: 'institutions', desc: 'Headquarters in Hyderabad. Malhotra Committee (1994)' },
    { title: 'Deposit Insurance (DICGC)', category: 'Regulation', target: 'learn', desc: '₹5 Lakh per depositor per bank within 90 days' },
    { title: 'Banking Terminology Dictionary', category: 'Tool', target: 'dictionary', desc: '40+ statutory and simple definitions with exam tips' },
    { title: 'Speed Lab Lightning Drills', category: 'Practice', target: 'speed_lab', desc: '10s & 15s rapid-fire drills with combo multipliers' },
    { title: 'Full Exam Mock Simulator', category: 'Mocks', target: 'mocks', desc: 'SBI Clerk, IBPS Clerk, and RRB OA Mains simulations' }
  ];

  const filtered = query.trim() === ''
    ? searchableIndex.slice(0, 6)
    : searchableIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectResult('open_search');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectResult]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-bank-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search any term, scheme, institution, act, or rate (Ctrl + K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching banking topics found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectResult(item.target);
                  onClose();
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-bank-600">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-bank-600 shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with click or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
