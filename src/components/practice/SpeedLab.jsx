// src/components/practice/SpeedLab.jsx
import React, { useState, useEffect } from 'react';
import { Zap, Timer, Flame, Play, RotateCcw, AlertCircle, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataManager } from '../../utils/dataManager';
import { questionGenerator } from '../../utils/questionGenerator';

export default function SpeedLab({ lang = 'en' }) {
  const [drillDuration, setDrillDuration] = useState(15); // 10, 15, or 20 seconds
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    fetch('./data/questions.json')
      .then(res => res.json())
      .then(data => {
        const staticQs = data.questions || [];
        const dynamicQs = questionGenerator.generatePracticeSet(20, 'all');
        setQuestions([...staticQs, ...dynamicQs].sort(() => 0.5 - Math.random()));
      })
      .catch(() => {
        setQuestions(questionGenerator.generatePracticeSet(20, 'all'));
      });
  }, []);

  const currentQ = questions[currentIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showFeedback) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive && !showFeedback) {
      // Time up on current question
      handleTimeout();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showFeedback]);

  const handleStart = () => {
    setIsActive(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setTimeLeft(drillDuration);
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setResponseTimes([]);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleTimeout = () => {
    setCombo(0);
    setResponseTimes(prev => [...prev, drillDuration]);
    if (currentQ) dataManager.logMistake(currentQ, -1, 'Timed out in Speed Lab');

    advanceToNext();
  };

  const handleSelectOption = (optIdx) => {
    if (showFeedback) return;
    setSelectedOption(optIdx);
    setShowFeedback(true);

    const timeSpent = drillDuration - timeLeft;
    setResponseTimes(prev => [...prev, timeSpent]);

    const isCorrect = optIdx === currentQ.correct_option;
    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore(prev => prev + 10 * Math.min(newCombo, 5));
      dataManager.recordPracticeResult(currentQ.topic, true);
    } else {
      setCombo(0);
      dataManager.recordPracticeResult(currentQ.topic, false);
      dataManager.logMistake(currentQ, optIdx, 'Speed Lab incorrect attempt');
    }

    // Auto advance after 900ms
    setTimeout(() => {
      advanceToNext();
    }, 900);
  };

  const advanceToNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentIndex + 1 >= 10 || currentIndex + 1 >= questions.length) {
      setIsActive(false);
      setIsFinished(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(drillDuration);
    }
  };

  const avgTime = responseTimes.length > 0
    ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 mb-2">
            <Zap className="w-3.5 h-3.5" />
            Exam Speed Building Drills
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग स्पीड लैब (Lightning Drills)' : 'Banking Speed Lab'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? '10-सेकंड और 15-सेकंड के त्वरित अभ्यास से परीक्षा हॉल में सोचने का समय 50% कम करें।'
              : 'Rapid-fire 10s / 15s / 20s factual recall drills to achieve instant question recognition and sub-12 second response velocity.'}
          </p>
        </div>

        {/* Speed Controls */}
        {!isActive && !isFinished && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Timer:</span>
            {[10, 15, 20].map((sec) => (
              <button
                key={sec}
                onClick={() => { setDrillDuration(sec); setTimeLeft(sec); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  drillDuration === sec
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Start Screen */}
      {!isActive && !isFinished && (
        <div className="my-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Ready for 10 Lightning Questions?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You will have {drillDuration} seconds per question. Keep your combo multiplier going to maximize your velocity score!
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-sm font-extrabold shadow-md transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" />
            Launch Speed Drill
          </button>
        </div>
      )}

      {/* Live Active Drill Screen */}
      {isActive && currentQ && (
        <div className="my-6 space-y-6">
          {/* Top Status Bar: Timer + Combo + Question Counter */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Question:</span>
              <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                {currentIndex + 1} / 10
              </span>
            </div>

            {/* Countdown Gauge */}
            <div className="flex items-center gap-2">
              <Timer className={`w-5 h-5 ${timeLeft <= 4 ? 'text-rose-500 animate-spin' : 'text-amber-500'}`} />
              <span className={`text-xl font-black font-mono ${timeLeft <= 4 ? 'text-rose-600 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                {timeLeft}s
              </span>
            </div>

            {/* Combo Multiplier */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-xl text-xs font-black">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{combo}x Combo</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {lang === 'hi' && currentQ.question_hi ? currentQ.question_hi : currentQ.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(lang === 'hi' && currentQ.options_hi ? currentQ.options_hi : currentQ.options)?.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct_option;

              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400';
              if (showFeedback) {
                if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-600';
                else if (isSelected) style = 'bg-rose-600 text-white border-rose-600';
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-xs md:text-sm font-semibold text-left transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Finished Summary Screen */}
      {isFinished && (
        <div className="my-8 max-w-md mx-auto p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Drill Completed!
          </h3>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Score</div>
              <div className="text-xl font-black font-mono text-bank-600">{score}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Avg Time</div>
              <div className="text-xl font-black font-mono text-emerald-600">{avgTime}s</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Max Combo</div>
              <div className="text-xl font-black font-mono text-orange-600">{maxCombo}x</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {parseFloat(avgTime) <= 10
              ? '⚡ Topper Velocity! You are solving questions in under 10 seconds.'
              : '👍 Good pace! Target getting factual questions answered in under 12 seconds.'}
          </p>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 py-3 bg-bank-600 hover:bg-bank-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Try Another Lightning Round
          </button>
        </div>
      )}
    </div>
  );
}
