"use client";

import { ArrowUpRight, Coffee, Shield, Bot, Gem } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Projektgaranti AB",
    category: "Hemsida & Varumärke",
    tags: ["Hemsida"],
    icon: Shield,
    url: "https://projektgarantiab.vercel.app/",
    from: "#1d1d1f",
    to: "#3a3a3c",
  },
  {
    id: 2,
    title: "Zyniq",
    category: "AI & Hemsida",
    tags: ["Hemsida", "Logotyp"],
    icon: Bot,
    url: "https://syniqdemo.vercel.app/",
    from: "#0a0a0a",
    to: "#1a1a2e",
  },
  {
    id: 3,
    title: "Aurelin",
    category: "Lyx & Hemsida",
    tags: ["Hemsida", "Logotyp"],
    icon: Gem,
    url: "https://aurelindemo.vercel.app/",
    from: "#1c1428",
    to: "#0e0b18",
  },
  {
    id: 4,
    title: "Arowwai Coffee",
    category: "Varumärke & Hemsida",
    tags: ["Hemsida", "Logotyp"],
    icon: Coffee,
    url: "https://arowwaidemo.vercel.app/",
    from: "#1a0f08",
    to: "#0d0804",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon;
  const domain = project.url.replace("https://", "").replace(/\/$/, "");
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden bg-white border border-[#e8e8e8] hover:shadow-xl hover:shadow-black/6 hover:-translate-y-1 transition-all duration-500"
    >
      <div className="h-9 flex items-center gap-1.5 px-4 border-b border-[#f0f0f0] bg-[#fafafa]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 h-5 rounded bg-white border border-[#ebebeb] flex items-center justify-center overflow-hidden">
          <span className="text-[10px] text-[#6e6e73] font-normal tracking-wide px-2 truncate">{domain}</span>
        </div>
      </div>
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${project.from}, ${project.to})` }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/8 border border-white/10 group-hover:scale-95 transition-transform duration-500">
          <Icon className="w-8 h-8 text-white/70" strokeWidth={1.2} />
        </div>
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground" />
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-normal uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary text-[#8e8e93]">{tag}</span>
          ))}
        </div>
        <h3 className="text-sm font-medium text-secondary-foreground tracking-tight">{project.title}</h3>
        <p className="text-xs text-[#6e6e73] font-normal mt-0.5">{project.category}</p>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projekt" className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="mb-12 md:mb-20 max-w-2xl">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">Vårt arbete</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground leading-tight tracking-tight mb-5">
            Demo projekt.
            <br />
            <span className="text-[#3a3a3c] font-normal">Snygga resultat.</span>
          </h2>
          <p className="text-[#6e6e73] text-base font-normal leading-relaxed max-w-sm">
            Demo-projekt byggda för att visa vad vi kan. Ditt projekt blir det första riktiga.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-14">
          <a href="#kontakt"
            className="group inline-flex items-center gap-2.5 bg-[#E8440A] text-white text-sm font-normal px-8 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200">
            Jag vill ha en sådan
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
