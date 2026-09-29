import React from "react";
import { Sparkles, CheckCircle2, Loader2, ShieldAlert, Package, Layers } from "lucide-react";

export function EmptyState() {
  return (
    <div className="h-full min-h-[580px] bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F5EBDD] border border-[#E4D8C8] flex items-center justify-center shadow-xs">
          <Layers size={28} className="text-[#70452C]" />
        </div>
        <h3 className="font-heading font-extrabold text-xl text-[#17221C] mt-5">
          Ready to Analyze Food Packaging
        </h3>
        <p className="text-xs text-[#786E64] mt-2.5 leading-6">
         Enter your product and storage details on the left. SmartPack will analyze the packaging requirements, identify suitable materials, and display the recommended film structure here.</p>

        <div className="grid grid-cols-2 gap-2 mt-6 text-left">
          <div className="p-2.5 rounded-xl bg-white border border-[#E4D8C8] flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#4F7A52] shrink-0" />
            <span className="text-[11px] font-medium text-[#17221C]">Respiration & O₂ Modeling</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E4D8C8] flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#4F7A52] shrink-0" />
            <span className="text-[11px] font-medium text-[#17221C]">Multi-Layer Co-Extrusion</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E4D8C8] flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#4F7A52] shrink-0" />
            <span className="text-[11px] font-medium text-[#17221C]">Compostable Bio-Polymers</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E4D8C8] flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#4F7A52] shrink-0" />
            <span className="text-[11px] font-medium text-[#17221C]">Shelf-Life Forecasting</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="h-full min-h-[580px] bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F5EBDD] border border-[#E4D8C8] flex items-center justify-center shadow-xs">
          <Loader2 size={30} className="text-[#70452C] animate-spin" />
        </div>
        <h3 className="font-heading font-extrabold text-xl text-[#17221C] mt-5">
          Evaluating Packaging Matrices
        </h3>
        <p className="text-xs text-[#786E64] mt-2 leading-relaxed">
          Running multi-output Random Forest algorithm against 6 barrier targets and computing weighted compatibility scores...
        </p>
      </div>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl p-8 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
        <ShieldAlert className="text-red-600" size={24} />
      </div>
      <h3 className="font-heading font-bold text-lg text-[#17221C] mt-4">
        Recommendation Engine Failed to Analyze
      </h3>
      <p className="text-xs text-red-600 mt-2 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
}
