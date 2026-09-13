// src/components/tools/StudyPlans.jsx
import React, { useState, useEffect } from 'react';
import { Compass, CheckSquare, Square, Calendar, Clock, Target, ArrowRight } from 'lucide-react';

export default function StudyPlans({ lang = 'en' }) {
  const [plans, setPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState('plan_30_day');
  const [checkedTasks, setCheckedTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bam_checked_study_tasks') || '{}');
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    fetch('./data/study-plans.json')
      .then(res => res.json())
      .then(data => {
        setPlans(data.plans || []);
        if (data.plans && data.plans.length > 0) setActivePlanId(data.plans[0].id);
      })
      .catch(err => console.error('Error loading study plans:', err));
  }, []);

  const toggleTask = (taskKey) => {
    const updated = { ...checkedTasks, [taskKey]: !checkedTasks[taskKey] };
    setCheckedTasks(updated);
    try {
      localStorage.setItem('bam_checked_study_tasks', JSON.stringify(updated));
    } catch (e) {}
  };

  const activePlan = plans.find(p => p.id === activePlanId) || plans[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
            <Compass className="w-3.5 h-3.5" />
            Strategic Study Roadmaps
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'बैंकिंग तैयारी अध्ययन योजनाएं (Study Roadmaps)' : 'Banking Awareness Study Roadmaps'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? '30-दिन क्रैश कोर्स, 60-दिन संपूर्ण तैयारी और 90-दिन टॉपर रोडमैप।'
              : 'Structured day-by-day task schedules designed to take you from Zero to 35+ in SBI/IBPS/RRB Clerk Mains.'}
          </p>
        </div>
      </div>

      {/* Plan Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {plans.map((p) => {
          const isSelected = p.id === activePlanId;
          return (
            <button
              key={p.id}
              onClick={() => setActivePlanId(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-bank-500 bg-bank-50/50 dark:bg-bank-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-bank-600">
                  {p.duration_days} Days
                </span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                {p.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {p.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Plan Detail */}
      {activePlan && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {activePlan.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target: {activePlan.target_audience}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-bank-600" />
                <span>{activePlan.daily_time_commitment}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>{activePlan.phases?.length || 0} Phased Blocks</span>
              </div>
            </div>
          </div>

          {/* Phased Breakdown */}
          <div className="space-y-4">
            {activePlan.phases?.map((phase, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-bank-600" />
                    <span>{phase.phase_name}</span>
                  </div>
                  <span className="text-xs font-bold text-bank-600 dark:text-bank-400 bg-bank-50 dark:bg-bank-950/40 px-2.5 py-0.5 rounded-lg">
                    {phase.days}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Core Focus: </strong>{phase.focus}
                </p>

                {phase.daily_checklist && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Milestone Action Items:
                    </div>
                    {phase.daily_checklist.map((task, tIdx) => {
                      const taskKey = `${activePlan.id}_${pIdx}_${tIdx}`;
                      const isChecked = !!checkedTasks[taskKey];
                      return (
                        <div
                          key={tIdx}
                          onClick={() => toggleTask(taskKey)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors text-xs text-slate-700 dark:text-slate-300 select-none"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className={isChecked ? 'line-through text-slate-400' : ''}>
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
