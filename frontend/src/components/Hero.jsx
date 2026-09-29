import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-[#E4D8C8]/80 bg-gradient-to-b from-[#FCF9F4] via-[#FDFBF7] to-[#F5EBDD]">
      {/* Background Subtle Packaging Textures */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#D9B27C]/12 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#4F7A52]/8 rounded-full blur-3xl pointer-events-none -ml-28 -mb-28" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EBDD] border border-[#E4D8C8] text-xs font-bold text-[#70452C] tracking-wide uppercase">
              <Sparkles size={14} className="text-[#D9B27C]" />
              <span>Food Packaging Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#17221C] tracking-tight leading-[1.12]">
              Find the right <br />
              <span className="text-[#70452C] underline decoration-[#D9B27C]/60 decoration-wavy decoration-2">
                packaging
              </span>{" "}
              for your food.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#575048] leading-relaxed max-w-2xl font-normal">
              SmartPack analyzes food physiology, moisture kinetics, and storage environments to recommend tailored packaging materials for maximum barrier protection, extended shelf life, and sustainable compliance.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#analyzer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#70452C] hover:bg-[#56331E] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Analyze My Product</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FCF9F4] hover:bg-[#F5EBDD] border border-[#E4D8C8] text-[#17221C] text-sm font-semibold transition-all duration-200"
              >
                <span>How It Works</span>
              </a>
            </div>

            {/* HIGHLIGHT PILL STATS */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E4D8C8]">
              <div className="bg-[#FCF9F4]/80 border border-[#E4D8C8] rounded-xl p-3">
                <p className="font-heading font-extrabold text-xl text-[#70452C]">25+</p>
                <p className="text-[11px] font-medium text-[#786E64] mt-0.5">Validated Commodities</p>
              </div>
              <div className="bg-[#FCF9F4]/80 border border-[#E4D8C8] rounded-xl p-3">
                <p className="font-heading font-extrabold text-xl text-[#4F7A52]">Bio & Std</p>
                <p className="text-[11px] font-medium text-[#786E64] mt-0.5">Dual Material Ranking</p>
              </div>
              <div className="bg-[#FCF9F4]/80 border border-[#E4D8C8] rounded-xl p-3">
                <p className="font-heading font-extrabold text-xl text-[#3B82C4]">6-Target</p>
                <p className="text-[11px] font-medium text-[#786E64] mt-0.5">ML Barrier Prediction</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PACKAGING DOMAIN VISUAL (packimages.png) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              {/* Soft ambient depth glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#D9B27C]/25 via-[#70452C]/10 to-[#4F7A52]/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" />
              <img
                src="/packimages.png"
                alt="SmartPack Food Packaging Formats"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
