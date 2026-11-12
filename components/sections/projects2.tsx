"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/constants/projects"
import { ProjectsListSkeleton } from "@/components/skeletons"
import { useSimulatedLoading } from "@/hooks/use-simulated-loading"
import { PreviewPanel } from "@/components/work/preview-panel"
import { SectionHeading } from "./section-heading"

// Projects come from lib/constants/projects — every card links to its full
// case study at /work/[slug].
export const Projects2 = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const loading = useSimulatedLoading()

  if (loading) {
    return (
      <section id="projects-2" className="mb-28 md:mb-36">
        <SectionHeading label="Selected work" title="Projects" />
        <ProjectsListSkeleton count={projects.length} />
      </section>
    )
  }

  return (
    <section id="projects" className="mb-28 md:mb-36">
      <SectionHeading label="Selected work" title="Projects" />

      <div className="grid items-stretch gap-8 md:grid-cols-2 lg:gap-12">
        {/* Index list */}
        <ul className="flex h-full flex-col justify-between border-t border-border">
          {projects.map((project, i) => {
            const activeRow = i === activeIdx
            return (
              <li key={project.id} className="flex flex-1 flex-col justify-center">
                <Link
                  href={`/work/${project.slug}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className="group flex w-full items-baseline justify-between gap-4 border-b border-border py-5 text-left lg:py-6"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] transition-colors duration-300 md:text-3xl lg:text-4xl",
                        activeRow
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground"
                      )}
                    >
                      {project.title}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[11px] tracking-widest text-muted-foreground uppercase sm:block">
                    {project.category}
                  </span>
                </Link>
                {/* Mobile inline preview */}
                <Link
                  href={`/work/${project.slug}`}
                  className="block w-full py-6 md:hidden"
                >
                  <div className="aspect-4/5 w-full">
                    <PreviewPanel project={project} index={i} />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Sticky preview (desktop) */}
        <div className="hidden h-full md:block">
          <Link
            href={`/work/${projects[activeIdx].slug}`}
            className="block h-full w-full text-left"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[activeIdx].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full"
              >
                <PreviewPanel project={projects[activeIdx]} index={activeIdx} />
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </section>
  )
}
