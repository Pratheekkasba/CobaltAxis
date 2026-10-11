"use client"

import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Aether Protocol",
    category: "Autonomous Systems",
    status: "PROTOTYPE / LABS",
    statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    summary:
      "A distributed agent execution framework that coordinates multiple local and cloud LLMs with automated self-healing fallbacks.",
    stack: ["TypeScript", "LangChain", "Vector DB", "Redis"],
    year: "2026",
  },
  {
    title: "Cobalt UI",
    category: "Design System & Tooling",
    status: "OPEN SOURCE",
    statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    summary:
      "A high-velocity micro-interaction library and token engine built for 60fps web apps and dark-mode native aesthetics.",
    stack: ["React 19", "GSAP", "Tailwind CSS", "Framer Motion"],
    year: "2026",
  },
  {
    title: "Nexus Hypergraph",
    category: "Neural Search",
    status: "PRODUCTION BUILD",
    statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    summary:
      "Sub-20ms semantic similarity engine over 1.4 million technical papers with visual vector relationship clustering.",
    stack: ["Rust", "Next.js", "HNSW Index", "WebAssembly"],
    year: "2025",
  },
]

export const SelectedWork = () => {
  return (
    <section id="projects" className="relative my-32 sm:my-44 border-t border-border/40 pt-20">
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-mono tracking-widest text-[#0052FF] dark:text-[#3b82f6] uppercase">
            <span className="size-1.5 rounded-full bg-[#0052FF] dark:bg-[#3b82f6]" />
            06 // SELECTED WORK
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tighter uppercase sm:text-5xl md:text-6xl font-[family-name:var(--font-heading)]">
            Verified Builds.
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground font-mono">
          Honest case studies. Prototypes labeled as prototypes; production systems labeled as production.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card/60 p-8 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl backdrop-blur-sm"
          >
            <div>
              {/* Header: Status Pill & Year */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-semibold text-[10px] tracking-wider ${project.statusColor}`}
                >
                  {project.status}
                </span>
                <span className="text-muted-foreground">{project.year}</span>
              </div>

              {/* Title & Category */}
              <div className="mt-8">
                <span className="text-xs font-mono tracking-widest text-blue-500 uppercase">
                  {project.category}
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </div>

            {/* Stack Tags & Inspect Button */}
            <div className="mt-8 pt-6 border-t border-border/40">
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-foreground group-hover:text-blue-500 transition-colors"
              >
                Inspect Project Spec <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
