"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = tx(lang).footer;

  const navGroups = [
    { label: t.servicesLabel, items: t.serviceItems },
    { label: t.supportLabel,  items: t.supportItems },
  ];

  return (
    <footer className="bg-white border-t border-[#ebebeb]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 flex flex-col gap-5">
            <Image
              src="/Belle (11).png"
              alt="Belle Martineé"
              width={80}
              height={80}
              className="w-20 h-auto object-contain"
            />
            <p className="text-sm font-normal text-[#6e6e73] leading-relaxed max-w-xs">
              {t.descriptionPre}{" "}
              <a href="mailto:support@bellemartinee.se" className="text-[#8e8e93] hover:text-secondary-foreground transition-colors">
                support@bellemartinee.se
              </a>
              {t.descriptionPost}
            </p>
            <a href="https://www.linkedin.com/in/simon-adam-lind/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors bg-secondary border border-[#e5e5e5] hover:bg-[#e8e8e8]">
              <FaLinkedin className="w-4 h-4 text-[#8e8e93]" />
            </a>
          </div>

          <div>
            <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#a0a0a8] mb-4">{t.companyInfoLabel}</p>
            <ul className="flex flex-col gap-2.5">
              {t.companyItems.map((item) => (
                <li key={item} className="text-sm font-normal text-[#6e6e73]">{item}</li>
              ))}
            </ul>
          </div>

          {navGroups.map(({ label, items }) => (
            <div key={label}>
              <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#a0a0a8] mb-4">{label}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-[#ebebeb] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#a0a0a8] font-normal">{t.copyright}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-end">
            {["info", "sales", "support"].map((prefix) => (
              <a key={prefix} href={`mailto:${prefix}@bellemartinee.se`} className="text-xs text-[#a0a0a8] hover:text-[#6e6e73] transition-colors">
                {prefix}@bellemartinee.se
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
