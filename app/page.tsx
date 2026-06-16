import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Statement from "@/components/Statement";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import CalendarSetup from "@/components/CalendarSetup";
import TextDisclaimer from "@/components/TextDisclaimer";
import WhyUs from "@/components/WhyUs";
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
        </section>
        <HowItWorks />
        <CalendarSetup />
        <TextDisclaimer />
        <WhyUs />
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
