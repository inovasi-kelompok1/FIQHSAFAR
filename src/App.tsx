import React, { useState, useRef, useEffect } from 'react';
import JourneyCalculator from './components/JourneyCalculator';
import ResultCard from './components/ResultCard';
import GuideTab from './components/GuideTab';
import DalilTab from './components/DalilTab';
import { analyzeJourney } from './utils/distance';
import { City, TravelMode, JourneyDetails } from './types';
import { CITIES } from './data/cities';
import { 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Landmark, 
  Compass, 
  BookOpen, 
  Scale, 
  ArrowLeft, 
  RefreshCw, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Info,
  Menu,
  X,
  Home,
  Calculator,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home'); // Starts on separate landing page first!
  const [activeJourney, setActiveJourney] = useState<JourneyDetails | null>(null);
  const [activeMode, setActiveMode] = useState<TravelMode>('car');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // For navigating smooth jumps
  const topAnchorRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = (origin: City, destination: City, mode: TravelMode, departureTime: string) => {
    const details = analyzeJourney(origin, destination, mode, departureTime);
    setActiveJourney(details);
    setActiveMode(mode);
    setShowResults(true);
    setCurrentTab('calculator');

    // Scroll to top of workspace area
    setTimeout(() => {
      topAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const loadSampleJourney = (originIndex: number, destinationIndex: number, mode: TravelMode, time: string) => {
    const o = CITIES[originIndex];
    const d = CITIES[destinationIndex];
    if (o && d) {
      handleAnalyze(o, d, mode, time);
    }
  };

  const handleResetSearch = () => {
    setActiveJourney(null);
    setShowResults(false);
    topAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={topAnchorRef} className={`min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950 antialiased transition-colors duration-200 ${theme === 'dark' ? 'dark bg-[#0b1329] text-slate-100' : 'bg-[#f3f4f6] text-slate-900'}`}>
      
      {/* Top Navbar / Branding Area */}
      <header className="bg-emerald-900/95 backdrop-blur-md text-white border-b border-emerald-950/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo and Title */}
            <div 
              onClick={() => {
                setCurrentTab('home');
                setMobileMenuOpen(false);
              }} 
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 select-none group transition-all"
            >
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/20 text-white shadow-inner">
                <Compass className="w-5.5 h-5.5 sm:w-6 sm:h-6 animate-[spin_60s_linear_infinite] text-amber-400 group-hover:text-amber-300 transition-colors" />
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/20 group-hover:border-amber-400/40 animate-[spin_30s_linear_infinite_reverse]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white leading-none">
                  FIQH<span className="text-amber-400">SAFAR</span>
                </h1>
                <p className="text-[9px] text-emerald-200/90 font-sans tracking-widest uppercase font-bold mt-1.5 opacity-90">
                  Muslim Musafir Planner
                </p>
              </div>
            </div>

            {/* Desktop Navigation (Laptops, Tablets) */}
            <nav className="hidden md:flex items-center gap-1 bg-emerald-950/40 p-1 rounded-xl border border-emerald-800/30">
              <button
                onClick={() => {
                  setCurrentTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-sm'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentTab('calculator');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentTab === 'calculator'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-sm'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Kalkulator</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('guide');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentTab === 'guide'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-sm'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Niat &amp; Cara</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('dalil');
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentTab === 'dalil'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-sm'
                    : 'text-emerald-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Dalil &amp; Madzhab</span>
              </button>
            </nav>

            {/* Theme Switcher and controls container */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 sm:p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 text-emerald-100 hover:text-amber-400 border border-emerald-800/40 transition-all cursor-pointer focus:outline-none flex items-center justify-center shadow-inner"
                title={theme === 'light' ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
                )}
              </button>

              {/* Mobile / Tablet Small Toggle Button (Garis 3 / Hamburger Icon) */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-950/40 text-emerald-100 hover:text-white border border-emerald-800/40 hover:bg-emerald-950/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-emerald-900"
                  aria-controls="mobile-menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Buka menu utama</span>
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-amber-400 block" aria-hidden="true" />
                  ) : (
                    <Menu className="w-6 h-6 text-emerald-50 block" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state with motion.div for premium feel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-emerald-950/95 border-t border-emerald-900 shadow-xl"
            >
              <div className="px-3 py-4 space-y-2.5 max-w-7xl mx-auto">
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center gap-3.5 cursor-pointer border ${
                    currentTab === 'home'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-lg'
                      : 'text-emerald-100 bg-emerald-900/40 border-emerald-800/30 hover:bg-emerald-900/80'
                  }`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">Beranda</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('calculator');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center gap-3.5 cursor-pointer border ${
                    currentTab === 'calculator'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-lg'
                      : 'text-emerald-100 bg-emerald-900/40 border-emerald-800/30 hover:bg-emerald-900/80'
                  }`}
                >
                  <Calculator className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">Kalkulator Safar</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('guide');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center gap-3.5 cursor-pointer border ${
                    currentTab === 'guide'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-lg'
                      : 'text-emerald-100 bg-emerald-900/40 border-emerald-800/30 hover:bg-emerald-900/80'
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">Niat &amp; Cara Salat</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('dalil');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center gap-3.5 cursor-pointer border ${
                    currentTab === 'dalil'
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-lg'
                      : 'text-emerald-100 bg-emerald-900/40 border-emerald-800/30 hover:bg-emerald-900/80'
                  }`}
                >
                  <Scale className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">Dalil &amp; Madzhab Fikih</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Render Area */}
      <main className="flex-grow flex flex-col w-full">
        
        {/* Tab 1: Pristine Landing Page (Home View) */}
        {currentTab === 'home' && (
          <div className="w-full flex flex-col space-y-12 sm:space-y-16 animate-fade-in py-8 sm:py-12">
            
            {/* HERO MODULE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 rounded-3xl p-6 sm:p-12 text-white shadow-xl border border-emerald-800/60 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 min-h-[500px]">
                {/* Decorative glow elements */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-1" />
                <div className="absolute left-0 bottom-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-1" />

                <div className="space-y-6 lg:max-w-xl z-10 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/15 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-white/5 mx-auto lg:mx-0">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fiqih Safar Madzhab Syafi'i</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white uppercase">
                    Pahami Keringanan Shalat saat <span className="text-amber-400 font-black">Safar</span> Anda
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                    Dapatkan kemudahan dan ketetapan hukum melintasi wilayah di Indonesia secara real-time. Hitung jarak kelayakan 16 Farsakh (82 KM) untuk menggunakan rukhsah shalat jamak dan qashar secara tepat, terpercaya, dan sesuai syariat.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={() => setCurrentTab('calculator')}
                      className="w-full sm:w-auto px-6 py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-emerald-950 font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
                    >
                      <span>Mulai Kalkulasi Rute</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentTab('guide')}
                      className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white font-bold text-sm tracking-wider uppercase rounded-xl border border-white/15 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 shrink-0 text-amber-300" />
                      <span>Pelajari Tata Cara</span>
                    </button>
                  </div>
                </div>

                {/* Hero Right Visual Column: Interactive Mock status cards */}
                <div className="w-full lg:w-auto shrink-0 flex flex-col gap-4 self-center max-w-md w-full z-10">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-emerald-200">Surabaya ➔ Yogyakarta</span>
                        <span className="block text-xs font-bold">Rute Terverifikasi Safar</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs py-1 border-t border-white/10 text-emerald-100/80">
                      <span>Jarak Perjalanan:</span>
                      <span className="font-mono font-bold text-amber-300">321.4 KM</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-100/80">
                      <span>Ketetapan Fikih:</span>
                      <span className="font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] border border-emerald-400/30">
                        SAH JAMAK &amp; QASHAR
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 shadow text-left flex items-start gap-3">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-emerald-100/80 leading-relaxed italic">
                      "Sesungguhnya Allah menyukai jika kemudahan-Nya (rukhsah) dilaksanakan sebagaimana Dia tidak menyukai jika kemaksiatan kepada-Nya dikerjakan." (HR. Ahmad)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES SECTION (3-COLUMN GRID) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-extrabold text-emerald-800 tracking-widest font-mono">
                  Mengapa FiqhSafar?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
                  Tiga Pilar Kemudahan Ibadah di Perjalanan
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                  Layanan terintegrasi yang disesuaikan secara khusus bagi kebutuhan umat Islam di Indonesia dalam bepergian jauh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* feature 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Kalkulasi Presisi 16 Farsakh</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Menghitung jarak antar-kota terperinci dari 140+ wilayah di Indonesia demi memastikan perjalanan Anda mencapai batas minimal safar ijtihad <strong>(82 KM)</strong> secara sah.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('calculator')} 
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
                  >
                    <span>Kalkulator Rute</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* feature 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-700" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Lafadz Niat &amp; Bimbingan Praktis</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Dilengkapi panduan langkah-demi-langkah (step-by-step) shalat Jamak Taqdim, Takhir, serta Qashar yang tertata rapi beserta teks transliterasi arab dan latin.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('guide')} 
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
                  >
                    <span>Buka Panduan Niat</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* feature 3 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Komparasi Madzhab Fikih</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Memberikan wawasan ijtihad hukum dari empat mazhab besar (Syafi'i, Hanafi, Maliki, Hambali) yang bersumber dari dalil Al-Qur'an dan Sunnah yang tepercaya.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('dalil')} 
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
                  >
                    <span>Pelajari Dalil Syar'i</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE SAMPLE SIMULATIONS ON HOMEPAGE */}
            <section className="bg-white dark:bg-[#0f1b3a] border-y border-slate-200/60 dark:border-slate-800 py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-mono">
                    Simulasi Instan Tanpa Mengetik
                  </span>
                  <h4 className="text-lg font-bold text-slate-800">Coba Langsung Simulasi Rute Populer</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button
                    onClick={() => loadSampleJourney(66, 61, 'car', '08:00')} // Surabaya to Yogyakarta
                    className="p-4 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-950 font-bold text-xs rounded-xl border border-slate-200 transition-all text-left flex items-center justify-between shadow-sm group cursor-pointer"
                  >
                    <div>
                      <span className="block font-extrabold text-[#064e3b]">Surabaya ➔ Yogyakarta</span>
                      <span className="block text-[10px] font-medium text-slate-400 mt-1">Car Mode • 325 KM (SAH Rukhsah)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </button>

                  <button
                    onClick={() => loadSampleJourney(0, 9, 'car', '13:00')} // Jakarta Pusat to Depok
                    className="p-4 bg-white hover:bg-rose-50 hover:border-rose-300 text-slate-700 hover:text-rose-950 font-bold text-xs rounded-xl border border-slate-200 transition-all text-left flex items-center justify-between shadow-sm group cursor-pointer"
                  >
                    <div>
                      <span className="block font-extrabold text-rose-800">Jakarta ➔ Depok</span>
                      <span className="block text-[10px] font-medium text-slate-400 mt-1">Car Mode • 20 KM (Jarak Terlalu Dekat)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-rose-700 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </button>

                  <button
                    onClick={() => loadSampleJourney(75, 71, 'air', '16:45')} // Medan to Banda Aceh
                    className="p-4 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-950 font-bold text-xs rounded-xl border border-slate-200 transition-all text-left flex items-center justify-between shadow-sm group cursor-pointer"
                  >
                    <div>
                      <span className="block font-extrabold text-[#064e3b]">Medan ➔ Banda Aceh</span>
                      <span className="block text-[10px] font-medium text-slate-400 mt-1">Flight Mode • 430 KM (SAH Rukhsah)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Tab 2: Journey Calculator & Results Workspace */}
        {currentTab === 'calculator' && (
          <div className="w-full">
            
            {/* WORKSPACE PRE-SEARCH STATUS screen */}
            {!showResults ? (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
                
                {/* Back Link to Home */}
                <button
                  onClick={() => setCurrentTab('home')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Beranda Utama
                </button>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Kalkulasi Mandiri Rute Perjalanan</h2>
                  <p className="text-xs sm:text-sm text-slate-550 max-w-xl mx-auto">
                    Masukkan nama kota di Indonesia pada kolom asal dan tujuan di bawah ini untuk melihat keabsahan status rukhsah jamak qashar Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column Form widget */}
                  <div className="lg:col-span-2 shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                    <JourneyCalculator
                      onAnalyze={handleAnalyze}
                      savedOrigin={activeJourney?.origin}
                      savedDestination={activeJourney?.destination}
                      savedMode={activeMode}
                      savedDepartureTime={activeJourney?.departureTime}
                    />
                  </div>

                  {/* Right Column quick rules sheet */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <h4 className="font-bold text-emerald-900 text-sm border-b border-slate-100 pb-3">Syarat Rukhsah Safar</h4>
                      <ul className="space-y-3.5 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Jarak Minimal:</strong> Minimal 16 Farsakh atau setara ±82 KM.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Tujuan Perjalanan:</strong> Mubah / Baik dan bukan bertujuan untuk maksiat.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Masa Tinggal:</strong> Maksimal 3 hari di tujuan (tidak termasuk hari berangkat &amp; kembali).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Batas Wilayah:</strong> Rukhsah baru boleh dipraktikkan setelah melewati batas desa/kota asal.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Fun statistics card */}
                    <div className="bg-[#ecfdf5] border border-emerald-200 rounded-2xl p-5 shadow-sm text-center">
                      <Compass className="w-8 h-8 text-emerald-700 mx-auto animate-pulse mb-2" />
                      <span className="block text-xs font-bold text-emerald-950">Database Handal</span>
                      <span className="block text-[11px] text-emerald-800/80 mt-1 leading-relaxed">
                        Kalkulasi kami diperkuat koordinat geografis nyata dari 143 Kota/Kabupaten utama di Indonesia.
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* ACTIVE JOURNEY ANALYSIS RESULTS VIEW */
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in-up">
                
                {/* Back button and title strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={handleResetSearch}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                       Kembali ke Pencarian Rute
                    </button>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Hasil Analisis &amp; Rencana Perjalanan
                    </h2>
                  </div>

                  {/* Refresher Action */}
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-colors shadow-sm cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ubah Rute / Transportasi</span>
                  </button>
                </div>

                {/* Side-by-side or split layout showing computed statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column: Result reports */}
                  <div className="lg:col-span-2 space-y-6">
                    {activeJourney && (
                      <ResultCard
                        journey={activeJourney}
                        mode={activeMode}
                        onNavigateToGuide={() => {
                          setCurrentTab('guide');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    )}
                  </div>

                  {/* Right Column: Mini Inputs configuration status & guidelines */}
                  <div className="space-y-6 lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Konfigurasi Terpilih
                      </h4>

                      <div className="space-y-3.5 text-xs text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Kota Asal:</span>
                          <span className="font-bold text-slate-800">{activeJourney?.origin.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Kota Tujuan:</span>
                          <span className="font-bold text-slate-800">{activeJourney?.destination.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Keberangkatan:</span>
                          <span className="font-bold text-slate-800">{activeJourney?.departureTime} WIB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Modus Armada:</span>
                          <span className="font-bold text-slate-800 capitalize">
                            {activeMode === 'car' ? 'Mobil/Bus' : activeMode === 'train' ? 'Kereta Api' : 'Pesawat Udara'}
                          </span>
                        </div>
                        
                        <hr className="border-slate-100" />

                        <div className="space-y-2">
                          <span className="text-slate-500 font-medium block">Hukum Safar Syar'i (Mazhab Syafi'i):</span>
                          {activeJourney?.isAllowedShafii ? (
                            <p className="text-xs text-emerald-800 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-100/60 leading-relaxed">
                              ✓ Perjalanan Anda sejauh <strong>{activeJourney.distanceKm} KM</strong> sah mengajukan jamak qashar karena telah melampaui batas minimal 82 KM.
                            </p>
                          ) : (
                            <p className="text-xs text-rose-800 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-100/60 leading-relaxed">
                              ✕ Perjalanan Anda berjarak di bawah 82 KM. Anda wajib mengerjakan shalat fardhu secara sempurna (tamam).
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Educational Shortcuts to tabs */}
                    <div className="bg-[#ecfdf5] border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <h4 className="font-bold text-emerald-950 text-sm">Butuh Lafadz Niat Shalat?</h4>
                      <p className="text-xs text-emerald-800/90 leading-relaxed">
                        Kami menyediakan bimbingan lafadz niat jama' taqdim/takhir arab, latin, beserta urutan lengkap pengerjaannya.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('guide');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 bg-emerald-800 text-white hover:bg-emerald-900 rounded-xl font-bold text-xs transition-colors shadow cursor-pointer"
                      >
                        Buka Panduan Niat Shalat
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* SCREEN 3: Niat & Tata Cara Tab */}
        {currentTab === 'guide' && (
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <GuideTab />
          </div>
        )}

        {/* SCREEN 4: Legal Foundation & Evidence Tab */}
        {currentTab === 'dalil' && (
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <DalilTab />
          </div>
        )}

      </main>

      {/* Global Brand Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 text-xs shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-white font-bold text-sm tracking-widest uppercase">FIQHSAFAR</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Platform rujukan bimbingan dan kalkulasi kelayakan rukhshah shalat jamak qashar bagi kaum musafir Muslim di Indonesia mengacu pada ijtihad 4 Mazhab.
              </p>
            </div>
            
            <div className="flex gap-4 font-bold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Rujukan Syar'i</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Landmark className="w-4 h-4 text-emerald-500" />
                <span>Edukasi Fikih</span>
              </span>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-[11px] text-center text-slate-500">
            <p>© 2026 FiqhSafar. Aplikasi ini dibuat sebagai referensi edukasi fikih perjalanan.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
