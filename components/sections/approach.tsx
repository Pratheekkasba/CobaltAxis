"use client"

import { useEffect, useRef } from "react"

import { SectionHeading } from "./section-heading"

/*
 * Section 03 — Our Approach. A hairline-framed architectural diagram:
 * Complex Operations splits into three cubic-bezier paths (AI Agents & Applied
 * RAG, Autonomous Workflows, Cloud & Web Engineering) that converge into
 * Production System. A cobalt + white light pulse travels left-to-right along
 * the paths via rAF + getTotalLength()/getPointAtLength(). Corner-bracket
 * callout lists the four execution stages.
 */

const centerPaths = [
  { name: "AI Agents &", sub: "Applied RAG", top: "16.1%" },
  { name: "Autonomous", sub: "Workflows", top: "50%" },
  { name: "Cloud & Web", sub: "Engineering", top: "83.9%" },
] as const

const stages = [
  { num: "01", title: "Understand", desc: "Map the operation, the bottlenecks and the system of record." },
  { num: "02", title: "Architect", desc: "Design the topology: ingestion, orchestration, validation, interface." },
  { num: "03", title: "Engineer", desc: "Build observability, idempotency and graceful degradation into every layer." },
  { num: "04", title: "Deploy", desc: "Ship inside the client's perimeter with rollback at every handoff." },
] as const

const PATH_DEFS = [
  { id: "top", d: "M 8 180 L 148 180 C 290 180 310 58 500 58 C 690 58 710 180 852 180 L 992 180", color: "#2563EB" },
  { id: "mid", d: "M 8 180 L 992 180", color: "#3B5BDB" },
  { id: "bot", d: "M 8 180 L 148 180 C 290 180 310 302 500 302 C 690 302 710 180 852 180 L 992 180", color: "#2563EB" },
] as const

const VIEWBOX_W = 1000
const VIEWBOX_H = 360

/** Visible cobalt beam length in viewBox units. */
const BEAM_LEN = 190
/** Bright white/cobalt inner highlight length at the leading edge. */
const CORE_LEN = 70

