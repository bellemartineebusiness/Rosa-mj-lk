"use client";

import { motion } from "framer-motion";
import { Send, PenLine, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const notes = [
  { name: "Ditt namn", text: "Skriv vad du vill att det ska stå på sidan. Det kan vara vad som helst.", date: "Exempel" },
  { name: "Ditt namn", text: "Kanske något om vad du tycker om sidan, eller ett meddelande till oss.", date: "Exempel" },
  { name: "Ditt namn", text: "Din text, dina ord. Vi publicerar det du skickar in.", date: "Exempel" },
  { name: "Ditt namn", text: "Det kan vara ett citat, en hälsning, eller bara vad som faller dig in.", date: "Exempel" },
  { name: "Ditt namn", text: "Skicka in din anteckning via formuläret nedan så syns den här.", date: "Exempel" },
  { name: "Ditt namn", text: "Den här sidan fylls av riktiga anteckningar från riktiga besökare.", date: "Exempel" },
];

const inputCls = "w-full bg-secondary border border-[#b8b8c2] rounded-xl px-4 py-3 text-sm font-normal text-secondary-foreground placeholder-[#8e8e93] focus:outline-none focus:border-[#1d1d1f] focus:ring-2 focus:ring-[#1d1d1f]/8 transition-all";

export default function Notes() {
  const [state, handleSubmit] = useForm("mqejarqo");

  return (
    <section id="anteckningar" className="py-36 bg-transparent">
      <div className="max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20 max-w-xl"
        >
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/55 mb-6">
            Anteckningar
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
            Det här är
            <br />
            <span className="text-white/55 font-normal">din sida.</span>
          </h2>
          <p className="text-white/55 text-base font-normal leading-relaxed">
            Du bestämmer vad som står här. Skicka in din anteckning och vi publicerar den.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-20">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-2xl p-6 border border-[#b0b0bc] hover:shadow-lg hover:shadow-black/5 transition-all duration-400 cursor-default"
            >
              <div className="flex flex-col gap-2 mb-5">
                <div className="h-px bg-[#f5f5f7]" />
                <div className="h-px bg-[#f5f5f7]" />
                <div className="h-px bg-[#f5f5f7]" />
              </div>

              <p className="text-secondary-foreground text-sm font-normal leading-relaxed mb-6 min-h-16">
                &ldquo;{note.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#d0d0d8]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#8e8e93] text-[10px] font-medium">
                    {note.name.charAt(0)}
                  </div>
                  <span className="text-xs font-normal text-[#8e8e93]">{note.name}</span>
                </div>
                <span className="text-[10px] font-normal text-[#b0b0b5] uppercase tracking-wider">{note.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white rounded-3xl border border-[#b8b8c2] p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="w-12 h-12 bg-[#f0f0f0] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#1d1d1f]" />
                </div>
                <h3 className="text-base font-medium text-secondary-foreground">Anteckning mottagen</h3>
                <p className="text-sm text-[#6e6e73] font-normal">Vi publicerar den snart.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <PenLine className="w-4 h-4 text-[#8e8e93]" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-secondary-foreground">Skriv din anteckning</h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-[#8e8e93]">Namn</label>
                  <input type="text" name="name" required placeholder="Anna Svensson" className={inputCls} />
                  <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-[#8e8e93]">Anteckning</label>
                  <textarea name="message" required rows={3} placeholder="Skriv vad du vill ha på sidan..." className={`${inputCls} resize-none`} />
                  <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs" />
                </div>

                <input type="hidden" name="_type" value="anteckning" />

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="group mt-1 flex items-center justify-center gap-2 bg-secondary-foreground text-white font-normal text-sm py-3.5 rounded-2xl hover:bg-black transition-colors duration-200 disabled:opacity-50"
                >
                  {state.submitting ? (
                    <><span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" /> Skickar...</>
                  ) : (
                    <>Skicka anteckning <Send className="w-3.5 h-3.5" /></>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#b0b0b5] font-normal">Vi granskar och publicerar inom 24h.</p>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
