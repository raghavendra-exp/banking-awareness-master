// src/components/tools/GovernmentSchemesExplorer.jsx
import React, { useState, useEffect } from 'react';
import { Award, Search, ShieldCheck, AlertTriangle, Building2, Calendar, UserCheck, CheckCircle2 } from 'lucide-react';

export default function GovernmentSchemesExplorer({ lang = 'en' }) {
  const [schemes, setSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data/government-schemes.json')
      .then(res => res.json())
      .then(data => {
        setSchemes(data.schemes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading schemes:', err);
        setLoading(false);
      });
  }, []);

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.nodal_ministry && s.nodal_ministry.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (s.exam_trap && s.exam_trap.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory === 'social') return matchesSearch && ['pmjjby', 'pmsby', 'apy'].includes(s.id);
    if (selectedCategory === 'credit') return matchesSearch && ['pmjdy', 'pmmy', 'stand_up_india', 'pm_svanidhi'].includes(s.id);
    if (selectedCategory === 'agri') return matchesSearch && ['kcc', 'pm_kisan'].includes(s.id);
    if (selectedCategory === 'savings') return matchesSearch && ['ssy', 'mssc'].includes(s.id);
    return matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
            <Award className="w-3.5 h-3.5" />
            Central Government Initiatives
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'सरकारी योजनाएं और वित्तीय समावेशन' : 'Government Schemes & Social Security Explorer'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'PMJDY, मुद्रा, PMJJBY, PMSBY, अटल पेंशन योजना और KCC की पात्रता, सीमाएं और परीक्षा ट्रैप्स।'
              : 'Detailed breakdown of PMJDY, MUDRA, APY, PMJJBY, PMSBY, KCC, and SSY with verified limits and eligibility criteria.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scheme name, ministry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bank-500 w-60"
          />
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'all' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          All Schemes ({schemes.length})
        </button>
        <button
          onClick={() => setSelectedCategory('social')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'social' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Social Security & Insurance (PMJJBY/PMSBY/APY)
        </button>
        <button
          onClick={() => setSelectedCategory('credit')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'credit' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Financial Inclusion & Credit (PMJDY/MUDRA/SVANidhi)
        </button>
        <button
          onClick={() => setSelectedCategory('agri')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'agri' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Agriculture & Farmers (KCC/PM-KISAN)
        </button>
        <button
          onClick={() => setSelectedCategory('savings')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'savings' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Women & Small Savings (SSY/MSSC)
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filteredSchemes.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {s.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300 shrink-0">
                  {s.launch_date}
                </span>
              </div>

              {s.slogan && (
                <div className="text-xs italic text-slate-500 dark:text-slate-400 mb-3">
                  "{s.slogan}"
                </div>
              )}

              {/* Ministry & Limits details */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 my-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-bank-600 shrink-0" />
                  <span><strong>Ministry:</strong> {s.nodal_ministry || s.nodal_agency || s.nodal_department}</span>
                </div>

                {s.entry_age && (
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-bank-600 shrink-0" />
                    <span><strong>Entry Age:</strong> {s.entry_age}</span>
                  </div>
                )}

                {s.premium && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Premium:</strong> {s.premium}</span>
                  </div>
                )}

                {s.risk_coverage && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span><strong>Coverage:</strong> {s.risk_coverage}</span>
                  </div>
                )}

                {s.benefits && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                    {s.benefits.overdraft_facility && <div>• Overdraft: {s.benefits.overdraft_facility} (Age: {s.benefits.overdraft_age_limit})</div>}
                    {s.benefits.accidental_insurance && <div>• Accident Cover: {s.benefits.accidental_insurance}</div>}
                    {s.benefits.accidental_death && <div>• Accidental Death: {s.benefits.accidental_death}</div>}
                  </div>
                )}

                {s.categories && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                    <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">MUDRA Tiers:</div>
                    {s.categories.map((c, i) => (
                      <div key={i}>• <strong>{c.category}:</strong> {c.loan_amount}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Exam Trap Alert Footer */}
            {s.exam_trap && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2 mt-4">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exam Trap: </span>
                  {s.exam_trap}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
