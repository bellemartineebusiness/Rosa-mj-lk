import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Statement from "@/components/Statement";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import CalendarSetup from "@/components/CalendarSetup";
import TextDisclaimer from "@/components/TextDisclaimer";
import Intro from "@/components/Intro";
import Guarantee from "@/components/Guarantee";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full h-screen overflow-hidden">
          <picture className="w-full h-full">
            <source media="(min-width: 768px)" srcSet="/hero-orange.png" />
            <img
              src="/Outfitts%20(1).png"
              alt="Belle Martineé"
              className="w-full h-full object-cover object-center animate-hero"
            />
          </picture>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-medium px-4 py-1.5 rounded-full tracking-wide">
              ✂ AI-chattbot för frisörsalonger
            </span>
            <a
              href="#tjanster"
              className="inline-flex items-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] text-white text-sm font-medium px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Kom igång →
            </a>
            <a href="#hur-det-fungerar" className="text-white/60 text-xs hover:text-white transition-colors">Se hur det fungerar</a>
          </div>
        </section>
        <HowItWorks />
        <CalendarSetup />
        <TextDisclaimer />
        <Intro />
        <Guarantee />
        <Services />
        <FAQ />
        <Projects />
        <Statement />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
