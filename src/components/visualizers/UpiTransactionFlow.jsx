// src/components/visualizers/UpiTransactionFlow.jsx
import React, { useState, useEffect } from 'react';
import { Zap, Smartphone, Server, CheckCircle2, Play, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function UpiTransactionFlow({ lang = 'en' }) {
  const [activeMode, setActiveMode] = useState('standard'); // 'standard' | 'lite' | '123pay'
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const standardSteps = [
    { id: 1, title: 'Step 1: Initiation', actor: 'Payer App (PhonePe/GPay)', action: 'User enters Payee UPI ID (VPA) or scans QR code, enters amount ₹1,500.' },
    { id: 2, title: 'Step 2: PSP Sign', actor: 'Remitter PSP Bank', action: 'Payer PSP digitally signs transaction packet and encrypts payload.' },
    { id: 3, title: 'Step 3: NPCI Switch', actor: 'NPCI Central UPI Switch', action: 'Resolves VPA to Beneficiary IFSC & Account Number via central mapper.' },
    { id: 4, title: 'Step 4: Debit Authentication', actor: 'Remitter Bank CBS', action: 'Verifies encrypted UPI PIN and debits ₹1,500 from Payer bank account.' },
    { id: 5, title: 'Step 5: Switch Forward', actor: 'NPCI Switch', action: 'Sends successful debit advice to Beneficiary Bank CBS in real-time.' },
    { id: 6, title: 'Step 6: Credit Execution', actor: 'Beneficiary Bank CBS', action: 'Credits ₹1,500 into Merchant/Payee account.' },
    { id: 7, title: 'Step 7: Final Confirmation', actor: 'Both Apps & SMS', action: 'Instant push confirmation sent to both parties in < 2 seconds!' }
  ];

  const liteSteps = [
    { id: 1, title: 'Step 1: Initiation', actor: 'Payer Mobile Device', action: 'User selects UPI Lite for small value transaction of ₹250 (Limit ₹500).' },
    { id: 2, title: 'Step 2: Local Wallet Debit', actor: 'On-Device Secure Enclave', action: 'Money debited directly from on-device wallet balance without requiring UPI PIN.' },
    { id: 3, title: 'Step 3: NPCI Switch', actor: 'NPCI UPI Switch', action: 'Directs credit advice to Beneficiary Bank without pinging Remitter CBS.' },
    { id: 4, title: 'Step 4: Credit & Settle', actor: 'Beneficiary Bank CBS', action: 'Merchant account credited instantaneously with near-zero failure rate!' }
  ];

  const steps = activeMode === 'lite' ? liteSteps : standardSteps;

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1200);
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const handleRunSimulation = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
            <Zap className="w-3.5 h-3.5" />
            NPCI Payment Architecture
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'UPI लेनदेन प्रवाह और स्विच आर्किटेक्चर' : 'UPI Transaction Flow & Switch Architecture'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'देखें कि कैसे NPCI सेंट्रल स्विच 2 सेकंड के भीतर प्रेषक बैंक और लाभार्थी बैंक के बीच फंड ट्रांसफर करता है।'
              : 'Witness the high-speed packet routing between Remitter CBS, NPCI Switch, and Beneficiary CBS in under 2 seconds.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunSimulation}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Play className="w-4 h-4" />
            {isPlaying ? 'Processing...' : 'Run Simulation'}
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 my-6">
        <button
          onClick={() => { setActiveMode('standard'); handleReset(); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'standard'
              ? 'bg-bank-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Standard UPI (Limit: ₹1 Lakh / ₹5 Lakh)
        </button>
        <button
          onClick={() => { setActiveMode('lite'); handleReset(); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'lite'
              ? 'bg-bank-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          UPI Lite (Limit: ₹500/tx, No PIN)
        </button>
      </div>

      {/* Animated Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-8">
        <div className={`p-4 rounded-xl border text-center transition-all ${
          currentStep >= 1 ? 'border-bank-500 bg-bank-50/50 dark:bg-bank-950/30' : 'border-slate-200 dark:border-slate-800 opacity-60'
        }`}>
          <Smartphone className="w-8 h-8 text-bank-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Payer Device / App</div>
          <div className="text-[11px] text-slate-500 mt-1">Initiates & signs payload</div>
        </div>

        <div className={`p-4 rounded-xl border text-center transition-all ${
          currentStep >= 3 ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30' : 'border-slate-200 dark:border-slate-800 opacity-60'
        }`}>
          <Server className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">NPCI Central Switch</div>
          <div className="text-[11px] text-slate-500 mt-1">VPA Resolution & Routing</div>
        </div>

        <div className={`p-4 rounded-xl border text-center transition-all ${
          currentStep >= 4 ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30' : 'border-slate-200 dark:border-slate-800 opacity-60'
        }`}>
          <Server className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Remitter CBS Bank</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {activeMode === 'lite' ? 'Bypassed (Wallet Used)' : 'PIN Verify & Debit'}
          </div>
        </div>

        <div className={`p-4 rounded-xl border text-center transition-all ${
          currentStep >= (activeMode === 'lite' ? 4 : 6) ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-800 opacity-60'
        }`}>
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Beneficiary CBS</div>
          <div className="text-[11px] text-slate-500 mt-1">Account Credited</div>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-3">
        {steps.map((s) => {
          const isDone = currentStep >= s.id;
          const isCurrent = currentStep === s.id;
          return (
            <div
              key={s.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                isCurrent
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-sm'
                  : isDone
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40'
                  : 'border-slate-100 dark:border-slate-800/50 opacity-40'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-700'
              }`}>
                {s.id}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{s.title}: {s.actor}</div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-md animate-pulse">
                      In Flight
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.action}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam Fact Box */}
      <div className="mt-6 p-4 rounded-xl bg-bank-50 dark:bg-bank-950/30 border border-bank-200 dark:border-bank-900/40 text-xs text-bank-900 dark:text-bank-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-bank-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Key Exam Fact: </span>
          UPI Lite transactions do NOT query the Remitter bank's Core Banking System (CBS) at the moment of payment, eliminating CBS timeouts and reducing the payment failure rate to near zero. Per-transaction limit is strictly ₹500, with maximum wallet balance of ₹2,000.
        </div>
      </div>
    </div>
  );
}
