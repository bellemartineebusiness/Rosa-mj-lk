import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#ebebeb]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Nav + social */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Image
              src="/Belle (11).png"
              alt="Belle Martineé"
              width={80}
              height={80}
              className="w-20 h-auto object-contain mb-2"
            />
            <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#a0a0a8]">Följ oss</p>
            <div className="flex items-center gap-2">
              {[
                { Icon: FaInstagram, href: "#", label: "Instagram" },
                { Icon: FaLinkedin,  href: "#", label: "LinkedIn" },
                { Icon: FaXTwitter,  href: "#", label: "X" },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors bg-secondary border border-[#e5e5e5] hover:bg-[#e8e8e8]">
                  <Icon className="w-4 h-4 text-[#8e8e93]" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              label: "Tjänster",
              items: ["Logotyp & Varumärke", "Hemsida", "Marknadsföring", "AI-strategi"],
            },
            {
              label: "Företaget",
              items: ["Om oss", "Karriär", "Press"],
            },
            {
              label: "Support",
              items: ["Kontakt", "Integritetspolicy", "Cookies"],
            },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#a0a0a8] mb-4">{label}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    {item === "Integritetspolicy" ? (
                      <Link href="/integritetspolicy" className="text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground transition-colors">{item}</Link>
                    ) : (
                      <a href="#" className="text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground transition-colors">{item}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#ebebeb] py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#a0a0a8] font-normal">© 2026 Belle Martineé. Alla rättigheter förbehållna.</p>
          <p className="text-xs text-[#a0a0a8] font-normal">Byggd med AI &amp; kärlek i Stockholm</p>
        </div>

      </div>
    </footer>
  );
}
