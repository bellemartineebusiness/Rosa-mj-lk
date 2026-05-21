"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  SiOpenai,
  SiFigma,
  SiGoogleanalytics,
  SiMeta,
  SiVercel,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiWordpress,
  SiShopify,
  SiMailchimp,
  SiCanva,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

const iconConfigs = [
  { Icon: SiOpenai, color: "#10a37f", label: "OpenAI" },
  { Icon: SiCanva, color: "#00C4CC", label: "Canva" },
  { Icon: SiFigma, color: "#F24E1E", label: "Figma" },
  { Icon: SiGoogleanalytics, color: "#e37400", label: "Analytics" },
  { Icon: SiMeta, color: "#0082FB", label: "Meta Ads" },
  { Icon: SiVercel, color: "#f8edaa", label: "Vercel" },
  { Icon: SiNextdotjs, color: "#f8edaa", label: "Next.js" },
  { Icon: SiTailwindcss, color: "#38bdf8", label: "Tailwind" },
  { Icon: SiFramer, color: "#8b5cf6", label: "Framer" },
  { Icon: SiWordpress, color: "#21759b", label: "WordPress" },
  { Icon: SiShopify, color: "#96bf48", label: "Shopify" },
  { Icon: SiMailchimp, color: "#FFE01B", label: "Mailchimp" },
];

const orbitCount = 3;
const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

export default function FeatureSection() {
  return (
    <section id="verktyg" className="relative bg-[#1a0010] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#700143]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* Left */}
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-[#700143]/30 border border-[#700143]/40 text-[#f8edaa] px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
            <FaRobot className="w-3 h-3" />
            Verktygen vi använder
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 text-[#f8edaa] leading-tight">
            Vi använder
            <span className="text-gradient-light block">rätt verktyg</span>
          </h2>
          <p className="text-[#c4809a] mb-8 max-w-lg text-lg leading-relaxed">
            Vi använder samma verktyg som de stora byråerna. Fast till ett bättre pris.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="light" size="lg" className="gap-2" asChild>
              <a href="#projekt">Se resultaten <MoveRight className="w-4 h-4" /></a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#700143]/50 text-[#f8edaa] hover:bg-[#700143]/20 hover:text-[#f8edaa]"
              asChild
            >
              <a href="#tjanster">Priser</a>
            </Button>
          </div>
        </div>

        {/* Right: orbit */}
        <div className="relative w-full lg:w-1/2 h-[420px] flex items-center justify-center overflow-hidden">
          <div className="relative w-[380px] h-[380px] flex items-center justify-center">
            {/* Center dot */}
            <div className="absolute z-20 w-20 h-20 rounded-full bg-[#700143] shadow-2xl flex items-center justify-center shadow-[#700143]/50">
              <FaRobot className="w-10 h-10 text-[#f8edaa]" />
            </div>

            {[...Array(orbitCount)].map((_, orbitIdx) => {
              const size = 140 + orbitIdx * 90;
              const duration = 14 + orbitIdx * 7;
              const reverse = orbitIdx % 2 === 1;
              const sliceStart = orbitIdx * iconsPerOrbit;
              const sliceEnd = sliceStart + iconsPerOrbit;
              const icons = iconConfigs.slice(sliceStart, sliceEnd);

              return (
                <div
                  key={orbitIdx}
                  className="absolute rounded-full border border-[#700143]/25"
                  style={{
                    width: size,
                    height: size,
                    animation: `${reverse ? "spin-slow-reverse" : "spin-slow"} ${duration}s linear infinite`,
                    willChange: "transform",
                  }}
                >
                  {icons.map((cfg, iconIdx) => {
                    const angle = (iconIdx / icons.length) * 2 * Math.PI;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);
                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-[#2d0020] border border-[#700143]/30 rounded-xl p-2 shadow-lg"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={cfg.label}
                      >
                        <cfg.Icon className="w-5 h-5" style={{ color: cfg.color }} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
