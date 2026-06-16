import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getBot } from "@/lib/bots";
import ChatDemo from "@/components/ChatDemo";

export default async function BotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bot = getBot(id);
  if (!bot) notFound();

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      <header className="px-6 md:px-10 h-16 flex items-center border-b border-white/6 shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-normal transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Tillbaka
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 min-h-0">
        <div className="w-full max-w-2xl flex flex-col items-center text-center gap-10">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-white/40 mb-6">
              Live demo
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
              {bot.name}
            </h1>
            <p className="text-white/50 text-base font-normal leading-relaxed max-w-sm mx-auto">
              Skriv vad du vill. Se hur din framtida bot svarar dygnet runt.
            </p>
          </div>

          <ChatDemo botId={bot.id} />

          <Link
            href="/#kontakt"
            className="group inline-flex items-center gap-2.5 bg-[#E8440A] hover:bg-[#d03d09] text-white text-sm font-normal px-8 py-3.5 rounded-full transition-colors duration-200"
          >
            Jag vill ha en sån här
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </main>
    </div>
  );
}
