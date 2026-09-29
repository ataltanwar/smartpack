import React from "react";
import { Layers, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E4D8C8] bg-[#FCF9F4] text-[#575048]">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">

          {/* BRAND COLUMN */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#70452C] text-white">
                <Layers size={20} className="text-[#F5EBDD]" />

                <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-[#D9B27C]" />
              </div>

              <div>
                <span className="font-heading text-base font-extrabold text-[#17221C]">
                  SmartPack
                </span>

                <p className="mt-0.5 text-[10px] font-medium leading-none text-[#786E64]">
                  Food Packaging Intelligence
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-xs leading-6 text-[#786E64]">
              AI-driven decision support system modeling commodity respiration,
              barrier tolerances, and sustainable packaging materials for
              reduced spoilage.
            </p>

            <div className="mt-5 flex w-fit items-center gap-2 rounded-md border border-[#E4D8C8] bg-[#F5EBDD] px-3 py-1.5 text-[11px] font-semibold text-[#70452C]">
              <Award size={13} />
              <span>Smart India Hackathon 2026 · SIH26236</span>
            </div>
          </div>


          {/* QUICK LINKS */}
          <div>
            <p className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-[#17221C]">
              Quick Links
            </p>

            <ul className="space-y-3 text-xs text-[#575048]">
              <li>
                <a
                  href="#analyzer"
                  className="transition-colors hover:text-[#70452C]"
                >
                  Analyzer
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-[#70452C]"
                >
                  Working
                </a>
              </li>

              <li>
                <a
                  href="#team"
                  className="transition-colors hover:text-[#70452C]"
                >
                  Meet the Team
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-[#70452C]"
                >
                  About
                </a>
              </li>
            </ul>
          </div>


          {/* NOTICE */}
          <div className="rounded-xl h-30 border border-[#E4D8C8] bg-[#F5EBDD]/60 p-4">
            
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#17221C]">
              <ShieldCheck size={15} className="text-[#70452C]" />
              <span>Prototype Notice</span>
            </div>

            <p className="text-[11px] leading-5 text-[#786E64]">
              Some data and recommendations are preliminary. The final version
              will use more refined data, models, and industry validation.
            </p>

          </div>
        </div>
      </div>


      {/* BOTTOM BAR */}
      <div className="border-t border-[#E4D8C8] bg-[#F5EBDD]/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 px-6 py-5 text-center text-[11px] text-[#786E64] sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <span>
            © 2026 SmartPack · Food Packaging Intelligence System
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
            <span>Made by Astra Squad</span>

            <span> <img src="/Astra.png" alt="Astra Logo" className="h-8" /></span>
          </div>

        </div>
      </div>

    </footer>
  );
}