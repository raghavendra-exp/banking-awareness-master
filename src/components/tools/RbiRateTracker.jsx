// src/components/tools/RbiRateTracker.jsx
import React from 'react';
import { Activity, ShieldCheck, AlertCircle, Percent, Calendar, FileText } from 'lucide-react';

export default function RbiRateTracker({ lang = 'en' }) {
  const rates = [
    { name: 'Policy Repo Rate', rate: '6.50%', tag: 'LAF Anchor', note: 'RBI injects liquidity to scheduled banks against G-Secs', highlight: true },
    { name: 'Standing Deposit Facility (SDF)', rate: '6.25%', tag: 'LAF Floor', note: 'Uncollateralised liquidity absorption (Repo - 25 bps)', highlight: false },
    { name: 'Marginal Standing Facility (MSF)', rate: '6.75%', tag: 'LAF Ceiling', note: 'Penal overnight borrowing by dipping into SLR (Repo + 25 bps)', highlight: false },
    { name: 'Bank Rate', rate: '6.75%', tag: 'Penal Benchmark', note: 'Rediscounting commercial paper; penal rate on CRR/SLR deficit', highlight: false },
    { name: 'Fixed Reverse Repo Rate', rate: '3.35%', tag: 'Legacy Tool', note: 'Collateralised absorption tool (now superseded by SDF)', highlight: false },
    { name: 'Cash Reserve Ratio (CRR)', rate: '4.50%', tag: 'NDTL Cash Balances', note: 'Held in cash with RBI; earns ZERO interest (Section 42 RBI Act)', highlight: true },
    { name: 'Statutory Liquidity Ratio (SLR)', rate: '18.00%', tag: 'Liquid Reserves', note: 'Held by banks in Cash, Gold or G-Secs (Section 24 BR Act, max 40%)', highlight: true }
  ];

  const mpcDetails = {
    members: '6 Members (3 RBI ex-officio + 3 Government appointed external experts)',
    quorum: '4 Members (at least one being Governor or Deputy Governor)',
    target: '4.00% CPI Headline Inflation (±2.00% tolerance band: 2% to 6%)',
    failure: 'Failure triggered if average inflation exceeds 6% or falls below 2% for 3 consecutive quarters',
    minutes: 'Minutes of proceedings released on the 14th day following the MPC meeting'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
            <Activity className="w-3.5 h-3.5" />
            Official Verified Benchmarks
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'RBI आधिकारिक नीति दरें और MPC ट्रैकर' : 'RBI Policy Rates & Monetary Policy Tracker'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'वर्तमान रेपो दर, SDF, MSF, बैंक दर, CRR और SLR के आधिकारिक आंकड़े।'
              : 'Current verified policy rates, LAF corridor spreads, reserve requirements, and statutory MPC provisions.'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <Calendar className="w-4 h-4 text-bank-600" />
          <span>Status: Verified Active Cycle</span>
        </div>
      </div>

      {/* Live Policy Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {rates.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all ${
              item.highlight
                ? 'border-bank-500 bg-bank-50/40 dark:bg-bank-950/30 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                {item.tag}
              </span>
              <Percent className="w-4 h-4 text-bank-600 dark:text-bank-400 opacity-60" />
            </div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {item.name}
            </div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white my-1">
              {item.rate}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      {/* MPC Statutory Details Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-bank-600" />
          Monetary Policy Committee (MPC) Statutory Blueprint (Section 45ZB)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-slate-700 dark:text-slate-300">Composition & Quorum</div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{mpcDetails.members}</p>
            <div className="font-semibold text-bank-600 mt-1">Quorum: {mpcDetails.quorum}</div>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-slate-700 dark:text-slate-300">Inflation Target Band</div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{mpcDetails.target}</p>
            <div className="font-semibold text-rose-600 mt-1">Failure: {mpcDetails.failure}</div>
          </div>
        </div>
      </div>

      {/* Exam Fact Alert */}
      <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Exam Alert: </span>
          The RBI Governor chairs the MPC ex-officio and has a casting vote in case of a tie. The external members hold office for 4 years and are NOT eligible for re-appointment.
        </div>
      </div>
    </div>
  );
}
