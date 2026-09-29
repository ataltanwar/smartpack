import React from "react";
import { Check, Info, Clock3, ShieldCheck } from "lucide-react";

export default function ScoreBreakdownDrawer({ breakdown, reasons, limitations, isEco, shelfLifeInfo }) {
  const metricLabels = {
    otr: "Oxygen Barrier (OTR)",
    wvtr: "Moisture Barrier (WVTR)",
    strength: "Mechanical Strength",
    sealability: "Heat Sealability",
    map: "MAP Gas Suitability",
    breathability: "Respiration Breathability",
  };

  return (
    <div className={`mt-4 pt-4 border-t ${isEco ? "border-[#C8DEC9]" : "border-[#E4D8C8]"} space-y-4`}>
      {/* SCORE BREAKDOWN */}
      {breakdown && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#786E64] mb-2.5">
            AI Requirement Match Breakdown
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {Object.entries(breakdown).map(([key, score]) => (
              <div key={key} className="bg-white border border-[#E4D8C8] rounded-xl p-2.5 shadow-2xs">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#786E64] text-[11px] truncate font-medium">
                    {metricLabels[key] || key.toUpperCase()}
                  </span>
                  <span className="font-extrabold text-[#17221C] text-xs">
                    {score}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#F5EBDD] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      score >= 80
                        ? isEco ? "bg-[#4F7A52]" : "bg-[#70452C]"
                        : score >= 60
                        ? "bg-[#D9B27C]"
                        : "bg-[#8C7E72]"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REASONS & LIMITATIONS */}
      {((reasons && reasons.length > 0) || (limitations && limitations.length > 0)) && (
        <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
          {reasons && reasons.length > 0 && (
            <div className="bg-[#F0F7F0] border border-[#C8DEC9] rounded-xl p-3.5">
              <p className="font-bold text-[#4F7A52] text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Check size={13} className="text-[#4F7A52]" />
                Key Material Strengths
              </p>
              <ul className="space-y-1.5 text-[#17221C]">
                {reasons.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#4F7A52] text-sm leading-none font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {limitations && limitations.length > 0 && (
            <div className="bg-[#FFF9F2] border border-[#E4D8C8] rounded-xl p-3.5">
              <p className="font-bold text-[#70452C] text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info size={13} className="text-[#70452C]" />
                Engineering Trial Considerations
              </p>
              <ul className="space-y-1.5 text-[#575048]">
                {limitations.map((l, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#D9B27C] text-sm leading-none font-bold">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* SHELF LIFE ESTIMATE DYNAMICS */}
      {shelfLifeInfo && (
        <div className={`p-3.5 rounded-xl border text-xs ${
          isEco ? "bg-[#F0F7F0] border-[#C8DEC9]" : "bg-[#F7EFE3] border-[#E4D8C8]"
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#17221C]">
              <Clock3 size={14} className={isEco ? "text-[#4F7A52]" : "text-[#70452C]"} />
              <span>Shelf-Life Dynamics ({shelfLifeInfo.display})</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              shelfLifeInfo.status === "Extended"
                ? "bg-[#F0F7F0] text-[#4F7A52] border border-[#C8DEC9]"
                : shelfLifeInfo.status === "Optimal"
                ? "bg-[#EBF4FC] text-[#3B82C4] border border-[#C4DEF7]"
                : "bg-[#FFF9F2] text-[#70452C] border border-[#E4D8C8]"
            }`}>
              {shelfLifeInfo.status}
            </span>
          </div>
          <p className="text-[#575048] leading-relaxed">
            {shelfLifeInfo.rationale}
          </p>
          <p className="text-[10px] text-[#786E64] mt-1.5 italic">
            * Screening estimate based on storage temp and baseline matrix. Barrier kinetics and headspace oxygen decay must be verified in accredited packaging laboratories.
          </p>
        </div>
      )}
    </div>
  );
}
