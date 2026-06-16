import { ShoppingCart, Code, MessageCircle } from "lucide-react";

const steps = [
  {
    Icon: ShoppingCart,
    step: "1",
    title: "Välj paket och betala",
    body: "Du väljer Starter, anger din e-post och betalar via Stripe. Tar under en minut.",
  },
  {
    Icon: Code,
    step: "2",
    title: "Klistra in en kodrad",
    body: "Du får en personlig kodsnutt direkt. Klistra in den i header eller footer på din hemsida — fungerar med WordPress, Shopify, Webflow och alla andra plattformar.",
  },
  {
    Icon: MessageCircle,
    step: "3",
    title: "Botten är live",
    body: "Chatten dyker upp automatiskt på din hemsida och börjar svara dina besökare dygnet runt.",
  },
];

export default function HowItWorksNew() {
  return (
    <section className="py-20 md:py-36 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <div className="mb-10 md:mb-16 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5">Så fungerar det</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight">
            Igång på tre steg.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.step} className="bg-[#f5f5f7] rounded-3xl p-7 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[11px] font-semibold shrink-0">{s.step}</span>
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                  <s.Icon className="w-4 h-4 text-[#E8440A]" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-secondary-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
