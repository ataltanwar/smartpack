import React from "react";
import { Check, ArrowRight, ShieldCheck, Sparkles, Layers, Leaf, Award } from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      title: "Physiologically Grounded",
      desc: "Models real food commodity respiration rates, intrinsic moisture percent, and water activity to prevent post-harvest physiological degradation.",
      tag: "Food Science",
    },
    {
      title: "Multi-Output Transparent ML",
      desc: "Simultaneously predicts 6 continuous barrier parameters (OTR, WVTR, Strength, Seal, MAP, Breathability) with full explainability of every score component.",
      tag: "Machine Learning",
    },
    {
      title: "Sustainable Circularity",
      desc: "Evaluates emerging bio-based polymers (PLA, PHA, molded fiber, starch composites) alongside conventional barrier films to drive packaging decarbonization.",
      tag: "Sustainability",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-10">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-[#70452C] via-[#56331E] to-[#3E2313] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9B27C]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#D9B27C] uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>About SmartPack Intelligence</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Better food protection starts with a precision packaging brief.
          </h2>

          <p className="text-[#F5EBDD]/90 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl">
            SmartPack is an AI-powered packaging decision-support platform designed to bridge the gap between food post-harvest science and packaging materials engineering.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-white/15">
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <p className="font-extrabold text-xl text-[#D9B27C]">SIH26236</p>
              <p className="text-[10px] text-[#F5EBDD]/70 uppercase tracking-wider">Problem Statement</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <p className="font-extrabold text-xl text-[#D9B27C]">6 Targets</p>
              <p className="text-[10px] text-[#F5EBDD]/70 uppercase tracking-wider">Multi-Output Model</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <p className="font-extrabold text-xl text-[#D9B27C]">Dual Matrix</p>
              <p className="text-[10px] text-[#F5EBDD]/70 uppercase tracking-wider">Bio & Standard Resins</p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE PILLARS */}
      <div>
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#17221C] mb-6">
          Architectural Core Pillars
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((item) => (
            <article key={item.title} className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-6 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#F5EBDD] flex items-center justify-center text-[#70452C]">
                  <Check size={16} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#70452C] bg-[#F7EFE3] px-2 py-0.5 rounded border border-[#E4D8C8]">
                  {item.tag}
                </span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#17221C]">{item.title}</h4>
              <p className="text-xs text-[#575048] mt-2 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-lg text-[#17221C]">Ready to test your food packaging specification?</h4>
          <p className="text-xs text-[#786E64] mt-1">Select from 25+ validated commodity baselines and run the AI algorithm instantly.</p>
        </div>
        <a
          href="#analyzer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#70452C] hover:bg-[#56331E] text-white text-xs font-bold transition shadow-sm shrink-0"
        >
          <span>Launch Workspace</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
