"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { engineModules, type EngineModule } from "@/lib/constants/engine"
import { cn } from "@/lib/utils"

/*
 * S01 — The Intelligent Engine. The page's priority: the seven
 * Intelligent Engineering services presented as one living machine.
 *
 * Left: a hand-coded isometric engine scene (SVG) — a reactor core with
 * a burning energy cell, twin circulating turbine rings, an antenna, a
 * coolant tank fed by an animated pipe, a scanning radar sweep, two
 * orbital rails with six module nodes, and data beams that carry
 * traveling light packets. Hovering a row spotlights that module: its
 * node zooms, its beam turns hot, the core flares, and the readout
 * swaps. Continuous motion is pure CSS (+ one SMIL sweep) and switches
 * off under prefers-reduced-motion; the readout swap is framer-motion,
 * gated by the same query.
 *
 * Right: the seven module rows (deck items 08–14) — number, name,
 * outcome line, deliverable chips. Rows reuse the .svc-row scanner and
 * .svc-chip warm-up from the disciplines section.
 */

const CORE = { x: 280, y: 242 }
const BEAM_SOURCE = { x: 280, y: 218 }
const ORBITS = {
  outer: { rx: 236, ry: 122 },
  inner: { rx: 160, ry: 83 },
} as const

function nodePos(m: EngineModule) {
  if (m.orbit === "outer" || m.orbit === "inner") {
    const o = ORBITS[m.orbit]
    const a = (m.angle * Math.PI) / 180
    return { x: CORE.x + Math.cos(a) * o.rx, y: CORE.y + Math.sin(a) * o.ry }
  }
  return CORE
}

/** Isometric box faces around a top-face center (cx, cy). */
const iso = (cx: number, cy: number, s: number) => {
  const dx = s * 0.866
  const dy = s * 0.5
  const h = s * 1.05
  return {
    top: `M ${cx} ${cy - dy} L ${cx + dx} ${cy} L ${cx} ${cy + dy} L ${cx - dx} ${cy} Z`,
    left: `M ${cx - dx} ${cy} L ${cx} ${cy + dy} L ${cx} ${cy + dy + h} L ${cx - dx} ${cy + h} Z`,
    right: `M ${cx + dx} ${cy} L ${cx} ${cy + dy} L ${cx} ${cy + dy + h} L ${cx + dx} ${cy + h} Z`,
  }
}

const rhomb = (cx: number, cy: number, w: number, h: number) =>
  `M ${cx} ${cy - h} L ${cx + w} ${cy} L ${cx} ${cy + h} L ${cx - w} ${cy} Z`

const PLAT_TOP = rhomb(280, 358, 178, 90)
const PLAT_UNDER = rhomb(280, 371, 178, 90)
const PLAT_INNER = rhomb(280, 358, 148, 75)
const CUBE_A = iso(280, 284, 44)
const CUBE_B = iso(280, 244, 26)

const CIRCUIT_PADS: Array<[number, number]> = [
  [190, 323],
  [372, 320],
  [268, 362],
  [296, 358],
]

/* Ambient particles drifting up through the scene. */
const MOTES: Array<[number, number, number]> = [
  [148, 296, 5],
  [214, 150, 4],
  [332, 118, 6],
  [448, 262, 4],
  [402, 200, 5],
]

/* Twinkling backdrop stars. */
const STARS: Array<[number, number, number]> = [
  [92, 132, 1.8],
  [182, 96, 1.4],
  [470, 118, 1.8],
  [516, 208, 1.3],
  [64, 262, 1.4],
  [500, 330, 1.6],
]

