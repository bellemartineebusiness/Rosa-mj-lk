"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_SESSION_MESSAGES = 40;

const initial: Message[] = [
  { role: "assistant", content: "Hej! Välkommen till Salon Aurora. Hur kan jag hjälpa dig idag?" },
];

export default function ChatDemo({ botId = "support" }: { botId?: string }) {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sessionEnded = messages.length >= MAX_SESSION_MESSAGES;

  async function send() {
    const text = input.trim();
    if (!text || loading || sessionEnded) return;
    setInput("");

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const reply = res.ok
        ? data.reply
        : (data.error ?? "Något gick fel. Försök igen.");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message.includes("429")
          ? "För många meddelanden. Vänta en minut och försök igen."
          : "Något gick fel. Försök igen.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg bg-[#141414] border border-white/8 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#E8440A] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-semibold">AI</span>
        </div>
        <div className="flex-1 text-center">
          <p className="text-white text-sm font-medium leading-none">Salon Aurora</p>
          <p className="text-white/40 text-[11px] font-normal mt-0.5">Online · Svarar direkt</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
      </div>

      {/* Messages */}
      <div className="h-52 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-normal leading-relaxed ${
              msg.role === "user"
                ? "bg-[#E8440A] text-white rounded-br-sm"
                : "bg-white/8 text-white/85 rounded-bl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/8">
        {sessionEnded ? (
          <div className="flex flex-col items-center gap-2 py-1">
            <p className="text-center text-white/40 text-xs">Sessionen är avslutad.</p>
            <button
              onClick={() => { setMessages(initial); setInput(""); }}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#E8440A] text-white transition-opacity hover:opacity-80"
            >
              Starta ny chatt
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Skriv ett meddelande..."
              className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-30 flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
