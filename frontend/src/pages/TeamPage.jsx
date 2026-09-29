import React from "react";
import { Award, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { teamMembers } from "../constants/teamData";
import TeamMemberCard from "../components/team/TeamMemberCard";

export default function TeamPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-[#70452C] via-[#58331E] to-[#3B1F0F] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-[#70452C]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9B27C]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#D9B27C] border border-white/20">
              <Award size={13} className="text-[#D9B27C]" />
              SMART INDIA HACKATHON 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F0F7F0]/20 text-[#C8DEC9] border border-white/20">
              <CheckCircle2 size={13} className="text-[#C8DEC9]" />
              Problem ID: SIH26236
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Meet the Team Astra Squad
          </h2>

          <p className="text-[#F5EBDD]/90 mt-4 text-base md:text-lg leading-relaxed max-w-2xl">
            A multidisciplinary team bridging post-harvest food science, packaging barrier polymer engineering, multi-output machine learning, and intuitive web systems.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/15">
            <div>
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-[#D9B27C]">6</p>
              <p className="text-xs text-[#F5EBDD]/70 mt-1 uppercase tracking-wider font-medium">Core Specialists</p>
            </div>
            <div>
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-[#C8DEC9]">100%</p>
              <p className="text-xs text-[#F5EBDD]/70 mt-1 uppercase tracking-wider font-medium">Working Prototype</p>
            </div>
            <div>
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-[#D9B27C]">25+</p>
              <p className="text-xs text-[#F5EBDD]/70 mt-1 uppercase tracking-wider font-medium">Food Profiles</p>
            </div>
            <div>
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-[#F5EBDD]">SIH26236</p>
              <p className="text-xs text-[#F5EBDD]/70 mt-1 uppercase tracking-wider font-medium">Solution Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBER CARDS GRID */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-[#70452C]">Cross-Functional Engineering</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#17221C] mt-1">Individual Specializations & Deliverables</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* WHY THIS MATTERS FOR SIH EVALUATORS */}
      <div className="bg-gradient-to-br from-[#70452C] via-[#58331E] to-[#2E180B] rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <p className="text-xs uppercase font-bold tracking-wider text-[#D9B27C]">Jury Evaluation Highlights</p>
          <h4 className="font-heading text-2xl font-bold mt-1">Built to Meet All SIH 2026 Assessment Pillars</h4>
          <p className="text-[#F5EBDD]/90 mt-2 text-sm leading-relaxed">
            Our team structure guarantees end-to-end execution: verified packaging barrier matrices, multi-output ML algorithms, transparent explainability, and packaging-oriented UI design.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15 text-xs">
          <div className="bg-white/10 border border-white/10 rounded-xl p-4">
            <p className="font-bold text-[#D9B27C] text-sm mb-1">01. Innovation</p>
            <p className="text-[#F5EBDD]/80 leading-relaxed">
              Multi-output Random Forest replacing static manual tables with continuous barrier tolerances.
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-xl p-4">
            <p className="font-bold text-[#D9B27C] text-sm mb-1">02. Sustainability</p>
            <p className="text-[#F5EBDD]/80 leading-relaxed">
              Dedicated bio-polymer & molded fiber ranking for every commodity search.
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-xl p-4">
            <p className="font-bold text-[#D9B27C] text-sm mb-1">03. Feasibility</p>
            <p className="text-[#F5EBDD]/80 leading-relaxed">
              Fully functional local & cloud-ready FastAPI backend with sub-second recommendation latency.
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-xl p-4">
            <p className="font-bold text-[#D9B27C] text-sm mb-1">04. Transparency</p>
            <p className="text-[#F5EBDD]/80 leading-relaxed">
              Complete breakdown of barrier scores, advantages, limitations, and estimated shelf-life dynamics.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#analyzer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D9B27C] hover:bg-[#cfa56a] text-[#17221C] font-bold text-sm transition shadow-md"
          >
            Launch Analyzer Workspace <ArrowRight size={15} />
          </a>
          <a
            href="SmartPack SIH PPT.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
          >
            Download Presentation
          </a>
        </div>
      </div>
    </section>
  );
}