/** Minimal geometric glyph per module, drawn inside a ±5 box. */
function Glyph({ k }: { k: string }) {
  switch (k) {
    case "workflows":
      return (
        <>
          <path d="M -4.4 -1.6 h 8.8" />
          <circle cx="-2.8" cy="1.8" r="1.15" fill="currentColor" stroke="none" />
          <circle cx="0" cy="1.8" r="1.15" fill="currentColor" stroke="none" />
          <circle cx="2.8" cy="1.8" r="1.15" fill="currentColor" stroke="none" />
        </>
      )
    case "rag":
      return <path d="M -4 -3 h 8 M -4 0 h 8 M -4 3 h 5" />
    case "cloud":
      return <path d="M -3.9 2.5 a 3.3 3.3 0 0 1 0.7 -6.5 a 3.9 3.9 0 0 1 7.4 1 a 2.7 2.7 0 0 1 -0.6 5.5 z" />
    case "fps":
      return (
        <>
          <path d="M -4.2 1.8 a 4.4 4.4 0 0 1 8.4 0" />
          <path d="M 0 1.8 L 2.5 -1.2" />
          <circle cx="0" cy="1.8" r="1" fill="currentColor" stroke="none" />
        </>
      )
    case "prototypes":
      return (
        <path d="M -1.4 -4.4 h 2.8 M -0.9 -4.4 v 2.4 l -2.6 4.2 a 1.2 1.2 0 0 0 1 1.9 h 5 a 1.2 1.2 0 0 0 1 -1.9 l -2.6 -4.2 v -2.4" />
      )
    case "velocity":
      return (
        <path
          d="M -2.4 -3.9 v 7.3 l 1.8 -1.8 l 1.1 2.6 l 1.6 -0.7 l -1.2 -2.5 l 2.5 -0.4 z"
          fill="currentColor"
          stroke="none"
        />
      )
    default:
      return null
  }
}

