import type { CSSProperties } from "react"
import { SectionHeading } from "./section-heading"

/*
 * S04 — Guardrails band, in the reference's floating-pills style: a warm
 * tinted panel with a dot grid, one big centered statement, and colored
 * capability pills floating around it. Pills bob gently (pure CSS,
 * staggered, reduced-motion safe). Copy lists what every engagement
 * ships with by default — not an upsell.
 */

type Pill = {
  label: string
  className: string
  x: number // % from left
  y: number // % from top
  delay: number
}

const pills: Pill[] = [
  { label: "Weekly eval runs", className: "bg-emerald-300 text-emerald-950", x: 9, y: 9, delay: 0 },
  { label: "Scoped credentials", className: "bg-amber-200 text-amber-950", x: 64, y: 13, delay: 0.7 },
  { label: "Zero-retention providers", className: "bg-sky-200 text-sky-950", x: 28, y: 23, delay: 1.3 },
  { label: "PII controls, in & out", className: "bg-background text-foreground border border-border", x: 5, y: 36, delay: 0.4 },
  { label: "Kill switches", className: "bg-emerald-300 text-emerald-950", x: 80, y: 34, delay: 1.8 },
  { label: "Row-level access rules", className: "bg-violet-200 text-violet-950", x: 9, y: 63, delay: 1 },
  { label: "Red-team runs", className: "bg-sky-200 text-sky-950", x: 60, y: 68, delay: 0.2 },
  { label: "Point-in-time rollback", className: "bg-amber-200 text-amber-950", x: 16, y: 79, delay: 1.5 },
  { label: "Full audit trail", className: "bg-background text-foreground border border-border", x: 58, y: 84, delay: 0.9 },
]

export const ServicesGuardrails = () => {
  return (
    <section id="guardrails" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="Hard-wired by default"
          title="Built for production, not demos."
        />
      </div>

      <div
        className="sv2-dots section-reveal relative h-[540px] overflow-hidden rounded-2xl border border-border sm:h-[500px] md:h-[540px]"
        style={{
          background:
            "linear-gradient(155deg, color-mix(in srgb, var(--primary) 16%, var(--card)) 0%, color-mix(in srgb, #f8e3c8 42%, var(--card)) 52%, color-mix(in srgb, var(--primary) 7%, var(--card)) 100%)",
        }}
      >
        {/* Floating pills */}
        {pills.map((pill) => (
          <span
            key={pill.label}
            style={
              {
                left: `${pill.x}%`,
                top: `${pill.y}%`,
                "--pd": `${pill.delay}s`,
              } as CSSProperties
            }
            className={`sv2-bob absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap shadow-sm sm:px-4 sm:text-sm ${pill.className}`}
          >
            {pill.label}
          </span>
        ))}

        {/* Center statement */}
        <div className="absolute inset-0 flex items-center justify-center px-10">
          <h3 className="max-w-2xl text-center text-3xl leading-[1.08] font-bold tracking-[-0.02em] text-foreground uppercase md:text-5xl">
            Guardrails you never have to think about
          </h3>
        </div>

        {/* Bottom spec line */}
        <p className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Evals · Audit trail · Rollbacks — standard on every engagement
        </p>
      </div>
    </section>
  )
}

export default ServicesGuardrails
