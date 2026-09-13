// src/components/visualizers/NpaLifecycleVisualizer.jsx
import React, { useState } from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2, ChevronRight, Scale, Briefcase } from 'lucide-react';

export default function NpaLifecycleVisualizer({ lang = 'en' }) {
  const [currentDay, setCurrentDay] = useState(45);
  const [selectedPathway, setSelectedPathway] = useState('sarfaesi');

  // Determine loan stage based on currentDay
  let stage = {
    code: 'STANDARD',
    title: 'Standard Asset (मानक संपत्ति)',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    borderColor: 'border-emerald-500',
    provisionSecured: '0.40%',
    provisionUnsecured: '0.40%',
    status: 'Healthy Asset',
    description: 'Borrower makes repayments on time. Account shows zero signs of distress.'
  };

  if (currentDay >= 1 && currentDay <= 30) {
    stage = {
      code: 'SMA-0',
      title: 'Special Mention Account 0 (SMA-0)',
      color: 'bg-yellow-400',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      borderColor: 'border-yellow-400',
      provisionSecured: '0.40%',
      provisionUnsecured: '0.40%',
      status: 'Early Warning Signal',
      description: 'Principal or interest payment overdue for 1 to 30 days. Monitored internally by branch credit officers.'
    };
  } else if (currentDay >= 31 && currentDay <= 60) {
    stage = {
      code: 'SMA-1',
      title: 'Special Mention Account 1 (SMA-1)',
      color: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-500',
      provisionSecured: '0.40%',
      provisionUnsecured: '0.40%',
      status: 'Stressed Asset',
      description: 'Principal or interest overdue for 31 to 60 days. Formal warning letters and reminder notices dispatched.'
    };
  } else if (currentDay >= 61 && currentDay <= 90) {
    stage = {
      code: 'SMA-2',
      title: 'Special Mention Account 2 (SMA-2)',
      color: 'bg-orange-500',
      textColor: 'text-orange-700 dark:text-orange-400',
      borderColor: 'border-orange-500',
      provisionSecured: '0.40%',
      provisionUnsecured: '0.40%',
      status: 'Severe Risk of Default',
      description: 'Principal or interest overdue for 61 to 90 days. Mandatory reporting to RBI Central Repository of Information on Large Credits (CRILC) for exposures >= ₹5 Crore.'
    };
  } else if (currentDay >= 91 && currentDay <= 455) {
    stage = {
      code: 'SUBSTANDARD',
      title: 'Substandard NPA (अवमानक संपत्ति)',
      color: 'bg-rose-500',
      textColor: 'text-rose-700 dark:text-rose-400',
      borderColor: 'border-rose-500',
      provisionSecured: '15.00%',
      provisionUnsecured: '25.00%',
      status: 'Classified Non-Performing Asset (NPA)',
      description: 'Account remained an NPA for a period less than or equal to 12 months. Bank stops recognizing interest income on accrual basis (cash basis only).'
    };
  } else {
    stage = {
      code: 'DOUBTFUL',
      title: 'Doubtful Asset (संदिग्ध संपत्ति - D1)',
      color: 'bg-red-700',
      textColor: 'text-red-700 dark:text-red-400',
      borderColor: 'border-red-700',
      provisionSecured: '25.00%',
      provisionUnsecured: '100.00%',
      status: 'Prolonged Bad Debt',
      description: 'Asset has remained in substandard category for > 12 months. Recovery highly questionable; aggressive enforcement initiated.'
    };
  }

  const recoveryPathways = {
    sarfaesi: {
      name: 'SARFAESI Act, 2002',
      authority: 'Securitisation & Asset Reconstruction',
      timeline: 'Demand Notice 60 Days -> Possession -> DRT Appeal 45 Days',
      rule: 'Applicable without court intervention. Agricultural land is strictly EXEMPTED.',
      keyFact: 'Borrower can appeal before Debt Recovery Tribunal (DRT) within 45 days of possession.'
    },
    ibc: {
      name: 'IBC 2016 (Corporate Insolvency)',
      authority: 'National Company Law Tribunal (NCLT) / IBBI',
      timeline: '180 Days + 90 Days Extension (Max 330 Days Outer Cap)',
      rule: 'Committee of Creditors (CoC) requires 66% majority vote for resolution approval.',
      keyFact: 'Mandatory resolution cap of 330 days including all court litigation.'
    },
    narcl: {
      name: 'NARCL (Bad Bank)',
      authority: 'National Asset Reconstruction Company Limited',
      timeline: 'Consolidation of stressed loans >= ₹500 Crore',
      rule: 'Structure: 15% upfront cash + 85% Security Receipts (SRs) backed by GoI guarantee.',
      keyFact: 'India Debt Resolution Company Ltd (IDRCL) acts as the operational manager.'
    },
    lok_adalat: {
      name: 'Lok Adalats',
      authority: 'National Legal Services Authority (NALSA)',
      timeline: 'Quick compromise settlement for smaller debt',
      rule: 'Monetary limit: Stressed loan disputes up to ₹20 Lakh (as revised).',
      keyFact: 'No court fees; award has the legal force of a decree of a Civil Court.'
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          Stressed Asset Master
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'hi' ? 'NPA जीवन चक्र और संकटग्रस्त परिसंपत्ति समयरेखा' : 'NPA Lifecycle & Stressed Assets Timeline'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'hi'
            ? 'दिन 0 से दिन 450+ तक देखें कि कैसे एक ऋण SMA-0, SMA-1, SMA-2, अवमानक और संदिग्ध NPA में बदलता है।'
            : 'Slide through Day 0 to Day 450+ to witness the exact regulatory transition from Standard to SMA-0, 1, 2 and NPA classifications.'}
        </p>
      </div>

      {/* Timeline Slider */}
      <div className="my-8 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-bank-600" />
            Overdue Days Since Due Date:
          </label>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {currentDay === 0 ? 'Day 0 (Paid on time)' : `Day ${currentDay} Overdue`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="1"
          value={currentDay}
          onChange={(e) => setCurrentDay(parseInt(e.target.value))}
          className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>Day 0 (Standard)</span>
          <span>Day 30 (SMA-0)</span>
          <span>Day 60 (SMA-1)</span>
          <span className="font-bold text-rose-500">Day 90 (NPA Trigger)</span>
          <span>Day 455 (Doubtful D1)</span>
        </div>
      </div>

      {/* Live Stage Classification Card */}
      <div className={`p-6 rounded-2xl border-2 ${stage.borderColor} bg-white dark:bg-slate-800/80 shadow-sm mb-8 transition-all duration-200`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white ${stage.color} mb-2`}>
              {stage.code}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {stage.title}
            </h3>
            <div className="text-sm font-medium text-slate-500 mt-0.5">{stage.status}</div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center border border-slate-200 dark:border-slate-800 min-w-[120px]">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Secured Provision</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                {stage.provisionSecured}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-center border border-slate-200 dark:border-slate-800 min-w-[120px]">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Unsecured Provision</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                {stage.provisionUnsecured}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
          {stage.description}
        </p>
      </div>

      {/* Special Rule: Agricultural Loans Alert */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
          <span className="font-bold">CRITICAL EXAM DISTINCTION (Agricultural NPAs): </span>
          The 90-day overdue rule does NOT apply to agricultural crop loans! Under RBI Master Circular, agricultural loans turn into an NPA when:
          <span className="font-semibold text-amber-950 dark:text-amber-200"> (1) Overdue for 2 Crop Seasons for Short Duration Crops (e.g. Paddy, Wheat)</span>, or
          <span className="font-semibold text-amber-950 dark:text-amber-200"> (2) Overdue for 1 Crop Season for Long Duration Crops (e.g. Sugarcane)</span>.
        </div>
      </div>

      {/* Recovery Pathways Switcher */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-bank-600" />
          {lang === 'hi' ? 'एनपीए वसूली के वैधानिक मार्ग (Recovery Frameworks)' : 'NPA Recovery & Resolution Pathways'}
        </h4>

        {/* Pathway Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {Object.keys(recoveryPathways).map((key) => {
            const path = recoveryPathways[key];
            const isSelected = selectedPathway === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPathway(key)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isSelected
                    ? 'bg-bank-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {path.name}
              </button>
            );
          })}
        </div>

        {/* Selected Pathway Details */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-base text-slate-900 dark:text-white">
              {recoveryPathways[selectedPathway].name}
            </div>
            <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-semibold">
              {recoveryPathways[selectedPathway].authority}
            </span>
          </div>
          <div className="text-xs text-bank-600 dark:text-bank-400 font-semibold mb-2">
            ⏱ Timeline: {recoveryPathways[selectedPathway].timeline}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            📌 Rule: {recoveryPathways[selectedPathway].rule}
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4" />
            Key Exam Fact: {recoveryPathways[selectedPathway].keyFact}
          </div>
        </div>
      </div>
    </div>
  );
}
