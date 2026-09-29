/**
 * Google Translate Service using Google Translate API (client=gtx)
 * 
 * Uses:
 * https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}
 * 
 * With local caching and UI presets for instantaneous, free translation.
 */

const STORAGE_KEY_PREFIX = "smartpack_trans_cache_";

// Pre-seeded high-accuracy translations for core SmartPack UI
export const PRESET_TRANSLATIONS = {
  hi: {
    "SmartPack": "स्मार्टपैक",
    "Food Packaging Intelligence": "खाद्य पैकेजिंग इंटेलिजेंस",
    "AI": "एआई",
    "Workspace": "कार्यक्षेत्र",
    "How It Works": "यह कैसे काम करता है",
    "Meet the Team": "हमारी टीम",
    "Team (SIH 2026)": "टीम (SIH 2026)",
    "About": "के बारे में",
    "Find Packaging": "पैकेजिंग खोजें",
    "Download PPT": "पीपीटी डाउनलोड करें",
    "Commodity": "उत्पाद / वस्तु",
    "Shelf Life": "शेल्फ लाइफ",
    "Shelf Life (Days)": "शेल्फ लाइफ (दिन)",
    "Storage Temperature (°C)": "भंडारण तापमान (°C)",
    "Relative Humidity (%)": "सापेक्ष आर्द्रता (%)",
    "Storage Type": "भंडारण प्रकार",
    "Transportation": "परिवहन",
    "Include Eco-friendly Alternative": "पर्यावरण-अनुकूल विकल्प शामिल करें",
    "Analyze & Recommend Packaging": "पैकेजिंग का विश्लेषण और सिफारिश करें",
    "Analyzing Packaging...": "विश्लेषण किया जा रहा है...",
    "Recommended Packaging": "अनुशंसित पैकेजिंग",
    "Optimal Packaging Solution": "इष्टतम पैकेजिंग समाधान",
    "Eco-Friendly Alternative": "पर्यावरण-अनुकूल विकल्प",
    "Material Specifications": "सामग्री विनिर्देश",
    "Environmental Impact": "पर्यावरणीय प्रभाव",
    "Key Benefits": "मुख्य लाभ",
    "SmartPack Assistant": "स्मार्टपैक असिस्टेंट",
    "Ask anything about packaging...": "पैकेजिंग के बारे में कुछ भी पूछें...",
    "Send": "भेजें",
    "Type your message...": "अपना संदेश लिखें...",
    "Clear Chat": "चैट साफ़ करें",
    "English": "English",
    "Hindi": "हिन्दी",
  },
};

/**
 * Load translation cache from localStorage
 */
function getLocalCache(targetLang) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${targetLang}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore parse errors
  }
  return {};
}

/**
 * Save translation cache to localStorage
 */
function setLocalCache(targetLang, cache) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${targetLang}`, JSON.stringify(cache));
  } catch {
    // Handle storage quota limit gracefully
  }
}

// In-memory cache for ultra-fast lookups
const memoryCache = {
  hi: { ...(PRESET_TRANSLATIONS.hi || {}), ...getLocalCache("hi") },
};

/**
 * Synchronous cached lookup
 */
export function getCachedTranslation(text, targetLang = "hi") {
  if (!text || targetLang === "en") return text;
  const trimmed = text.trim();
  if (memoryCache[targetLang] && memoryCache[targetLang][trimmed]) {
    return memoryCache[targetLang][trimmed];
  }
  return null;
}

/**
 * Translate a single text string using Google Translate endpoint
 */
export async function translateSingleWithGoogle(text, targetLang = "hi", sourceLang = "en") {
  if (!text || targetLang === sourceLang) return text;
  const trimmed = text.trim();

  const cached = getCachedTranslation(trimmed, targetLang);
  if (cached) return cached;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sourceLang
    )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(trimmed)}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google Translate responded with HTTP ${res.status}`);
    }

    const data = await res.json();
    const translated = data?.[0]
      ? data[0].map((item) => item[0]).filter(Boolean).join("")
      : trimmed;

    // Cache the translated text
    const cache = memoryCache[targetLang] || (memoryCache[targetLang] = {});
    cache[trimmed] = translated;
    setLocalCache(targetLang, cache);

    return translated;
  } catch (err) {
    console.warn(`[Google Translate Error] Could not translate "${trimmed}":`, err);
    return trimmed;
  }
}

/**
 * Translate a batch of texts using Google Translate API with concurrency management and caching
 * @param {string[]} texts
 * @param {string} targetLang
 * @param {string} sourceLang
 */
export async function translateBatchWithGoogle(texts, targetLang = "hi", sourceLang = "en") {
  if (!texts || texts.length === 0 || targetLang === sourceLang) {
    const directMap = {};
    for (const t of texts || []) {
      directMap[t] = t;
    }
    return directMap;
  }

  const result = {};
  const toFetch = [];
  const cache = memoryCache[targetLang] || (memoryCache[targetLang] = {});

  // 1. Resolve from cache first
  for (const text of texts) {
    if (!text || !text.trim()) {
      result[text] = text;
      continue;
    }
    const trimmed = text.trim();
    if (cache[trimmed]) {
      result[text] = cache[trimmed];
    } else {
      toFetch.push(trimmed);
    }
  }

  // Deduplicate items to fetch
  const uniqueToFetch = Array.from(new Set(toFetch));
  if (uniqueToFetch.length === 0) {
    return result;
  }

  // Process requests in concurrent chunks of 6 to prevent network throttling
  const CONCURRENCY = 6;
  for (let i = 0; i < uniqueToFetch.length; i += CONCURRENCY) {
    const batch = uniqueToFetch.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (text) => {
        const translated = await translateSingleWithGoogle(text, targetLang, sourceLang);
        result[text] = translated;
      })
    );
  }

  return result;
}
