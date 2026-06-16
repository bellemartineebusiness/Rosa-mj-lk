"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function TestPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hej! Jag är en testbot. Skriv något för att prova!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/test-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.ok ? data.reply : (data.error ?? "Något gick fel.") },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Något gick fel." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#e8e8e8] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 bg-[#0a0a0a] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8440A] flex items-center justify-center shrink-0">
            <span className="text-white text-[11px] font-semibold">AI</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Testbot</p>
            <p className="text-white/40 text-xs flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto px-5 py-5 flex flex-col gap-3 bg-[#f9f9f9]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm border border-[#f0f0f0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-[#f0f0f0] bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Skriv ett meddelande..."
            autoFocus
            className="flex-1 bg-[#f5f5f7] rounded-xl px-4 py-2.5 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