function EngineSVG({ active, reduced }: { active: string | null; reduced: boolean }) {
  const coreActive = active === "systems"
  const orbiters = engineModules.filter((m) => m.orbit !== "core")

  return (
    <svg
      role="img"
      aria-label="Animated diagram of the intelligent engine — a reactor core with orbiting service modules connected by data beams"
      viewBox="0 64 560 436"
      className="eng-root h-auto w-full"
    >
      <defs>
        <radialGradient id="eng-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eng-nebula" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.16" />
          <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eng-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eng-corefire" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#dbe4ff" />
          <stop offset="35%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--primary) 55%, #0a0e1a)" />
        </radialGradient>
        <linearGradient id="eng-sweep-grad" gradientUnits="userSpaceOnUse" x1="280" y1="358" x2="280" y2="264">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <pattern id="eng-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.1" className="eng-grid-dot" />
        </pattern>
        <filter id="eng-soft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Backdrop: micro-grid, twinkling stars, nebula wash */}
      <rect x="0" y="64" width="560" height="436" fill="url(#eng-grid)" />
      {STARS.map(([x, y, r], i) => (
        <circle
          key={`star-${i}`}
          cx={x}
          cy={y}
          r={r}
          className="eng-star"
          style={{ "--sd": `${(i % 4) * 0.9}s` } as React.CSSProperties}
        />
      ))}
      <circle cx="280" cy="262" r="176" fill="url(#eng-nebula)" className="eng-nebula" />

      {/* Platform: extrusion, etched plate, blueprint inset, circuits */}
      <path d={PLAT_UNDER} className="eng-plate-under" />
      <path d={PLAT_TOP} className="eng-plate-top" />
      <path d={PLAT_INNER} className="eng-plate-inner" />
      <path d="M 120 358 L 190 323 L 268 362" className="eng-circuit" />
      <path d="M 440 354 L 372 320 L 296 358" className="eng-circuit" />
      {CIRCUIT_PADS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" className="eng-pad" />
      ))}

      {/* Radar sweep — SMIL rotation around the platform center */}
      {!reduced && (
        <g opacity="0.85">
          <line x1="280" y1="358" x2="280" y2="268" stroke="url(#eng-sweep-grad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="280" cy="268" r="2.4" className="eng-pad" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 280 358"
            to="360 280 358"
            dur="11s"
            repeatCount="indefinite"
          />
        </g>
      )}

      {/* Core shadow + breathing glow */}
      <ellipse cx="280" cy="354" rx="50" ry="21" fill="url(#eng-shadow)" />
      <circle cx="280" cy="250" r="94" fill="url(#eng-glow)" className="eng-glow" />

      {/* Orbital rails */}
      <ellipse cx={CORE.x} cy={CORE.y} rx={ORBITS.outer.rx} ry={ORBITS.outer.ry} className="eng-orbit" />
      <ellipse cx={CORE.x} cy={CORE.y} rx={ORBITS.inner.rx} ry={ORBITS.inner.ry} className="eng-orbit eng-orbit-dash" />

      {/* Data beams with traveling light packets */}
      {orbiters.map((m, i) => {
        const p = nodePos(m)
        return (
          <g key={`beam-${m.key}`}>
            <line
              x1={BEAM_SOURCE.x}
              y1={BEAM_SOURCE.y}
              x2={p.x}
              y2={p.y}
              className={cn("eng-beam", active === m.key && "eng-beam-hot")}
              style={{ "--bd": `${(i % 4) * 0.22}s` } as React.CSSProperties}
            />
            {!reduced && (
              <circle
                r="2.4"
                className="eng-packet"
                style={
                  {
                    "--pp": `path("M ${BEAM_SOURCE.x} ${BEAM_SOURCE.y} L ${p.x} ${p.y}")`,
                    "--pd": `${(i % 3) * 0.65}s`,
                  } as React.CSSProperties
                }
              />
            )}
          </g>
        )
      })}

      {/* Coolant tank (iso cylinder) */}
      <path d="M 383 320 L 383 349 A 15 7.5 0 0 0 413 349 L 413 320" className="eng-tank" />
      <ellipse cx="398" cy="320" rx="15" ry="7.5" className="eng-tank-cap" />

      {/* Feed pipe with animated coolant flow */}
      <path d="M 318 336 H 350 V 322 H 383" className="eng-pipe" />
      <path d="M 318 336 H 350 V 322 H 383" className="eng-pipe-flow" />

      {/* Reactor core — two stacked iso cubes */}
      <g className={cn("eng-core", coreActive && "eng-core-active")}>
        <path d={CUBE_A.left} className="eng-face-l" />
        <path d={CUBE_A.right} className="eng-face-r" />
        <path d={CUBE_A.top} className="eng-face-t" />
        <path d={CUBE_B.left} className="eng-face-l" />
        <path d={CUBE_B.right} className="eng-face-r" />
        <path d={CUBE_B.top} className="eng-face-t" />
      </g>

      {/* Energy cell burning on the top face */}
      {!reduced && <circle cx="280" cy="244" r="21" fill="url(#eng-glow)" className="eng-cell-halo" />}
      <path d={rhomb(280, 244, 13, 7)} className="eng-cell" />

      {/* Antenna with a blinking beacon */}
      <line x1="242" y1="284" x2="233" y2="256" className="eng-antenna" />
      <circle cx="233" cy="254" r="2.6" className="eng-beacon" />

      {/* Twin turbine rings — dashes circulate, reading as a spin in iso */}
      <g transform="translate(280 206)">
        <ellipse rx="54" ry="28" className="eng-ring-base" />
        {!reduced && <ellipse rx="54" ry="28" className="eng-ring-flow" />}
        {!reduced && <ellipse rx="42" ry="21.5" className="eng-ring-flow-rev" />}
        <line x1="-54" y1="0" x2="-40" y2="0" className="eng-ring-tick" />
        <line x1="54" y1="0" x2="40" y2="0" className="eng-ring-tick" />
      </g>

      {/* Module nodes */}
      {orbiters.map((m, i) => {
        const p = nodePos(m)
        const isA = active === m.key
        const dim = active !== null && !isA
        return (
          <g
            key={`node-${m.key}`}
            transform={`translate(${p.x} ${p.y})`}
            className="eng-node"
            style={{ opacity: dim ? 0.35 : 1 }}
          >
            <g className="eng-float" style={{ "--fd": `${(i % 3) * 0.7}s` } as React.CSSProperties}>
              <circle r="15" className={cn("eng-node-halo", isA && "eng-node-halo-on")} />
              <g className={cn("eng-node-tr", isA && "eng-node-zoom")}>
                <circle r="15" className={cn("eng-node-core", isA && "eng-node-core-hot")} />
                <circle r="2.4" className="eng-node-pin" />
                <g transform="scale(1.18)" className={cn("eng-glyph", isA && "eng-glyph-hot")}>
                  <Glyph k={m.key} />
                </g>
              </g>
            </g>
          </g>
        )
      })}

      {/* Drifting motes */}
      {!reduced &&
        MOTES.map(([x, y, s], i) => (
          <path
            key={`mote-${i}`}
            d={rhomb(x, y, s, s * 0.55)}
            className="eng-mote"
            style={{ "--md": `${(i % 3) * 1.9}s` } as React.CSSProperties}
          />
        ))}
    </svg>
  )
}

