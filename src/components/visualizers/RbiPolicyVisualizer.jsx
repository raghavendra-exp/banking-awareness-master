// src/components/visualizers/RbiPolicyVisualizer.jsx
import React, { useState } from 'react';
import { Sliders, TrendingUp, TrendingDown, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RbiPolicyVisualizer({ lang = 'en' }) {
  const [repoRate, setRepoRate] = useState(6.50);

  // Derived rates based on RBI Monetary Policy Framework
  const sdfRate = (repoRate - 0.25).toFixed(2);
  const msfRate = (repoRate + 0.25).toFixed(2);
  const bankRate = msfRate; // Aligned with MSF automatically
  const corridorSpread = (msfRate - sdfRate).toFixed(2);

  // Approximate retail loan calculations (30-year home loan of ₹50 Lakh)
  const homeLoanRate = repoRate + 2.50; // Typical bank spread
  const calculateEMI = (principal, annualRatePercent, tenureYears) => {
    const r = (annualRatePercent / 12) / 100;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };
  const homeLoanEmi = calculateEMI(5000000, homeLoanRate, 20);

  // Economic transmission simulation metrics
  const isHike = repoRate > 6.50;
  const isCut = repoRate < 6.50;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Interactive Simulation
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'RBI मौद्रिक नीति और LAF कॉरिडोर सिम्युलेटर' : 'RBI Monetary Policy & LAF Corridor Simulator'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'रेपो दर बदलें और देखें कि बैंकिंग प्रणाली, ऋण EMI और मुद्रास्फीति पर क्या प्रभाव पड़ता है।'
              : 'Adjust the Policy Repo Rate slider to observe live monetary transmission across LAF corridor and retail EMIs.'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700">
          <div className="text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">LAF Corridor Width</div>
            <div className="text-lg font-bold text-bank-600 dark:text-bank-400 font-mono">50 bps (0.50%)</div>
          </div>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="my-8 p-6 bg-gradient-to-r from-bank-50/50 to-indigo-50/30 dark:from-slate-800/40 dark:to-slate-800/20 rounded-2xl border border-bank-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Policy Repo Rate (LAF):
          </label>
          <span className="text-2xl font-extrabold text-bank-600 dark:text-bank-400 font-mono">
            {repoRate.toFixed(2)}%
          </span>
        </div>
        <input
          type="range"
          min="4.00"
          max="8.50"
          step="0.25"
          value={repoRate}
          onChange={(e) => setRepoRate(parseFloat(e.target.value))}
          className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-bank-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
          <span>4.00% (Ultra-Accommodative)</span>
          <span className="font-semibold text-bank-600 dark:text-bank-400">6.50% (Current Rate)</span>
          <span>8.50% (Severe Tightening)</span>
        </div>
      </div>

      {/* LAF Corridor Visual Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* MSF / Bank Rate (Ceiling) */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-bl-lg uppercase">
            Ceiling (ऊपरी सीमा)
          </div>
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
            MSF Rate / Bank Rate
          </div>
          <div className="text-3xl font-extrabold text-amber-900 dark:text-amber-200 font-mono">
            {msfRate}%
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400/80 mt-2">
            Repo + 25 bps. Scheduled banks borrow emergency overnight funds dipping into SLR.
          </div>
        </div>

        {/* Policy Repo Rate (Anchor) */}
        <div className="p-4 rounded-xl bg-bank-50 dark:bg-bank-950/40 border-2 border-bank-500 dark:border-bank-500 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-bank-600 text-white text-[10px] font-bold rounded-bl-lg uppercase">
            Anchor Rate (मुख्य दर)
          </div>
          <div className="text-xs font-semibold text-bank-700 dark:text-bank-400 uppercase tracking-wider mb-1">
            Policy Repo Rate
          </div>
          <div className="text-3xl font-extrabold text-bank-900 dark:text-white font-mono">
            {repoRate.toFixed(2)}%
          </div>
          <div className="text-xs text-bank-700 dark:text-bank-300 mt-2">
            Fixed rate at which RBI injects short-term liquidity against eligible G-Sec collateral.
          </div>
        </div>

        {/* Standing Deposit Facility (Floor) */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-bl-lg uppercase">
            Floor (निचली सीमा)
          </div>
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Standing Deposit Facility (SDF)
          </div>
          <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
            {sdfRate}%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400/80 mt-2">
            Repo - 25 bps. Collateral-free liquidity absorption (Replaced reverse repo as floor).
          </div>
        </div>
      </div>

      {/* Real-World Economic Impact Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Retail Home Loan Rate (EBLR)</div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white font-mono mt-1">
            {homeLoanRate.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 mt-1">Repo Rate + 2.50% Bank Spread</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Monthly EMI (₹50 Lakh, 20 Yrs)</div>
          <div className="text-2xl font-bold text-bank-600 dark:text-bank-400 font-mono mt-1">
            ₹{homeLoanEmi.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {isHike ? '🔺 EMI increased due to rate hike' : isCut ? '🔻 EMI dropped due to rate cut' : 'Neutral EMI at benchmark 6.50%'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Expected Inflation Trajectory</div>
          <div className="flex items-center gap-2 mt-1">
            {isHike ? (
              <TrendingDown className="w-6 h-6 text-emerald-500" />
            ) : isCut ? (
              <TrendingUp className="w-6 h-6 text-rose-500" />
            ) : (
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">Balanced ~4.5%</span>
            )}
            <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">
              {isHike ? 'Cooling Down' : isCut ? 'Potential Rise' : ''}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Urjit Patel CPI target: 4% (±2%)</div>
        </div>
      </div>

      {/* Step-by-Step Monetary Transmission Chain */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-bank-600 dark:text-bank-400" />
          {lang === 'hi' ? 'मौद्रिक नीति संचरण प्रक्रिया (Monetary Transmission Channel)' : 'Live Monetary Transmission Flow'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-bank-600 mb-1">Step 1: MPC Action</div>
            <p className="text-slate-600 dark:text-slate-400">
              {isHike ? 'Repo rate hiked by MPC to suck out liquidity.' : isCut ? 'Repo rate cut to stimulate credit creation.' : 'Repo rate maintained at steady 6.50%.'}
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-bank-600 mb-1">Step 2: Bank Cost of Funds</div>
            <p className="text-slate-600 dark:text-slate-400">
              Commercial banks instantly adjust their External Benchmark Lending Rate (EBLR).
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-bank-600 mb-1">Step 3: Consumer & Corporate Demand</div>
            <p className="text-slate-600 dark:text-slate-400">
              {isHike ? 'Borrowing becomes expensive; consumer spending & capex slow down.' : 'Borrowing becomes cheaper; investments and retail loans surge.'}
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="font-bold text-bank-600 mb-1">Step 4: Price Stability / GDP</div>
            <p className="text-slate-600 dark:text-slate-400">
              Aggregate demand aligns with target, steering CPI inflation towards 4.0%.
            </p>
          </div>
        </div>
      </div>

      {/* Exam Fact Box */}
      <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Exam Trap Alert: </span>
          The SDF rate is ALWAYS 25 bps below the Repo Rate, and the MSF/Bank Rate is ALWAYS 25 bps above the Repo Rate. The total LAF corridor width is strictly 50 bps (0.50%).
        </div>
      </div>
    </div>
  );
}
