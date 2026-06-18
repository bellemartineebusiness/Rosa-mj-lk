"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = tx(lang).nav;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    scrollTo(href.replace("#", ""));
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-2xl border-b border-[#f0f0f0]" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

        <nav className="hidden md:flex items-center gap-0.5">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`px-5 py-2 text-[13px] font-normal tracking-wide rounded-full transition-colors duration-200 ${
                scrolled
                  ? "text-secondary-foreground/55 hover:text-secondary-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className={`flex items-center rounded-full border text-[12px] font-normal overflow-hidden transition-colors duration-300 ${
            scrolled ? "border-[#e0e0e0]" : "border-white/25"
          }`}>
            <button
              onClick={() => setLang("sv")}
              className={`px-3 py-1.5 transition-colors duration-200 ${
                lang === "sv"
                  ? scrolled ? "bg-secondary-foreground text-white" : "bg-white/20 text-white"
                  : scrolled ? "text-[#8e8e93] hover:text-secondary-foreground" : "text-white/50 hover:text-white/80"
              }`}
            >
              SV
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors duration-200 ${
                lang === "en"
                  ? scrolled ? "bg-secondary-foreground text-white" : "bg-white/20 text-white"
                  : scrolled ? "text-[#8e8e93] hover:text-secondary-foreground" : "text-white/50 hover:text-white/80"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#kontakt"
            onClick={(e) => handleClick(e, "#kontakt")}
            className="text-[13px] font-normal px-5 py-2 rounded-full transition-all duration-200 bg-[#E8440A] text-white hover:bg-[#d03d09]"
          >
            {t.cta}
          </a>
        </div>

        <button
          className={`md:hidden ${scrolled ? "text-secondary-foreground/70" : "text-white/80"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#f0f0f0]">
          <div className="px-8 py-6 flex flex-col">
            {t.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="py-3.5 text-sm font-normal text-secondary-foreground/60 hover:text-secondary-foreground border-b border-secondary last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-[#e0e0e0] text-[12px] font-normal overflow-hidden">
                <button
                  onClick={() => setLang("sv")}
                  className={`px-4 py-2 transition-colors duration-200 ${
                    lang === "sv" ? "bg-secondary-foreground text-white" : "text-[#8e8e93]"
                  }`}
                >
                  SV
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-2 transition-colors duration-200 ${
                    lang === "en" ? "bg-secondary-foreground text-white" : "text-[#8e8e93]"
                  }`}
                >
                  EN
                </button>
              </div>
              <a
                href="#kontakt"
                onClick={(e) => handleClick(e, "#kontakt")}
                className="flex-1 text-center text-sm font-normal px-5 py-3 rounded-full bg-[#E8440A] text-white"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
