import React, { useState } from "react";
import {
  Droplets,
  Scale,
  Activity,
  Clock3,
  Wind,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Copy,
  Check,
  Printer,
  Leaf,
  Thermometer,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import Stat from "./Stat";
import Requirement from "./Requirement";
import RecommendationCard from "./RecommendationCard";
import EcoRecommendationCard from "./EcoRecommendationCard";
import SideBySideCompare from "./SideBySideCompare";

export default function Results({ result }) {
  const [viewMode, setViewMode] = useState("all");
  const [copied, setCopied] = useState(false);

  const requirements = result.predicted_requirements;
  const ecoItem =
    result.eco_alternative ||
    (Array.isArray(result.eco_recommendation)
      ? result.eco_recommendation[0]
      : result.eco_recommendation);

  const topStandard = result.recommendations?.[0];

  const handleCopySummary = () => {
    const summary = `SmartPack AI Packaging Specification Brief:
Commodity: ${result.commodity} (${result.food_profile?.food_category || ""})
Moisture: ${result.food_profile?.moisture_percent}%, pH: ${result.food_profile?.ph}, Respiration: ${result.food_profile?.respiration_rate}
Storage Environment: ${result.conditions_used?.storage_temperature_c}°C, ${result.conditions_used?.relative_humidity_percent}% RH, ${result.conditions_used?.storage_type}

Predicted Barrier Requirements:
- OTR: ${requirements.required_otr_level}
- WVTR: ${requirements.required_wvtr_level}
- Mechanical Strength: ${requirements.required_mechanical_strength}
- Sealability: ${requirements.required_sealability}
- MAP: ${requirements.map_required}
- Breathability: ${requirements.breathability_required}

#1 Recommended Packaging:
${topStandard?.material} (${topStandard?.compatibility_score}%)
Shelf Life: ${topStandard?.estimated_shelf_life?.display || "Estimated"}

${ecoItem ? `Sustainable / Bio-Based Alternative:
${ecoItem.material} (${ecoItem.compatibility_score}%) - ${ecoItem.recyclability_or_end_of_life}` : ""}`;

    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* SECTION 10: AI ANALYSIS RESULT HEADER */}
      <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#70452C] uppercase tracking-wider flex items-center gap-1.5 bg-[#F7EFE3] px-2.5 py-0.5 rounded-full border border-[#E4D8C8]">
                <Sparkles size={13} className="text-[#D9B27C]" />
                AI PACKAGING ANALYSIS
              </span> 
              
              {result.food_profile?.food_category && (
                <span className="text-[11px] font-medium bg-white text-[#575048] border border-[#E4D8C8] px-2 py-0.5 rounded-md">
                  {result.food_profile.food_category}
                </span>
              )}
            </div>

            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-[#17221C] mt-2 tracking-tight">
              {result.commodity}
            </h3>

            <p className="text-xs text-[#786E64] mt-1 max-w-xl">
              Packaging requirements based on the product’s properties, moisture, respiration rate, and storage conditions ({result.conditions_used?.storage_temperature_c}°C, {result.conditions_used?.relative_humidity_percent}% RH).
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 no-print shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E4D8C8] bg-white hover:bg-[#F5EBDD] text-xs font-bold text-[#17221C] transition cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#4F7A52]" />
                  <span className="text-[#4F7A52]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-[#786E64]" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E4D8C8] bg-white hover:bg-[#F5EBDD] text-xs font-bold text-[#17221C] transition cursor-pointer shadow-2xs"
            >
              <Printer size={14} className="text-[#786E64]" />
              <span>Print Brief</span>
            </button>
          </div>
        </div>

        {/* SECTION 15: FOOD PROFILE STATS */}
        <div className="mt-6 pt-5 border-t border-[#E4D8C8]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#786E64] mb-2.5">
            Food Profile
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat
              label="Moisture Content"
              value={`${result.food_profile.moisture_percent}%`}
              icon={<Droplets size={16} />}
            />
            <Stat
              label="Commodity pH"
              value={result.food_profile.ph}
              icon={<Scale size={16} />}
            />
            <Stat
              label="Respiration Rate"
              value={result.food_profile.respiration_rate}
              icon={<Activity size={16} />}
            />
            <Stat
              label="Baseline Life"
              value={
                result.food_profile.baseline_shelf_life_days
                  ? `~${result.food_profile.baseline_shelf_life_days} days`
                  : `${result.conditions_used?.target_shelf_life_days || 15} days`
              }
              icon={<Clock3 size={16} />}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5EBDD] text-[#70452C] flex items-center justify-center shrink-0">
              <ShieldCheck size={17} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#17221C]">
                Predicted Packaging Requirements
              </h3>
              <p className="text-[11px] text-[#786E64]">
               AI-predicted packaging requirements based on product and storage conditions.
              </p>
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Requirement
            label="Oxygen Barrier (OTR)"
            value={requirements.required_otr_level}
            icon={<Wind size={14} />}
          />
          <Requirement
            label="Moisture Barrier (WVTR)"
            value={requirements.required_wvtr_level}
            icon={<Droplets size={14} />}
          />
          <Requirement
            label="Mechanical Strength"
            value={requirements.required_mechanical_strength}
            icon={<ShieldCheck size={14} />}
          />
          <Requirement
            label="Sealability"
            value={requirements.required_sealability}
            icon={<Lock size={14} />}
          />
          <Requirement
            label="MAP Suitability"
            value={requirements.map_required}
            icon={<Layers size={14} />}
          />
          <Requirement
            label="Breathability"
            value={requirements.breathability_required}
            icon={<Activity size={14} />}
          />
        </div>
      </div>

      {topStandard && (
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#17221C] flex items-center gap-1">
                Top Recommended Packaging Material
              </h3>
            </div>
            <span className="text-[11px] font-bold text-[#70452C] bg-[#F7EFE3] px-2.5 py-0.5 rounded-full border border-[#E4D8C8] whitespace-nowrap shrink-0">
              Based on the food properties
            </span>
          </div>

          <RecommendationCard
            item={topStandard}
            rank={1}
            best={true}
          />
        </div>
      )}


      {/* SECTION 16: SUSTAINABLE / ECO ALTERNATIVE */}
      {ecoItem && (
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#F0F7F0] border border-[#C8DEC9] flex items-center justify-center text-[#4F7A52] shrink-0">
                <Leaf size={14} />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#17221C]">
                Sustainable / Bio-Based Alternative
              </h3>
            </div>
            <span className="text-[11px] font-bold text-[#4F7A52] bg-[#F0F7F0] border border-[#C8DEC9] px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
              Compostable Option
            </span>
          </div>

          <EcoRecommendationCard item={ecoItem} />
        </div>
      )}

      {/* ALL CANDIDATES & TABS SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E4D8C8]">
          <div>
            <h4 className="font-heading font-bold text-base text-[#17221C]">
              All Ranked Material Candidates
            </h4>
            <p className="text-xs text-[#786E64] mt-0.5">
              Ranked compatibility scores across the entire polymer and bio-based database
            </p>
          </div>

          {/* VIEW TABS */}
          <div className="flex items-center gap-1 bg-[#F5EBDD] p-1 rounded-xl border border-[#E4D8C8] text-xs font-semibold self-start sm:self-auto no-print max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "all"
                  ? "bg-[#70452C] text-white shadow-xs"
                  : "text-[#575048] hover:text-[#17221C]"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setViewMode("standard")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "standard"
                  ? "bg-[#70452C] text-white shadow-xs"
                  : "text-[#575048] hover:text-[#17221C]"
              }`}
            >
              Standard
            </button>

            {ecoItem && (
              <button
                type="button"
                onClick={() => setViewMode("eco")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === "eco"
                    ? "bg-[#4F7A52] text-white shadow-xs"
                    : "text-[#575048] hover:text-[#4F7A52]"
                }`}
              >
                <Leaf size={12} />
                Sustainable
              </button>
            )}

            {ecoItem && (
              <button
                type="button"
                onClick={() => setViewMode("compare")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "compare"
                    ? "bg-[#70452C] text-white shadow-xs"
                    : "text-[#575048] hover:text-[#17221C]"
                }`}
              >
                Compare
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: COMPARE */}
        {viewMode === "compare" && ecoItem && (
          <SideBySideCompare
            standardWinner={topStandard}
            ecoWinner={ecoItem}
          />
        )}

        {/* TAB 2: STANDARD ONLY */}
        {viewMode === "standard" && (
          <div className="space-y-3">
            {result.recommendations?.map((item, index) => (
              <RecommendationCard
                key={item.material}
                item={item}
                rank={index + 1}
                best={index === 0}
              />
            ))}
          </div>
        )}

        {/* TAB 3: ECO ONLY */}
        {viewMode === "eco" && ecoItem && (
          <EcoRecommendationCard item={ecoItem} />
        )}

        {/* TAB 4: ALL CANDIDATES (Rank 2 and beyond) */}
        {viewMode === "all" && (
          <div className="space-y-3">
            {result.recommendations?.slice(1).map((item, index) => (
              <RecommendationCard
                key={item.material}
                item={item}
                rank={index + 2}
                best={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER NOTE / INDUSTRIAL VALIDATION */}
      <div className="flex gap-3 bg-[#FCF9F4] border border-[#E4D8C8] rounded-xl p-4 text-xs">
        <Leaf size={16} className="text-[#4F7A52] shrink-0 mt-0.5" />
        <p className="text-[#786E64] leading-relaxed">
          SmartPack recommendations are intended as early-stage screening decision support based on food physical properties and qualitative baseline material matrices. Final shelf-life stability, seal integrity, and barrier performance must be validated through laboratory packaging trials and accredited supplier specification sheets.
        </p>
      </div>
    </div>
  );
}
