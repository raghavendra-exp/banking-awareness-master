// src/components/mock/ExamSimulator.jsx
import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, CheckCircle2, Trophy, ArrowRight, RotateCcw, HelpCircle, ShieldCheck, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataManager } from '../../utils/dataManager';
import { questionGenerator } from '../../utils/questionGenerator';

export default function ExamSimulator({ lang = 'en' }) {
  const [examPresets, setExamPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState('mock_sbi_clerk_01');
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: chosenOption }
  const [markedForReview, setMarkedForReview] = useState({}); // { qIndex: boolean }
  const [visited, setVisited] = useState({}); // { qIndex: boolean }
  const [secondsRemaining, setSecondsRemaining] = useState(35 * 60);

  useEffect(() => {
    fetch('./data/mock-tests.json')
      .then(res => res.json())
      .then(data => setExamPresets(data.mock_tests || []))
      .catch(err => console.error('Error loading mock presets:', err));
  }, []);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isExamRunning && secondsRemaining > 0 && !isExamSubmitted) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isExamRunning && !isExamSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [isExamRunning, secondsRemaining, isExamSubmitted]);

  const activePreset = examPresets.find(p => p.id === selectedPresetId) || examPresets[0];

  const handleStartExam = () => {
    fetch('./data/questions.json')
      .then(res => res.json())
      .then(data => {
        const staticQs = data.questions || [];
        const dynamicQs = questionGenerator.generatePracticeSet(20, 'all');
        const count = activePreset ? activePreset.total_questions : 40;
        const mockSet = [...staticQs, ...dynamicQs].sort(() => 0.5 - Math.random()).slice(0, count);

        setExamQuestions(mockSet);
        setAnswers({});
        setMarkedForReview({});
        setVisited({ 0: true });
        setCurrentIdx(0);
        setSecondsRemaining((activePreset ? activePreset.duration_minutes : 35) * 60);
        setIsExamRunning(true);
        setIsExamSubmitted(false);
      })
      .catch(() => {
        const fallback = questionGenerator.generatePracticeSet(30, 'all');
        setExamQuestions(fallback);
        setIsExamRunning(true);
      });
  };

  const handleSelectOption = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentIdx];
      return updated;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const handleNavigateQuestion = (idx) => {
    setCurrentIdx(idx);
    setVisited(prev => ({ ...prev, [idx]: true }));
  };

  const handleSubmitExam = () => {
    if (!isExamSubmitted) {
      setIsExamSubmitted(true);
      setIsExamRunning(false);

      // Calculate score and log errors
      let correct = 0;
      let incorrect = 0;
      let unattempted = 0;

      examQuestions.forEach((q, i) => {
        const chosen = answers[i];
        if (chosen === undefined) {
          unattempted++;
        } else if (chosen === q.correct_option) {
          correct++;
          dataManager.recordPracticeResult(q.topic, true);
        } else {
          incorrect++;
          dataManager.recordPracticeResult(q.topic, false);
          dataManager.logMistake(q, chosen, 'Mock Test error');
        }
      });

      const netScore = Math.max(0, correct * 1.0 - incorrect * 0.25).toFixed(2);
      const totalQs = examQuestions.length;
      const accuracy = correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

      dataManager.saveMockResult({
        examTitle: activePreset?.title || 'Banking Mock',
        score: parseFloat(netScore),
        correct,
        incorrect,
        unattempted,
        accuracy,
        totalMarks: totalQs
      });

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIdx];

  // Calculate results for score screen
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  if (isExamSubmitted) {
    examQuestions.forEach((q, i) => {
      const chosen = answers[i];
      if (chosen === undefined) unattemptedCount++;
      else if (chosen === q.correct_option) correctCount++;
      else incorrectCount++;
    });
  }
  const netScore = Math.max(0, correctCount * 1.0 - incorrectCount * 0.25).toFixed(2);
  const isCutoffCleared = activePreset ? parseFloat(netScore) >= (activePreset.sectional_cutoff || 0) : true;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Preset Selection & Instructions (When Exam is NOT running or finished) */}
      {!isExamRunning && !isExamSubmitted && (
        <div className="space-y-6">
          <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Standard Exam Environment
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'पूर्ण परीक्षा सिम्युलेटर (Full Mock Simulator)' : 'Full-Length Exam Simulator'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'hi'
                ? 'SBI क्लर्क, IBPS क्लर्क और RRB ऑफिस असिस्टेंट मेन्स परीक्षा के लिए आधिकारिक समय और मार्किंग स्कीम के साथ सिमुलेशन।'
                : 'Simulate full sectional tests with strict countdown timers, negative marking (-0.25), and sectional cutoffs.'}
            </p>
          </div>

          {/* Exam Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examPresets.map((p) => {
              const isSelected = p.id === selectedPresetId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPresetId(p.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-bank-500 bg-bank-50/60 dark:bg-bank-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-bank-600 border border-slate-200 dark:border-slate-700">
                      {p.duration_minutes} Mins
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {p.total_questions} Qs | {p.total_marks} M
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    Marking: +1.00 / -0.25 Negative
                  </div>
                </button>
              );
            })}
          </div>

          {/* Start Button */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Ready to begin {activePreset?.title}?
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Once launched, the timer cannot be paused. Ensure you are in a quiet test environment.
              </div>
            </div>
            <button
              onClick={handleStartExam}
              className="px-8 py-3.5 bg-bank-600 hover:bg-bank-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <span>Start Real Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Real Live Exam Screen */}
      {isExamRunning && currentQ && (
        <div className="space-y-6">
          {/* Top Bar: Exam Title + Timer + Submit Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {activePreset?.title}
              </div>
              <div className="text-[11px] text-slate-500">
                General / Financial Awareness Section
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <Timer className={`w-4 h-4 ${secondsRemaining <= 300 ? 'text-rose-500 animate-spin' : 'text-bank-600'}`} />
                <span className={`text-base font-black font-mono ${secondsRemaining <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Submit Section
              </button>
            </div>
          </div>

          {/* Main Layout: Question Area + Palette Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Area (3 Cols) */}
            <div className="lg:col-span-3 space-y-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-bank-600 dark:text-bank-400">
                  Question {currentIdx + 1} of {examQuestions.length}
                </span>
                <span className="font-semibold text-slate-400">
                  Marks: +1.00 / -0.25
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options?.map((opt, idx) => {
                  const isSelected = answers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-bank-600 bg-bank-50/80 dark:bg-bank-950/40 text-bank-950 dark:text-bank-100 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex gap-2">
                  <button
                    onClick={handleToggleReview}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      markedForReview[currentIdx]
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}
                  </button>

                  <button
                    onClick={handleClearResponse}
                    disabled={answers[currentIdx] === undefined}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-40"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavigateQuestion(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleNavigateQuestion(Math.min(examQuestions.length - 1, currentIdx + 1))}
                    className="px-5 py-2 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-xs font-bold transition-all"
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            </div>

            {/* Question Status Palette (1 Col) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Question Palette
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-600" /> Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-rose-600" /> Not Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-purple-600" /> Marked Review
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /> Not Visited
                </div>
              </div>

              {/* Number Matrix */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {examQuestions.map((_, idx) => {
                  const isAnswered = answers[idx] !== undefined;
                  const isReview = markedForReview[idx];
                  const isVisited = visited[idx];
                  const isCurrent = currentIdx === idx;

                  let color = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                  if (isAnswered && isReview) color = 'bg-purple-600 text-white ring-2 ring-emerald-500';
                  else if (isAnswered) color = 'bg-emerald-600 text-white';
                  else if (isReview) color = 'bg-purple-600 text-white';
                  else if (isVisited) color = 'bg-rose-600 text-white';

                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavigateQuestion(idx)}
                      className={`h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${color} ${
                        isCurrent ? 'ring-2 ring-bank-500 font-extrabold scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Result Screen */}
      {isExamSubmitted && (
        <div className="my-6 space-y-8 animate-fadeIn">
          {/* Score Header Card */}
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <Trophy className="w-14 h-14 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Mock Test Performance Card
            </h3>
            <div className="text-xs text-slate-500">{activePreset?.title}</div>

            {/* Score Numbers */}
            <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-y border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Net Score</div>
                <div className="text-4xl font-black font-mono text-bank-600 dark:text-bank-400 mt-1">
                  {netScore} <span className="text-sm font-normal text-slate-400">/ {examQuestions.length}</span>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Accuracy</div>
                <div className="text-3xl font-black font-mono text-emerald-600 mt-1">
                  {correctCount + incorrectCount > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0}%
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Sectional Cutoff</div>
                <div className={`text-lg font-bold mt-1.5 ${isCutoffCleared ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isCutoffCleared ? 'CLEARED ✅' : 'MISSED ❌'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Benchmark: {activePreset?.sectional_cutoff || 15} M</div>
              </div>
            </div>

            {/* Breakdown Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
              <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
                Correct: {correctCount}
              </span>
              <span className="text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-lg">
                Incorrect: {incorrectCount} (-{(incorrectCount * 0.25).toFixed(2)} M)
              </span>
              <span className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                Unattempted: {unattemptedCount}
              </span>
            </div>
          </div>

          {/* Question by Question Detailed Review */}
          <div className="space-y-4">
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Question-by-Question Solution & Trap Analysis
            </h4>

            {examQuestions.map((q, idx) => {
              const chosen = answers[idx];
              const isCorrect = chosen === q.correct_option;
              const isUnattempted = chosen === undefined;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : isUnattempted
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-50/40'
                      : 'border-rose-200 bg-rose-50/20 dark:bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Q{idx + 1}. {q.topic}
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                      isCorrect ? 'bg-emerald-600 text-white' : isUnattempted ? 'bg-slate-200 text-slate-700 dark:bg-slate-700' : 'bg-rose-600 text-white'
                    }`}>
                      {isCorrect ? 'Correct (+1.00)' : isUnattempted ? 'Unattempted (0.00)' : 'Incorrect (-0.25)'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                    {q.options?.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correct_option;
                      const isOptionChosen = chosen === oIdx;

                      let style = 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-800';
                      if (isOptionCorrect) style = 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 font-bold border-emerald-400';
                      else if (isOptionChosen) style = 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-300 font-bold border-rose-400';

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border ${style}`}>
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong>Explanation: </strong>{q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => { setIsExamSubmitted(false); setIsExamRunning(false); }}
              className="px-8 py-3 bg-bank-600 hover:bg-bank-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Take Another Mock Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
