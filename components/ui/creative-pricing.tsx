import { Check, Globe, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

function FilledCheck() {
  return (
    <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center shrink-0 text-zinc-600">
      <Check className="w-3 h-3" strokeWidth={3} />
    </div>
  );
}

const tiers: PricingTier[] = [
  {
    name: "Hemsida",
    icon: <Globe className="w-6 h-6" />,
    price: "5 000 kr",
    description: "Snabbt och snyggt",
    features: [
      "Responsiv hemsida",
      "Kontaktformulär",
      "SEO-optimering",
      "Snabb laddning",
      "Lansering ingår",
    ],
    cta: "Kom igång",
  },
  {
    name: "Logotyp & Hemsida",
    icon: <Layers className="w-6 h-6" />,
    price: "6 000 kr",
    description: "Allt du behöver",
    features: [
      "Logotyp & designsystem",
      "Responsiv hemsida",
      "Kontaktformulär",
      "SEO-optimering",
      "Lansering ingår",
    ],
    popular: true,
    cta: "Kom igång",
  },
  {
    name: "AI-Komplett",
    icon: <Sparkles className="w-6 h-6" />,
    price: "Kontakta oss",
    description: "Skräddarsytt för dig",
    features: [
      "Allt i Logotyp & Hemsida",
      "AI-strategi & verktyg",
      "Marknadsföring",
      "Social Media-kit",
      "Löpande support",
    ],
    cta: "Hör av dig",
  },
];

export function CreativePricing() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group transition-all duration-300",
              index === 0 && "-rotate-1",
              index === 1 && "rotate-1",
              index === 2 && "rotate-[-1.5deg]",
            )}
          >
            {/* Shadow card */}
            <div className={cn(
              "absolute inset-0 bg-white border-2 border-zinc-800 rounded-2xl",
              "shadow-[4px_4px_0px_0px] shadow-zinc-800/30",
              "transition-all duration-300",
              "group-hover:shadow-[7px_7px_0px_0px] group-hover:shadow-zinc-800/35",
              "group-hover:-translate-x-1 group-hover:-translate-y-1",
            )} />

            <div className="relative p-6">
              {tier.popular && (
                <div className="absolute -top-3 -right-3 bg-[#0a0a0a] text-white font-handwritten font-bold px-3 py-1 rounded-full rotate-12 text-sm border border-zinc-700 z-10">
                  Populärast!
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center mb-4 text-zinc-700">
                {tier.icon}
              </div>

              {/* Name & description */}
              <h3 className="font-handwritten text-2xl font-bold text-zinc-900 leading-tight">
                {tier.name}
              </h3>
              <p className="font-handwritten text-lg text-zinc-500 mb-5 mt-1">
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="font-handwritten text-3xl font-bold text-zinc-900">
                  {tier.price}
                </span>
                {tier.price !== "Kontakta oss" && (
                  <span className="font-handwritten text-zinc-500 ml-1 text-lg"> · engång</span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-7">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <FilledCheck />
                    <span className="font-handwritten text-lg text-zinc-800">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#kontakt"
                className={cn(
                  "w-full h-12 font-handwritten text-lg font-bold",
                  "flex items-center justify-center",
                  "border border-zinc-200 rounded-xl",
                  "transition-all duration-300",
                  "shadow-[3px_3px_0px_0px] shadow-zinc-900/15",
                  "hover:shadow-[5px_5px_0px_0px] hover:shadow-zinc-900/20",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5",
                  tier.popular
                    ? "bg-[#0a0a0a] text-white hover:bg-black"
                    : "bg-zinc-50 text-zinc-900 hover:bg-white",
                )}
              >
                {tier.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
