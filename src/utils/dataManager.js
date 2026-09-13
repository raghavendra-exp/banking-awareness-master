// src/utils/dataManager.js
// Client-side LocalStorage Data Manager with Backup & Restore

const STORAGE_KEYS = {
  USER_PROGRESS: 'bam_user_progress',
  MISTAKES: 'bam_mistakes_notebook',
  BOOKMARKS: 'bam_bookmarked_questions',
  MOCK_HISTORY: 'bam_mock_history',
  DAILY_CAPSULE: 'bam_daily_capsule',
  CUSTOM_QUESTIONS: 'bam_custom_questions',
  STUDY_STREAK: 'bam_study_streak',
  USER_SETTINGS: 'bam_user_settings'
};

// Default initial state
const defaultProgress = {
  readinessScore: 42,
  topicsMastery: {
    'RBI & Monetary Policy': 45,
    'Government Schemes': 50,
    'Payment Systems': 40,
    'Banking Regulations': 35,
    'Financial Markets': 30,
    'Banking Terminology': 55,
    'Institutions & Committees': 40,
    'Current Affairs': 35
  },
  totalPracticed: 0,
  totalCorrect: 0,
  lastActive: new Date().toISOString()
};

const defaultSettings = {
  language: 'en', // 'en' | 'hi'
  darkMode: false,
  soundEffects: true,
  timerSeconds: 15 // for speed lab
};

