// src/components/tools/QuestionImporter.jsx
import React, { useState } from 'react';
import { Download, Upload, ShieldCheck, Database, AlertCircle, CheckCircle2 } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function QuestionImporter({ lang = 'en' }) {
  const [importStatus, setImportStatus] = useState(null);

  const handleExport = () => {
    dataManager.exportBackupData();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      const res = dataManager.importBackupData(content);
      setImportStatus(res);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
          <Database className="w-3.5 h-3.5" />
          Data Portability & Backup Center
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'hi' ? 'डेटा बैकअप और एक्सपोर्ट सेंटर' : 'Data Backup, Restore & Sync Center'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'hi'
            ? 'अपनी अध्ययन प्रगति, गलतियों की नोटबुक और मॉक टेस्ट के परिणाम सुरक्षित JSON फ़ाइल में बैकअप करें।'
            : 'Export or restore a 100% complete offline snapshot of your readiness score, wrong answer notebook, and saved bookmarks.'}
        </p>
      </div>

      {/* Export / Import Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {/* Export Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-bank-100 dark:bg-bank-950/60 text-bank-600 dark:text-bank-400 flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Download JSON Backup
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Saves a portable JSON archive with your streak, full wrong-answer notebook, bookmarked questions, and mock exam test history.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-bank-600 hover:bg-bank-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export My Data (.json)
          </button>
        </div>

        {/* Import Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Restore from Backup
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Restore your study history, mistake notebook, and bookmarks on any device without logging in or cloud sync.
            </p>
          </div>
          <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs">
            <Upload className="w-4 h-4 text-bank-600" />
            <span>Select Backup File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Status Message */}
      {importStatus && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
          importStatus.success
            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {importStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Security Note */}
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>100% Client-side. Your study progress never leaves your browser.</span>
      </div>
    </div>
  );
}
