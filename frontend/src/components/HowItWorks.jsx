import React from "react";
import { Activity, Cpu, Layers, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Food Commodity Physiology",
      badge: "Input Dynamics",
      desc: "Captures natural commodity attributes including respiration kinetics, intrinsic moisture %, tissue pH, and storage environment (ambient, chilled, cold chain).",
      icon: <Activity className="w-5 h-5 text-[#70452C]" />,
      detail: "Solves produce dehydration & moisture sweating",
    },
    {
      num: "02",
      title: "Multi-Output ML Inference",
      badge: "Random Forest Model",
      desc: "Evaluates 6 simultaneous packaging barrier targets: Oxygen Transmission (OTR), Moisture Vapor (WVTR), Mechanical Strength, Sealability, MAP, and Breathability.",
      icon: <Cpu className="w-5 h-5 text-[#3B82C4]" />,
      detail: "Predicts continuous tolerance bands",
    },
    {
      num: "03",
      title: "Material Matrix Scoring",
      badge: "Dual Polymer Matrix",
      desc: "Scores conventional barrier polymers (BOPP, PET, EVOH, HDPE) alongside compostable biopolymers (PLA, PHA, Molded Fiber, Starch blends) for optimal fit.",
      icon: <Layers className="w-5 h-5 text-[#4F7A52]" />,
      detail: "Weighted sensitivity penalties",
    },
    {
      num: "04",
      title: "Packaging Specification & Shelf-Life",
      badge: "Decision Support",
      desc: "Generates an actionable engineering brief complete with barrier dot-indices, layer architecture, shelf-life projections, and sustainable trade-off comparisons.",
      icon: <Sparkles className="w-5 h-5 text-[#D9B27C]" />,
      detail: "Sub-second recommendation latency",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b border-[#E4D8C8] bg-[#F5EBDD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF9F4] border border-[#E4D8C8] text-xs font-bold text-[#70452C] tracking-wide uppercase mb-3">
           
            <span>Intelligent Decision Engine</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#17221C] tracking-tight">
            How SmartPack Works
          </h2>
          <p className="text-base text-[#575048] mt-3 leading-relaxed">
            From food physiological behavior to barrier tolerance matching: how our multi-output algorithm predicts the optimal packaging structure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E4D8C8] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-heading font-black text-2xl text-[#D9B27C]/70">
                    {step.num}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#70452C] bg-[#F7EFE3] px-2 py-0.5 rounded border border-[#E4D8C8]">
                  {step.badge}
                </span>

                <h3 className="font-heading font-bold text-base text-[#17221C] mt-2 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[#575048] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E4D8C8] flex items-center gap-1.5 text-[11px] font-medium text-[#786E64]">
                <CheckCircle2 size={13} className="text-[#4F7A52] shrink-0" />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
