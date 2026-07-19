"use client";

const Star = () => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z" fill="#E8440A"/>
  </svg>
);

const testimonials = [
  {
    name: "Sara Lindström",
    role: "Grundare, Bloom Skincare",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    quote: "Chattboten svarar på frågor dygnet runt. Färre mail och fler bokningar redan första veckan.",
  },
  {
    name: "Erik Johansson",
    role: "VD, Restaurang Solsidan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
    quote: "Bokningarna ökade med 40% första månaden. Boten hanterar allt automatiskt och jag behöver knappt lyfta ett finger.",
  },
];

export default function Testimonials() {
  return (
    <section id="omdomen" className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <div className="text-center mb-16">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-4">Omdömen</p>
          <h2 className="text-3xl md:text-[clamp(2.2rem,5vw,3.5rem)] font-semibold text-secondary-foreground tracking-tight leading-tight">
            Resultat
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col gap-5">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-64 rounded-2xl object-cover object-[center_15%]"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
              </div>
              <p className="text-[#6e6e73] text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-base font-semibold text-secondary-foreground">
                {t.name} <span className="font-normal text-[#8e8e93] text-sm">{t.role}</span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
