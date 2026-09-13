// src/components/visualizers/BaselCapitalPyramid.jsx
import React, { useState } from 'react';
import { Layers, ShieldCheck, AlertOctagon, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function BaselCapitalPyramid({ lang = 'en' }) {
  const [tier1Capital, setTier1Capital] = useState(8500); // in ₹ Crore
  const [tier2Capital, setTier2Capital] = useState(2500); // in ₹ Crore
  const [rwa, setRwa] = useState(90000); // in ₹ Crore

  const totalCapital = tier1Capital + tier2Capital;
  const crar = ((totalCapital / rwa) * 100).toFixed(2);
  const tier1Ratio = ((tier1Capital / rwa) * 100).toFixed(2);

  // Determine PCA Trigger Status
  let pcaStatus = {
    level: 'SAFE',
    badge: 'bg-emerald-500 text-white',
    title: 'Comfortably Capitalised (No PCA Action)',
    description: 'Bank comfortably complies with RBI Basel III regulatory capital and CCB buffer requirements.'
  };

  if (crar < 9.00) {
    pcaStatus = {
      level: 'RISK THRESHOLD 2',
      badge: 'bg-rose-600 text-white animate-pulse',
      title: 'Severe PCA Trigger: Risk Threshold 2',
      description: 'Mandatory curbs on branch expansion, domestic expansion, and aggressive capital infusion mandated.'
    };
  } else if (crar < 10.25) {
    pcaStatus = {
      level: 'RISK THRESHOLD 1',
      badge: 'bg-amber-500 text-white',
      title: 'Caution: Below Capital Conservation Buffer Target',
      description: 'Restrictions on dividend payouts and profit remittances to overseas parent entities.'
    };
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 mb-2">
          <Layers className="w-3.5 h-3.5" />
          Basel III Capital Adequacy
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'hi' ? 'बासेल III पूंजी पिरामिड और CRAR विश्लेषक' : 'Basel III Capital Stack Pyramid & CRAR Analyzer'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'hi'
            ? 'देखें कि टियर 1, टियर 2 और पूंजी संरक्षण बफर (CCB) मिलकर बैंक को दिवालिया होने से कैसे बचाते हैं।'
            : 'Explore the loss-absorption hierarchy of CET1, Additional Tier 1, Tier 2, and test live bank solvency against RBI PCA thresholds.'}
        </p>
      </div>

      {/* Interactive Capital Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <span>Tier 1 Capital (Core):</span>
            <span className="font-mono text-bank-600">₹{tier1Capital.toLocaleString('en-IN')} Cr</span>
          </div>
          <input
            type="range"
            min="3000"
            max="18000"
            step="250"
            value={tier1Capital}
            onChange={(e) => setTier1Capital(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-bank-600"
          />
          <div className="text-[10px] text-slate-400 mt-1">CET1 + Perpetual AT1 bonds</div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <span>Tier 2 Capital (Supplementary):</span>
            <span className="font-mono text-indigo-600">₹{tier2Capital.toLocaleString('en-IN')} Cr</span>
          </div>
          <input
            type="range"
            min="500"
            max="6000"
            step="100"
            value={tier2Capital}
            onChange={(e) => setTier2Capital(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="text-[10px] text-slate-400 mt-1">Subordinated debt & general provisions</div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <span>Risk-Weighted Assets (RWA):</span>
            <span className="font-mono text-rose-600">₹{rwa.toLocaleString('en-IN')} Cr</span>
          </div>
          <input
            type="range"
            min="40000"
            max="150000"
            step="1000"
            value={rwa}
            onChange={(e) => setRwa(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
          />
          <div className="text-[10px] text-slate-400 mt-1">Risk-adjusted loan portfolio</div>
        </div>
      </div>

      {/* Live CRAR Metric Display */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase mb-2 ${pcaStatus.badge}`}>
              {pcaStatus.level}
            </span>
            <h3 className="text-xl font-bold">{pcaStatus.title}</h3>
            <p className="text-xs text-slate-300 mt-1">{pcaStatus.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-semibold">Bank CRAR / CAR</div>
              <div className="text-4xl font-extrabold font-mono text-emerald-400">{crar}%</div>
              <div className="text-[11px] text-slate-300">Min 11.5% with CCB</div>
            </div>
            <div className="text-right pl-6 border-l border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-semibold">Tier 1 Ratio</div>
              <div className="text-2xl font-bold font-mono text-indigo-300">{tier1Ratio}%</div>
              <div className="text-[11px] text-slate-300">Min 7.0% (RBI)</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Visual Capital Pyramid Stack */}
      <div className="max-w-2xl mx-auto space-y-2 mb-8 text-center">
        {/* Top: CET 1 */}
        <div className="p-4 bg-emerald-600 text-white rounded-t-2xl shadow-sm border border-emerald-500 mx-16">
          <div className="text-xs font-bold uppercase tracking-wider">Common Equity Tier 1 (CET1)</div>
          <div className="text-lg font-black font-mono">5.50% Min of RWA</div>
          <div className="text-[11px] text-emerald-100 mt-0.5">Paid-up equity shares, statutory reserves, retained earnings</div>
        </div>

        {/* Level 2: CCB */}
        <div className="p-3 bg-emerald-500 text-white shadow-sm border border-emerald-400 mx-10">
          <div className="text-xs font-bold uppercase tracking-wider">Capital Conservation Buffer (CCB)</div>
          <div className="text-base font-black font-mono">2.50% in CET1 Capital</div>
          <div className="text-[11px] text-emerald-50">Builds capital cushion during normal times to absorb distress</div>
        </div>

        {/* Level 3: AT1 */}
        <div className="p-3 bg-bank-600 text-white shadow-sm border border-bank-500 mx-5">
          <div className="text-xs font-bold uppercase tracking-wider">Additional Tier 1 (AT1)</div>
          <div className="text-base font-black font-mono">Up to 1.50% of RWA</div>
          <div className="text-[11px] text-bank-100">Perpetual Non-Cumulative Preference Shares & PDI</div>
        </div>

        {/* Base: Tier 2 */}
        <div className="p-4 bg-indigo-700 text-white rounded-b-2xl shadow-sm border border-indigo-600">
          <div className="text-xs font-bold uppercase tracking-wider">Tier 2 Capital (Gone-Concern Capital)</div>
          <div className="text-base font-black font-mono">Up to 2.00% of RWA</div>
          <div className="text-[11px] text-indigo-100">Subordinated debt bonds, revaluation reserves, standard asset provisions</div>
        </div>
      </div>

      {/* RBI vs Basel III Global Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
            <tr>
              <th className="p-3">Capital Parameter</th>
              <th className="p-3">Global Basel III Norm</th>
              <th className="p-3">RBI Norm in India</th>
              <th className="p-3">Key Exam Distinction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
            <tr>
              <td className="p-3 font-semibold text-slate-800 dark:text-white">Minimum CRAR (Total Capital)</td>
              <td className="p-3 font-mono">8.00%</td>
              <td className="p-3 font-mono font-bold text-bank-600">9.00% (12% for PSBs)</td>
              <td className="p-3">India mandates 100 bps higher safety cushion</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-800 dark:text-white">Common Equity Tier 1 (CET1)</td>
              <td className="p-3 font-mono">4.50%</td>
              <td className="p-3 font-mono font-bold text-bank-600">5.50%</td>
              <td className="p-3">RBI requires 5.5% purest equity capital</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-800 dark:text-white">Capital Conservation Buffer (CCB)</td>
              <td className="p-3 font-mono">2.50%</td>
              <td className="p-3 font-mono font-bold text-bank-600">2.50%</td>
              <td className="p-3">Total CRAR including CCB = 11.50%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
