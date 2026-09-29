import React from "react";
import { getLevelBadge } from "../../utils/styles";

export default function Property({ label, value }) {
  const badgeStyle = getLevelBadge(value);
  return (
    <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-xl p-2.5 flex flex-col justify-between">
      <p className="text-[10px] uppercase tracking-wider text-[#786E64] font-bold">
        {label}
      </p>
      <div className="mt-1">
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md border ${badgeStyle} truncate max-w-full`}>
          {value || "—"}
        </span>
      </div>
    </div>
  );
}
