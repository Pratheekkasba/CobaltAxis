import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/constants/projects"

type PreviewPanelProps = {
  project: Project
  index: number
}

// The big project preview card shared by the home page's sticky showcase and
// the /work listing. Renders media (or a radial-tinted placeholder), category,
// year, an oversized outlined numeral, and tag chips.
export const PreviewPanel = ({ project, index }: PreviewPanelProps) => {
  const onImage = Boolean(project.image)
  return (
    <div
      className="group/panel relative flex h-full min-h-[440px] w-full flex-col justify-between overflow-hidden rounded-lg border border-border p-8"
      style={
        onImage
          ? undefined
          : {
              background: `radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--primary) 15%, transparent), transparent 55%)`,
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
        <span className="font-mono text-xs tracking-widest text-primary uppercase">
          {project.category}
        </span>
        <span
          className={cn(
            "font-mono text-xs",
            onImage ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {project.year}
        </span>
      </div>

      <div className="relative">
        <span
          aria-hidden
          className="block text-[4.5rem] leading-none font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-transparent lg:text-[5.5rem]"
          style={{
            WebkitTextStroke: onImage
              ? "1.5px rgba(255,255,255,0.75)"
              : "1.5px var(--primary)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={cn(
            "mt-3 text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl",
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
                "rounded-full border px-3 py-1 font-mono text-[11px] tracking-widest uppercase",
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
