"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

const DEMO_CUSTOMER_ID = "0fb2136e-af25-4534-ba57-db34db4dc32a";
const COLOR = "#E8440A";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type Message = { role: "user" | "assistant"; content: string };

export default function WidgetDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hej! Hur kan jag hjälpa dig idag?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const d = await res.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: d.reply ?? "Något gick fel.",
      }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Något gick fel. Försök igen." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">

      {/* Mock website background */}
      <div className="rounded-3xl overflow-hidden border border-[#e8e8e8] shadow-2xl shadow-black/10 bg-[#f5f5f7]">

        {/* Fake browser bar */}
        <div className="bg-white border-b border-[#e8e8e8] px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 mx-3 bg-[#f5f5f7] rounded-md px-3 py-1 text-[11px] text-[#a0a0a8]">
            dittforetag.se
          </div>
        </div>

        {/* Fake website content */}
        <div className="px-6 py-8 relative" style={{ minHeight: "340px" }}>
          <div className="h-4 w-32 bg-[#e0e0e0] rounded-full mb-3" />
          <div className="h-8 w-48 bg-[#d0d0d0] rounded-xl mb-5" />
          <div className="h-3 w-full bg-[#e8e8e8] rounded-full mb-2" />
          <div className="h-3 w-4/5 bg-[#e8e8e8] rounded-full mb-2" />
          <div className="h-3 w-3/5 bg-[#e8e8e8] rounded-full mb-6" />
          <div className="h-9 w-28 bg-[#d0d0d0] rounded-full" />

          {/* Widget floating bottom right */}
          <div className="absolute bottom-4 right-4 w-72 bg-white rounded-2xl shadow-xl ring-1 ring-black/8 overflow-hidden flex flex-col">

            {/* Widget header */}
            <div className="px-4 pt-3.5 pb-4" style={{ backgroundColor: COLOR }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-white text-[10px] font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  B
                </div>
                <div>
                  <p className="text-white font-semibold text-[13px] leading-tight">Belle Martineé</p>
                  <p className="text-white/60 text-[10px]">Vi svarar direkt</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-48 overflow-y-auto px-3 py-3 flex flex-col gap-2 bg-[#f9f9f9]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-1.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white mb-0.5" style={{ backgroundColor: COLOR }}>
                      B
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-white text-secondary-foreground rounded-bl-sm shadow-sm border border-[#f0f0f0]"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: COLOR } : undefined}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-end gap-1.5">
                  <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white mb-0.5" style={{ backgroundColor: COLOR }}>B</div>
                  <div className="bg-white rounded-xl rounded-bl-sm px-3 py-2.5 flex gap-1 shadow-sm border border-[#f0f0f0]">
                    <span className="w-1 h-1 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1 h-1 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1 h-1 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-2.5 py-2.5 border-t border-[#f0f0f0] bg-white flex gap-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Skriv ett meddelande..."
                className="flex-1 bg-[#f5f5f7] rounded-lg px-3 py-2 text-xs text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none transition-all"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg disabled:opacity-30 flex items-center justify-center transition-colors shrink-0"
                style={{ backgroundColor: COLOR }}
              >
                <Send className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Branding */}
            <div className="flex items-center justify-center gap-1 py-1.5 bg-white border-t border-[#f0f0f0]">
              <span className="text-[9px] text-[#b0b0b8]">Skapad av</span>
              <span className="text-[9px] font-semibold" style={{ color: COLOR }}>Belle Martineé</span>
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-xs text-[#8e8e93] mt-4">Prova live — exakt så här ser det ut på din hemsida</p>
    </div>
  );
}
