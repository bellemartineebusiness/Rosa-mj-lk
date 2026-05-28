"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Tjänster", href: "#tjanster" },
  { label: "Projekt",  href: "#projekt" },
  { label: "Kontakt",  href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/85 backdrop-blur-2xl border-b border-[#e5e5e5]" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <a href="#">
          <Image
            src="/logo.png"
            alt="Belle Martineé"
            width={120}
            height={40}
            className={`h-8 w-auto object-contain transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                scrolled
                  ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className={`hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
            scrolled
              ? "bg-[#0071e3] text-white hover:bg-[#005fcc]"
              : "bg-white/15 backdrop-blur text-white border border-white/30 hover:bg-white/25"
          }`}
        >
          Kom igång
        </a>

        <button
          className={`md:hidden p-2 ml-4 ${scrolled ? "text-[#1d1d1f]" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-[#e5e5e5]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 text-sm font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-full bg-[#0071e3] text-white"
            >
              Kom igång
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
