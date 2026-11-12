import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { allProjects } from "@/lib/constants/projects"
import { WHATSAPP_URL } from "@/lib/constants/contact"

// This Next version passes params as a Promise — await it in server code.
type CaseStudyProps = {
  params: Promise<{ slug: string }>
}

// Prerender every case study at build time; the data is fully local.
export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project) {
    return { title: "Case study not found" }
  }
  return {
    title: `${project.title} — Case study`,
    description: project.excerpt,
    openGraph: project.image
      ? { images: [{ url: project.image }] }
      : undefined,
  }
}

// Results that read as growth get the semantic green; durations and counts
// stay ink so green always means "better than before".
const isWin = (value: string) => value.startsWith("+") || value.includes("×")

const CaseStudyPage = async ({ params }: CaseStudyProps) => {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  const index = allProjects.indexOf(project)
  const next = allProjects[(index + 1) % allProjects.length]

  return (
    <article className="mb-8">
      {/* Back to the index */}
      <Link
        href="/work"
        className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        All work
      </Link>

      {/* Header */}
      <header className="mt-10 md:mt-14">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-primary">{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {project.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Hero image */}
      {project.image && (
        <div className="relative mt-14 aspect-16/10 overflow-hidden rounded-lg border border-border md:mt-20">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1380px) 1332px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Results strip */}
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 md:mt-20">
        {project.results.map((result) => (
          <div key={result.label} className="bg-background p-8">
            <p
              className={`text-4xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-5xl ${
                isWin(result.value) ? "text-up" : "text-foreground"
              }`}
            >
              {result.value}
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {result.label}
            </p>
          </div>
        ))}
      </div>

      {/* Narrative sections: sticky-ish mono label left, body right */}
      <div className="mt-14 md:mt-20">
        {project.sections.map((section) => (
          <section
            key={section.label}
            className="grid grid-cols-1 gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8"
          >
            <h2 className="font-mono text-xs tracking-widest text-primary uppercase md:col-span-3 md:pt-2">
              {section.label}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-9 md:text-lg">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      {/* Next case study */}
      <Link
        href={`/work/${next.slug}`}
        className="group mt-14 flex flex-col gap-6 rounded-lg border border-border p-8 transition-colors duration-300 hover:bg-secondary md:mt-20 md:flex-row md:items-center md:justify-between md:p-12"
      >
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Next case study
          </p>
          <p className="mt-3 text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-5xl">
            {next.title}
          </p>
        </div>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-6" />
        </span>
      </Link>

      {/* Closing CTA — the one dark chapter on this page */}
      <div className="mt-14 rounded-lg bg-chapter p-8 text-chapter-foreground md:mt-20 md:p-12">
        <p className="font-mono text-xs tracking-widest text-chapter-muted uppercase">
          Ready when you are
        </p>
        <h2 className="mt-4 max-w-xl text-3xl leading-[1.1] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
          Want results like these?
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-chapter-muted md:text-base">
          Tell us where your business should be six months from now. We&apos;ll
          show you the site that gets you there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
          >
            Start a project
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-chapter-border px-7 py-3.5 text-sm font-semibold text-chapter-foreground transition-colors duration-300 hover:bg-chapter-panel"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </article>
  )
}

export default CaseStudyPage
