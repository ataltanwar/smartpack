import React from "react";
import { Languages, Loader2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, isTranslating } = useLanguage();

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#F5EBDD]/80 border border-[#E4D8C8] text-xs"
      data-no-translate="true"
    >
      {/* Globe Icon / Status */}
      <div className="pl-1.5 pr-0.5 text-[#70452C] flex items-center justify-center">
        {isTranslating ? (
          <Loader2 size={14} className="animate-spin text-[#70452C]" />
        ) : (
          <Languages size={14} />
        )}
      </div>

      {/* English Button */}
      <button
        type="button"
        onClick={() => handleSelectLanguage("en")}
        className={`px-2.5 py-1 rounded-lg font-semibold transition-all duration-150 cursor-pointer ${
          language === "en"
            ? "bg-[#70452C] text-white shadow-xs"
            : "text-[#575048] hover:text-[#17221C] hover:bg-[#EAE0D1]/60"
        }`}
        title="Switch to English"
      >
        EN
      </button>

      {/* Hindi Button */}
      <button
        type="button"
        onClick={() => handleSelectLanguage("hi")}
        className={`px-2.5 py-1 rounded-lg font-semibold transition-all duration-150 cursor-pointer ${
          language === "hi"
            ? "bg-[#70452C] text-white shadow-xs"
            : "text-[#575048] hover:text-[#17221C] hover:bg-[#EAE0D1]/60"
        }`}
        title="हिन्दी में बदलें (Google Translate)"
      >
        हिन्दी
      </button>
    </div>
  );
}
