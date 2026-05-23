import React, { useState, useEffect, useRef } from 'react';
import { CITIES } from '../data/cities';
import { City, TravelMode } from '../types';
import { ArrowLeftRight, Search, Car, Train, Plane, Clock, Info, Compass } from 'lucide-react';

interface JourneyCalculatorProps {
  onAnalyze: (origin: City, destination: City, mode: TravelMode, departureTime: string) => void;
  savedOrigin?: City;
  savedDestination?: City;
  savedMode?: TravelMode;
  savedDepartureTime?: string;
}

export default function JourneyCalculator({
  onAnalyze,
  savedOrigin,
  savedDestination,
  savedMode = 'car',
  savedDepartureTime = '08:00'
}: JourneyCalculatorProps) {
  // Input fields state
  const [origin, setOrigin] = useState<City | null>(savedOrigin || null);
  const [destination, setDestination] = useState<City | null>(savedDestination || null);
  const [mode, setMode] = useState<TravelMode>(savedMode);
  const [departureTime, setDepartureTime] = useState<string>(savedDepartureTime);

  // Autocomplete state for origin
  const [originQuery, setOriginQuery] = useState(savedOrigin ? `${savedOrigin.name} (${savedOrigin.province})` : '');
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  // Autocomplete state for destination
  const [destQuery, setDestQuery] = useState(savedDestination ? `${savedDestination.name} (${savedDestination.province})` : '');
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Filtered lists
  const filteredOrigins = originQuery.trim() === ''
    ? CITIES.slice(0, 8)
    : CITIES.filter(city =>
        city.name.toLowerCase().includes(originQuery.toLowerCase()) ||
        city.province.toLowerCase().includes(originQuery.toLowerCase())
      ).slice(0, 8);

  const filteredDests = destQuery.trim() === ''
    ? CITIES.slice(0, 8)
    : CITIES.filter(city =>
        city.name.toLowerCase().includes(destQuery.toLowerCase()) ||
        city.province.toLowerCase().includes(destQuery.toLowerCase())
      ).slice(0, 8);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
        // Smart resolve typed city if user clicks outside
        if (!origin && originQuery.trim() !== '' && filteredOrigins.length > 0) {
          const matched = filteredOrigins[0];
          setOrigin(matched);
          setOriginQuery(`${matched.name} (${matched.province})`);
        } else if (!origin) {
          setOriginQuery('');
        }
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
        // Smart resolve typed city if user clicks outside
        if (!destination && destQuery.trim() !== '' && filteredDests.length > 0) {
          const matched = filteredDests[0];
          setDestination(matched);
          setDestQuery(`${matched.name} (${matched.province})`);
        } else if (!destination) {
          setDestQuery('');
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [origin, destination, originQuery, destQuery, filteredOrigins, filteredDests]);

  const handleSwap = () => {
    const tempCity = origin;
    setOrigin(destination);
    setDestination(tempCity);

    const tempQuery = originQuery;
    setOriginQuery(destQuery);
    setDestQuery(tempQuery);
  };

  const handleAnalyzeClick = () => {
    let finalOrigin = origin;
    let finalDest = destination;

    // Resolve matching values inline if user clicked direct analyze button
    if (!finalOrigin && originQuery.trim() !== '' && filteredOrigins.length > 0) {
      finalOrigin = filteredOrigins[0];
      setOrigin(finalOrigin);
      setOriginQuery(`${finalOrigin.name} (${finalOrigin.province})`);
    }

    if (!finalDest && destQuery.trim() !== '' && filteredDests.length > 0) {
      finalDest = filteredDests[0];
      setDestination(finalDest);
      setDestQuery(`${finalDest.name} (${finalDest.province})`);
    }

    if (finalOrigin && finalDest) {
      onAnalyze(finalOrigin, finalDest, mode, departureTime);
    }
  };

  // Live validator allows typing as valid state if matches exist
  const hasValidOrigin = origin !== null || (originQuery.trim() !== '' && filteredOrigins.length > 0);
  const hasValidDest = destination !== null || (destQuery.trim() !== '' && filteredDests.length > 0);
  const isFormValid = hasValidOrigin && hasValidDest;

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl overflow-hidden">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 py-8 text-white relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold tracking-tight mb-2">Hitung Kelayakan Rukhsah Safar</h2>
          <p className="text-emerald-100/90 text-sm">
            Temukan apakah safar Anda memenuhi batas minimal 2 Marhalah (82 KM) untuk diperbolehkan shalat jamak dan qashar sesuai fikih empat mazhab.
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
          <Compass className="w-32 h-32 text-white" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* City Input System */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Origin Input */}
          <div ref={originRef} className="relative w-full">
            <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              Kota Asal
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="origin-input"
                type="text"
                value={originQuery}
                onFocus={() => setShowOriginDropdown(true)}
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setOrigin(null); // clear until selected
                  setShowOriginDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredOrigins.length > 0) {
                    const matched = filteredOrigins[0];
                    setOrigin(matched);
                    setOriginQuery(`${matched.name} (${matched.province})`);
                    setShowOriginDropdown(false);
                    // Autofocus the next input
                    document.getElementById('destination-input')?.focus();
                  }
                }}
                placeholder="Ketik kota asal (cth: Surabaya)"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
              />
            </div>

            {showOriginDropdown && (
              <div className="absolute z-30 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-white border-b border-slate-100 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex justify-between items-center">
                  <span>Rekomendasi Kota ({filteredOrigins.length})</span>
                  <span className="text-[9px] font-normal text-slate-500">Tekan Enter untuk pilih pertama</span>
                </div>
                {filteredOrigins.map((city, index) => (
                  <button
                    key={`${city.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setOrigin(city);
                      setOriginQuery(`${city.name} (${city.province})`);
                      setShowOriginDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 flex items-center justify-between transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-slate-800">{city.name}</span>
                      <span className="text-xs text-slate-500">{city.province}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-bold opacity-0 hover:opacity-100 transition-opacity">
                      PILIH
                    </span>
                  </button>
                ))}
                {filteredOrigins.length === 0 && (
                  <div className="px-4 py-4 text-center text-xs text-slate-400">
                    Kota tidak ditemukan di basis data FiqhSafar
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pt-5">
            <button
              id="swap-route-button"
              type="button"
              onClick={handleSwap}
              className="p-3 bg-white text-slate-600 rounded-full hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200/85"
              title="Tukar Kota"
            >
              <ArrowLeftRight className="w-5 h-5 md:rotate-90" />
            </button>
          </div>

          {/* Destination Input */}
          <div ref={destRef} className="relative w-full">
            <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              Kota Tujuan
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="destination-input"
                type="text"
                value={destQuery}
                onFocus={() => setShowDestDropdown(true)}
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setDestination(null); // clear until selected
                  setShowDestDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredDests.length > 0) {
                    const matched = filteredDests[0];
                    setDestination(matched);
                    setDestQuery(`${matched.name} (${matched.province})`);
                    setShowDestDropdown(false);
                  }
                }}
                placeholder="Ketik kota tujuan (cth: Yogyakarta)"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
              />
            </div>

            {showDestDropdown && (
              <div className="absolute z-30 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-white border-b border-slate-100 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex justify-between items-center">
                  <span>Rekomendasi Kota ({filteredDests.length})</span>
                  <span className="text-[9px] font-normal text-slate-500">Tekan Enter untuk pilih pertama</span>
                </div>
                {filteredDests.map((city, index) => (
                  <button
                    key={`${city.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setDestination(city);
                      setDestQuery(`${city.name} (${city.province})`);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 flex items-center justify-between transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-slate-800">{city.name}</span>
                      <span className="text-xs text-slate-500">{city.province}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-bold opacity-0 hover:opacity-100 transition-opacity">
                      PILIH
                    </span>
                  </button>
                ))}
                {filteredDests.length === 0 && (
                  <div className="px-4 py-4 text-center text-xs text-slate-400">
                    Kota tidak ditemukan di basis data FiqhSafar
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Warning if Origin is Destination */}
        {origin && destination && origin.name === destination.name && (
          <div className="bg-amber-50 text-amber-900 text-xs px-4 py-3 rounded-xl border border-amber-200/80 flex items-start gap-2">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Peringatan:</strong> Kota asal dan kota tujuan sama. Mohon pilih kota yang berbeda untuk menganalisis rute perjalanan.
            </span>
          </div>
        )}

        {/* Extra Configuration Row (Transport Mode & Departure Time) */}
        <div className="grid grid-cols-1 gap-6 pt-5 border-t border-slate-100">
          {/* Transportation Model Selector */}
          <div>
            <label className="block text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3">
              Metode Transportasi
            </label>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'car', label: 'Mobil / Bus / Transportasi Darat', icon: Car, desc: 'Perjalanan lewat jalan raya & tol' },
                { id: 'train', label: 'Kereta Api / Transportasi Rel', icon: Train, desc: 'Perjalanan terjadwal lewat jalur kereta api' },
                { id: 'air', label: 'Pesawat Terbang / Transportasi Udara', icon: Plane, desc: 'Perjalanan cepat menggunakan maskapai udara' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = mode === item.id;
                return (
                  <button
                    key={item.id}
                    id={`transport-${item.id}`}
                    type="button"
                    onClick={() => setMode(item.id as TravelMode)}
                    className={`group flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left w-full ${
                      isSelected
                        ? 'bg-white border-emerald-600 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-250 shadow-sm ring-1 ring-emerald-600/20 scale-[1.01]'
                        : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-350 hover:bg-white hover:border-slate-300 dark:hover:bg-slate-800/60 dark:hover:border-slate-700 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${isSelected ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200/70 text-slate-500 dark:bg-slate-800 dark:border-transparent dark:text-slate-400'}`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div className="min-w-0">
                        <span className={`block text-xs font-bold leading-tight transition-colors truncate ${
                          isSelected 
                            ? 'text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-950 dark:group-hover:text-white' 
                            : 'text-slate-800 dark:text-slate-250 group-hover:text-emerald-950 dark:group-hover:text-emerald-400'
                        }`}>
                          {item.label}
                        </span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 dark:border-emerald-500 dark:bg-emerald-500' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-scale-in" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Departure Info */}
          <div>
            <label htmlFor="departure-time-input" className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2.5">
              Waktu Keberangkatan
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                id="departure-time-input"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Digunakan untuk menyusun rekomendasi pengerjaan Shalat Jama' (Taqdim atau Ta'khir) yang paling optimal sepanjang perjalanan Anda.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4">
          <button
            id="analyze-journey-button"
            type="button"
            disabled={!isFormValid}
            onClick={handleAnalyzeClick}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isFormValid
                ? 'bg-amber-500 hover:bg-amber-600 active:translate-y-0.5 text-emerald-950 font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30'
                : 'bg-white text-slate-450 border border-slate-200 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Analisis Perjalanan</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