const Cross = ({ className }: { className: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-10 font-mono text-xs leading-none text-slate-400/80 select-none dark:text-muted-foreground/60 ${className}`}
  >
    +
  </span>
)

export const ServicesEngine = () => {
  const [active, setActive] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const activeModule = engineModules.find((m) => m.key === active)

  return (
    <section id="engine" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="The intelligent engine"
          title="One engine. Seven modules."
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        Everything we ship plugs into one machine — seven engineering modules
        that think, move and scale together. Hover a module to find it in the
        engine.
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Engine diagram panel */}
        <div className="section-reveal lg:col-span-6">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card/40 p-2 md:p-3">
            <Cross className="top-2.5 left-3" />
            <Cross className="top-2.5 right-3" />
            <Cross className="bottom-2.5 left-3" />
            <Cross className="right-3 bottom-2.5" />

            <EngineSVG active={active} reduced={!!reduced} />

            <span className="absolute top-5 left-6 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Engine // Live
            </span>

            {/* Readout — swaps to the hovered module */}
            <div className="absolute bottom-5 left-6 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.14em] uppercase md:text-[11px]">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors duration-200",
                  activeModule
                    ? "animate-pulse bg-primary"
                    : "bg-emerald-500/80",
                )}
              />
              <span className="sr-only">Currently viewing:</span>
              <span className="relative inline-flex h-[1.2em] min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeModule ? activeModule.key : "nominal"}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={cn(
                      "whitespace-nowrap",
                      activeModule ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {activeModule
                      ? `MODULE ${activeModule.n} // ${activeModule.sys}`
                      : "ALL SYSTEMS // NOMINAL"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>

        {/* Module rows */}
        <div className="section-reveal lg:col-span-6">
          <ul className="border-t border-border">
            {engineModules.map((m) => {
              const isA = active === m.key
              return (
                <li key={m.n}>
                  <article
                    tabIndex={0}
                    onMouseEnter={() => setActive(m.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(m.key)}
                    onBlur={() => setActive(null)}
                    className={cn(
                      "svc-row group grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 border-b border-border px-2 py-6 transition-colors duration-300 md:py-7",
                      isA ? "bg-secondary/40" : "hover:bg-secondary/40",
                    )}
                  >
                    <div className="flex items-start gap-2 pt-1">
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors duration-200",
                          isA ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {m.n}
                      </span>
                      {m.orbit === "core" && (
                        <span className="mt-0.5 font-mono text-[9px] tracking-[0.14em] text-primary uppercase">
                          core
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-xl">
                          {m.title}
                        </h3>
                        <span className="hidden shrink-0 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase xl:block">
                          {m.sys}
                        </span>
                      </div>

                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                        {m.tagline}
                      </p>

                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {m.chips.map((chip, i) => (
                          <li
                            key={chip}
                            style={{ "--chip-i": i } as React.CSSProperties}
                            className="svc-chip rounded-full border border-border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ServicesEngine
