"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Priser",  href: "#tjanster" },
  { label: "Demo",    href: "#projekt" },
  { label: "FAQ",            href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          {navLinks.map((link) => (
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

        <a
          href="#tjanster"
          onClick={(e) => handleClick(e, "#tjanster")}
          className="hidden md:inline-flex text-[13px] font-normal px-5 py-2 rounded-full transition-all duration-200 bg-[#E8440A] text-white hover:bg-[#d03d09]"
        >
          Kom igång
        </a>

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="py-3.5 text-sm font-normal text-secondary-foreground/60 hover:text-secondary-foreground border-b border-secondary last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#tjanster"
              onClick={(e) => handleClick(e, "#tjanster")}
              className="mt-4 text-center text-sm font-normal px-5 py-3 rounded-full bg-[#E8440A] text-white"
            >
              Kom igång
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
