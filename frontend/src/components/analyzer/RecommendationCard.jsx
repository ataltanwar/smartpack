import React, { useState } from "react";
import { Clock3, ChevronUp, ChevronDown, Sparkles, Layers, ShieldCheck, Check } from "lucide-react";
import Property from "./Property";
import ScoreBreakdownDrawer from "./ScoreBreakdownDrawer";

export default function RecommendationCard({ item, rank, best }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${
        best
          ? "bg-white border-2 border-[#70452C] shadow-md ring-4 ring-[#70452C]/10"
          : "bg-white border border-[#E4D8C8] hover:border-[#70452C]/50 shadow-2xs hover:shadow-xs"
      }`}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* RANK & ARCHETYPE ICON BADGE */}
          <div className="shrink-0 flex sm:flex-col items-center gap-2">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-heading font-extrabold text-base shadow-xs shrink-0 ${
                best
                  ? "bg-[#70452C] text-white"
                  : "bg-[#F5EBDD] text-[#70452C] border border-[#E4D8C8]"
              }`}
            >
              #{rank}
            </div>
            {best}
          </div>

          <div className="flex-1 min-w-0">
            {/* TITLE & COMPATIBILITY SCORE */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`font-heading font-extrabold text-[#17221C] tracking-tight ${
                    best ? "text-xl md:text-2xl" : "text-lg"
                  }`}>
                    {item.material}
                  </h4>
                </div>
                <p className="text-xs text-[#786E64] mt-1">
                  <span className="font-semibold text-[#17221C]">{item.material_type}</span>
                </p>
              </div>

              {/* FIT SCORE */}
              <div className="text-right shrink-0">
                <p className="font-heading text-3xl font-extrabold text-[#70452C] tracking-tight leading-none">
                  {item.compatibility_score}%
                </p>
                <p className="text-[10px] uppercase font-bold text-[#786E64] tracking-wider mt-1">
                  Compatibility
                </p>
              </div>
            </div>

            <div className="h-2 bg-[#F5EBDD] rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9B27C] to-[#70452C] rounded-full transition-all duration-500"
                style={{ width: `${item.compatibility_score}%` }}
              />
            </div>

            {/* SUITABILITY HIGHLIGHT (Section 11) */}
            {best && item.recommendation_reasons && item.recommendation_reasons.length > 0 && (
              <div className="mt-3.5 p-3 rounded-xl bg-[#FCF9F4] border border-[#E4D8C8]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#786E64] mb-1.5 flex items-center gap-1">
                  <Sparkles size={12} className="text-[#70452C]" />
                  Why This Recommendation
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {item.recommendation_reasons.slice(0, 3).map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[#17221C] bg-white px-2.5 py-1 rounded-md border border-[#E4D8C8] text-[11px] font-medium">
                      <Check size={12} className="text-[#4F7A52]" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TECHNICAL PROPERTIES ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <Property label="OTR Level" value={item.otr_level} />
              <Property label="WVTR Level" value={item.wvtr_level} />
              <Property label="Mechanical" value={item.mechanical_strength} />
              <Property label="MAP Suitability" value={item.map_suitability} />
            </div>

            {/* ESTIMATED SHELF LIFE */}
            {item.estimated_shelf_life && (
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 px-3.5 py-2.5 rounded-xl bg-[#F7EFE3] border border-[#E4D8C8] text-xs">
                <div className="flex items-center gap-2">
                  <Clock3 size={15} className="text-[#70452C] shrink-0" />
                  <span className="text-[#575048] font-medium">Estimated Shelf Life:</span>
                  <span className="font-extrabold text-[#17221C]">{item.estimated_shelf_life.display}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.estimated_shelf_life.status === "Extended"
                      ? "bg-[#F0F7F0] text-[#4F7A52] border-[#C8DEC9]"
                      : item.estimated_shelf_life.status === "Optimal"
                      ? "bg-[#EBF4FC] text-[#3B82C4] border-[#C4DEF7]"
                      : "bg-[#FFF9F2] text-[#70452C] border-[#E4D8C8]"
                  }`}>
                    {item.estimated_shelf_life.status}
                  </span>
                </div>
                <span className="text-[11px] text-[#786E64]">
                  Storage reference (baseline ~{item.estimated_shelf_life.baseline_reference_days}d)
                </span>
              </div>
            )}

            {/* FOOTER BAR: DETAILS TOGGLE */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-[#575048] bg-[#FCF9F4] border border-[#E4D8C8] rounded-xl px-3.5 py-2.5">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>
                  Sealability: <b className="text-[#17221C]">{item.sealability}</b>
                </span>
                <span>
                  Cost: <b className="text-[#17221C]">{item.cost_level}</b>
                </span>
                <span>
                  End of Life: <b className="text-[#17221C]">{item.recyclability_or_end_of_life}</b>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1 font-bold text-[#70452C] hover:text-[#56331E] text-xs transition cursor-pointer select-none"
              >
                {expanded ? (
                  <>Hide Details <ChevronUp size={14} /></>
                ) : (
                  <>AI Insights & Breakdown <ChevronDown size={14} /></>
                )}
              </button>
            </div>

            {/* EXPANDED ACCORDION */}
            {expanded && (
              <ScoreBreakdownDrawer
                breakdown={item.score_breakdown}
                reasons={item.recommendation_reasons}
                limitations={item.limitations}
                isEco={false}
                shelfLifeInfo={item.estimated_shelf_life}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
