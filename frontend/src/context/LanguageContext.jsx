import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  translateBatchWithGoogle,
  getCachedTranslation,
} from "../services/translationService";

const LanguageContext = createContext(null);

const IGNORED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "SVG",
  "PATH",
  "CODE",
  "PRE",
  "INPUT",
  "TEXTAREA",
  "SELECT",
]);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("smartpack_language") || "en";
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");

  const originalTextsRef = useRef(new WeakMap());
  const observerRef = useRef(null);
  const isTranslatingRef = useRef(false);

  // Update and persist language
  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem("smartpack_language", lang);
    if (lang === "en") {
      setError("");
    }
  }, []);

  // Quick synchronous translation helper for JSX
  const t = useCallback(
    (text) => {
      if (!text || language === "en") return text;
      const cached = getCachedTranslation(text, language);
      return cached || text;
    },
    [language]
  );

  /**
   * Helper to check if a node is valid for translation
   */
  const isValidTextNode = useCallback((node) => {
    if (!node || node.nodeType !== Node.TEXT_NODE) return false;
    const parent = node.parentElement;
    if (!parent) return false;

    if (IGNORED_TAGS.has(parent.tagName)) return false;
    if (parent.closest("[data-no-translate='true']")) return false;
    // Don't translate Lucide icons or code
    if (parent.classList.contains("lucide") || parent.closest(".lucide")) return false;

    const val = node.nodeValue?.trim();
    if (!val || val.length <= 1) return false;
    // Avoid purely numeric, date, or symbol values
    if (/^[0-9\s.,:%°/\\()#\-+]+$/.test(val)) return false;

    return true;
  }, []);

  /**
   * Translate all visible text nodes in the DOM
   */
  const translateDom = useCallback(async () => {
    if (language !== "hi" || isTranslatingRef.current) return;

    const root = document.getElementById("root");
    if (!root) return;

    isTranslatingRef.current = true;
    setIsTranslating(true);
    setError("");

    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let currentNode = walker.nextNode();

      while (currentNode) {
        if (isValidTextNode(currentNode)) {
          textNodes.push(currentNode);
        }
        currentNode = walker.nextNode();
      }

      const textsToTranslate = [];
      const nodeToOriginal = [];

      for (const node of textNodes) {
        let original = originalTextsRef.current.get(node);
        if (!original) {
          original = node.nodeValue.trim();
          originalTextsRef.current.set(node, original);
        }

        // Apply instant cached translation if available
        const cached = getCachedTranslation(original, "hi");
        if (cached) {
          if (node.nodeValue !== cached) {
            node.nodeValue = cached;
          }
        } else {
          textsToTranslate.push(original);
          nodeToOriginal.push({ node, original });
        }
      }

      if (textsToTranslate.length > 0) {
        const translations = await translateBatchWithGoogle(textsToTranslate, "hi", "en");
        for (const { node, original } of nodeToOriginal) {
          if (translations[original]) {
            node.nodeValue = translations[original];
          }
        }
      }
    } catch (err) {
      console.error("[Translation Error]", err);
      setError("Failed to complete Google translation. Check API key.");
    } finally {
      setIsTranslating(false);
      isTranslatingRef.current = false;
    }
  }, [language, isValidTextNode]);

  /**
   * Revert all text nodes back to original English text
   */
  const revertDomToEnglish = useCallback(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let currentNode = walker.nextNode();

    while (currentNode) {
      const original = originalTextsRef.current.get(currentNode);
      if (original) {
        currentNode.nodeValue = original;
      }
      currentNode = walker.nextNode();
    }
  }, []);

  // Monitor language change and DOM mutations
  useEffect(() => {
    if (language === "hi") {
      translateDom();

      // Debounced observer for dynamic elements (e.g. recommendation results, chatbot messages)
      let debounceTimer = null;
      const observer = new MutationObserver((mutations) => {
        if (isTranslatingRef.current) return;
        const hasTextMutation = mutations.some(
          (m) => m.type === "childList" || (m.type === "characterData" && !m.target._smartpackTranslated)
        );
        if (hasTextMutation) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            translateDom();
          }, 250);
        }
      });

      const root = document.getElementById("root");
      if (root) {
        observer.observe(root, {
          childList: true,
          subtree: true,
          characterData: true,
        });
        observerRef.current = observer;
      }

      return () => {
        clearTimeout(debounceTimer);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      revertDomToEnglish();
    }
  }, [language, translateDom, revertDomToEnglish]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isTranslating,
        error,
        t,
        translateDom,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