export const Approach = () => {
  const sharpRefs = useRef<(SVGPathElement | null)[]>([null, null, null])
  const haloRefs = useRef<(SVGPathElement | null)[]>([null, null, null])
  const coreRefs = useRef<(SVGPathElement | null)[]>([null, null, null])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null])

  useEffect(() => {
    const sharps = sharpRefs.current
    const halos = haloRefs.current
    const cores = coreRefs.current
    const dots = dotRefs.current

    if (
      sharps.some((p) => p === null) ||
      halos.some((p) => p === null) ||
      cores.some((p) => p === null)
    ) {
      return
    }

    // Guard: JSDOM (test env) doesn't implement getTotalLength — skip animation
    if (typeof (sharps[0] as SVGPathElement).getTotalLength !== "function") return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const duration = reducedMotion ? 4.8 : 2.8
    const stagger = duration / 3

    const lengths = (sharps as SVGPathElement[]).map((p) => p.getTotalLength())

    ;(sharps as SVGPathElement[]).forEach((sharp, i) => {
      const len = lengths[i]
      const beamDash = `${BEAM_LEN} ${len + BEAM_LEN}`
      const coreDash = `${CORE_LEN} ${len + CORE_LEN}`

      sharp.style.fill = "none"
      sharp.style.strokeDasharray = beamDash

      const halo = halos[i] as SVGPathElement
      halo.style.fill = "none"
      halo.style.strokeDasharray = beamDash

      const core = cores[i] as SVGPathElement
      core.style.fill = "none"
      core.style.strokeDasharray = coreDash
    })

    const startTime = performance.now()
    let rafId = 0

    const frame = (now: number) => {
      const elapsed = (now - startTime) / 1000

      ;(sharps as SVGPathElement[]).forEach((sharp, i) => {
        const len = lengths[i]
        const t = (((elapsed - stagger * i) % duration) + duration) % duration
        const progress = t / duration

        // Lead position along path: starts at 0 and exits past len + BEAM_LEN
        const head = progress * (len + BEAM_LEN)
        const beamOffset = String(BEAM_LEN - head)
        const coreOffset = String(CORE_LEN - head)

        sharp.style.strokeDashoffset = beamOffset
        ;(halos[i] as SVGPathElement).style.strokeDashoffset = beamOffset
        ;(cores[i] as SVGPathElement).style.strokeDashoffset = coreOffset

        const dot = dots[i]
        if (dot) {
          if (head >= 0 && head <= len) {
            const pt = sharp.getPointAtLength(head)
            const edgeFade = Math.min(1, head / 36, (len - head) / 36)
            dot.style.left = `${(pt.x / VIEWBOX_W) * 100}%`
            dot.style.top = `${(pt.y / VIEWBOX_H) * 100}%`
            dot.style.opacity = String(Math.max(0, edgeFade))
          } else {
            dot.style.opacity = "0"
          }
        }
      })

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section id="approach" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="Section 03 / Our Approach"
          title="How we engineer."
          indexInlineFrom="xl"
        />
      </div>

      <div className="section-reveal relative mt-4 overflow-hidden rounded-2xl approach-container px-4 py-10 sm:px-8 sm:py-12 md:mt-6 md:px-12 md:py-16 lg:px-16">
        <p
          aria-hidden="true"
          className="approach-watermark pointer-events-none absolute inset-x-0 top-4 select-none whitespace-nowrap text-center text-[clamp(1.65rem,6.4vw,6.25rem)] leading-none font-bold tracking-tighter text-slate-900/[0.05] uppercase md:top-5"
        >
          HOW WE ENGINEER
        </p>

        <div className="relative z-10 mt-8 flex items-center gap-2.5 sm:mt-12 sm:gap-4 md:mt-16 md:gap-6">
          {/* Left node: Business as usual */}
          <div className="w-[6.25rem] flex-none text-right sm:w-40 md:w-48">
            <p className="text-[11px] leading-tight font-semibold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-sm md:text-lg lg:text-xl">
              Business as usual.
            </p>
          </div>

          {/* SVG column */}
          <div className="relative min-w-0 flex-1">
            {/* Micro blueprint tag above start dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-7 whitespace-nowrap font-mono text-[10px] tracking-widest text-slate-400 uppercase dark:text-[#94A3B8]"
            >
              IN /
            </span>

            {/* Start node dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span className="approach-node-pulse absolute size-5 rounded-full bg-[#3b5bdb]/20 dark:bg-[#6B7DFF]/25" />
              <span className="relative size-2.5 rounded-full bg-[#0f172a] ring-4 ring-[#F8FAFC] dark:bg-[#F1F5F9] dark:ring-[#0F1524]" />
            </span>

            {/* Micro blueprint tag above end dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-7 whitespace-nowrap font-mono text-[10px] tracking-widest text-slate-400 uppercase dark:text-[#94A3B8]"
            >
              OUT /
            </span>

            {/* End convergence dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 z-10 flex translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span className="approach-node-pulse approach-node-pulse-delay absolute size-6 rounded-full bg-[#3b5bdb]/25 dark:bg-[#6B7DFF]/25" />
              <span className="relative size-2.5 rounded-full bg-[#3b5bdb] ring-4 ring-[#3b5bdb]/20 dark:bg-[#6B7DFF] dark:ring-[#6B7DFF]/25" />
            </span>

            <svg
              className="h-[240px] w-full overflow-visible sm:h-[290px] md:h-[340px] lg:h-[380px]"
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter
                  id="approach-beam-glow"
                  filterUnits="userSpaceOnUse"
                  x="-40"
                  y="-40"
                  width="1080"
                  height="440"
                >
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base structural tracks with subtle cobalt tint */}
              {PATH_DEFS.map((track) => (
                <g key={`base-${track.id}`}>
                  <path
                    d={track.d}
                    vectorEffect="non-scaling-stroke"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={track.d}
                    vectorEffect="non-scaling-stroke"
                    stroke={track.color}
                    strokeOpacity="0.22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              ))}

              {/* Animated cobalt + white light-pulse overlays driven by rAF */}
              {PATH_DEFS.map((track, i) => (
                <g key={`beam-${track.id}`}>
                  {/* Wide soft cobalt halo */}
                  <path
                    ref={(el) => {
                      haloRefs.current[i] = el
                    }}
                    d={track.d}
                    vectorEffect="non-scaling-stroke"
                    stroke={track.color}
                    strokeOpacity={0.32}
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                  {/* Crisp cobalt pulse body */}
                  <path
                    ref={(el) => {
                      sharpRefs.current[i] = el
                    }}
                    d={track.d}
                    vectorEffect="non-scaling-stroke"
                    stroke={track.color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    filter="url(#approach-beam-glow)"
                  />
                  {/* Bright white/ice-cobalt leading highlight segment */}
                  <path
                    ref={(el) => {
                      coreRefs.current[i] = el
                    }}
                    d={track.d}
                    vectorEffect="non-scaling-stroke"
                    stroke="#E0EAFF"
                    strokeOpacity={0.95}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </svg>

            {/* Circular glowing leading dots (HTML spans avoid SVG non-uniform scaling) */}
            {PATH_DEFS.map((track, i) => (
              <span
                key={`dot-${track.id}`}
                ref={(el) => {
                  dotRefs.current[i] = el
                }}
                aria-hidden="true"
                style={{ opacity: 0 }}
                className="pointer-events-none absolute z-[5] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-[#3B5BDB] shadow-[0_0_12px_3px_rgba(59,91,219,0.75)]"
              />
            ))}

            {/* Center path labels */}
            {centerPaths.map((path) => (
              <div
                key={path.name}
                className="pointer-events-none absolute left-1/2 z-10 w-[max-content] max-w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-center shadow-sm dark:border-white/10 dark:bg-[#0F1524] sm:px-4 sm:py-2"
                style={{ top: path.top }}
              >
                <span className="approach-center-label block text-[10px] font-semibold tracking-tight sm:text-sm md:text-base">
                  {path.name}
                </span>
                <span className="mt-0.5 block font-mono text-[8.5px] font-medium tracking-wider text-slate-500 uppercase dark:text-[#94A3B8] sm:text-[11px] md:text-xs">
                  {path.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Right node: Business as code */}
          <div className="w-[6.25rem] flex-none text-left sm:w-40 md:w-48">
            <p className="text-[11px] leading-tight font-semibold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] sm:text-sm md:text-lg lg:text-xl">
              Business as code.
            </p>
          </div>
        </div>

        {/* Bottom callout box with corner brackets */}
        <div className="approach-callout relative mt-10 px-4 py-6 sm:mt-14 sm:px-8 sm:py-8 md:mt-16 md:px-10 md:py-10">
          <span className="approach-bracket approach-bracket-tl" />
          <span className="approach-bracket approach-bracket-tr" />
          <span className="approach-bracket approach-bracket-bl" />
          <span className="approach-bracket approach-bracket-br" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
            {stages.map((stage, idx) => (
              <div
                key={stage.num}
                className={[
                  "min-w-0",
                  idx % 2 === 1
                    ? "sm:border-l sm:border-slate-200/70 sm:pl-6 dark:sm:border-border/70"
                    : "",
                  idx === 2
                    ? "lg:border-l lg:border-slate-200/70 lg:pl-6 dark:lg:border-border/70"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="flex items-baseline gap-2">
                  <span className="approach-stage-num font-mono text-xs md:text-sm">
                    {stage.num}
                  </span>
                  <span className="approach-stage-dot text-xs">·</span>
                  <span className="approach-stage-title text-sm md:text-base">
                    {stage.title}
                  </span>
                </p>
                <p className="approach-stage-desc mt-1.5 text-[12px] leading-relaxed md:text-sm">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Approach
