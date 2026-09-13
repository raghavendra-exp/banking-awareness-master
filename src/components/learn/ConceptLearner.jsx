// src/components/learn/ConceptLearner.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, ChevronRight, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ConceptLearner({ onStartPractice, lang = 'en' }) {
  const [activeChapter, setActiveChapter] = useState('basics');
  const [basicsData, setBasicsData] = useState(null);
  const [rbiData, setRbiData] = useState(null);
  const [mpData, setMpData] = useState(null);

  useEffect(() => {
    fetch('./data/banking-basics.json').then(r => r.json()).then(setBasicsData).catch(() => {});
    fetch('./data/rbi.json').then(r => r.json()).then(setRbiData).catch(() => {});
    fetch('./data/monetary-policy.json').then(r => r.json()).then(setMpData).catch(() => {});
  }, []);

  const chapters = [
    { id: 'basics', title: '1. Banking Architecture & Types of Banks', topic: 'Banking Basics' },
    { id: 'rbi', title: '2. Reserve Bank of India (RBI) & Acts', topic: 'RBI & Monetary Policy' },
    { id: 'monetary', title: '3. Monetary Policy & LAF Corridor', topic: 'RBI & Monetary Policy' },
    { id: 'regulations', title: '4. Banking Regulations (SARFAESI, IBC, DICGC)', topic: 'Banking Regulations' },
    { id: 'markets', title: '5. Financial Markets (Money & Capital)', topic: 'Financial Markets' },
    { id: 'schemes', title: '6. Government Schemes & Financial Inclusion', topic: 'Government Schemes' },
    { id: 'payments', title: '7. Payment Systems & NPCI Ecosystem', topic: 'Payment Systems' },
    { id: 'digital', title: '8. Digital Banking, FinTech & Ombudsman', topic: 'Digital Banking' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Complete Syllabus Theory
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग अवधारणा शिक्षार्थी (Concept Learner)' : 'Banking Awareness Concept Mastery'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'आधिकारिक अधिसूचनाओं और अधिनियमों पर आधारित 8 अध्यायों का संपूर्ण पाठ्यक्रम।'
              : 'Structured syllabus chapters grounded in official RBI directions, Acts, and policy frameworks.'}
          </p>
        </div>

        <button
          onClick={() => onStartPractice()}
          className="px-4 py-2.5 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto shadow-sm"
        >
          <span>Test in Practice Arena</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Chapters Layout: Sidebar + Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1.5">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                activeChapter === ch.id
                  ? 'bg-bank-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="line-clamp-1">{ch.title}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          ))}
        </div>

        {/* Reader Area */}
        <div className="lg:col-span-3 p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-6">
          {activeChapter === 'basics' && basicsData && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {basicsData.definition_of_banking?.act}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Section: {basicsData.definition_of_banking?.section}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "{basicsData.definition_of_banking?.statutory_text}"
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Key Types of Banks in India
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {basicsData.types_of_banks?.map((b) => (
                    <div key={b.category} className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-xs text-bank-600 dark:text-bank-400">{b.category}</div>
                      <p className="text-[11px] text-slate-500 mt-1">{b.description}</p>
                      {b.exam_tip && <div className="text-[10px] text-amber-600 font-semibold mt-1">Tip: {b.exam_tip}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChapter === 'rbi' && rbiData && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Reserve Bank of India (RBI): Origin, Acts & Powers
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Established on April 1, 1935 under the Reserve Bank of India Act, 1934
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong>Hilton Young Commission: </strong>Recommended RBI in 1926.
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong>Nationalisation: </strong>January 1, 1949.
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong>First Governor: </strong>Sir Osborne Smith (1935-37).
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong>First Indian Governor: </strong>Sir C.D. Deshmukh (1943-49).
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Core Functions of the RBI
                </h4>
                <div className="space-y-2">
                  {rbiData.core_functions?.map((f) => (
                    <div key={f.id} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">{f.title} ({f.legal_provision})</div>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChapter === 'monetary' && mpData && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Monetary Policy Operations & Tools
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Quantitative & Qualitative Instruments for Inflation Management
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="font-bold text-bank-600">Statutory MPC Framework (Section 45ZB):</div>
                <p className="text-slate-600 dark:text-slate-400">
                  6 Members (3 RBI + 3 GoI). Target: 4.0% CPI inflation (±2.0%). Quorum of 4 members. Governor has casting vote in case of a tie.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Quantitative Policy Instruments
                </h4>
                <div className="space-y-3">
                  {mpData.instruments?.quantitative_tools?.map((inst, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">{inst.name}</div>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{inst.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {['regulations', 'markets', 'schemes', 'payments', 'digital'].includes(activeChapter) && (
            <div className="p-8 text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-bank-600 mx-auto opacity-80" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Chapter Loaded
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore this chapter's dedicated tools: Government Schemes Explorer, Payment Matrix, or Confusion Buster.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
