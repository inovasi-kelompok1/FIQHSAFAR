import React from 'react';
import { Compass, BookOpen, Scale, MapPin } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navigation({ currentTab, setCurrentTab }: NavigationProps) {
  const tabs = [
    { id: 'calculator', name: 'Kalkulator Rute', icon: MapPin },
    { id: 'guide', name: 'Niat & Tata Cara', icon: BookOpen },
    { id: 'dalil', name: 'Dalil & Madzhab', icon: Scale },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-emerald-900 border-b border-emerald-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)] group">
              <Compass className="w-7 h-7 animate-pulse group-hover:rotate-45 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/20 animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-2xl font-sans font-bold tracking-tight text-white flex items-center gap-2">
                FIQH<span className="text-amber-400 font-medium">SAFAR</span>
              </h1>
              <p className="text-[9px] text-emerald-200/95 font-sans tracking-widest uppercase font-bold mt-1 opacity-95">
                Panduan Shalat Musafir Autopilot
              </p>
            </div>
          </div>

          {/* Desktop/Tablet Navigation Menu */}
          <nav className="flex items-center gap-1 rounded-xl bg-emerald-950/60 p-1 border border-emerald-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-emerald-950 shadow-md font-semibold'
                      : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-950' : 'text-emerald-300'}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
