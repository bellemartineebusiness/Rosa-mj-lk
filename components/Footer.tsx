import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerLinks = {
  Tjänster: ["Logotyp & Varumärke", "Hemsida", "Marknadsföring", "Målgruppsanalys", "AI-strategi", "Social Media"],
  Företaget: ["Om oss", "Vårt team", "Karriär", "Press", "Blog"],
  Support: ["Kontakt", "FAQ", "Integritetspolicy", "Användarvillkor", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5]">
      {/* CTA band */}
      <div className="bg-secondary border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-1 tracking-tight">
              Redo att ta nästa steg?
            </h3>
            <p className="text-[#6e6e73]">Boka ett gratis möte så pratar vi om ditt projekt.</p>
          </div>
          <a
            href="#kontakt"
            className="shrink-0 inline-flex items-center gap-2 bg-ring text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-primary-dark transition-colors"
          >
            Kom igång
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="Belle Martineé" width={140} height={48} className="h-10 w-auto object-contain" />
            </div>
            <p className="text-[#6e6e73] text-sm leading-relaxed mb-6">
              Vi gör hemsidor som säljer. Snabbt, billigt och utan krångel.
            </p>
            <div className="flex items-center gap-3">
              {[FaInstagram, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary border border-[#e5e5e5] hover:border-ring hover:bg-ring/5 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-[#6e6e73]" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-secondary-foreground mb-4 text-sm">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    {link === "Integritetspolicy" ? (
                      <Link href="/integritetspolicy" className="text-[#6e6e73] hover:text-ring text-sm transition-colors">{link}</Link>
                    ) : (
                      <a href="#" className="text-[#6e6e73] hover:text-ring text-sm transition-colors">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#e5e5e5] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8e8e93]">
          <p>© 2026 Belle Martineé. Alla rättigheter förbehållna.</p>
          <p>Byggd med AI &amp; kärlek i Stockholm</p>
        </div>
      </div>
    </footer>
  );
}
