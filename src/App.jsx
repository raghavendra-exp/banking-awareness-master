// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  Landmark,
  Compass,
  Sliders,
  Target,
  Zap,
  Award,
  BookOpen,
  ArrowRightLeft,
  Calendar,
  Layers,
  Search,
  Languages,
  Moon,
  Sun,
  ShieldCheck,
  AlertOctagon,
  Bookmark,
  Database,
  History,
  Activity,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

// Modules
import Dashboard from './components/dashboard/Dashboard';
import ConceptLearner from './components/learn/ConceptLearner';
import VisualizersHub from './components/visualizers/VisualizersHub';
import PracticeArena from './components/practice/PracticeArena';
import SpeedLab from './components/practice/SpeedLab';
import QuestionSelectionTrainer from './components/practice/QuestionSelectionTrainer';
import ExamSimulator from './components/mock/ExamSimulator';

// Tools
import ConfusionBuster from './components/tools/ConfusionBuster';
import BankingDictionary from './components/tools/BankingDictionary';
import BankingTimeline from './components/tools/BankingTimeline';
import RbiRateTracker from './components/tools/RbiRateTracker';
import GovernmentSchemesExplorer from './components/tools/GovernmentSchemesExplorer';
import InstitutionsDirectory from './components/tools/InstitutionsDirectory';
import DailyCapsule from './components/tools/DailyCapsule';
import FlashcardDeck from './components/tools/FlashcardDeck';
import RevisionMistakes from './components/tools/RevisionMistakes';
import StudyPlans from './components/tools/StudyPlans';
import QuestionImporter from './components/tools/QuestionImporter';
import BookmarksViewer from './components/tools/BookmarksViewer';
import PyqAnalytics from './components/analytics/PyqAnalytics';

