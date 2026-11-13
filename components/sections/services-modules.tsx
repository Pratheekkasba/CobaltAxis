import type { CSSProperties } from "react"
import { Check } from "lucide-react"
import { engineModules } from "@/lib/constants/engine"
import { SectionHeading } from "./section-heading"

/*
 * S02 — The Intelligent Engine, told the way the reference sites tell it:
 *
 * 1. Seven numbered cards (deck 08–14) in the "In your data center / VPC /
 *    laptop" style — corner-numbered, each with a hand-computed dithered
 *    pixel illustration (dot-matrix, cobalt) and one honest line.
 * 2. Figure 1 — how work moves through the engine: a central engine card
 *    with dashed curved rails from the six satellite modules, traveling
 *    packets, and a caption that explains the machine in one sentence.
 *
 * The dithered art is computed once at module load from geometric shape
 * tests over a 24×24 grid — no assets, no deps, theme-adaptive.
 */

/* ---------- dither engine ---------- */

/** Deterministic PRNG (mulberry32). */
const prng = (seed: number) => {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

type Pt = [number, number]

const dist = (x: number, y: number, cx: number, cy: number) =>
  Math.hypot(x - cx, y - cy)

const segDist = (px: number, py: number, a: Pt, b: Pt) => {
  const [ax, ay] = a
  const [bx, by] = b
  const dx = bx - ax
  const dy = by - ay
  const l2 = dx * dx + dy * dy
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

const inPoly = (x: number, y: number, poly: Pt[]) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

/** Point-in-shape tests, in 24×24 grid units. */
const shapes: Record<string, (x: number, y: number) => boolean> = {
  systems: (x, y) => dist(x, y, 12, 12) < 8.4,
  workflows: (x, y) => {
    if (y >= 13.5 && y <= 15.8 && x >= 2.4 && x <= 21.6) return true
    const rhomb = (cx: number, cy: number) =>
      Math.abs(x - cx) / 3.2 + Math.abs(y - cy) / 1.9 <= 1
    return rhomb(5.5, 9.5) || rhomb(12, 7) || rhomb(18.5, 9.5)
  },
  rag: (x, y) => {
    const bar = (y0: number, y1: number, x1: number) =>
      y >= y0 && y <= y1 && x >= 4 && x <= x1
    return bar(5.8, 9.4, 20) || bar(11, 14.6, 20) || bar(16.2, 19.8, 15)
  },
  cloud: (x, y) => {
    if (y > 19) return false
    const c = (cx: number, cy: number, r: number) => dist(x, y, cx, cy) < r
    return (
      c(8.5, 13, 4.8) ||
      c(12.5, 10, 5.6) ||
      c(17, 13, 4.4) ||
      c(12, 15.5, 5)
    )
  },
  fps: (x, y) => {
    const r = dist(x, y, 12, 13.5)
    if (r >= 4.5 && r <= 8.2 && y < 13.5) return true
    return segDist(x, y, [12, 13.5], [16.5, 9.2]) < 1.1
  },
  prototypes: (x, y) => {
    if (x >= 10.8 && x <= 13.2 && y >= 4.5 && y <= 8.5) return true
    return y >= 8.5 && y <= 18.5 && Math.abs(x - 12) <= 2.6 + (y - 8.5) * 0.38
  },
  velocity: (x, y) => {
    if (
      inPoly(x, y, [
        [10, 4],
        [17.5, 11.5],
        [13.3, 11.9],
        [15.6, 17.4],
        [13.4, 18.3],
        [11.3, 12.7],
        [10, 14.6],
      ])
    )
      return true
    return (
      (y >= 5.8 && y <= 6.6 && x >= 3 && x <= 7) ||
      (y >= 9 && y <= 9.8 && x >= 4.5 && x <= 8.5)
    )
  },
}

type Dot = { x: number; y: number; r: number; o: number }

/** Sample the grid once per glyph; cobalt dots at three dither levels. */
const dither = (key: string): Dot[] => {
  const test = shapes[key]
  if (!test) return []
  const rng = prng(
    key.split("").reduce((a, c) => a + c.charCodeAt(0) * 7919, 11),
  )
  const dots: Dot[] = []
  for (let gy = 0; gy < 24; gy++) {
    for (let gx = 0; gx < 24; gx++) {
      const x = gx + 0.5
      const y = gy + 0.5
      if (!test(x, y)) continue
      const n = rng()
      const v = n > 0.72 ? 1 : n > 0.4 ? 0.62 : 0.3
      dots.push({
        x: x * 4,
        y: y * 4,
        r: v === 1 ? 1.55 : v === 0.62 ? 1.4 : 1.25,
        o: v === 1 ? 0.95 : v,
      })
    }
  }
  return dots
}

const DitherArt = ({ dots, label }: { dots: Dot[]; label: string }) => (
  <svg
    role="img"
    aria-label={label}
    viewBox="0 0 96 96"
    className="h-36 w-auto max-w-[64%]"
  >
    {dots.map((d, i) => (
      <circle
        key={i}
        cx={d.x}
        cy={d.y}
        r={d.r}
        opacity={d.o}
        className="fill-primary"
      />
    ))}
  </svg>
)

/* ---------- figure geometry ---------- */

const FIG = { w: 640, h: 420, cx: 320, cy: 210 }
const CARD = { w: 152, h: 54 }
const LEFT_X = 20
const RIGHT_X = 468

/** Rail path from a satellite card edge into the engine card. */
const rail = (fromX: number, fromY: number) => {
  const toX = fromX < FIG.cx ? 252 : 388
  const bendX = fromX < FIG.cx ? 244 : 396
  return `M ${fromX} ${fromY} C ${bendX} ${fromY}, ${bendX} ${FIG.cy}, ${toX} ${FIG.cy}`
}

const sats = engineModules.filter((m) => m.orbit !== "core")
const leftMods = sats.slice(0, 3)
const rightMods = sats.slice(3)
const satCards = [
  ...leftMods.map((m, i) => ({ m, x: LEFT_X, y: 36 + i * 147, side: "l" })),
  ...rightMods.map((m, i) => ({ m, x: RIGHT_X, y: 36 + i * 147, side: "r" })),
]

export const ServicesModules = () => {
  return (
    <section
      id="intelligent-engineering"
      className="relative mb-24 scroll-mt-24 md:mb-32"
    >
      <div className="section-reveal">
        <SectionHeading
          label="The intelligent engine"
          title="Seven modules. One machine."
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        The engine is not a metaphor — it is seven shippable modules that
        plug into one another. Start with one; the others are already
        specced for it.
      </p>

      {/* Numbered module cards — dithered pixel art, deck numbering. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {engineModules.map((m) => (
          <article
            key={m.n}
            className="group mod-card flex flex-col rounded-xl border border-border bg-card/40 px-6 pb-7 pt-6 transition-colors duration-300 hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-[1.35rem]">
                  {m.title}
                </h3>
                {m.orbit === "core" && (
                  <p className="mt-1 font-mono text-[9px] tracking-[0.18em] text-primary uppercase">
                    The core
                  </p>
                )}
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {m.n}
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center py-8">
              <div className="mod-dots transition-opacity duration-300 group-hover:opacity-90">
                <DitherArt
                  dots={dither(m.key)}
                  label={`Dithered illustration for ${m.title}`}
                />
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {m.tagline}
            </p>
          </article>
        ))}
      </div>

      {/* Figure 1 — how work moves through the engine. */}
      <div className="section-reveal mt-16 md:mt-20">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/40 p-3 md:p-4">
          <span className="absolute top-5 left-6 z-10 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Figure 1 // How work moves
          </span>

          <svg
            role="img"
            aria-label="Diagram: raw work enters the engine core, the six satellite modules process it, and results ship into your stack"
            viewBox={`0 0 ${FIG.w} ${FIG.h}`}
            className="sv2-root mt-6 h-auto w-full"
          >
            {/* Dashed rails — marching dashes carry the eye inward. */}
            {satCards.map(({ m, x, y }) => (
              <path
                key={`rail-${m.key}`}
                d={rail(x < FIG.cx ? x + CARD.w : x, y + CARD.h / 2)}
                className="sv2-rail"
              />
            ))}

            {/* Traveling packets on three of the rails. */}
            {[
              satCards[0],
              satCards[3],
              satCards[2],
            ].map(
              ({ m, x, y }, i) => (
                <circle
                  key={`packet-${m.key}`}
                  r="3"
                  className="sv2-packet"
                  style={
                    {
                      "--pp": `path("${rail(x < FIG.cx ? x + CARD.w : x, y + CARD.h / 2)}")`,
                      "--pd": `${i * 1.1}s`,
                    } as CSSProperties
                  }
                />
              ),
            )}

            {/* Engine core pulse */}
            <circle cx={FIG.cx} cy={FIG.cy} r="46" className="sv2-pulse" />

            {/* Satellite cards */}
            {satCards.map(({ m, x, y }) => (
              <g key={`card-${m.key}`}>
                <rect
                  x={x}
                  y={y}
                  width={CARD.w}
                  height={CARD.h}
                  rx="10"
                  className="sv2-node"
                />
                <text
                  x={x + 16}
                  y={y + 24}
                  fontSize="12.5"
                  className="fill-foreground font-semibold"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {m.title}
                </text>
                <text
                  x={x + 16}
                  y={y + 39}
                  fontSize="7.5"
                  letterSpacing="0.08em"
                  className="fill-muted-foreground font-mono"
                >
                  MOD {m.n} · {m.sys}
                </text>
              </g>
            ))}

            {/* Engine core card */}
            <rect
              x="252"
              y="178"
              width="136"
              height="64"
              rx="12"
              className="fill-primary"
            />
            <text
              x={FIG.cx}
              y={FIG.cy - 3}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              className="fill-primary-foreground"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              THE ENGINE
            </text>
            <text
              x={FIG.cx}
              y={FIG.cy + 15}
              textAnchor="middle"
              fontSize="7.5"
              letterSpacing="0.14em"
              className="fill-primary-foreground/70 font-mono"
            >
              COBALT AXIS
            </text>
          </svg>

          {/* Guarantee badge */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
              <Check aria-hidden="true" className="size-3.5 text-primary" />
              Human-in-the-loop by default
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Figure 1. Raw work enters the engine. Modules claim it, guardrails
          clear it, and the result ships into your stack — logged,
          reversible, yours.
        </p>
      </div>
    </section>
  )
}

export default ServicesModules
