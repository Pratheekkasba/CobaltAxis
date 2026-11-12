"use client"

import Link from "next/link"
import { Fragment } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { usePreloaderStore } from "@/stores/preloader"
import { HeroAmbience } from "@/components/ui/hero-ambience"

// Two deliberate lines. Each word is a span so the load reveal can stagger
// without splitting the sentences into unpredictable lines on desktop.
const headlineLines = [
  ["We", "engineer", "intelligence."],
  ["We", "automate", "what", "comes", "next."],
]

const capabilities = ["AI Agents", "Workflow Automation", "Web Engineering"]

export const Hero = () => {
  const isLoaded = usePreloaderStore((s) => s.isLoaded)

  return (
    <section
      data-hero="true"
      data-hero-loaded={isLoaded ? "true" : "false"}
      className="relative mb-24 flex min-h-[calc(90svh-8rem)] items-center justify-center md:mb-32 md:min-h-[calc(90svh-7rem)]"
    >
      <HeroAmbience />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Eyebrow — framed symmetrically; it is a label, not a link, so it
            carries no directional affordance. */}
        <p
          className="hero-fx text-center font-mono text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.2em]"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="mr-3 hidden h-px w-8 bg-primary/60 align-middle sm:inline-block"
          />
          Applied AI & Product Engineering
          <span
            aria-hidden
            className="ml-3 hidden h-px w-8 bg-primary/60 align-middle sm:inline-block"
          />
        </p>

        {/* Headline */}
        <h1 className="mt-8 max-w-[1240px] text-[2.75rem] leading-[1.06] font-medium tracking-[-0.035em] font-[family-name:var(--font-display)] sm:text-5xl md:mt-10 md:text-6xl lg:text-[3.75rem] lg:whitespace-nowrap xl:text-[4.5rem]">
          {headlineLines.map((line, lineIndex) => {
            const offset = headlineLines
              .slice(0, lineIndex)
              .reduce((count, previous) => count + previous.length, 0)
            return (
              <span key={line.join(" ")} className="block">
                {line.map((word, wordIndex) => (
                  <Fragment key={word}>
                    <span
                      className="hero-word"
                      style={{ "--wi": offset + wordIndex } as React.CSSProperties}
                    >
                      {word}
                    </span>
                    {wordIndex < line.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            )
          })}
        </h1>

        {/* Description */}
        <p
          className="hero-fx mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:max-w-[47rem] md:text-lg"
          style={{ "--d": "1.05s" } as React.CSSProperties}
        >
          We build autonomous AI agents, self-driving workflows, and high-performance web applications that eliminate manual bottlenecks and scale how your business runs.
        </p>

        {/* CTAs */}
        <div
          className="hero-fx mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row md:mt-10"
          style={{ "--d": "1.2s" } as React.CSSProperties}
        >
          <Link
            href="/contact"
            className="hero-cta hero-cta-primary group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:bg-accent-foreground sm:w-auto"
          >
            Start a Conversation
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/work"
            className="hero-cta hero-cta-secondary group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold text-foreground hover:border-foreground/20 hover:bg-secondary sm:w-auto"
          >
            Explore Our Work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Capability index */}
        <p
          className="hero-fx mt-8 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:text-[11px]"
          style={{ "--d": "1.35s" } as React.CSSProperties}
        >
          {capabilities.join(" / ")}
        </p>
      </div>
    </section>
  )
}
