// src/components/tools/BankingTimeline.jsx
import React, { useState } from 'react';
import { History, Calendar, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function BankingTimeline({ lang = 'en' }) {
  const [selectedEra, setSelectedEra] = useState('all');

  const milestones = [
    { year: 1770, title: 'Bank of Hindostan', era: 'pre', desc: 'The first bank established in India, set up by Alexander and Co. in Calcutta. Liquidated in 1832.', tag: 'First Bank' },
    { year: 1806, title: 'Presidency Bank of Bengal', era: 'pre', desc: 'Originally Bank of Calcutta, chartered in 1806. Joined later by Bank of Bombay (1840) and Bank of Madras (1843).', tag: 'Presidency Banks' },
    { year: 1865, title: 'Allahabad Bank Established', era: 'pre', desc: 'Oldest joint-stock bank in India (merged into Indian Bank on April 1, 2020).', tag: 'Oldest Joint-Stock' },
    { year: 1881, title: 'Oudh Commercial Bank', era: 'pre', desc: 'First commercial bank in India with limited liability managed solely by an Indian board.', tag: 'Indian Management' },
    { year: 1894, title: 'Punjab National Bank (PNB)', era: 'pre', desc: 'First bank purely managed by Indians with Indian capital, founded by Lala Lajpat Rai in Lahore.', tag: 'Purely Indian' },
    { year: 1921, title: 'Imperial Bank of India', era: 'pre', desc: 'Formed by amalgamating the 3 Presidency Banks (Bengal, Bombay, Madras) as a quasi-central bank.', tag: 'Precursor to SBI' },
    { year: 1934, title: 'RBI Act Passed', era: 'pre', desc: 'Reserve Bank of India Act, 1934 enacted based on Hilton Young Commission (1926) recommendations.', tag: 'Statutory Landmark' },
    { year: 1935, title: 'RBI Commences Operations', era: 'pre', desc: 'RBI established on April 1, 1935 in Calcutta with paid-up capital of ₹5 Crore.', tag: 'Apex Bank' },
    { year: 1949, title: 'RBI Nationalisation & BR Act', era: 'post', desc: 'RBI nationalised on January 1, 1949. Banking Regulation Act passed on March 16, 1949.', tag: 'Core Regulation' },
    { year: 1955, title: 'Creation of State Bank of India', era: 'post', desc: 'Imperial Bank nationalised and converted to SBI on July 1, 1955 under Gorwala Committee recommendations.', tag: 'SBI Founded' },
    { year: 1969, title: '1st Mega Bank Nationalisation', era: 'post', desc: '14 major commercial banks with deposits >= ₹50 Crore nationalised on July 19 by Indira Gandhi government.', tag: 'Historic Milestone' },
    { year: 1975, title: 'First Regional Rural Bank (RRB)', era: 'post', desc: 'Prathama Bank established on October 2, 1975 in Moradabad (UP), sponsored by Syndicate Bank.', tag: 'RRB Era' },
    { year: 1980, title: '2nd Bank Nationalisation', era: 'post', desc: '6 commercial banks with deposits >= ₹200 Crore nationalised on April 15, 1980.', tag: '6 Banks' },
    { year: 1982, title: 'Establishment of NABARD & EXIM Bank', era: 'post', desc: 'NABARD established on July 12 (Sivaraman Committee). EXIM Bank established on January 1, 1982.', tag: 'Apex DFIs' },
    { year: 1988, title: 'NHB & SEBI Established', era: 'post', desc: 'National Housing Bank established on July 9. SEBI formed as administrative body on April 12.', tag: 'Apex Housing & Capital' },
    { year: 1990, title: 'SIDBI Established in Lucknow', era: 'post', desc: 'Small Industries Development Bank of India set up on April 2, 1990 under SIDBI Act, 1989.', tag: 'MSME DFI' },
    { year: 1991, title: 'Narasimham Committee I Reforms', era: 'lib', desc: 'Landmark financial reforms ushering in private sector banks (HDFC, ICICI, Axis) and 90-day NPA norms.', tag: 'LPG Reforms' },
    { year: 2002, title: 'Enactment of SARFAESI Act', era: 'lib', desc: 'Empowered banks to seize and auction mortgaged properties without court trial to recover NPAs.', tag: 'Asset Enforcement' },
    { year: 2008, title: 'NPCI Incorporated', era: 'lib', desc: 'National Payments Corporation of India founded by RBI and IBA under PSSA 2007 as Section 8 company.', tag: 'Retail Payments' },
    { year: 2014, title: 'PMJDY Launch & Nachiket Mor Report', era: 'lib', desc: 'World’s largest financial inclusion drive launched on August 28. Differentiated banks recommended.', tag: 'Financial Inclusion' },
    { year: 2015, title: 'Payments Banks & MUDRA Launched', era: 'lib', desc: 'Licences granted to Payments Banks & Small Finance Banks. PMMY, PMJJBY, PMSBY, APY rolled out.', tag: 'Social Security' },
    { year: 2016, title: 'UPI, IBC & Monetary Policy Committee', era: 'digital', desc: 'UPI launched April 11. Insolvency and Bankruptcy Code enacted. Statutory MPC established under Section 45ZB.', tag: 'FinTech & Legal Revolution' },
    { year: 2019, title: 'Mega PSB Consolidation (12 PSBs)', era: 'digital', desc: 'Consolidation of 10 public sector banks into 4 anchor banks, streamlining Indian PSBs to exactly 12.', tag: 'Mega Mergers' },
    { year: 2020, title: 'DICGC Cover Enhanced to ₹5 Lakh', era: 'digital', desc: 'Deposit insurance limit quintupled from ₹1 Lakh to ₹5 Lakh per depositor per bank.', tag: 'Depositor Protection' },
    { year: 2021, title: 'RBI Integrated Ombudsman & NaBFID', era: 'digital', desc: 'One Nation One Ombudsman scheme launched. NaBFID set up as 5th AIFI under K.V. Kamath.', tag: 'Consumer & Infra' },
    { year: 2022, title: 'CBDC Pilots & SDF Operationalised', era: 'digital', desc: 'Digital Rupee (e₹-W & e₹-R) rolled out. Standing Deposit Facility (SDF) replaces reverse repo as LAF floor.', tag: 'Sovereign Digital Currency' },
    { year: 2024, title: 'UPI Global Links & Tarun Plus MUDRA', era: 'digital', desc: 'UPI linked with Singapore PayNow and UAE. Budget raises MUDRA ceiling to ₹20 Lakh under Tarun Plus.', tag: 'Global FinTech' }
  ];

  const filtered = selectedEra === 'all' ? milestones : milestones.filter(m => m.era === selectedEra);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 mb-2">
            <History className="w-3.5 h-3.5" />
            Chronological Archive
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'भारतीय बैंकिंग का ऐतिहासिक कालक्रम (1770 - 2026)' : 'Indian Banking Evolution Timeline (1770 - 2026)'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'बैंक ऑफ हिंदुस्तान से लेकर यूपीआई और डिजिटल रुपये तक, भारतीय बैंकिंग के सभी 250+ वर्षों के ऐतिहासिक मील के पत्थर।'
              : 'Chronological timeline of all landmark milestones from Bank of Hindostan to CBDC and Mega Mergers.'}
          </p>
        </div>

        {/* Era Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setSelectedEra('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedEra === 'all' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
          >
            All Eras
          </button>
          <button
            onClick={() => setSelectedEra('pre')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedEra === 'pre' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
          >
            Pre-1947
          </button>
          <button
            onClick={() => setSelectedEra('post')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedEra === 'post' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
          >
            1947-1990
          </button>
          <button
            onClick={() => setSelectedEra('lib')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedEra === 'lib' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
          >
            1991-2015
          </button>
          <button
            onClick={() => setSelectedEra('digital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedEra === 'digital' ? 'bg-white dark:bg-slate-900 text-bank-600 dark:text-bank-400 shadow-xs' : 'text-slate-500'}`}
          >
            2016-2026
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-32 mt-8 space-y-8 pb-4">
        {filtered.map((m, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8 group">
            {/* Year Badge (Desktop left column, Mobile inline) */}
            <div className="md:absolute md:-left-28 md:top-0 font-mono font-extrabold text-sm md:text-base text-bank-600 dark:text-bank-400 bg-white dark:bg-slate-900 md:bg-transparent pr-2 inline-block">
              {m.year}
            </div>

            {/* Dot Node */}
            <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-bank-500 group-hover:scale-125 transition-transform" />

            {/* Event Content Card */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-bank-400 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {m.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300">
                  {m.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
