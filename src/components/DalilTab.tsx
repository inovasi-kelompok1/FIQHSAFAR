import React from 'react';
import { DALIL_QURAN, DALIL_HADITS, MADHAB_COMPARISON } from '../data/dalil';
import { BookOpen, Award, Scale, HelpCircle, Check, X, Calendar, MapPin, AlertCircle } from 'lucide-react';

const renderDistance = (val: string) => {
  const match = val.match(/\(([^)]+)\)/);
  if (match) {
    const kmText = match[1];
    const classicText = val.replace(/\s*\([^)]+\)/, '').trim();
    return (
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200">
          <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
          {kmText}
        </span>
        <div className="text-[11px] text-slate-500 leading-normal font-normal">{classicText}</div>
      </div>
    );
  }
  return <span className="text-slate-700 font-medium text-[11.5px]">{val}</span>;
};

const renderDuration = (val: string) => {
  const match = val.match(/\(([^)]+)\)/);
  const parenthesized = match ? match[1] : '';
  const mainLimit = val.replace(/\s*\([^)]+\)/, '').trim();
  return (
    <div className="space-y-1">
      <span className="inline-flex items-center gap-1 font-bold text-sky-900 bg-sky-55/60 px-2 py-0.5 rounded text-[11px] border border-sky-100">
        <Calendar className="w-3 h-3 text-sky-500 shrink-0" />
        {mainLimit}
      </span>
      {parenthesized && (
        <div className="text-[10.5px] text-slate-500 leading-normal font-normal">{parenthesized}</div>
      )}
    </div>
  );
};

const renderJama = (val: string) => {
  const isTidakBoleh = val.toUpperCase().includes('TIDAK');
  const match = val.match(/\(([^)]+)\)/);
  const parenthesized = match ? match[1] : '';
  
  if (isTidakBoleh) {
    return (
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1 font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded text-[11px] border border-rose-200/50">
          <X className="w-3 h-3 text-rose-500 shrink-0" />
          Tidak Boleh
        </span>
        {parenthesized && <div className="text-[10px] text-rose-700/80 leading-normal font-normal">{parenthesized}</div>}
      </div>
    );
  } else {
    return (
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
          <Check className="w-3 h-3 text-emerald-500 shrink-0" />
          Boleh Jamak
        </span>
        {parenthesized && <div className="text-[10px] text-emerald-700/80 leading-normal font-normal">{parenthesized}</div>}
      </div>
    );
  }
};

const renderMadhabName = (val: string) => {
  const match = val.match(/\(([^)]+)\)/);
  if (match) {
    const detail = match[1];
    const nameOnly = val.replace(/\s*\([^)]+\)/, '').trim();
    return (
      <div className="space-y-1">
        <div className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight leading-normal">
          {nameOnly}
        </div>
        <span className="inline-block bg-teal-50 text-teal-850 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-teal-200/40 leading-none">
          {detail}
        </span>
      </div>
    );
  }
  return <div className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight">{val}</div>;
};

export default function DalilTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Upper informational banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white relative shadow-md">
        <div className="relative z-10 max-w-2xl">
          <span className="bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
            Dasar Teologis &amp; Komparasi Madzhab
          </span>
          <h2 className="text-xl font-bold tracking-tight mb-2">Daftar Dalil Syar'i &amp; Landasan Hukum Safar</h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Menelusuri Al-Qur'anul Karim, Sunnah Nabawiyyah, serta ijtihad fiqih para Aimmatul Mazhahib rukun safar yang mendasari rukhshah shalat.
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
          <BookOpen className="w-40 h-40" />
        </div>
      </div>

      {/* Grid of Quranic + Hadiths Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quran Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Al-Qur'anul Karim</h3>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{DALIL_QURAN.source}</span>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">QS. AN-NISA 101</span>
            </div>

            {/* Arabic */}
            <div className="text-right py-3 bg-white rounded-xl px-4 border border-slate-100" dir="rtl">
              <p className="text-xl font-serif text-slate-900 leading-[2.2] font-medium">
                {DALIL_QURAN.arabic}
              </p>
            </div>

            {/* Translation */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Terjemah Tafsiri:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{DALIL_QURAN.translation}"
              </p>
            </div>

            {/* Explanation */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Syarah (Penjelasan Fatwa):</span>
              <p className="text-xs text-slate-500 leading-relaxed p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                {DALIL_QURAN.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Hadith Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Hadits-Hadits Shahih</h3>
          </div>

          <div className="space-y-4">
            {DALIL_HADITS.map((hadits, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  {hadits.source}
                </span>

                {/* Arabic */}
                <div className="text-right py-2 bg-white rounded-xl px-4 border border-slate-100" dir="rtl">
                  <p className="text-lg font-serif text-slate-800 leading-[2.1] font-medium">
                    {hadits.arabic}
                  </p>
                </div>

                {/* Translation */}
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{hadits.translation}"
                </p>

                {/* Explanation */}
                <p className="text-xs text-slate-500 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                  <strong>Syarah:</strong> {hadits.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Comparative Grid / Table of 4 Sunni Madhabs */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Perbandingan Ketentuan Madzhab</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Spesifikasi hukum penentuan jarak minimal (sifar) dan masa tinggal maksimum sebelum gugurnya hak rukhshah antar-Madzhab utama.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Visual hint for swiping on smaller resolutions */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3.5 py-2.5 md:hidden">
            <span className="flex items-center gap-1.5 font-medium text-amber-950">
              <span>👉</span> 
              <strong>Geser tabel ke kanan</strong> untuk rincian madzhab lainnya
            </span>
            <span className="animate-[pulse_1s_infinite] font-extrabold text-amber-800 text-xs">➔</span>
          </div>

          {/* Horizontally scrolling table frame with guaranteed non-squishing column constraints */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] table-auto">
              <thead>
                <tr className="bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 border-b border-emerald-800/20 w-[160px]">Madzhab</th>
                  <th className="py-3 px-4 border-b border-emerald-800/20 w-[180px]">Jarak Minimum</th>
                  <th className="py-3 px-4 border-b border-emerald-800/20 w-[190px]">Batas Maksimum Mukim</th>
                  <th className="py-3 px-4 border-b border-emerald-800/20 w-[170px]">Izin Jamak</th>
                  <th className="py-3 px-4 border-b border-emerald-800/20">Catatan &amp; Ketentuan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {MADHAB_COMPARISON.map((madhab, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-slate-700">
                    <td className="py-3.5 px-4 font-bold border-r border-slate-100 bg-white align-top">
                      {renderMadhabName(madhab.name)}
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-100 align-top">
                      {renderDistance(madhab.distanceThreshold)}
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-100 align-top">
                      {renderDuration(madhab.durationLimit)}
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-100 align-top">
                      {renderJama(madhab.jamaAccessibility)}
                    </td>
                    <td className="py-3.5 px-4 align-top whitespace-normal break-words max-w-[280px]">
                      <p className="text-slate-600 leading-relaxed font-normal text-[11.5px]">
                        {madhab.keyRule}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
