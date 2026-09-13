// src/components/tools/ConfusionBuster.jsx
import React, { useState } from 'react';
import { HelpCircle, ArrowRightLeft, Sparkles, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export default function ConfusionBuster({ lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  const confusionPairs = [
    {
      title: 'Nostro vs Vostro vs Loro Accounts',
      category: 'International Banking',
      conceptA: {
        name: 'Nostro Account',
        meaning: 'Latin for "Ours"',
        definition: 'An account held by an Indian domestic bank with a foreign bank abroad in foreign currency.',
        example: 'State Bank of India (SBI) holding a USD account with JPMorgan Chase in New York.'
      },
      conceptB: {
        name: 'Vostro Account',
        meaning: 'Latin for "Yours"',
        definition: 'An account held by a foreign bank with an Indian domestic bank in Indian Rupees (INR).',
        example: 'Sberbank of Russia holding an INR account with UCO Bank in Kolkata.'
      },
      conceptC: {
        name: 'Loro Account',
        meaning: 'Latin for "Theirs"',
        definition: 'A third-party intermediary account referred to by another bank.',
        example: 'Bank of Baroda instructing Citibank NY to settle using SBI’s Nostro account.'
      },
      mnemonic: 'N = Nostro = "None other than OURS". V = Vostro = "VERY much YOURS". L = Loro = "LOOK at THEIRS".',
      trapAlert: 'Examiners flip the perspectives: Remember Nostro is in FOREIGN currency, Vostro is in INDIAN RUPEES (INR).'
    },
    {
      title: 'Repo Rate vs Reverse Repo vs Standing Deposit Facility (SDF)',
      category: 'Monetary Policy',
      conceptA: {
        name: 'Repo Rate (Injection)',
        meaning: 'RBI lends to Banks against collateral',
        definition: 'Fixed rate at which RBI injects short-term liquidity to banks against pledged Government Securities.',
        example: 'Currently 6.50%. Banks sell G-Secs with a repurchase agreement.'
      },
      conceptB: {
        name: 'Standing Deposit Facility (SDF)',
        meaning: 'RBI absorbs surplus funds WITHOUT collateral',
        definition: 'Collateral-free liquidity absorption tool introduced in 2022. Sits 25 bps below Repo (6.25%).',
        example: 'Banks park excess cash with RBI. RBI does NOT provide any G-Secs as collateral.'
      },
      conceptC: {
        name: 'Fixed Reverse Repo',
        meaning: 'RBI absorbs funds WITH collateral',
        definition: 'Legacy absorption tool at 3.35%. Requires RBI to transfer G-Secs as collateral to banks.',
        example: 'Operative absorption has shifted completely to SDF.'
      },
      mnemonic: 'Repo = RBI gives money to banks. SDF = Banks give surplus money to RBI without collateral.',
      trapAlert: 'SDF requires ZERO collateral from RBI. Reverse repo requires G-Sec collateral. SDF is 25 bps below Repo.'
    },
    {
      title: 'Commercial Paper (CP) vs Certificate of Deposit (CD)',
      category: 'Money Market',
      conceptA: {
        name: 'Commercial Paper (CP)',
        meaning: 'Issued by Corporates, Primary Dealers & AIFIs',
        definition: 'Unsecured promissory note to raise short-term working capital. Minimum denomination is ₹5 Lakh.',
        example: 'Tata Motors or Reliance issuing CP for 90 days. Tenor: 7 days to 1 year.'
      },
      conceptB: {
        name: 'Certificate of Deposit (CD)',
        meaning: 'Issued by Scheduled Commercial Banks',
        definition: 'Negotiable money market receipt for funds deposited at a bank. Minimum denomination is ₹1 Lakh.',
        example: 'HDFC Bank issuing CD to institutional investors. Tenor: 7 days to 1 year for banks.'
      },
      mnemonic: 'CP = Corporate Paper (Min ₹5 Lakh). CD = Commercial Deposit (Min ₹1 Lakh).',
      trapAlert: 'Do NOT reverse the minimum amounts! CP = ₹5 Lakh; CD = ₹1 Lakh.'
    },
    {
      title: 'Call Money vs Notice Money vs Term Money',
      category: 'Money Market',
      conceptA: {
        name: 'Call Money',
        meaning: 'Overnight (1 Day Only)',
        definition: 'Inter-bank lending and borrowing for strictly 1 day (overnight) to square reserve requirements.',
        example: 'Bank A borrows from Bank B on Monday, repaid on Tuesday morning.'
      },
      conceptB: {
        name: 'Notice Money',
        meaning: '2 to 14 Days',
        definition: 'Inter-bank lending for a period between 2 days and 14 days without collateral.',
        example: 'Bank borrowing for 7 days to meet fortnightly reporting obligations.'
      },
      conceptC: {
        name: 'Term Money',
        meaning: '15 Days to 1 Year',
        definition: 'Inter-bank funds borrowed for periods exceeding 14 days and up to 1 year.',
        example: 'Borrowing for 3 months.'
      },
      mnemonic: '1 Day = Call | 2-14 Days = Notice | 15+ Days = Term.',
      trapAlert: 'Notice money is often wrongly guessed as up to 30 days. It is strictly capped at 14 days.'
    },
    {
      title: 'PMJJBY (Life) vs PMSBY (Accidental)',
      category: 'Government Schemes',
      conceptA: {
        name: 'PMJJBY (Jeevan Jyoti)',
        meaning: 'Pure Life Insurance (Death by ANY cause)',
        definition: 'Coverage of ₹2 Lakh on death due to natural or accidental causes. Entry age: 18 to 50 years. Premium: ₹436/year.',
        example: 'Covers natural illness, heart failure, COVID, as well as accidents.'
      },
      conceptB: {
        name: 'PMSBY (Suraksha Bima)',
        meaning: 'Pure Accidental Insurance Only',
        definition: 'Coverage of ₹2 Lakh for accidental death/full disability (₹1 Lakh for partial). Entry age: 18 to 70 years. Premium: ₹20/year.',
        example: 'Covers road accidents, drowning, falling. Does NOT cover natural medical death.'
      },
      mnemonic: 'Jeevan = Life (covers all deaths, stricter age 18-50, ₹436). Suraksha = Safety/Accident (18-70 age, ₹20).',
      trapAlert: 'PMSBY entry age extends up to 70 years; PMJJBY cuts off at 50 years. PMSBY does not pay for natural disease death.'
    },
    {
      title: 'Base Rate vs MCLR vs EBLR',
      category: 'Lending Benchmarks',
      conceptA: {
        name: 'Base Rate (2010)',
        meaning: 'Average cost of deposits (Legacy)',
        definition: 'Minimum rate below which banks could not lend. Slow monetary transmission.',
        example: 'Superseded in 2016.'
      },
      conceptB: {
        name: 'MCLR (April 2016)',
        meaning: 'Marginal Cost of Funds Based Rate',
        definition: 'Internal benchmark calculated by each bank based on marginal cost of raising fresh deposits.',
        example: 'Reset intervals (e.g. 1-year MCLR) still delayed transmission by up to 12 months.'
      },
      conceptC: {
        name: 'EBLR (October 2019)',
        meaning: 'External Benchmark Linked Rate',
        definition: 'Mandatory for all floating retail & MSME loans. Directly linked to external rate like RBI Repo Rate.',
        example: 'Repo hike by 25 bps transmits to home loan interest within weeks.'
      },
      mnemonic: 'Base Rate (Internal Average) -> MCLR (Internal Marginal) -> EBLR (External Repo/T-Bill).',
      trapAlert: 'EBLR is mandatory for retail and MSME loans, NOT for large corporate working capital loans.'
    },
    {
      title: 'SARFAESI Act vs Insolvency and Bankruptcy Code (IBC 2016)',
      category: 'Banking Regulations',
      conceptA: {
        name: 'SARFAESI Act, 2002',
        meaning: 'Asset Enforcement Without Courts',
        definition: 'Secured creditors seize and auction mortgaged collateral without court trial. 60-day notice under Sec 13(2).',
        example: 'Auctioning a mortgaged commercial factory to recover unpaid loan.'
      },
      conceptB: {
        name: 'IBC, 2016',
        meaning: 'Corporate Resolution & Revival',
        definition: 'Adjudicated by NCLT. Focuses on company restructuring rather than just piecemeal asset seizure. 180 + 90 days.',
        example: 'Resolving a stressed steel enterprise via Committee of Creditors resolution plan.'
      },
      mnemonic: 'SARFAESI = Direct Asset Seizure. IBC = Corporate Insolvency Resolution via NCLT.',
      trapAlert: 'SARFAESI strictly excludes agricultural land. IBC applies to corporate debtors and LLPs before NCLT.'
    },
    {
      title: 'Primary Deficit vs Fiscal Deficit vs Revenue Deficit',
      category: 'Macroeconomics & Budget',
      conceptA: {
        name: 'Fiscal Deficit',
        meaning: 'Total Borrowing Requirement of Govt',
        definition: 'Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts). Targeted at 3-4.5% of GDP.',
        example: 'The exact amount the government must borrow through G-Secs and T-Bills.'
      },
      conceptB: {
        name: 'Primary Deficit',
        meaning: 'Fiscal Deficit MINUS Interest Payments',
        definition: 'Measures government borrowing needs for current year expenditures alone, excluding past debt interest.',
        example: 'When Primary Deficit is ZERO, Fiscal Deficit is exactly equal to interest payments.'
      },
      conceptC: {
        name: 'Revenue Deficit',
        meaning: 'Shortfall in day-to-day government operations',
        definition: 'Revenue Expenditure - Revenue Receipts. Indicates borrowing to fund routine government salaries/subsidies.',
        example: 'High revenue deficit implies consumption spending on borrowed money.'
      },
      mnemonic: 'Fiscal Deficit = Total Borrowing | Primary Deficit = Fiscal Deficit - Past Interest | Revenue Deficit = Operational Gap.',
      trapAlert: 'Primary Deficit formula is: Fiscal Deficit MINUS Interest Payments (NEVER addition).'
    }
  ];

  const filteredPairs = confusionPairs.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mnemonic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPair = filteredPairs[selectedPairIndex] || filteredPairs[0] || confusionPairs[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Confusion Buster Master
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग भ्रम निवारक (Confusion Buster)' : 'Banking Confusion Buster'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'उन शीर्ष 15+ अवधारणाओं की तुलना करें जिनमें 80% अभ्यर्थी परीक्षा में नकारात्मक अंक पाते हैं।'
              : 'Side-by-side comparative breakdowns, memory mnemonics, and trap alerts for high-confusion banking pairs.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter confusion pairs..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setSelectedPairIndex(0); }}
            className="pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bank-500 w-56"
          />
        </div>
      </div>

      {/* Confusion Pairs Navigation Pills */}
      <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {filteredPairs.map((pair, idx) => {
          const isSelected = selectedPair.title === pair.title;
          return (
            <button
              key={idx}
              onClick={() => setSelectedPairIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {pair.title}
            </button>
          );
        })}
      </div>

      {/* Active Comparison Card */}
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedPair.title}
          </h3>
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-semibold">
            {selectedPair.category}
          </span>
        </div>

        {/* Side-by-side Concepts Grid */}
        <div className={`grid grid-cols-1 ${selectedPair.conceptC ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {/* Concept A */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-bank-600 dark:text-bank-400 uppercase tracking-wide mb-1">
              Concept A
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {selectedPair.conceptA.name}
            </h4>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
              {selectedPair.conceptA.meaning}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedPair.conceptA.definition}
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Real Example: </span>
              <span className="text-slate-600 dark:text-slate-400">{selectedPair.conceptA.example}</span>
            </div>
          </div>

          {/* Concept B */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
              Concept B
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {selectedPair.conceptB.name}
            </h4>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
              {selectedPair.conceptB.meaning}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedPair.conceptB.definition}
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Real Example: </span>
              <span className="text-slate-600 dark:text-slate-400">{selectedPair.conceptB.example}</span>
            </div>
          </div>

          {/* Concept C (Optional) */}
          {selectedPair.conceptC && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                Concept C
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {selectedPair.conceptC.name}
              </h4>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                {selectedPair.conceptC.meaning}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {selectedPair.conceptC.definition}
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Real Example: </span>
                <span className="text-slate-600 dark:text-slate-400">{selectedPair.conceptC.example}</span>
              </div>
            </div>
          )}
        </div>

        {/* Memory Mnemonic */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
              Memory Mnemonic & Quick Rule
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-200 mt-1 font-medium leading-relaxed">
              {selectedPair.mnemonic}
            </p>
          </div>
        </div>

        {/* Exam Trap Alert */}
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wide">
              Examiner Trap Alert
            </div>
            <p className="text-xs text-rose-800 dark:text-rose-200 mt-1 font-medium leading-relaxed">
              {selectedPair.trapAlert}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
