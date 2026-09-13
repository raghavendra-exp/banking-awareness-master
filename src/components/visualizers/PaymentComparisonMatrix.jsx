// src/components/visualizers/PaymentComparisonMatrix.jsx
import React, { useState } from 'react';
import { Table, Search, ShieldCheck, Check, X, ArrowUpDown } from 'lucide-react';

export default function PaymentComparisonMatrix({ lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'rbi' | 'npci'

  const systems = [
    {
      name: 'RTGS (Real Time Gross Settlement)',
      short: 'RTGS',
      operator: 'Reserve Bank of India (RBI)',
      minLimit: '₹2,00,000 (₹2 Lakh)',
      maxLimit: 'No Upper Limit',
      settlement: 'Real-time Continuous (Gross)',
      timing: '24x7x365 Round the Clock',
      channel: 'Internet Banking, Mobile, Branch',
      charges: 'Zero for online savings; regulated for branch',
      examPoint: 'Statutory minimum is strictly ₹2 Lakh. Meant for large wholesale transactions.'
    },
    {
      name: 'NEFT (National Electronic Funds Transfer)',
      short: 'NEFT',
      operator: 'Reserve Bank of India (RBI)',
      minLimit: 'No Minimum (even ₹1)',
      maxLimit: 'No Limit (₹50k for cash walk-in)',
      settlement: 'Deferred Net Settlement (48 half-hourly batches)',
      timing: '24x7x365 Round the Clock',
      channel: 'Online, Mobile, Branch',
      charges: 'Zero charges for individual savings account holders',
      examPoint: 'Operated by RBI. Settled in half-hour batches every 30 minutes.'
    },
    {
      name: 'IMPS (Immediate Payment Service)',
      short: 'IMPS',
      operator: 'National Payments Corporation of India (NPCI)',
      minLimit: '₹1',
      maxLimit: '₹5,00,000 (₹5 Lakh)',
      settlement: 'Real-time Instantaneous',
      timing: '24x7x365 Immediate',
      channel: 'Mobile Banking, Internet, ATM',
      charges: 'Decided by individual commercial banks',
      examPoint: 'Transaction limit was increased from ₹2 Lakh to ₹5 Lakh in Oct 2021. Uses MMID (7-digit).'
    },
    {
      name: 'UPI (Unified Payments Interface)',
      short: 'UPI',
      operator: 'NPCI',
      minLimit: '₹1',
      maxLimit: '₹1,00,000 (₹5L for Hospital/Edu/IPO)',
      settlement: 'Real-time Instant (over IMPS rail)',
      timing: '24x7x365 Immediate',
      channel: 'Smartphone Apps (VPA / QR Code)',
      charges: 'Zero convenience fees for peer and merchant',
      examPoint: 'Uses Virtual Payment Address (VPA). Hospital, Education and IPO limit is ₹5 Lakh.'
    },
    {
      name: 'UPI Lite',
      short: 'UPI Lite',
      operator: 'NPCI',
      minLimit: '₹1',
      maxLimit: '₹500 / tx (₹2,000 wallet cap)',
      settlement: 'On-device local wallet (Zero CBS ping)',
      timing: '24x7x365 Instant',
      channel: 'UPI Enabled Mobile Apps',
      charges: 'Zero',
      examPoint: 'No UPI PIN required. Transaction limit is ₹500. Total wallet balance cannot exceed ₹2,000.'
    },
    {
      name: 'UPI 123Pay',
      short: 'UPI 123Pay',
      operator: 'NPCI',
      minLimit: '₹1',
      maxLimit: '₹10,000 per transaction',
      settlement: 'Instant IVR / Sound-wave',
      timing: '24x7x365',
      channel: 'Feature Phones (No internet required)',
      charges: 'Zero',
      examPoint: 'Works via 4 modes: IVR number, app on feature phone, missed call, and sound-based payment.'
    },
    {
      name: 'CTS-2010 (Cheque Truncation System)',
      short: 'CTS',
      operator: 'NPCI (Grid-based clearing)',
      minLimit: 'No Minimum',
      maxLimit: 'No Maximum',
      settlement: 'T+1 Clearing grid based on digital scan',
      timing: 'Working bank clearing days',
      channel: 'Physical Paper Cheque',
      charges: 'Standard clearing rules',
      examPoint: 'Uses 9-digit MICR code at bottom band. Positive Pay System (PPS) applies for cheques >= ₹50k.'
    }
  ];

  const filtered = systems.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.examPoint.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'rbi') return matchesSearch && s.operator.includes('RBI');
    if (filterType === 'npci') return matchesSearch && s.operator.includes('NPCI');
    return matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 mb-2">
            <Table className="w-3.5 h-3.5" />
            Comparison Matrix
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'भारतीय भुगतान प्रणालियों का तुलनात्मक मैट्रिक्स' : 'Indian Payment Systems Comparison Matrix'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'NEFT, RTGS, IMPS, UPI, और UPI Lite के बीच न्यूनतम सीमा, अधिकतम सीमा और नियामक का अंतर समझें।'
              : 'Interactive comparison of limits, operating hours, settlement mechanisms, and examiners favorite traps.'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search payment system..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bank-500 w-48"
            />
          </div>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              All Systems
            </button>
            <button
              onClick={() => setFilterType('rbi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'rbi' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
            >
              RBI Operated
            </button>
            <button
              onClick={() => setFilterType('npci')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'npci' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
            >
              NPCI Operated
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">System Name</th>
              <th className="p-3.5">Operated By</th>
              <th className="p-3.5">Minimum Limit</th>
              <th className="p-3.5">Maximum Limit</th>
              <th className="p-3.5">Settlement Method</th>
              <th className="p-3.5">Exam Trap Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
            {filtered.map((sys, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {sys.short}
                </td>
                <td className="p-3.5">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                    sys.operator.includes('RBI') ? 'bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300' : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                  }`}>
                    {sys.operator}
                  </span>
                </td>
                <td className="p-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {sys.minLimit}
                </td>
                <td className="p-3.5 font-mono font-semibold text-bank-600 dark:text-bank-400 whitespace-nowrap">
                  {sys.maxLimit}
                </td>
                <td className="p-3.5 whitespace-nowrap">
                  {sys.settlement}
                </td>
                <td className="p-3.5 text-slate-500 dark:text-slate-400 max-w-xs">
                  {sys.examPoint}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider mb-1">
            RBI Managed Wholesale Rails
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            NEFT and RTGS are owned and operated directly by the RBI. NEFT settles in 48 batches of 30 minutes each. RTGS settles continuously in real-time with a minimum entry limit of ₹2 Lakh.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider mb-1">
            NPCI Managed Retail Rails
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            IMPS, UPI, UPI Lite, AePS, and NACH are developed and operated by NPCI (established under PSSA 2007). Standard UPI allows ₹1 Lakh, while UPI Lite allows ₹500 offline without entering a PIN.
          </p>
        </div>
      </div>
    </div>
  );
}
