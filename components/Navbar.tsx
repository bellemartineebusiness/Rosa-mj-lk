"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Tjänster", href: "#tjanster" },
  { label: "Verktyg", href: "#verktyg" },
  { label: "Projekt", href: "#projekt" },
  { label: "Omdömen", href: "#omdomen" },
  { label: "Kontakt", href: "#kontakt" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fdf8e8]/95 backdrop-blur-md shadow-md shadow-[#700143]/10 border-b border-[#f8edaa]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                scrolled
                  ? "text-[#7a4060] hover:text-[#700143] hover:bg-[#700143]/8"
                  : "text-[#f8edaa] hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Button variant="default" size="sm">
            Kom igång
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ml-auto ${
            scrolled ? "text-[#700143] hover:bg-[#700143]/10" : "text-[#f8edaa] hover:bg-white/10"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fdf8e8] border-t border-[#f8edaa] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 text-sm font-medium text-[#7a4060] hover:text-[#700143] rounded-lg hover:bg-[#700143]/8 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#f8edaa]">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Kom igång gratis
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
