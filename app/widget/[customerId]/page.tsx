"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Send, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MAX_SESSION = 20;

export default function WidgetPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hej! Hur kan jag hjälpa dig?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sessionEnded = messages.length >= MAX_SESSION;

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
      setMessages(prev => [...prev, {
        role: "assistant",
        content: res.ok ? (d.reply ?? d.error ?? "Något gick fel.") : (d.error ?? "Något gick fel."),
      }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Något gick fel. Försök igen." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 bg-white rounded-3xl shadow-2xl shadow-black/15 border border-[#e8e8e8] overflow-hidden flex flex-col">

          {/* Header */}
          <div className="px-5 py-4 bg-[#0a0a0a] flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E8440A] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-semibold">AI</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium leading-none">Chattbot</p>
              <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 bg-[#f9f9f9]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-normal leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#E8440A] text-white rounded-br-sm"
                    : "bg-white text-secondary-foreground rounded-bl-sm shadow-sm border border-[#f0f0f0]"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
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
              <p className="text-center text-xs text-[#8e8e93] py-1">Kontakta oss direkt för mer hjälp.</p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Skriv ett meddelande..."
                  className="flex-1 bg-[#f5f5f7] rounded-xl px-3.5 py-2.5 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-30 flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#E8440A] hover:bg-[#d03d09] shadow-lg shadow-[#E8440A]/30 flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
      </button>
    </div>
  );
}
