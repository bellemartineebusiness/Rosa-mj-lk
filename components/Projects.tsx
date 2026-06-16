"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Salon Aurora",
    category: "Bokning & Kundtjänst",
    tags: ["Salong", "Bokning"],
    url: "/chattbottar",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.url}
      className="group block rounded-3xl overflow-hidden bg-white border border-[#e8e8e8] ring-1 ring-[#e0e0e0] hover:-translate-y-1.5 transition-all duration-500"
    >
      {/* Browser chrome */}
      <div className="h-11 flex items-center gap-1.5 px-5 bg-[#fafafa] border-b border-[#f0f0f0]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-5 h-6 rounded-lg bg-white border border-[#ebebeb] flex items-center justify-center gap-1.5 overflow-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d0d0d0]" />
          <span className="text-[10px] text-[#6e6e73] font-normal tracking-wide truncate">bellemartinee.se/chattbottar</span>
        </div>
      </div>

      {/* iframe preview */}
      <div className="relative h-96 overflow-hidden">
        <iframe
          src={project.url}
          className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-sm font-medium px-6 py-3 rounded-full shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Prova live <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-7 py-5 flex items-center justify-between border-t border-[#f0f0f0]">
        <div>
          <h3 className="text-sm font-medium text-secondary-foreground tracking-tight">{project.title}</h3>
          <p className="text-xs text-[#6e6e73] font-normal mt-0.5">{project.category}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-normal text-[#8e8e93] group-hover:text-secondary-foreground transition-colors duration-300">
          Öppna <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projekt" className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="mb-12 md:mb-20 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">Exempel</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground leading-tight tracking-tight mb-5">
            Vad kan en bot
            <br />
            <span className="text-[#3a3a3c] font-normal">göra för dig?</span>
          </h2>
          <p className="text-[#6e6e73] text-base font-normal leading-relaxed max-w-sm mx-auto">
            Din chattbot anpassas helt efter ditt företag och dina kunder.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a href="#kontakt"
            className="group inline-flex items-center gap-2.5 bg-[#E8440A] text-white text-sm font-normal px-8 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200">
            Jag vill ha en chattbot
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
