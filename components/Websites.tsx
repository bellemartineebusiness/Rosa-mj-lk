import FadeUp from "@/components/FadeUp";

const features = [
  {
    title: "Modern design",
    body: "Snygga, moderna hemsidor byggda från grunden efter ditt varumärke. Inga mallar som ser ut som alla andra.",
  },
  {
    title: "Snabbt igång",
    body: "Vi ritar, bygger och lanserar på några dagar. Snabb, mobilanpassad och optimerad för Google från dag ett.",
  },
  {
    title: "Redo för chatboten",
    body: "Din hemsida byggs så att vår AI-chatbot enkelt kan kopplas på när du vill. Då svarar den på frågor och tar emot bokningar dygnet runt.",
  },
];

export default function Websites() {
  return (
    <section id="hemsidor" className="py-20 md:py-32 bg-[#faf9f7] border-y border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#E8440A] mb-3">Nytt · Hemsidor</p>
          <h2 className="text-2xl md:text-4xl font-semibold text-secondary-foreground tracking-tight mb-4">
            Vi bygger din hemsida också.
          </h2>
          <p className="text-sm md:text-base text-[#6e6e73] font-normal leading-relaxed">
            Behöver du en ny hemsida, eller vill du fräscha upp den du har? Vi designar och bygger moderna, snabba hemsidor som får dig att sticka ut. Vill du kan vi koppla på vår AI-chatbot också.
          </p>
        </div></FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={0.1 * (i + 1)}>
              <div className="h-full rounded-2xl bg-white border border-[#eeeeee] p-6 md:p-7 flex flex-col gap-3">
                <span className="w-9 h-9 rounded-full bg-[#E8440A]/10 flex items-center justify-center text-[#E8440A] text-sm font-semibold shrink-0">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-secondary-foreground">{f.title}</h3>
                <p className="text-xs md:text-sm text-[#6e6e73] font-normal leading-relaxed">{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}><div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Få en offert →
          </a>
          <p className="text-xs text-[#8e8e93] font-normal">
            Berätta vad du behöver så hör vi av oss med ett förslag.
          </p>
        </div></FadeUp>

      </div>
    </section>
  );
}
