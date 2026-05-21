"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Shield, Bot, Gem } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Projektgaranti AB",
    category: "Hemsida & Varumärke",
    tags: ["Hemsida"],
    description: "Klicka för att se resultatet.",
    icon: Shield,
    url: "https://projektgarantiab.vercel.app/",
    bg: "bg-[#700143]",
    iconBg: "bg-[#f8edaa]/15",
    iconColor: "text-[#f8edaa]",
    accent: "#f8edaa",
  },
  {
    id: 3,
    title: "Zyniq",
    category: "AI & Hemsida",
    tags: ["Hemsida", "Logotyp"],
    description: "Klicka för att se demot.",
    icon: Bot,
    url: "https://syniqdemo.vercel.app/",
    bg: "bg-[#f8edaa]",
    iconBg: "bg-[#700143]/10",
    iconColor: "text-[#700143]",
    accent: "#700143",
  },
  {
    id: 5,
    title: "Aurelin",
    category: "Lyx & Hemsida",
    tags: ["Hemsida"],
    description: "Klicka för att se demot.",
    icon: Gem,
    url: "https://aurelindemo.vercel.app/",
    bg: "bg-[#1c1428]",
    iconBg: "bg-[#f8edaa]/10",
    iconColor: "text-[#f8edaa]",
    accent: "#f8edaa",
  },
  {
    id: 4,
    title: "Arowwai Coffee",
    category: "Varumärke & Hemsida",
    tags: ["Logotyp", "Hemsida"],
    description: "Specialty coffee roaster från NYC. Klicka för att se demot.",
    icon: Coffee,
    url: "https://arowwaidemo.vercel.app/",
    bg: "bg-[#4a002c]",
    iconBg: "bg-[#f8edaa]/15",
    iconColor: "text-[#f8edaa]",
    accent: "#f8edaa",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
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
      className={`group relative rounded-3xl overflow-hidden cursor-pointer block ${project.bg}`}
      style={{ minHeight: 380 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col justify-between p-8 h-full" style={{ minHeight: 380 }}>
        <div className="flex items-start justify-between">
          <span
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: `${project.accent}22`,
              border: `1px solid ${project.accent}40`,
              color: project.accent,
            }}
          >
            {project.category}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6, y: hovered ? 0 : -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-full w-10 h-10 flex items-center justify-center shrink-0 shadow-lg"
            style={{ background: project.accent }}
          >
            <ArrowUpRight className="w-5 h-5" style={{ color: project.accent === "#700143" ? "#f8edaa" : "#700143" }} />
          </motion.div>
        </div>

        <div className="flex justify-center items-center flex-1 py-8">
          <motion.div
            animate={{ scale: hovered ? 0.92 : 1 }}
            transition={{ duration: 0.3 }}
            className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl ${project.iconBg}`}
          >
            <Icon className={`w-12 h-12 ${project.iconColor}`} strokeWidth={1.5} />
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.22 }}
            className="text-sm leading-relaxed"
            style={{ color: `${project.accent}cc` }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ color: `${project.accent}99`, background: `${project.accent}15` }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold leading-tight" style={{ color: project.accent }}>
            {project.title}
          </h3>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projekt" className="py-24 bg-[#fdf8e8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#700143]/10 border border-[#700143]/20 text-[#700143] px-4 py-2 rounded-full text-sm font-semibold mb-5">
              Projekt
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a0010] leading-tight">
              Såhär ser det{" "}
              <span className="text-gradient-brand">ut i verkligheten</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#7a4060] text-base max-w-sm md:text-right leading-relaxed"
          >
            Demo. Ditt projekt blir det första riktiga.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#700143] text-[#f8edaa] font-semibold px-8 py-4 rounded-2xl hover:bg-[#4a002c] transition-all duration-200 shadow-lg shadow-[#700143]/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Jag vill ha en sådan
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
