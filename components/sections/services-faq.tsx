"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, Plus } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

/*
 * S06 — The hard questions, in the reference's accordion style: one
 * sentence per row, plus/× affordance, and a small diagram card inside
 * the first answer. Only one answer open at a time; height animation is
 * framer-motion, switched off under prefers-reduced-motion.
 */

const RoutingDiagram = () => (
  <div className="rounded-xl border border-border bg-background/70 p-4 sm:p-5">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
      {/* Incoming request */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 sm:w-44">
        <p className="text-[13px] font-semibold text-foreground">
          Incoming request
        </p>
        <p className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
          Summarize ticket #1042
        </p>
      </div>

      {/* Effort brace */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 44"
        className="mx-auto h-10 w-5 shrink-0 sm:mx-0"
      >
        <path
          d="M 2 22 C 14 22, 8 6, 18 2 M 2 22 C 14 22, 8 38, 18 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          className="text-muted-foreground"
        />
      </svg>

      {/* Routes */}
      <div className="flex-1 space-y-2.5">
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="text-[13px] font-semibold text-foreground">
              Routine task
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              fast model · $0.001 / request
            </p>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Summaries, classification, extraction
          </p>
        </div>
        <div className="rounded-lg border border-primary/40 bg-card px-4 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="text-[13px] font-semibold text-foreground">
              Complex reasoning
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              frontier model · $0.018 / request
            </p>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Multi-step analysis, judgment calls
          </p>
        </div>
      </div>
    </div>

    <p className="mt-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
      <span aria-hidden className="text-primary">
        ✓
      </span>
      Scoring effort for this request — routing is a config file, not a rebuild
    </p>
  </div>
)

const items: Array<{
  q: string
  a: React.ReactNode
  diagram?: boolean
}> = [
  {
    q: "Model choice that matches effort to the task",
    a: (
      <>
        <p>
          A support summary and a checkout bug don&apos;t need the same
          model. We score each task and route it to the cheapest model that
          clears your quality bar — logged, visible, and yours to change in
          a config file.
        </p>
        <div className="mt-5">
          <RoutingDiagram />
        </div>
      </>
    ),
    diagram: true,
  },
  {
    q: "Nothing ships until it clears your bar",
    a: (
      <p>
        Evals, guardrails and a human checkpoint at every stage. Agents
        propose; your rules dispose. Every verdict is logged with the
        evidence that produced it, so &ldquo;why did it do that&rdquo; always
        has an answer.
      </p>
    ),
  },
  {
    q: "Your data stays yours",
    a: (
      <p>
        Scoped credentials, zero-retention providers where you demand them,
        PII controls on input and output, and a full audit trail. We hand
        over the keys on day one — repos, dashboards, runbooks.
      </p>
    ),
  },
  {
    q: "Handover you can run without us",
    a: (
      <p>
        The engine keeps running whether or not we&apos;re in the room:
        documented pipelines, on-call runbooks, a training session for your
        team, and a maintenance retainer only if you want one.
      </p>
    ),
  },
]

export const ServicesFaq = () => {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section id="questions" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="The hard questions"
          title="Every engagement earns its own decisions."
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        Nothing ships on a hunch. Here is how the uncomfortable parts get
        decided — before the build, not after.
      </p>

      <div className="section-reveal border-t border-border">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    "text-lg font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] transition-colors duration-200 md:text-xl",
                    isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground",
                  )}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-3xl pb-8 text-[15px] leading-relaxed text-muted-foreground">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Ledger line — the promise the accordion sits on. */}
      <p className="section-reveal mt-6 flex items-center gap-2.5 text-sm text-muted-foreground">
        <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />
        Decisions are logged with evidence — &ldquo;why did it do
        that&rdquo; always has an answer.
      </p>
    </section>
  )
}

export default ServicesFaq
