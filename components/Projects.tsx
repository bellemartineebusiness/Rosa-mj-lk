"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Shield, Bot, Gem, Layers } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Projektgaranti AB",
    category: "Hemsida & Varumärke",
    tags: ["Hemsida"],
    description: "Klicka för att se resultatet.",
    icon: Shield,
    url: "https://projektgarantiab.vercel.app/",
    from: "#1d1d1f",
    to: "#3a3a3c",
  },
  {
    id: 3,
    title: "Zyniq",
    category: "AI & Hemsida",
    tags: ["Hemsida", "Logotyp"],
    description: "Klicka för att se demot.",
    icon: Bot,
    url: "https://syniqdemo.vercel.app/",
    from: "#0071e3",
    to: "#005fcc",
  },
  {
    id: 5,
    title: "Aurelin",
    category: "Lyx & Hemsida",
    tags: ["Hemsida"],
    description: "Klicka för att se demot.",
    icon: Gem,
    url: "https://aurelindemo.vercel.app/",
    from: "#1c1428",
    to: "#0e0b18",
  },
  {
    id: 4,
    title: "Arowwai Coffee",
    category: "Varumärke & Hemsida",
    tags: ["Logotyp", "Hemsida"],
    description: "Specialty coffee från NYC.",
    icon: Coffee,
    url: "https://arowwaidemo.vercel.app/",
    from: "#3a2a1a",
    to: "#1e160d",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const Icon = project.icon;
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer block border border-[#e5e5e5] hover:border-transparent hover:shadow-2xl transition-all duration-300"
      style={{ background: `linear-gradient(145deg, ${project.from}, ${project.to})`, minHeight: 340 }}
    >
      <div className="relative flex flex-col justify-between p-7 h-full" style={{ minHeight: 340 }}>
        <div className="flex items-start justify-between">
          <span className="inline-block text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/12 border border-white/15 text-white/70">
            {project.category}
          </span>
          <div className="rounded-full w-9 h-9 flex items-center justify-center shrink-0 bg-white opacity-0 group-hover:opacity-100 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>

        <div className="flex justify-center items-center flex-1 py-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/10 border border-white/15 group-hover:scale-95 transition-transform duration-300">
            <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-white/50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full text-white/40 bg-white/8">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold leading-tight text-white">{project.title}</h3>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projekt" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-secondary border border-[#e5e5e5] text-[#6e6e73] px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <Layers className="w-3.5 h-3.5" />
              Projekt
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground leading-tight tracking-tight">
              Såhär ser det{" "}
              <span className="text-gradient-brand">ut i verkligheten</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[#6e6e73] text-base max-w-sm md:text-right leading-relaxed">
            Demo. Ditt projekt blir det första riktiga.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 flex justify-center">
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-3 bg-ring text-white font-semibold px-10 py-4 rounded-full hover:bg-brand-primary-dark transition-all duration-200 hover:shadow-xl hover:shadow-ring/20 hover:-translate-y-0.5 text-base"
          >
            Jag vill ha en sådan
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
