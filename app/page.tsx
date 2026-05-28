import Navbar from "@/components/Navbar";
import { Hero } from "@/components/ui/animated-hero";
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
        <Hero />
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