// Common
import GlobalSearchModal from './components/common/GlobalSearchModal';
import { dataManager } from './utils/dataManager';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  // Initialize settings from localStorage
  useEffect(() => {
    const settings = dataManager.getSettings();
    if (settings.darkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    if (settings.language) {
      setLang(settings.language);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    dataManager.saveSettings({ darkMode: next, language: lang });
  };

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    dataManager.saveSettings({ darkMode, language: next });
  };

  const navItems = [
    { id: 'dashboard', label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: Landmark },
    { id: 'learn', label: lang === 'hi' ? 'अवधारणाएं' : 'Concepts', icon: BookOpen },
    { id: 'visualizers', label: lang === 'hi' ? 'सिम्युलेटर' : 'Visualizers', icon: Sliders },
    { id: 'practice', label: lang === 'hi' ? 'अभ्यास' : 'Practice', icon: Target },
    { id: 'speed_lab', label: lang === 'hi' ? 'स्पीड लैब' : 'Speed Lab', icon: Zap },
    { id: 'mocks', label: lang === 'hi' ? 'मॉक टेस्ट' : 'Full Mocks', icon: Award }
  ];

  const toolItems = [
    { id: 'confusion_buster', label: 'Confusion Buster', icon: ArrowRightLeft, desc: '15+ high-confusion banking pairs' },
    { id: 'dictionary', label: 'Banking Dictionary', icon: BookOpen, desc: '40+ statutory terms & definitions' },
    { id: 'timeline', label: 'Evolution Timeline', icon: History, desc: '1770 to 2026 historical milestones' },
    { id: 'rate_tracker', label: 'RBI Rate Tracker', icon: Activity, desc: 'Current rates, SDF, MSF & CRR' },
    { id: 'schemes', label: 'Government Schemes', icon: ShieldCheck, desc: 'PMJDY, MUDRA, APY & limits' },
    { id: 'institutions', label: 'Institutions Directory', icon: Landmark, desc: 'RBI, SEBI, NABARD, SIDBI, NaBFID' },
    { id: 'daily_capsule', label: 'Today’s Capsule', icon: Calendar, desc: 'Daily routine & study streak' },
    { id: 'flashcards', label: 'Flashcard Deck', icon: Layers, desc: 'Spaced repetition active recall' },
    { id: 'selection_trainer', label: 'Strategy Trainer', icon: Compass, desc: 'First 5-minute question triage' },
    { id: 'pyq_analytics', label: 'PYQ Shift Analytics', icon: Landmark, desc: '5-tier priority matrix & trends' },
    { id: 'mistakes', label: 'Wrong Answer Notebook', icon: AlertOctagon, desc: 'Personal mistake error review' },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark, desc: 'Last 24-hour saved questions' },
    { id: 'study_plans', label: 'Study Roadmaps', icon: Compass, desc: '30, 60, 90-day task schedules' },
    { id: 'backup', label: 'Backup & Sync', icon: Database, desc: 'Export or restore JSON snapshot' }
  ];

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-bank-600 dark:bg-bank-500 text-white flex items-center justify-center shadow-md shadow-bank-600/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-base text-slate-900 dark:text-white tracking-tight leading-none">
                BANKING AWARENESS MASTER
              </div>
              <div className="text-[10px] font-bold text-bank-600 dark:text-bank-400 mt-0.5 tracking-wide uppercase">
                SBI Clerk • IBPS Clerk/CSA • RRB OA
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-bank-50 dark:bg-bank-950/60 text-bank-600 dark:text-bank-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Tools Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  toolItems.some(t => t.id === activeTab)
                    ? 'bg-bank-50 dark:bg-bank-950/60 text-bank-600 dark:text-bank-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>Tools Hub</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Tools Dropdown Menu */}
              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-fadeIn max-h-96 overflow-y-auto">
                  {toolItems.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleNavigate(tool.id)}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors flex items-start gap-2.5 group"
                      >
                        <ToolIcon className="w-4 h-4 text-bank-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-bank-600">
                            {tool.label}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Controls: Search, Lang, Dark Mode, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button (Ctrl + K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-all"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline font-mono text-[11px] text-slate-400">Ctrl+K</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Toggle English / हिंदी"
            >
              <Languages className="w-3.5 h-3.5 text-bank-600" />
              <span className="uppercase text-[11px]">{lang}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">Core Modules</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 ${
                  activeTab === item.id ? 'bg-bank-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}

            <div className="text-[10px] uppercase font-bold text-slate-400 px-3 pt-3 pb-1 border-t border-slate-100 dark:border-slate-800">
              High-Yield Tools & Features
            </div>
            {toolItems.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleNavigate(tool.id)}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                  activeTab === tool.id ? 'bg-bank-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <tool.icon className="w-4 h-4 text-bank-500" />
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={handleNavigate} lang={lang} />}
        {activeTab === 'learn' && <ConceptLearner onStartPractice={() => handleNavigate('practice')} lang={lang} />}
        {activeTab === 'visualizers' && <VisualizersHub lang={lang} />}
        {activeTab === 'practice' && <PracticeArena lang={lang} onToggleLang={toggleLanguage} />}
        {activeTab === 'speed_lab' && <SpeedLab lang={lang} />}
        {activeTab === 'selection_trainer' && <QuestionSelectionTrainer lang={lang} />}
        {activeTab === 'mocks' && <ExamSimulator lang={lang} />}

        {/* Specialized Tools */}
        {activeTab === 'confusion_buster' && <ConfusionBuster lang={lang} />}
        {activeTab === 'dictionary' && <BankingDictionary lang={lang} />}
        {activeTab === 'timeline' && <BankingTimeline lang={lang} />}
        {activeTab === 'rate_tracker' && <RbiRateTracker lang={lang} />}
        {activeTab === 'schemes' && <GovernmentSchemesExplorer lang={lang} />}
        {activeTab === 'institutions' && <InstitutionsDirectory lang={lang} />}
        {activeTab === 'daily_capsule' && <DailyCapsule lang={lang} />}
        {activeTab === 'flashcards' && <FlashcardDeck lang={lang} />}
        {activeTab === 'pyq_analytics' && <PyqAnalytics lang={lang} />}
        {activeTab === 'mistakes' && <RevisionMistakes lang={lang} />}
        {activeTab === 'bookmarks' && <BookmarksViewer lang={lang} />}
        {activeTab === 'study_plans' && <StudyPlans lang={lang} />}
        {activeTab === 'backup' && <QuestionImporter lang={lang} />}
      </main>

      {/* Global Search Modal (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={(target) => handleNavigate(target)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-bank-600 text-white flex items-center justify-center font-bold">
                B
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">BANKING AWARENESS MASTER</span>
              <span>— Comprehensive Preparation Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Offline & Client-Side LocalStorage
              </span>
              <span>•</span>
              <span>GitHub Pages Ready</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              Grounded strictly in official notifications of RBI, Ministry of Finance, SEBI, NABARD, SIDBI, and NPCI.
            </div>
            <div>
              Designed for SBI Clerk, IBPS Clerk/CSA & IBPS RRB Office Assistant Aspirants.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
