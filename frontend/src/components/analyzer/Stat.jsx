import React from "react";

export default function Stat({ label, value, icon }) {
  return (
    <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-xl p-3 flex items-center gap-3">
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-[#F5EBDD] text-[#70452C] flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[10px] uppercase font-bold tracking-wider text-[#786E64] truncate">
          {label}
        </p>
        <p className="font-heading font-extrabold text-sm text-[#17221C] mt-0.5 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
