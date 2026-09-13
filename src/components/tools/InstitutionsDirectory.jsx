// src/components/tools/InstitutionsDirectory.jsx
import React, { useState, useEffect } from 'react';
import { Landmark, MapPin, Calendar, Award, AlertCircle, Building, Search, UserCheck } from 'lucide-react';

export default function InstitutionsDirectory({ lang = 'en' }) {
  const [institutions, setInstitutions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetch('./data/institutions.json')
      .then(res => res.json())
      .then(data => setInstitutions(data.institutions || []))
      .catch(err => console.error('Error loading institutions:', err));

    fetch('./data/appointments.json')
      .then(res => res.json())
      .then(data => setAppointments(data.appointments || []))
      .catch(err => console.error('Error loading appointments:', err));
  }, []);

  const filtered = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.headquarters.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (inst.role && inst.role.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedFilter === 'regulators') return matchesSearch && ['RBI', 'SEBI', 'IRDAI', 'PFRDA', 'IFSCA'].includes(inst.acronym);
    if (selectedFilter === 'aifi') return matchesSearch && ['NABARD', 'SIDBI', 'EXIM Bank', 'NHB', 'NaBFID'].includes(inst.acronym);
    return matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 mb-2">
            <Landmark className="w-3.5 h-3.5" />
            Institutional Architecture
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'नियामक संस्थान और AIFI निर्देशिका' : 'Regulatory Bodies & Financial Institutions Directory'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'RBI, SEBI, IRDAI, नाबार्ड, सिडबी और NaBFID का मुख्यालय, स्थापना अधिनियम और प्रमुख समितियां।'
              : 'Verified statutory details, headquarters locations, recommendation committees, and leadership of India’s apex financial institutions.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search institution, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bank-500 w-56"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 py-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedFilter === 'all' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          All Institutions ({institutions.length})
        </button>
        <button
          onClick={() => setSelectedFilter('regulators')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedFilter === 'regulators' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Apex Regulators (RBI, SEBI, IRDAI, PFRDA, IFSCA)
        </button>
        <button
          onClick={() => setSelectedFilter('aifi')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedFilter === 'aifi' ? 'bg-bank-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          The 5 AIFIs (NABARD, SIDBI, EXIM, NHB, NaBFID)
        </button>
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filtered.map((inst) => (
          <div
            key={inst.id}
            className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-bank-100 dark:bg-bank-950/60 text-bank-700 dark:text-bank-300">
                    {inst.acronym}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                    {inst.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{inst.headquarters.split(',')[0]}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 my-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-bank-600 shrink-0" />
                  <span><strong>Established:</strong> {inst.established}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-bank-600 shrink-0" />
                  <span><strong>Governing Act:</strong> {inst.governing_act}</span>
                </div>
                {inst.recommended_by && (
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Committee:</strong> {inst.recommended_by}</span>
                  </div>
                )}
                {inst.ownership && (
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Ownership:</strong> {inst.ownership}</span>
                  </div>
                )}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {inst.role}
                </p>
              </div>
            </div>

            {/* Exam Tip Alert */}
            {inst.exam_tip && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2 mt-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exam Tip: </span>
                  {inst.exam_tip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
