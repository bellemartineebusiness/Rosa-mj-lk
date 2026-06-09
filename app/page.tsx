import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Statement from "@/components/Statement";
import TextDisclaimer from "@/components/TextDisclaimer";
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
        <TextDisclaimer />
        <Services />
        <Projects />
        <Statement />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
