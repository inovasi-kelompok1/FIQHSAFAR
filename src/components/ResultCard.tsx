import React from 'react';
import { JourneyDetails, TravelMode } from '../types';
import { formatDurationIndonesian } from '../utils/distance';
import {
  MapPin,
  Compass,
  CheckCircle2,
  XCircle,
  Clock,
  Navigation,
  ArrowRight,
  AlertTriangle,
  ClipboardList,
  AlertCircle
} from 'lucide-react';

interface ResultCardProps {
  journey: JourneyDetails;
  mode: TravelMode;
  onNavigateToGuide: () => void;
}

export default function ResultCard({ journey, mode, onNavigateToGuide }: ResultCardProps) {
  const { origin, destination, distanceKm, durationHours, isAllowedShafii } = journey;

  // Render transport mode label
  const getModeLabel = (m: TravelMode) => {
    switch (m) {
      case 'car': return 'Mobil/Bus (Darat)';
      case 'train': return 'Kereta Api (Darat/Rel)';
      case 'air': return 'Pesawat terbang (Udara)';
      default: return 'Kendaraan';
    }
  };

  // Build recommendation advice based on departure time & distance
  const getDynamicRecommendation = () => {
    if (!isAllowedShafii) {
      return {
        title: 'Shalat Wajib Sempurna (Tamam)',
        type: 'tamam',
        timeSuggestion1: 'Dzuhur tetap dikerjakan tepat waktu di perlintasan.',
        timeSuggestion2: 'Ashar & Maghrib tetap dikerjakan pada waktunya masing-masing.',
        advice: 'Karena jarak perjalanan kurang dari 82 KM, rukhshah (keringanan) jamak dan qashar belum boleh digunakan mengacu pada Mazhab Syafi\'i. Anda wajib melakukan shalat secara sempurna (tidak diringkas atau digabung) sepanjang perjalanan.'
      };
    }

    // Convert departure time strings to decimal time for simple slots
    const [hoursStr, minutesStr] = journey.departureTime.split(':');
    const departureDecimal = parseInt(hoursStr, 10) + parseInt(minutesStr, 10) / 60;

    if (departureDecimal >= 4 && departureDecimal < 11.5) {
      // Morning Departure
      return {
        title: 'Jama’ Ta’khir atau Jama’ Taqdim (Dzuhur & Ashar)',
        type: 'dzuhur-ashar',
        timeSuggestion1: 'Dzuhur & Ashar dijama’ pada pukul 12.15 WIB (Taqdim saat rehat)',
        timeSuggestion2: 'Dzuhur & Ashar dijama’ pada pukul 15.45 WIB (Ta’khir di tujuan)',
        advice: 'Anda berangkat di pagi hari. Disarankan melakukan Jama’ Taqdim saat Anda beristirahat makan siang di pertengahan jalan (pukul 12.15), atau jika perjalanan lancar tanpa henti, Anda bisa melakukan Jama’ Ta’khir langsung saat tiba di tujuan di waktu Ashar.'
      };
    } else if (departureDecimal >= 11.5 && departureDecimal < 15) {
      // Noon/Early Afternoon Departure
      return {
        title: 'Jama’ Taqdim (Dzuhur & Ashar)',
        type: 'dzuhur-ashar-taqdim',
        timeSuggestion1: 'Dzuhur & Ashar dijama’ pada pukul 12.15 WIB sebelum berangkat',
        timeSuggestion2: 'Maghrib & Isya dijama’ pada pukul 19.00 WIB (Taqdim/Ta’khir di rute)',
        advice: 'Waktu keberangkatan Anda mendekati waktu Dzuhur. Sangat disarankan untuk melaksanakan Shalat Jama’ Taqdim (Dzuhur & Ashar masing-masing 2 rakaat diringkas) di masjid terdekat atau terminal/stasiun SEBELUM naik kendaraan pukul 12.15 WIB.'
      };
    } else if (departureDecimal >= 15 && departureDecimal < 17.75) {
      // Late Afternoon Departure
      return {
        title: 'Jama’ Ta’khir (Maghrib & Isya)',
        type: 'maghrib-isya',
        timeSuggestion1: 'Maghrib & Isya dijama’ pada pukul 19.30 WIB (Ta’khir di tujuan)',
        timeSuggestion2: 'Maghrib & Isya dijama’ pada pukul 19.00 WIB (Ta’khir di rest area)',
        advice: 'Anda berangkat sore menjelang Maghrib. Karena waktu Maghrib cukup singkat di jalan, direkomendasikan melakukan Shalat Jama’ Ta’khir (Maghrib 3 rakaat & Isya\' 2 rakaat) begitu masuk waktu Isya\' di tempat istirahat atau setibanya Anda di destinasi.'
      };
    } else {
      // Evening/Night Departure
      return {
        title: 'Jama’ Taqdim (Maghrib & Isya)',
        type: 'maghrib-isya-taqdim',
        timeSuggestion1: 'Maghrib & Isya dijama’ pada pukul 18.15 WIB sebelum lepas landas',
        timeSuggestion2: 'Isya & Maghrib dijama’ pada pukul 19.00 WIB (Taqdim saat istirahat)',
        advice: 'Anda melakukan perjalanan malam. Disarankan mengambil rukhshah Jama’ Taqdim secepatnya begitu masuk waktu Maghrib (pukul 18.15 WIB atau 19.00 WIB) sebelum berkendara jauh atau ketika singgah di tempat ibadah pertama agar perjalanan malam Anda tenang.'
      };
    }
  };

  const recommendation = getDynamicRecommendation();

  return (
    <div id="journey-analysis-results" className="space-y-6 w-full max-w-full">
      {/* Result Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/80 dark:border-emerald-800/40 w-full min-w-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-md shrink-0">
            <Navigation className="w-6 h-6 animate-pulse shrink-0" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest block">Rute Perjalanan</span>
            <div className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100 flex items-center gap-2 flex-wrap leading-tight mt-0.5">
              <span className="truncate max-w-[140px] sm:max-w-[200px]">{origin.name}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-[200px]">{destination.name}</span>
            </div>
          </div>
        </div>
        <div className="bg-emerald-950 text-emerald-100 text-xs px-3.5 py-2 rounded-lg border border-emerald-800/60 font-mono flex items-center gap-2 max-w-full md:max-w-xs shrink-0 whitespace-normal break-words">
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
          <span className="leading-tight flex-1">
            Keberangkatan: <strong className="text-white font-mono">{journey.departureTime}</strong> | {getModeLabel(mode)}
          </span>
        </div>
      </div>

      {/* 4 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {/* Card 1: Jarak */}
        <div className="bg-white dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-start gap-3.5 min-w-0 w-full">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 rounded-xl shrink-0">
            <Compass className="w-5.5 h-5.5 shrink-0" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-tight truncate">1. Jarak Perjalanan</span>
            <span className="text-2xl font-bold text-indigo-950 dark:text-indigo-200 mt-1 block break-words leading-tight">
              {distanceKm} <span className="text-sm font-semibold">KM</span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 block break-words leading-tight">Berdasarkan koordinat riil</span>
          </div>
        </div>

        {/* Card 2: Estimasi Waktu */}
        <div className="bg-white dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-start gap-3.5 min-w-0 w-full">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-xl shrink-0">
            <Clock className="w-5.5 h-5.5 shrink-0" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-tight truncate">2. Estimasi Waktu</span>
            <span className="text-lg font-bold text-amber-950 dark:text-amber-200 mt-1 block break-words leading-tight">
              {formatDurationIndonesian(durationHours)}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 block break-words leading-tight">Kondisi lalu lintas normal</span>
          </div>
        </div>

        {/* Card 3: Status Jama' */}
        <div className="bg-white dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-start gap-3.5 min-w-0 w-full">
          <div className={`p-3 rounded-xl shrink-0 ${isAllowedShafii ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300'}`}>
            {isAllowedShafii ? <CheckCircle2 className="w-5.5 h-5.5 shrink-0" /> : <XCircle className="w-5.5 h-5.5 shrink-0" />}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-tight truncate">3. Jama' (Gabung)</span>
            <span className={`text-base font-bold mt-1 block break-words leading-tight ${isAllowedShafii ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isAllowedShafii ? 'Diperbolehkan' : 'Tidak Boleh'}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block break-words leading-normal">
              {isAllowedShafii ? 'Safar jauh (≥ 82 KM)' : 'Haram dijama\' karena < 82 KM'}
            </span>
          </div>
        </div>

        {/* Card 4: Status Qashar */}
        <div className="bg-white dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-start gap-3.5 min-w-0 w-full">
          <div className={`p-3 rounded-xl shrink-0 ${isAllowedShafii ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300'}`}>
            {isAllowedShafii ? <CheckCircle2 className="w-5.5 h-5.5 shrink-0" /> : <XCircle className="w-5.5 h-5.5 shrink-0" />}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-tight truncate">4. Qashar (Ringkas)</span>
            <span className={`text-base font-bold mt-1 block break-words leading-tight ${isAllowedShafii ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isAllowedShafii ? 'Diperbolehkan' : 'Tidak Boleh'}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block break-words leading-normal">
              {isAllowedShafii ? 'Shalat 4 rakaat jadi 2' : 'Wajib sempurna 4 rakaat'}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Section (Rekomendasi Shalat) */}
      <div className="bg-white dark:bg-slate-900/35 border rounded-2xl overflow-hidden shadow-inner border-slate-100 dark:border-slate-800 w-full">
        <div className="bg-white dark:bg-slate-900/80 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">Rekomendasi Penjadwalan Shalat (Musafir Planner)</h3>
          </div>
          <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 self-start sm:self-auto">
            Recommendation Engine
          </span>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${isAllowedShafii ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug break-words">{recommendation.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed break-words">{recommendation.advice}</p>
            </div>
          </div>

          {/* Time Suggestion Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 w-full">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-800/40 rounded-xl space-y-1.5 min-w-0">
               <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 tracking-wider">Opsi Utama Shalat</span>
              <p className="font-bold text-emerald-950 dark:text-emerald-200 text-sm leading-snug break-words">{recommendation.timeSuggestion1}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Merapatkan waktu sholat saat kondisi transit perjalanan paling tenang.</p>
            </div>
            <div className="p-4 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-800/40 rounded-xl space-y-1.5 min-w-0">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400 tracking-wider">Opsi Cadangan/Alternatif</span>
              <p className="font-bold text-amber-950 dark:text-amber-200 text-sm leading-snug break-words">{recommendation.timeSuggestion2}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Bisa diambil jika keberangkatan tertunda atau lalu lintas macet.</p>
            </div>
          </div>

          {isAllowedShafii && (
            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  Butuh lafadz niat atau cara pengerjaan shalat di atas?
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-450">Kami telah menyiapkan tata cara komprehensif, lafadz Arab, latin, dan artinya.</p>
              </div>
              <button
                type="button"
                onClick={onNavigateToGuide}
                className="px-5 py-2.5 bg-emerald-800 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-900 dark:hover:bg-emerald-600 font-semibold text-xs shrink-0 self-start md:self-auto transition-all shadow-md active:translate-y-0.5 cursor-pointer"
              >
                Lihat Panduan Niat & Cara Salat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Madhab-Specific Warning Note box */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-2xl flex items-start gap-3 w-full">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 flex-1 min-w-0">
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider leading-tight">Catatan Batas Kemudahan Safar</h4>
          <p className="text-xs text-slate-700 leading-relaxed break-words">
            Perhitungan di atas menggunakan <strong>Madhab Syafi’i</strong> (jarak minimal safar 16 Farsakh atau ± 82 KM), yang merupakan acuan fatwa mayoritas umat Islam di Indonesia (LBM NU & Majelis Tarjih Muhammadiyah). Jika safar Anda berjarak di bawah 82 KM, Anda tidak diperkenankan meng-qashar atau menjamak shalat wajib, melainkan harus mendirikan shalat secara normal tepat pada waktunya.
          </p>
        </div>
      </div>
    </div>
  );
}
