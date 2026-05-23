import React, { useState } from 'react';
import { NIAT_TAQDIM, NIAT_TAKHIR, STEP_BY_STEP_TAQDIM, STEP_BY_STEP_TAKHIR } from '../data/guides';
import { 
  Clipboard, 
  ShieldAlert, 
  CheckCircle, 
  ListChecks, 
  HelpCircle, 
  FileText 
} from 'lucide-react';

export default function GuideTab() {
  const [activeGuideType, setActiveGuideType] = useState<'taqdim' | 'takhir'>('taqdim');
  const [selectedNiatId, setSelectedNiatId] = useState<string>('');

  const currentNiats = activeGuideType === 'taqdim' ? NIAT_TAQDIM : NIAT_TAKHIR;
  const currentSteps = activeGuideType === 'taqdim' ? STEP_BY_STEP_TAQDIM : STEP_BY_STEP_TAKHIR;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white relative shadow-md">
        <div className="relative z-10 max-w-2xl">
          <span className="bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
            Panduan Edukasi
          </span>
          <h2 className="text-xl font-bold tracking-tight mb-2">Panduan Niat &amp; Tata Cara Shalat Musafir</h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Mempelajari lafadz niat shalat jamak qashar serta tata cara pengerjaan yang sah menurut syariat Fiqih Safar Mazhab Syafi'i.
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
          <HelpCircle className="w-40 h-40" />
        </div>
      </div>

      {/* Selector Tabs for Jamak Taqdim vs Jamak Ta'khir */}
      <div className="flex border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-1 bg-white dark:bg-slate-900/60">
        <button
          onClick={() => {
            setActiveGuideType('taqdim');
            setSelectedNiatId('');
          }}
          className={`flex-1 py-3 text-center rounded-l-lg text-sm font-semibold transition-all cursor-pointer ${
            activeGuideType === 'taqdim'
              ? 'bg-emerald-800 text-white shadow-md dark:bg-emerald-700'
              : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40'
          }`}
        >
          Shalat Jama’ Taqdim (Digabung di Waktu Awal)
        </button>
        <button
          onClick={() => {
            setActiveGuideType('takhir');
            setSelectedNiatId('');
          }}
          className={`flex-1 py-3 text-center rounded-r-lg text-sm font-semibold transition-all cursor-pointer ${
            activeGuideType === 'takhir'
              ? 'bg-emerald-800 text-white shadow-md dark:bg-emerald-700'
              : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40'
          }`}
        >
          Shalat Jama’ Ta’khir (Digabung di Waktu Akhir)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
        {/* Section 1: Lafadz Niat */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">1. Lafadz Niat Lengkap</h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Klik salah satu niat shalat di bawah ini untuk menampilkan teks Arab, harakat lengkap, latin transliterasi, serta arti bahasa Indonesia:
          </p>

          <div className="space-y-3">
            {currentNiats.map((niat) => {
              const isSelected = selectedNiatId === niat.id || (selectedNiatId === '' && currentNiats[0].id === niat.id);
              if (isSelected && selectedNiatId === '') {
                // Initialize default
                setSelectedNiatId(niat.id);
              }
              return (
                <div
                  key={niat.id}
                  onClick={() => setSelectedNiatId(niat.id)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-500/30'
                      : 'bg-white border-slate-200 dark:bg-slate-900/30 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isSelected ? 'text-emerald-950 dark:text-emerald-250 font-semibold' : 'text-slate-700 dark:text-slate-350'}`}>
                      {niat.title}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-700'}`}></span>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/40 space-y-4 animate-fade-in">
                      {/* Arabic Teks */}
                      <div className="text-right py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-5 shadow-sm relative overflow-hidden">
                        <p className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-emerald-100 leading-[2.2] tracking-wide font-medium" dir="rtl">
                          {niat.arabic}
                        </p>
                      </div>

                      {/* Transliteration */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider font-mono">Latin Transliterasi:</span>
                        <p className="text-xs text-emerald-900 dark:text-emerald-350 italic font-semibold leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/10 dark:border-emerald-800/30">
                          "{niat.latin}"
                        </p>
                      </div>

                      {/* Translation */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider font-mono">Terjemah Indonesia:</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          {niat.translation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Educational Insight Callout wrapper */}
          <div className="p-4 bg-amber-500/5 dark:bg-amber-950/25 border border-amber-500/15 dark:border-amber-800/35 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-widest">Penting Diingat (Fiqh Shalat)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Shalat <strong>Maghrib</strong> tetap harus dikerjakan 3 rakaat dan Shalat <strong>Subuh</strong> tetap wajib dikerjakan 2 rakaat. Keduanya sama sekali TIDAK BISA di-qashar (diringkas jumlah rakaatnya). Adapun Shalat Maghrib hanya diperkenankan digabung (jama') bersama Shalat Isya, sedangkan shalat Subuh tidak boleh di-jama' dengan shalat sebelum atau sesudahnya.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Step-by-Step guides */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg">
              <ListChecks className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-250 text-base">2. Urutan &amp; Tata Cara Pelaksanaan</h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Ikuti urutan langkah-langkah di bawah ini untuk mempraktikkan shalat {activeGuideType === 'taqdim' ? 'Jama’ Taqdim' : 'Jama’ Ta’khir'} secara runtut dan sah:
          </p>

          <div className="bg-white dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            {currentSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start last:mb-0 pb-5 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="flex items-center justify-center w-7 h-7 bg-emerald-800 text-amber-400 rounded-full font-bold text-xs shadow-md shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-300 rounded-2xl flex items-start gap-3 border border-emerald-100 dark:border-emerald-800/40">
            <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-400 uppercase">Ringkasan Persyaratan Sah Safar</h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                Niat rukhsah harus tetap diniatkan sesaat sebelum shalat berakhir (pada shalat pertama) atau saat Takbiratul Ihram. Musafir dilarang bermakmum kepada mukim (imam setempat yang tidak bepergian) jika ingin sah menerapkan qashar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
