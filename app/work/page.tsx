import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { allProjects } from "@/lib/constants/projects"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Cobalt Axis — websites, brands, and products we designed and built for salons, real-estate firms, and ambitious local businesses.",
}

const WorkPage = () => {
  return (
    <div className="mb-8">
      <PageHeader
        label="Selected work"
        title="Work that wins customers."
        intro="Real projects, real numbers. Every engagement below shipped fast, looked premium, and moved a metric the owner cared about."
        meta={`${allProjects.length} case studies`}
      />

      <ul className="flex flex-col border-t border-border">
        {allProjects.map((project, i) => (
          <li key={project.id} className="border-b border-border">
            <Link
              href={`/work/${project.slug}`}
              className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10"
            >
              {/* Media */}
              <div className="relative overflow-hidden rounded-lg border border-border md:col-span-5">
                <div className="relative aspect-16/10 w-full">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="h-full w-full"
                      style={{
                        background: `radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--primary) 15%, transparent), transparent 55%)`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4 md:col-span-7">
                <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden>—</span>
                  <span className="text-primary">{project.category}</span>
                  <span aria-hidden>·</span>
                  <span>{project.year}</span>
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-5xl">
                  {project.title}
                </h2>

                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">
                  Read case study
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <CtaBand
        title="Your project could be next."
        sub="Tell us what you're building — a storefront, a booking system, a brand. We'll show you the shortest path to shipping it."
      />
    </div>
  )
}

export default WorkPage
