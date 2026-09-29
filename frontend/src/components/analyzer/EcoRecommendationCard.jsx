import React, { useState } from "react";
import { Leaf, Clock3, ChevronDown, ChevronUp, Sparkles, Check, Recycle } from "lucide-react";
import Property from "./Property";
import ScoreBreakdownDrawer from "./ScoreBreakdownDrawer";

export default function EcoRecommendationCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#F0F7F0] rounded-2xl border-2 border-[#C8DEC9] shadow-sm p-5 md:p-6 relative overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Decorative leaf water-mark tone */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* ICON */}
        <div className="shrink-0">
          <div className="w-11 h-11 rounded-xl bg-[#4F7A52] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <Leaf size={22} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* TITLE & BADGES */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-heading font-extrabold text-xl md:text-2xl text-[#17221C] tracking-tight">
                  {item.material}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[#4F7A52] border border-[#C8DEC9] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0">
                  <Leaf size={11} className="text-[#4F7A52]" />
                  Compostable / Bio-Based
                </span>
              </div>
              <p className="text-xs text-[#575048] mt-1">
                <span className="font-semibold text-[#17221C]">{item.material_type}</span>
              </p>
            </div>

            {/* COMPATIBILITY SCORE */}
            <div className="text-right shrink-0">
              <p className="font-heading text-3xl font-extrabold text-[#4F7A52] tracking-tight leading-none">
                {item.compatibility_score}%
              </p>
              <p className="text-[10px] uppercase font-bold text-[#786E64] tracking-wider mt-1">
                Compatibility
              </p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-2 bg-white/80 rounded-full mt-3 overflow-hidden border border-[#C8DEC9]">
            <div
              className="h-full bg-gradient-to-r from-[#4F7A52] to-[#68986B] rounded-full transition-all duration-500"
              style={{ width: `${item.compatibility_score}%` }}
            />
          </div>

          {/* SUSTAINABLE HIGHLIGHT BOX */}
          <div className="mt-3.5 p-3 rounded-xl bg-white/80 border border-[#C8DEC9] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Recycle size={15} className="text-[#4F7A52]" />
              <span className="text-[#575048] font-medium">Circularity Profile:</span>
              <strong className="text-[#17221C]">{item.recyclability_or_end_of_life}</strong>
            </div>
            <span className="text-[11px] font-semibold text-[#4F7A52] bg-[#F0F7F0] px-2 py-0.5 rounded border border-[#C8DEC9]">
              Low Carbon Footprint
            </span>
          </div>

          {/* PROPERTIES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <Property label="OTR Level" value={item.otr_level} />
            <Property label="WVTR Level" value={item.wvtr_level} />
            <Property label="Mechanical" value={item.mechanical_strength} />
            <Property label="MAP Suitability" value={item.map_suitability} />
          </div>

          {/* ESTIMATED SHELF LIFE */}
          {item.estimated_shelf_life && (
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#C8DEC9] text-xs">
              <div className="flex items-center gap-2">
                <Clock3 size={15} className="text-[#4F7A52] shrink-0" />
                <span className="text-[#575048] font-medium">Estimated Shelf Life:</span>
                <span className="font-extrabold text-[#17221C]">{item.estimated_shelf_life.display}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F7F0] text-[#4F7A52] border border-[#C8DEC9]">
                  {item.estimated_shelf_life.status}
                </span>
              </div>
              <span className="text-[11px] text-[#786E64]">
                Baseline reference: ~{item.estimated_shelf_life.baseline_reference_days} days
              </span>
            </div>
          )}

          {/* FOOTER BAR: DETAILS TOGGLE */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-[#575048] bg-white/80 border border-[#C8DEC9] rounded-xl px-3.5 py-2.5">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>
                Sealability: <b className="text-[#17221C]">{item.sealability}</b>
              </span>
              <span>
                Cost Index: <b className="text-[#17221C]">{item.cost_level}</b>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1 font-bold text-[#4F7A52] hover:text-[#3B623D] text-xs transition cursor-pointer select-none"
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
              isEco={true}
              shelfLifeInfo={item.estimated_shelf_life}
            />
          )}
        </div>
      </div>
    </div>
  );
}
