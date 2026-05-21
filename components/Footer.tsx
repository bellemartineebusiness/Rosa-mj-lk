import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerLinks = {
  Tjänster: [
    "Logotyp & Varumärke",
    "Hemsida",
    "Marknadsföring",
    "Målgruppsanalys",
    "AI-strategi",
    "Social Media",
  ],
  Företaget: ["Om oss", "Vårt team", "Karriär", "Press", "Blog"],
  Support: ["Kontakt", "FAQ", "Integritetspolicy", "Användarvillkor", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a0010] text-[#f8edaa]">
      {/* CTA band */}
      <div className="bg-[#700143]">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#f8edaa] mb-1">
              Vad väntar du på?
            </h3>
            <p className="text-[#f8edaa]/70">
              Första konsultationen kostar ingenting. Hör av dig idag.
            </p>
          </div>
          <a
            href="#kontakt"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#f8edaa] text-[#700143] font-bold px-8 py-3 rounded-xl hover:bg-[#f0dc7a] transition-colors shadow-lg"
          >
            Kom igång
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Belle Martineé"
                width={140}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[#f8edaa]/50 text-sm leading-relaxed mb-6">
              Vi gör hemsidor som säljer. Snabbt, billigt och utan krångel.
            </p>
            <div className="flex items-center gap-3">
              {[FaInstagram, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#700143]/30 hover:bg-[#700143] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#f8edaa]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-[#f8edaa] mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    {link === "Integritetspolicy" ? (
                      <Link
                        href="/integritetspolicy"
                        className="text-[#f8edaa]/50 hover:text-[#f8edaa] text-sm transition-colors"
                      >
                        {link}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-[#f8edaa]/50 hover:text-[#f8edaa] text-sm transition-colors"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#700143]/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#f8edaa]/40">
          <p>© 2026 Belle Martineé. Alla rättigheter förbehållna.</p>
          <p>Byggd med AI &amp; kärlek i Stockholm</p>
        </div>
      </div>
    </footer>
  );
}
