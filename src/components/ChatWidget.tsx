"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X } from "lucide-react";
import { brand } from "@/config/branding";
import { trackGA4Lead, trackPixelLead } from "@/lib/analytics";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const CHIPS = [
  "What sizes do you carry?",
  "How do I find my fit?",
  "Tell me about your denim",
  "Get in touch",
];

const TEASER_KEY = "bhd:teaser_seen";

export default function ChatWidget() {
  const { enabled, greeting, teaserDelaySeconds } = brand.chatWidget;

  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {}

    function show() {
      if (shownRef.current) return;
      shownRef.current = true;
      try { sessionStorage.setItem(TEASER_KEY, "1"); } catch {}
      setTeaserVisible(true);
    }

    const timer = setTimeout(show, teaserDelaySeconds * 1000);

    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total >= 0.5) show();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, teaserDelaySeconds]);

  useEffect(() => {
    if (open) setTeaserVisible(false);
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    function handleOpen() { setOpen(true); }
    window.addEventListener("bhd:openChat", handleOpen);
    return () => window.removeEventListener("bhd:openChat", handleOpen);
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const newHistory: Message[] = [...messages, { role: "user", text: trimmed }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      if (data.leadCaptured) {
        trackGA4Lead();
        trackPixelLead();
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length <= 1 && !loading;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-4">

      {/* Chat panel */}
      {open && (
        <div
          className="w-[min(320px,calc(100vw-1.5rem))] sm:w-[380px] flex flex-col bg-brand-surface border border-white/10 overflow-hidden animate-slide-up"
          style={{
            height: "min(580px, calc(100dvh - 100px))",
            boxShadow: "0 24px 64px rgba(0,0,0,0.85)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06] bg-brand-bg flex-shrink-0">
            <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-heading text-white text-[13px] font-semibold leading-none tracking-widest">
                BH
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-heading text-brand-text text-[16px] font-semibold leading-none tracking-wide">
                Heritage AI
              </p>
              <p className="flex items-center gap-1.5 font-body text-[11px] text-[#4ade80] mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0" />
                Online now
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors text-[22px] leading-none flex-shrink-0"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" ? (
                  <div className="max-w-[84%] bg-brand-bg border-l-2 border-primary px-3.5 py-2.5 font-body text-[13px] leading-relaxed text-brand-text">
                    {m.text}
                  </div>
                ) : (
                  <div className="max-w-[84%] px-3.5 py-2.5 font-body text-[13px] leading-relaxed text-white font-medium bg-primary">
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-brand-bg border-l-2 border-primary px-4 py-3.5 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary animate-type-dot"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {showChips && (
            <div
              className="flex gap-2 px-4 py-2.5 border-t border-white/[0.06] overflow-x-auto flex-shrink-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="flex-shrink-0 px-3 py-1.5 border border-white/10 text-brand-muted font-body text-[11px] whitespace-nowrap hover:border-white/25 hover:text-brand-text transition-colors duration-200"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="border-t border-white/[0.06] px-3 py-3 flex gap-2 bg-brand-bg flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask about sizing, fit, or collections…"
              className="flex-1 bg-brand-surface border border-white/10 text-brand-text placeholder:text-brand-muted/40 font-body text-[13px] px-3.5 py-2.5 focus:outline-none focus:border-white/25 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 disabled:opacity-40 text-white flex items-center justify-center flex-shrink-0 transition-opacity duration-200 bg-primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[15px] h-[15px]"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Proactive teaser bubble */}
      {teaserVisible && !open && (
        <div
          className="animate-slide-up flex items-start gap-2 bg-brand-surface border border-white/10 px-4 py-3"
          style={{
            maxWidth: "min(260px, calc(100vw - 5rem))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
          }}
        >
          <button
            onClick={() => setOpen(true)}
            className="flex-1 text-left font-body text-[13px] leading-snug text-brand-text hover:text-white transition-colors"
            aria-label="Open chat"
          >
            {greeting}
          </button>
          <button
            onClick={() => setTeaserVisible(false)}
            aria-label="Dismiss"
            className="flex-shrink-0 text-brand-muted hover:text-brand-text text-[18px] leading-none transition-colors mt-0.5 pl-1"
          >
            &times;
          </button>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open AI assistant"}
        className="w-14 h-14 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 bg-primary"
      >
        {open ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </button>
    </div>
  );
}
