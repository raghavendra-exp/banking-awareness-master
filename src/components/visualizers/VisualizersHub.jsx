// src/components/visualizers/VisualizersHub.jsx
import React, { useState } from 'react';
import { Sliders, ShieldAlert, Zap, Layers, Table } from 'lucide-react';
import RbiPolicyVisualizer from './RbiPolicyVisualizer';
import NpaLifecycleVisualizer from './NpaLifecycleVisualizer';
import UpiTransactionFlow from './UpiTransactionFlow';
import BaselCapitalPyramid from './BaselCapitalPyramid';
import PaymentComparisonMatrix from './PaymentComparisonMatrix';

export default function VisualizersHub({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('rbi');

  const tabs = [
    { id: 'rbi', label: lang === 'hi' ? 'RBI मौद्रिक नीति' : 'RBI Policy Simulator', icon: Sliders, badge: 'Live Transmission' },
    { id: 'npa', label: lang === 'hi' ? 'NPA जीवन चक्र' : 'NPA Lifecycle & Recovery', icon: ShieldAlert, badge: 'Day 0 to 450+' },
    { id: 'upi', label: lang === 'hi' ? 'UPI प्रवाह' : 'UPI Transaction Route', icon: Zap, badge: 'High Speed Routing' },
    { id: 'basel', label: lang === 'hi' ? 'बासेल III पिरामिड' : 'Basel III & CRAR', icon: Layers, badge: 'Capital Stack' },
    { id: 'payments', label: lang === 'hi' ? 'भुगतान मैट्रिक्स' : 'Payment Systems Matrix', icon: Table, badge: '7 Systems Compared' }
  ];

  return (
    <div className="space-y-6">
      {/* Visualizers Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-bank-600 text-white border-bank-600 shadow-md shadow-bank-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visualizer Body */}
      <div>
        {activeTab === 'rbi' && <RbiPolicyVisualizer lang={lang} />}
        {activeTab === 'npa' && <NpaLifecycleVisualizer lang={lang} />}
        {activeTab === 'upi' && <UpiTransactionFlow lang={lang} />}
        {activeTab === 'basel' && <BaselCapitalPyramid lang={lang} />}
        {activeTab === 'payments' && <PaymentComparisonMatrix lang={lang} />}
      </div>
    </div>
  );
}
