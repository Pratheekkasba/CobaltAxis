"use client"

import { Fragment, useRef, useSyncExternalStore } from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Cpu, Sparkles } from "lucide-react"
import { SectionHeading } from "./section-heading"

/*
 * Section 05 — Who we are. A massive centered editorial statement with a
 * scroll-triggered word-by-word opacity reveal, inline cobalt badges for
 * "craft" and "technology", and a 3-column studio proof strip beneath.
 */

type Token =
  | { kind: "word"; text: string }
  | { kind: "badge"; text: "craft" | "technology" }

const STATEMENT_TOKENS: Token[] = [
  { kind: "word", text: "We're" },
  { kind: "word", text: "a" },
  { kind: "word", text: "compact" },
  { kind: "word", text: "studio" },
  { kind: "word", text: "of" },
  { kind: "word", text: "designers" },
  { kind: "word", text: "and" },
  { kind: "word", text: "engineers" },
  { kind: "word", text: "who" },
  { kind: "word", text: "believe" },
  { kind: "word", text: "great" },
  { kind: "word", text: "digital" },
  { kind: "word", text: "work" },
  { kind: "word", text: "lives" },
  { kind: "word", text: "where" },
  { kind: "badge", text: "craft" },
  { kind: "word", text: "meets" },
  { kind: "badge", text: "technology" },
  { kind: "word", text: "to" },
  { kind: "word", text: "build" },
  { kind: "word", text: "intelligent" },
  { kind: "word", text: "systems" },
  { kind: "word", text: "and" },
  { kind: "word", text: "products" },
  { kind: "word", text: "that" },
  { kind: "word", text: "feel" },
  { kind: "word", text: "inevitable." },
]

const PROOF_PILLARS = [
  { code: "01 / ARCHITECTURE", copy: "Built for scale & zero bottlenecks." },
  { code: "02 / VELOCITY", copy: "Direct-to-engineer execution." },
  { code: "03 / PRECISION", copy: "60fps interfaces & resilient AI." },
] as const

function RevealToken({
  token,
  index,
  total,
  progress,
  reduced,
}: {
  token: Token
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  const start = (index / total) * 0.72
  const end = Math.min(1, start + 0.28)
  const opacity = useTransform(progress, [start, end], [0.18, 1])

  if (token.kind === "badge") {
    const Icon = token.text === "craft" ? Sparkles : Cpu
    return (
      <motion.span
        style={{ opacity: reduced ? 1 : opacity }}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#3B5BDB]/25 bg-[#3B5BDB]/[0.08] px-3.5 py-0.5 text-[#3B5BDB] align-baseline dark:border-[#6B7DFF]/35 dark:bg-[#6B7DFF]/15 dark:text-[#6B7DFF] sm:gap-2"
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-5 shrink-0 sm:size-7 lg:size-8"
        />
        <span>{token.text}</span>
      </motion.span>
    )
  }

  return (
    <motion.span
      style={{ opacity: reduced ? 1 : opacity }}
      className="inline-block"
    >
      {token.text}
    </motion.span>
  )
}

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {}
  }
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
  mql.addEventListener("change", cb)
  return () => mql.removeEventListener("change", cb)
}

const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const getReducedMotionServerSnapshot = () => false

export const About = () => {
  const statementRef = useRef<HTMLParagraphElement>(null)
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.88", "center 0.52"],
  })

  return (
    <section id="about" className="mb-24 md:mb-32">
      <SectionHeading
        label="Section 05 / About"
        title="Who we are."
        indexInlineFrom="xl"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <p
          ref={statementRef}
          className="mx-auto max-w-[66rem] text-center text-3xl font-medium tracking-tight leading-[1.16] text-[#0F172A] dark:text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
        >
          {STATEMENT_TOKENS.map((token, index) => (
            <Fragment key={`${token.text}-${index}`}>
              <RevealToken
                token={token}
                index={index}
                total={STATEMENT_TOKENS.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
              {index < STATEMENT_TOKENS.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>

        <dl className="mx-auto mt-16 grid max-w-5xl grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08] sm:mt-20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {PROOF_PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className="flex flex-col gap-2 px-6 py-5"
            >
              <dt className="font-mono text-xs tracking-widest text-[#3B5BDB] uppercase dark:text-[#6B7DFF]">
                {pillar.code}
              </dt>
              <dd className="text-sm leading-relaxed font-medium text-slate-700 dark:text-muted-foreground sm:text-base">
                {pillar.copy}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
