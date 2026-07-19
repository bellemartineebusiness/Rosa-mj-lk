"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

function ChatIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.163 2 11.278c0 2.56 1.098 4.87 2.876 6.544L4 22l4.525-1.96A10.79 10.79 0 0 0 12 20.556C17.523 20.556 22 16.393 22 11.278S17.523 2 12 2Z" fill="white"/>
      <circle cx="8.5" cy="11.5" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="11.5" r="1.2" fill="currentColor"/>
      <circle cx="15.5" cy="11.5" r="1.2" fill="currentColor"/>
    </svg>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type Message = { role: "user" | "assistant"; content: string };
const MAX_SESSION = 40;

interface Props {
  customerId: string;
  initialColor: string;
  initialCompanyName: string;
}

export default function WidgetClient({ customerId, initialColor, initialCompanyName }: Props) {
  const color = initialColor;
  const companyName = initialCompanyName;

  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { if (!hasOpened) setShowTeaser(true); }, 1500);
    return () => clearTimeout(t);
  }, [hasOpened]);

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hej! Hur kan jag hjälpa dig?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/widget-suggestions?customerId=${customerId}`)
      .then((r) => r.json())
      .then((d) => { if (d.suggestions) setSuggestions(d.suggestions); })
      .catch(() => {});
  }, [customerId]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sessionEnded = messages.length >= MAX_SESSION;

  function toggleOpen() {
    setOpen((v) => !v);
    setHasOpened(true);
    setShowTeaser(false);
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading || sessionEnded) return;
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, customerId }),
      });
      const d = await res.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: res.ok ? (d.reply ?? d.error ?? "Något gick fel.") : (d.error ?? "Något gick fel."),
      }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Något gick fel. Försök igen." }]);
    } finally {
      setLoading(false);
    }
  }

  const initial = companyName ? companyName[0].toUpperCase() : "B";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <style>{`
        @keyframes wave-blob {
          0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1.2); }
          25%  { border-radius: 30% 70% 55% 45% / 40% 60% 40% 60%; transform: scale(1.25); }
          50%  { border-radius: 50% 50% 70% 30% / 30% 70% 50% 50%; transform: scale(1.2); }
          75%  { border-radius: 70% 30% 40% 60% / 60% 40% 65% 35%; transform: scale(1.25); }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1.2); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-enter { animation: chatIn 0.22s ease-out forwards; }
        .teaser-enter { animation: slideUp 0.3s ease-out forwards; }
      `}</style>

      {/* Chat window */}
      {open && (
        <div className="chat-enter w-80 bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col ring-1 ring-black/6">

          {/* Header */}
          <div className="px-5 pt-4 pb-5" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-white text-[11px] font-medium">Online</span>
              </div>
              <button onClick={toggleOpen} className="text-white/50 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold text-white" style={{ backgroundColor: hexToRgba("#ffffff", 0.15) }}>
                {initial}
              </div>
              <div>
                <p className="text-white font-semibold text-[15px] leading-snug">{companyName || "Chattbot"}</p>
                <p className="text-white/60 text-xs mt-0.5">Vi svarar direkt</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 bg-[#f9f9f9]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white mb-0.5"
                    style={{ backgroundColor: color }}
                  >
                    {initial}
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm font-normal leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-secondary-foreground rounded-bl-sm shadow-sm border border-[#f0f0f0]"
                  }`}
                  style={msg.role === "user" ? { backgroundColor: color } : undefined}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && suggestions.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1 ml-8">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="self-start text-left text-xs px-3 py-2 rounded-xl border bg-white transition-all hover:opacity-80 active:scale-95"
                    style={{ borderColor: color, color }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white mb-0.5" style={{ backgroundColor: color }}>
                  {initial}
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1 shadow-sm border border-[#f0f0f0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-[#f0f0f0] bg-white">
            {sessionEnded ? (
              <div className="flex flex-col items-center gap-2 py-1">
                <p className="text-center text-xs text-[#8e8e93]">Sessionen är avslutad.</p>
                <button
                  onClick={() => {
                    setMessages([{ role: "assistant", content: "Hej! Hur kan jag hjälpa dig?" }]);
                    setInput("");
                  }}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ backgroundColor: color, color: "#fff" }}
                >
                  Starta ny chatt
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, 500))}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Skriv ett meddelande..."
                    className="flex-1 bg-secondary rounded-xl px-3.5 py-2.5 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || loading}
                    className="w-9 h-9 rounded-xl disabled:opacity-30 flex items-center justify-center transition-colors"
                    style={{ backgroundColor: color }}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                {input.length > 400 && (
                  <p className={`text-[10px] text-right pr-1 ${input.length >= 490 ? "text-red-400" : "text-[#a0a0a8]"}`}>
                    {500 - input.length} tecken kvar
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Branding */}
          <a
            href="https://bellemartinee.se"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 border-t border-[#f0f0f0] bg-white hover:bg-[#fafafa] transition-colors"
          >
            <span className="text-[11px] text-[#8e8e93]">Skapad av</span>
            <span className="text-[11px] font-semibold" style={{ color }}>Belle Martineé</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      )}

      {/* Teaser bubble */}
      {showTeaser && !open && (
        <div className="teaser-enter relative bg-white rounded-2xl shadow-xl ring-1 ring-black/6 w-64 overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2.5 border-b border-[#f0f0f0]">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-secondary-foreground truncate">{companyName || "Chattbot"}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-[#8e8e93]">Online nu</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
              className="text-[#c0c0c5] hover:text-[#8e8e93] transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="px-4 py-3 cursor-pointer" onClick={toggleOpen}>
            <p className="text-sm text-secondary-foreground leading-relaxed">Hej! Har du några frågor? Jag hjälper dig gärna.</p>
            <span className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium" style={{ color }}>
              Starta chatt
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-black/6" />
        </div>
      )}

      {/* Bubble button */}
      <div className="relative flex items-center justify-center">
        {!open && (
          <span className="absolute w-14 h-14 opacity-25" style={{ backgroundColor: color, filter: "blur(4px)", animation: "wave-blob 4s ease-in-out infinite" }} />
        )}
        {!open && !hasOpened && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center z-10 shadow-sm">
            1
          </span>
        )}
        <button
          onClick={toggleOpen}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ backgroundColor: color, boxShadow: `0 8px 28px ${hexToRgba(color, 0.45)}` }}
        >
          {open ? <X className="w-5 h-5 text-white" /> : <ChatIcon />}
        </button>
      </div>
    </div>
  );
}
