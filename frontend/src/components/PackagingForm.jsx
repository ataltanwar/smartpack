import React from "react";
import {
  Package,
  Thermometer,
  Droplets,
  Truck,
  Leaf,
  Loader2,
  Sparkles,
  ChevronDown,
  Layers,
  ShieldCheck,
  Clock,
  Wind,
  Info,
} from "lucide-react";
import { COMMODITY_METADATA } from "../constants/defaults";

export default function PackagingForm({
  commodity,
  commodities,
  setCommodity,
  setShelfLife,
  setTemperature,
  setHumidity,
  setStorageType,
  setTransportation,
  getDefaults,
  temperature,
  humidity,
  storageType,
  transportation,
  includeEco,
  setIncludeEco,
  getRecommendation,
  loading,
  error,
}) {
  const currentMeta = COMMODITY_METADATA[commodity] || {
    category: "Food Commodity",
    emoji: "📦",
    respiration: "Standard",
  };

  const popularCommodities = ["Tomato", "Apple", "Banana", "Potato", "Spinach", "Coffee Beans"];

  const handleCommoditySelect = (newCommodity) => {
    const d = getDefaults(newCommodity);
    setCommodity(newCommodity);
    setShelfLife(d.shelfLife);
    setTemperature(d.temperature);
    setHumidity(d.humidity);
    setStorageType(d.storageType);
    setTransportation(d.transportation);
  };

  return (
    <section className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-6 shadow-sm">
      {/* SECTION HEADER */}
      <div className="pb-5 border-b border-[#E4D8C8]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#70452C] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Package size={20} className="text-[#F5EBDD]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-[#17221C] leading-tight">
              Packaging Specification
            </h2>
            <p className="text-xs text-[#786E64] mt-0.5">
              Tell us about your food and storage conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* STEP 01: PRODUCT */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#70452C] text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <label className="text-xs font-bold uppercase tracking-wider text-[#17221C]">
                Product / Commodity
              </label>
            </div>
            <span className="text-[10px] text-[#70452cb3] px-2 py-0.5">
              Choose food to analyze
            </span>
          </div>

          {/* Quick Select Chips */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {popularCommodities.map((item) => {
              const meta = COMMODITY_METADATA[item];
              const isSelected = commodity === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleCommoditySelect(item)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-[#70452C] text-white border-[#70452C] shadow-xs"
                      : "bg-white text-[#575048] border-[#E4D8C8] hover:border-[#70452C]/60 hover:bg-[#F5EBDD]/40"
                  }`}
                >
                  <span>{meta?.emoji}</span>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          {/* Select Dropdown */}
          <div className="relative mt-2">
            <select
              value={commodity}
              onChange={(e) => handleCommoditySelect(e.target.value)}
              className="input appearance-none pr-9 font-medium text-[#17221C] cursor-pointer"
            >
              {commodities.map((i) => (
                <option key={i} value={i}>
                  {COMMODITY_METADATA[i]?.emoji ? `${COMMODITY_METADATA[i].emoji} ` : ""}{i}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786E64] pointer-events-none"
            />
          </div>
        </div>

        {/* STEP 02: STORAGE CONDITIONS */}
        <div className="space-y-3 pt-3 border-t border-[#E4D8C8]/80">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#70452C] text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <label className="text-xs font-bold uppercase tracking-wider text-[#17221C]">
              Storage Conditions
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#786E64] mb-1 flex items-center gap-1">
                <Thermometer size={13} className="text-[#70452C]" />
                Temperature
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="input pr-9 font-medium"
                />
                <span className="unit">°C</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#786E64] mb-1 flex items-center gap-1">
                <Droplets size={13} className="text-[#70452C]" />
                Rel. Humidity
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  className="input pr-9 font-medium"
                />
                <span className="unit">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-[#786E64] mb-1 flex items-center gap-1">
                <Wind size={13} className="text-[#70452C]" />
                Storage Type
              </label>
              <div className="relative">
                <select
                  value={storageType}
                  onChange={(e) => setStorageType(e.target.value)}
                  className="input appearance-none pr-8 font-medium cursor-pointer"
                >
                  <option>Ambient</option>
                  <option>Chilled</option>
                  <option>Frozen</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#786E64] pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#786E64] mb-1 flex items-center gap-1">
                <Truck size={13} className="text-[#70452C]" />
                Transportation
              </label>
              <div className="relative">
                <select
                  value={transportation}
                  onChange={(e) => setTransportation(e.target.value)}
                  className="input appearance-none pr-8 font-medium cursor-pointer"
                >
                  <option>Refrigerated</option>
                  <option>Ambient</option>
                  <option>Cold Chain</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#786E64] pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 03: PACKAGING REQUIREMENTS */}
        <div className="space-y-3 pt-3 border-t border-[#E4D8C8]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#70452C] text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <label className="text-xs font-bold uppercase tracking-wider text-[#17221C]">
                Packaging Requirements
              </label>
            </div>
            <span className="text-[10px] text-[#786E64]">Select your requirements</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Eco Alternative Toggle Pill */}
            <button
              type="button"
              onClick={() => setIncludeEco(!includeEco)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer border ${
                includeEco
                  ? "bg-[#F0F7F0] text-[#4F7A52] border-[#C8DEC9] shadow-xs ring-1 ring-[#71d476]"
                  : "bg-white text-[#786E64] border-[#E4D8C8] hover:bg-[#F5EBDD]/40"
              }`}
            >
              <Leaf size={13} className={includeEco ? "text-[#4F7A52]" : "text-[#786E64]"} />
              <span>Eco-Based Alternative</span>
              {includeEco}
            </button>
          </div>
        </div>

        {/* ANALYZE BUTTON (Section 9) */}
        <div className="pt-2">
          <button
            onClick={getRecommendation}
            disabled={loading}
            className="w-full h-13 rounded-xl bg-[#70452C] hover:bg-[#56331E] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin text-[#D9B27C]" />
                <span>Evaluating Material Matrices...</span>
              </>
            ) : (
              <>
                <Sparkles size={17} className="text-[#D9B27C]" />
                <span>Analyze Packaging</span>
              </>
            )}
          </button>

          {error && (
            <p className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded-lg border border-red-200">
              {error}
            </p>
          )}

           <label className="block text-[11px] font-medium text-[#786E64] mx-3 my-1.5 flex items-center gap-1">
                <Info size={12} className="text-[#70452C]" />
                Based on multi-output random forest inference & barrier tolerance scoring.
              </label>
        </div>
      </div>
    </section>
  );
}