export const dataManager = {
  // --- USER SETTINGS ---
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch (e) {
      console.error('Error reading settings:', e);
      return defaultSettings;
    }
  },
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  // --- USER PROGRESS & READINESS SCORE ---
  getProgress: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return data ? { ...defaultProgress, ...JSON.parse(data) } : defaultProgress;
    } catch (e) {
      console.error('Error reading progress:', e);
      return defaultProgress;
    }
  },
  recordPracticeResult: (topic, isCorrect) => {
    try {
      const progress = dataManager.getProgress();
      progress.totalPracticed = (progress.totalPracticed || 0) + 1;
      if (isCorrect) progress.totalCorrect = (progress.totalCorrect || 0) + 1;

      // Update topic mastery incrementally
      const currentMastery = progress.topicsMastery[topic] || 30;
      const adjustment = isCorrect ? 2 : -1.5;
      progress.topicsMastery[topic] = Math.min(100, Math.max(0, Math.round(currentMastery + adjustment)));

      // Compute Banking Readiness Score (0 - 100)
      const topicValues = Object.values(progress.topicsMastery);
      const avgMastery = topicValues.reduce((a, b) => a + b, 0) / (topicValues.length || 1);
      const accuracyBonus = progress.totalPracticed > 10 ? (progress.totalCorrect / progress.totalPracticed) * 20 : 10;
      progress.readinessScore = Math.min(100, Math.round(avgMastery * 0.8 + accuracyBonus));
      progress.lastActive = new Date().toISOString();

      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      dataManager.updateStreak();
      return progress;
    } catch (e) {
      console.error('Error recording practice result:', e);
    }
  },

  // --- STREAK TRACKING ---
  updateStreak: () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const streakData = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_STREAK) || '{"streak": 1, "lastDate": ""}');
      if (streakData.lastDate === today) return streakData.streak;

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakData.lastDate === yesterday) {
        streakData.streak += 1;
      } else {
        streakData.streak = 1;
      }
      streakData.lastDate = today;
      localStorage.setItem(STORAGE_KEYS.STUDY_STREAK, JSON.stringify(streakData));
      return streakData.streak;
    } catch (e) {
      return 1;
    }
  },
  getStreak: () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_STREAK) || '{"streak": 1}');
      return data.streak || 1;
    } catch (e) {
      return 1;
    }
  },

  // --- WRONG ANSWERS NOTEBOOK ---
  getMistakes: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MISTAKES) || '[]');
    } catch (e) {
      return [];
    }
  },
  logMistake: (question, chosenOptionIndex, notes = '') => {
    try {
      const mistakes = dataManager.getMistakes();
      const existingIdx = mistakes.findIndex(m => m.questionId === question.id);
      const entry = {
        questionId: question.id,
        question: question.question,
        question_hi: question.question_hi,
        options: question.options,
        correct_option: question.correct_option,
        chosen_option: chosenOptionIndex,
        explanation: question.explanation,
        exam_shortcut: question.exam_shortcut,
        topic: question.topic,
        provenance: question.provenance,
        timestamp: new Date().toISOString(),
        reviewCount: existingIdx >= 0 ? (mistakes[existingIdx].reviewCount || 1) + 1 : 1,
        resolved: false,
        notes: notes || 'Need to review this trap'
      };

      if (existingIdx >= 0) {
        mistakes[existingIdx] = entry;
      } else {
        mistakes.unshift(entry);
      }
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
      return mistakes;
    } catch (e) {
      console.error('Error logging mistake:', e);
    }
  },
  resolveMistake: (questionId) => {
    try {
      const mistakes = dataManager.getMistakes().map(m =>
        m.questionId === questionId ? { ...m, resolved: true } : m
      );
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
      return mistakes;
    } catch (e) {
      console.error('Error resolving mistake:', e);
    }
  },
  clearMistakes: () => {
    localStorage.removeItem(STORAGE_KEYS.MISTAKES);
  },

  // --- BOOKMARKS ---
  getBookmarks: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
    } catch (e) {
      return [];
    }
  },
  toggleBookmark: (question) => {
    try {
      const bookmarks = dataManager.getBookmarks();
      const exists = bookmarks.some(b => b.id === question.id);
      let updated;
      if (exists) {
        updated = bookmarks.filter(b => b.id !== question.id);
      } else {
        updated = [{ ...question, bookmarkedAt: new Date().toISOString() }, ...bookmarks];
      }
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      return !exists;
    } catch (e) {
      console.error('Error toggling bookmark:', e);
      return false;
    }
  },
  isBookmarked: (questionId) => {
    try {
      const bookmarks = dataManager.getBookmarks();
      return bookmarks.some(b => b.id === questionId);
    } catch (e) {
      return false;
    }
  },

  // --- MOCK TEST HISTORY ---
  getMockHistory: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOCK_HISTORY) || '[]');
    } catch (e) {
      return [];
    }
  },
  saveMockResult: (result) => {
    try {
      const history = dataManager.getMockHistory();
      const updated = [
        {
          ...result,
          id: 'mock_attempt_' + Date.now(),
          date: new Date().toISOString()
        },
        ...history
      ];
      localStorage.setItem(STORAGE_KEYS.MOCK_HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving mock result:', e);
    }
  },

  // --- DAILY CAPSULE COMPLETION ---
  isDailyCapsuleCompleted: () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const capsuleData = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_CAPSULE) || '{}');
      return capsuleData.date === today && capsuleData.completed;
    } catch (e) {
      return false;
    }
  },
  markDailyCapsuleComplete: () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEYS.DAILY_CAPSULE, JSON.stringify({ date: today, completed: true }));
    } catch (e) {
      console.error('Error marking daily capsule:', e);
    }
  },

  // --- BACKUP EXPORT & IMPORT ---
  exportBackupData: () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProgress: dataManager.getProgress(),
      mistakes: dataManager.getMistakes(),
      bookmarks: dataManager.getBookmarks(),
      mockHistory: dataManager.getMockHistory(),
      settings: dataManager.getSettings(),
      streak: dataManager.getStreak()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `banking-awareness-master-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  importBackupData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data.version) throw new Error('Invalid backup file format');
      if (data.userProgress) localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(data.userProgress));
      if (data.mistakes) localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(data.mistakes));
      if (data.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(data.bookmarks));
      if (data.mockHistory) localStorage.setItem(STORAGE_KEYS.MOCK_HISTORY, JSON.stringify(data.mockHistory));
      if (data.settings) localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(data.settings));
      return { success: true, message: 'Backup successfully restored!' };
    } catch (e) {
      return { success: false, message: 'Failed to import backup: ' + e.message };
    }
  }
};
