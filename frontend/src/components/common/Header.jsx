import React, { useState } from "react";
import { Package, Award, Sparkles, Menu, X, ArrowUpRight, ShieldCheck, Layers } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ page }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#E4D8C8] bg-[#FCF9F4]/95 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* LOGO */}
        <a href="#analyzer" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-xl bg-[#70452C] group-hover:bg-[#56331E] flex items-center justify-center transition-all duration-200 shadow-sm text-white shrink-0">
            {/* SmartPack Logo */}
            <div className="relative flex items-center justify-center">
              <Layers size={20} className="text-[#F5EBDD]" />
              <span className="absolute top-1 right- w-1 h-1 rounded-full bg-[#D9B27C]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl text-[#17221C] tracking-tight leading-none">
                SmartPack
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F7EFE3] text-[#70452C] px-1.5 py-0.5 rounded border border-[#E4D8C8]">
                AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#786E64] mt-0.5 tracking-tight">
              Food Packaging Intelligence
            </p>
          </div>
        </a>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <a
            href="#analyzer"
            className={`px-3.5 py-2 rounded-lg transition-all duration-150 ${
              page === "analyzer" || page === "home"
                ? "bg-[#F5EBDD] text-[#70452C] font-semibold"
                : "text-[#575048] hover:text-[#17221C] hover:bg-[#F5EBDD]/60"
            }`}
          >
            Workspace
          </a>

          <a
            href="#how-it-works"
            className="px-3.5 py-2 rounded-lg text-[#575048] hover:text-[#17221C] hover:bg-[#F5EBDD]/60 transition-all duration-150"
          >
            How It Works
          </a>

          <a
            href="#team"
            className={`px-3.5 py-2 rounded-lg transition-all duration-150 ${
              page === "team"
                ? "bg-[#F5EBDD] text-[#70452C] font-semibold"
                : "text-[#575048] hover:text-[#17221C] hover:bg-[#F5EBDD]/60"
            }`}
          >
            Meet the Team
          </a>

          <a
            href="#about"
            className={`px-3.5 py-2 rounded-lg transition-all duration-150 ${
              page === "about"
                ? "bg-[#F5EBDD] text-[#70452C] font-semibold"
                : "text-[#575048] hover:text-[#17221C] hover:bg-[#F5EBDD]/60"
            }`}
          >
            About
          </a>
        </nav>

        {/* RIGHT BADGE & ACTION */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          <a
            href="#analyzer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#70452C] hover:bg-[#56331E] text-white text-xs font-semibold transition-all duration-200 shadow-sm"
          >
            <Sparkles size={13} className="text-[#D9B27C]" />
            <span>Find Packaging</span>
          </a>

          <a
            href="#analyzer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border hover:bg-[#56331E] text-[#70452C] text-xs font-semibold transition-all duration-200 shadow-sm"
          >
            <span>Download PPT</span>
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#E4D8C8] bg-white text-[#17221C] hover:bg-[#F5EBDD]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4D8C8] bg-[#FCF9F4] px-5 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4D8C8]">
            <span className="text-xs font-semibold text-[#575048]">Language / भाषा:</span>
            <LanguageSwitcher />
          </div>

          <a
            href="#analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#17221C]"
          >
            Workspace
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#575048]"
          >
            How It Works
          </a>
          <a
            href="#team"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#575048]"
          >
            Team (SIH 2026)
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#575048]"
          >
            About
          </a>
        </div>
      )}
    </header>
  );
}
