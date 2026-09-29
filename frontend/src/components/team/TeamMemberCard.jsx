import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Droplets,
  ShieldCheck,
  Award,
  Code2,
  Database,
} from "lucide-react";

const iconMap = {
  Cpu: <Cpu size={16} className="text-[#3B82C4]" />,
  Droplets: <Droplets size={16} className="text-[#4F7A52]" />,
  ShieldCheck: <ShieldCheck size={16} className="text-[#70452C]" />,
  Award: <Award size={16} className="text-[#D9B27C]" />,
  Code2: <Code2 size={16} className="text-[#70452C]" />,
  Database: <Database size={16} className="text-[#4F7A52]" />,
};

export default function TeamMemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-[#FCF9F4] rounded-2xl border border-[#E4D8C8] hover:border-[#70452C]/60 hover:shadow-md p-6 flex flex-col justify-between transition-all duration-200"
    >
      <div>
        {/* MEMBER HEADER */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}
            >
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-lg text-[#17221C] group-hover:text-[#70452C] transition">
                  {member.name}
                </h4>
                {member.isLeader && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#70452C] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                    Team Leader
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#786E64]">
                {member.role}
              </p>
            </div>
          </div>
        </div>

        {/* PRIMARY RESPONSIBILITIES */}
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-wider font-bold text-[#786E64] mb-2">
            Primary Responsibility
          </p>
          <ul className="space-y-1.5 text-xs text-[#575048]">
            {member.primaryResponsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#70452C] font-bold shrink-0 mt-0.5">•</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COLLAPSIBLE KEY OUTCOMES */}
      <div className="pt-3 border-t border-[#E4D8C8] mt-4 bg-white/70 -mx-6 -mb-6 p-4 rounded-b-2xl transition">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between font-semibold text-xs text-[#17221C] hover:text-[#70452C] transition cursor-pointer select-none"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-[#575048]">
            Key Outcomes
            <span className="text-[10px] text-[#786E64] font-normal">({member.outcomes.length})</span>
          </span>

          <span className="inline-flex items-center gap-1 font-bold text-[#70452C] text-xs">
            {expanded ? (
              <>Hide <ChevronUp size={14} /></>
            ) : (
              <>View <ChevronDown size={14} /></>
            )}
          </span>
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-[#E4D8C8]/60 space-y-1.5">
            {member.outcomes.map((out, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-[#17221C] leading-relaxed">
                <span className="text-[#4F7A52] font-bold shrink-0 mt-0.5">•</span>
                <span className="font-medium">{out}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
