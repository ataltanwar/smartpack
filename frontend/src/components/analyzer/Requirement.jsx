import React from "react";
import { getLevelBadge, getDotRating } from "../../utils/styles";

export default function Requirement({ label, value, icon }) {
  const badgeStyle = getLevelBadge(value);
  const rating = getDotRating(value);

  return (
    <div className="border border-[#E4D8C8] rounded-xl p-3 bg-white hover:border-[#70452C]/50 transition-all duration-150 shadow-2xs">
      <div className="flex items-center justify-between gap-1 text-xs mb-1.5">
        <span className="font-bold text-[11px] uppercase tracking-wider text-[#786E64] truncate flex items-center gap-1.5">
          {icon && <span className="text-[#70452C] shrink-0">{icon}</span>}
          {label}
        </span>
       
      </div>

      {/* Packaging Dot-Meter (Section 13) */}
      <div className="flex items-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-2 h-2 rounded-full transition-colors ${
              dot <= rating
                ? "bg-[#70452C]"
                : "bg-[#E4D8C8]"
            }`}
          /> 
        ))}
         <span className={`px-2 py-0.5 text-[11px] font-bold rounded border ${badgeStyle} shrink-0`}>
          {value || "Standard"}
        </span>
      </div>
    </div>
  );
}
