import React from "react";
import { Package, Leaf, Scale } from "lucide-react";

export default function SideBySideCompare({ standardWinner, ecoWinner }) {
  if (!standardWinner || !ecoWinner) {
    return (
      <div className="bg-[#FCF9F4] rounded-2xl border border-[#E4D8C8] p-8 text-center text-[#786E64]">
        Side-by-side comparison requires both standard recommendations and a sustainable alternative.
      </div>
    );
  }

  const rows = [
    { label: "Material Name", std: standardWinner.material, eco: ecoWinner.material },
    { label: "Packaging Family", std: standardWinner.material_type, eco: ecoWinner.material_type },
    {
      label: "AI Compatibility",
      std: `${standardWinner.compatibility_score}%`,
      eco: `${ecoWinner.compatibility_score}%`,
      highlight: true,
    },
    {
      label: "Estimated Shelf Life",
      std: standardWinner.estimated_shelf_life?.display || "N/A",
      eco: ecoWinner.estimated_shelf_life?.display || "N/A",
      ecoHighlight:
        (ecoWinner.estimated_shelf_life?.estimated_days_max || 0) >=
        (standardWinner.estimated_shelf_life?.estimated_days_max || 0),
    },
    { label: "Oxygen Barrier (OTR)", std: standardWinner.otr_level, eco: ecoWinner.otr_level },
    { label: "Moisture Barrier (WVTR)", std: standardWinner.wvtr_level, eco: ecoWinner.wvtr_level },
    { label: "Mechanical Strength", std: standardWinner.mechanical_strength, eco: ecoWinner.mechanical_strength },
    { label: "Sealability", std: standardWinner.sealability, eco: ecoWinner.sealability },
    { label: "MAP Suitability", std: standardWinner.map_suitability, eco: ecoWinner.map_suitability },
    { label: "Cost Level", std: standardWinner.cost_level, eco: ecoWinner.cost_level },
    {
      label: "Sustainability / Circularity",
      std: standardWinner.recyclability_or_end_of_life,
      eco: ecoWinner.recyclability_or_end_of_life,
      ecoHighlight: true,
    },
  ];

  return (
    <div className="bg-[#FCF9F4] rounded-2xl border border-[#E4D8C8] overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#E4D8C8] bg-white">
        <div className="flex items-center gap-2">
          <Scale size={18} className="text-[#70452C]" />
          <h4 className="font-heading font-bold text-base text-[#17221C]">
            Direct Trade-Off Comparison
          </h4>
        </div>
        <p className="text-xs text-[#786E64] mt-0.5">
          Standard barrier polymer candidate vs. Bio-based renewable alternative
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[460px]">
          <thead>
            <tr className="border-b border-[#E4D8C8] bg-[#F5EBDD]/60">
              <th className="py-3 px-5 text-[#17221C] font-bold text-[11px] uppercase tracking-wider w-1/3">
                Specification Metric
              </th>
              <th className="py-3 px-5 text-[#70452C] font-bold text-[11px] uppercase tracking-wider w-1/3 bg-[#F7EFE3]/80 border-r border-[#E4D8C8]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#70452C] text-white flex items-center justify-center shrink-0">
                    <Package size={14} />
                  </div>
                  <div>
                    <span className="block text-[#17221C] font-bold text-xs">{standardWinner.material}</span>
                    <span className="text-[10px] text-[#70452C] font-medium">Standard Winner</span>
                  </div>
                </div>
              </th>
              <th className="py-3 px-5 text-[#4F7A52] font-bold text-[11px] uppercase tracking-wider w-1/3 bg-[#F0F7F0]/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#4F7A52] text-white flex items-center justify-center shrink-0">
                    <Leaf size={14} />
                  </div>
                  <div>
                    <span className="block text-[#17221C] font-bold text-xs">{ecoWinner.material}</span>
                    <span className="text-[10px] text-[#4F7A52] font-medium">Sustainable Choice</span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4D8C8]/60 bg-white">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F5EBDD]/20 transition">
                <td className="py-3 px-5 font-semibold text-[#575048]">
                  {row.label}
                </td>
                <td className="py-3 px-5 text-[#17221C] font-medium bg-[#F7EFE3]/30 border-r border-[#E4D8C8]/60">
                  <span className={row.highlight ? "font-extrabold text-[#70452C]" : ""}>
                    {row.std}
                  </span>
                </td>
                <td className="py-3 px-5 text-[#17221C] font-medium bg-[#F0F7F0]/30">
                  <span className={row.ecoHighlight ? "text-[#4F7A52] font-bold" : ""}>
                    {row.eco}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-[#F5EBDD]/40 border-t border-[#E4D8C8] text-xs">
        <p className="text-[#575048] leading-relaxed">
          <strong className="text-[#17221C]">Engineering Trade-Off Insight: </strong>
          Conventional barrier structures typically offer established gas containment and seal windows, whereas bio-polymers significantly reduce lifecycle carbon intensity and post-consumer persistence.
        </p>
      </div>
    </div>
  );
}
