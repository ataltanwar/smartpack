import { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Check,
  Copy,
  Layers,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { sendChatQuery } from "../../utils/chatbot";

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I'm **SmartPack AI**, your intelligent packaging assistant.\n\nI can help you analyze packaging materials (LDPE, PLA, Kraft, EVOH), optimize shelf life, evaluate moisture/gas barrier properties, and find sustainable eco-friendly alternatives.\n\nHow can I help you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

export default function ChatbotWidget({ currentContext = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Chat state
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("smartpack_chat_history");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem("smartpack_chat_history", JSON.stringify(messages));
    } catch {
      // ignore storage error
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, loading]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setLoading(true);

    try {
      const result = await sendChatQuery({
        query: query,
        history: messages.slice(-8),
        context: currentContext,
      });

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `Unable to process request at this moment. ${err.message || "Please check your network and try again."}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Clear conversation history?")) {
      setMessages(INITIAL_MESSAGES);
      try {
        sessionStorage.removeItem("smartpack_chat_history");
      } catch {
        // ignore
      }
    }
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick suggestion prompts
  const suggestionChips = [
    currentContext?.commodity
      ? `Best packaging for ${currentContext.commodity}?`
      : "Best packaging for fresh tomatoes?",
    "Compare PLA vs LDPE",
    "How to extend food shelf life?",
    "What is WVTR & OTR barrier?",
  ];

  // Lightweight markdown rendering
  const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-heading font-bold text-sm text-[#70452C] mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ") || line.startsWith("# ")) {
        return (
          <h3 key={idx} className="font-heading font-bold text-base text-[#17221C] mt-2 mb-1">
            {line.replace(/^#+\s/, "")}
          </h3>
        );
      }
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const content = line.trim().replace(/^[-*]\s/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-[#2E2822] leading-relaxed my-0.5">
            {renderInlineMarkdown(content)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line.trim())) {
        const content = line.trim().replace(/^\d+\.\s/, "");
        return (
          <li key={idx} className="ml-4 list-decimal text-xs sm:text-sm text-[#2E2822] leading-relaxed my-0.5">
            {renderInlineMarkdown(content)}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-[#2E2822] leading-relaxed my-1">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (content) => {
    const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[#17221C]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1 py-0.5 rounded bg-[#EFE6D9] text-[#70452C] text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans print:hidden">
      {/* LAUNCHER BUTTON */}
      {!isOpen && (
        <div className="relative group">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#70452C] hover:bg-[#56331E] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#D9B27C]/40 cursor-pointer"
            aria-label="Open SmartPack AI Assistant"
          >
            <div className="relative">
              <Bot size={22} className="text-[#F5EBDD]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#70452C] animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
                SmartPack AI
              
              </span>
              <span className="text-[10px] text-[#E4D8C8]">Packaging Assistant</span>
            </div>
          </button>
        </div>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          className={`flex flex-col bg-[#FCF9F4] border border-[#E4D8C8] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized
              ? "w-80 h-14"
              : "w-[92vw] sm:w-[420px] md:w-[460px] h-[580px] max-h-[85vh]"
          }`}
          style={{ backdropFilter: "blur(12px)" }}
        >
          {/* HEADER */}
          <div className="bg-[#70452C] text-white px-4 py-3 flex items-center justify-between border-b border-[#56331E] select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#D9B27C]">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-sm tracking-tight">SmartPack AI</span>
                  <span className="text-[9px] font-semibold bg-[#D9B27C]/20 text-[#F5EBDD] px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#D9B27C]/30">
                    Assistant
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#E4D8C8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online • Packaging Intelligence</span>
                </div>
              </div>
            </div>

            {/* HEADER ACTIONS */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Clear Conversation"
              >
                <RotateCcw size={14} />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* CONTEXT BANNER */}
          {!isMinimized && currentContext?.commodity && (
            <div className="bg-[#F5EBDD] border-b border-[#E4D8C8] px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[#70452C]">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Layers size={13} className="shrink-0 text-[#70452C]" />
                <span className="truncate">
                  Active Context: <strong>{currentContext.commodity}</strong>
                  {currentContext.temperature !== undefined && ` (${currentContext.temperature}°C, ${currentContext.storageType || "Standard"})`}
                </span>
              </div>
              <span className="text-[10px] text-[#8C7E72] shrink-0">Synced</span>
            </div>
          )}

          {/* MAIN CHAT BODY */}
          {!isMinimized && (
            <>
              {/* MESSAGES LIST */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FCF9F4]">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[88%] ${
                          isUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* AVATAR */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] ${
                            isUser ? "bg-[#70452C]" : "bg-[#D9B27C] text-[#70452C]"
                          }`}
                        >
                          {isUser ? <User size={13} /> : <Bot size={13} className="text-[#56331E]" />}
                        </div>

                        {/* MESSAGE BUBBLE */}
                        <div
                          className={`relative rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-sm group ${
                            isUser
                              ? "bg-[#70452C] text-white rounded-tr-none"
                              : "bg-white border border-[#E4D8C8] text-[#17221C] rounded-tl-none"
                          }`}
                        >
                          {!isUser && (
                            <div className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-[#EFE6D9] text-[10px] text-[#8C7E72]">
                              <span className="font-semibold text-[#70452C]">
                                SmartPack AI
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span>{msg.timestamp}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText(msg.id, msg.content)}
                                  className="text-[#8C7E72] hover:text-[#70452C] transition-colors cursor-pointer"
                                  title="Copy text"
                                >
                                  {copiedId === msg.id ? (
                                    <Check size={11} className="text-emerald-600" />
                                  ) : (
                                    <Copy size={11} />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* TEXT CONTENT */}
                          <div className={isUser ? "text-white" : "text-[#17221C]"}>
                            {isUser ? (
                              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            ) : (
                              renderFormattedText(msg.content)
                            )}
                          </div>

                          {/* USER TIMESTAMP */}
                          {isUser && (
                            <span className="block text-[9px] text-[#E4D8C8] text-right mt-1">
                              {msg.timestamp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* LOADING INDICATOR */}
                {loading && (
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-[#D9B27C] flex items-center justify-center shrink-0">
                      <Bot size={13} className="text-[#56331E]" />
                    </div>
                    <div className="bg-white border border-[#E4D8C8] rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5 text-xs text-[#70452C]">
                        <span className="w-2 h-2 rounded-full bg-[#70452C] animate-bounce" />
                        <span
                          className="w-2 h-2 rounded-full bg-[#70452C] animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-[#70452C] animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                        <span className="text-[11px] font-medium text-[#786E64] ml-1">
                          Analyzing with SmartPack AI...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* QUICK PROMPT SUGGESTIONS */}
              <div className="px-3 py-2 bg-[#F9F2E7]/80 border-t border-[#E4D8C8] overflow-x-auto flex gap-1.5 no-scrollbar">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    disabled={loading}
                    className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#F5EBDD] text-[#70452C] border border-[#E4D8C8] font-medium transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* INPUT AREA */}
              <div className="p-3 bg-[#FCF9F4] border-t border-[#E4D8C8]">
                <div className="flex items-end gap-2 bg-white border border-[#E4D8C8] rounded-xl p-1.5 focus-within:border-[#70452C] focus-within:ring-2 focus-within:ring-[#70452C]/10 transition-all">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about materials, shelf life, barriers..."
                    className="flex-1 max-h-24 resize-none text-xs sm:text-sm px-2 py-1 bg-transparent text-[#17221C] placeholder-[#8C7E72] outline-none"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputQuery.trim() || loading}
                    className="p-2 rounded-lg bg-[#70452C] hover:bg-[#56331E] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 shadow-xs"
                    aria-label="Send message"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between px-1 mt-1 text-[10px] text-[#8C7E72]">
                  <span>SmartPack AI Intelligence</span>
                  <span>Enter ↵ to send</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
