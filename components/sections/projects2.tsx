"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects, type Project } from "@/lib/constants/projects"
import { ProjectsListSkeleton } from "@/components/skeletons"
import { useSimulatedLoading } from "@/hooks/use-simulated-loading"
import { useProjectDrawer } from "@/stores/project-drawer"
import { SectionHeading } from "./section-heading"

type PreviewPanelProps = {
  project: Project
  index: number
}

const PreviewPanel = ({ project, index }: PreviewPanelProps) => {
  const onImage = Boolean(project.image)
  return (
    <div
      className="group/panel relative flex h-full min-h-[460px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-border p-8"
      style={
        onImage
          ? undefined
          : {
              background: `radial-gradient(120% 100% at 0% 0%, ${project.accent}26, transparent 55%)`,
            }
      }
    >
      {onImage && (
        <>
          <Image
            src={project.image!}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover/panel:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10"
          />
        </>
      )}

      <div className="relative flex items-center justify-between">
        <span
          className="text-sm tracking-widest uppercase font-mono font-medium"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>
        <span
          className={cn(
            "font-mono text-sm",
            onImage ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {project.year}
        </span>
      </div>

      <div className="relative">
        <span
          className="block text-[5rem] lg:text-[6rem] leading-none font-black tracking-tighter text-transparent font-[family-name:var(--font-heading)]"
          style={{ WebkitTextStroke: `2px ${project.accent}` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={cn(
            "mt-3 text-3xl font-black tracking-tighter uppercase md:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]",
            onImage && "text-white"
          )}
        >
          {project.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border px-3 py-1 text-xs tracking-widest uppercase font-mono",
                onImage
                  ? "border-white/30 text-white/80"
                  : "border-border text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Projects2 = () => {
  const open = useProjectDrawer((s) => s.open)
  const [activeIdx, setActiveIdx] = useState(0)
  const loading = useSimulatedLoading()

  if (loading) {
    return (
      <section id="projects-2" className="mb-32">
        <SectionHeading label="Selected work" title="Projects" />
        <ProjectsListSkeleton count={projects.length} />
      </section>
    )
  }

  return (
    <section id="projects" className="mb-32">
      <SectionHeading label="Selected work" title="Projects" />

      <div className="grid gap-8 lg:gap-12 md:grid-cols-2 items-stretch">
        {/* Index list */}
        <ul className="flex flex-col justify-between h-full border-t border-border">
          {projects.map((project, i) => {
            const activeRow = i === activeIdx
            return (
              <li key={project.id} className="flex-1 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => open(project)}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className="group flex w-full items-baseline justify-between gap-4 border-b border-border py-5 lg:py-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-black tracking-tighter uppercase transition-colors duration-300 md:text-3xl lg:text-4xl font-[family-name:var(--font-heading)]",
                        activeRow
                          ? "text-foreground"
                          : "text-foreground md:text-muted-foreground md:group-hover:text-foreground"
                      )}
                    >
                      {project.title}
                    </span>
                  </span>
                  <span className="hidden text-xs tracking-widest text-muted-foreground uppercase font-mono sm:block">
                    {project.category}
                  </span>
                </button>
                {/* Mobile inline preview */}
                <button
                  type="button"
                  onClick={() => open(project)}
                  className="block w-full py-6 text-left md:hidden"
                >
                  <div className="aspect-4/5 w-full">
                    <PreviewPanel project={project} index={i} />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Sticky preview (desktop) */}
        <div className="hidden md:block h-full">
          <button
            type="button"
            onClick={() => open(projects[activeIdx])}
            className="block w-full h-full cursor-pointer text-left"
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
          </button>
        </div>
      </div>
    </section>
  )
}
