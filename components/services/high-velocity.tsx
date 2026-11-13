"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { Container } from "./container"

/*
 * S03 — High Velocity, the speed-numbers band.
 *
 * Four feature rows on a soft neutral band (in-theme, no dark mode
 * deviation): white art plates, navy ink titles, and a cobalt
 * speed-indicator badge per row. Numeric badges count up from zero when
 * scrolled into view (framer `animate` on the text node); the MVP badge
 * pops instead — it isn't a number. Everything is transform/opacity/
 * text-only and reduced-motion renders final values statically.
 */

type Badge =
  | { kind: "count"; to: number; decimals: number; unit: string; sr: string }
  | { kind: "text"; text: string; sr: string }

const features: Array<{
  title: string
  description: string
  image: { src: string; alt: string }
  badge: Badge
}> = [
  {
    title: "60 FPS Web Apps",
    description:
      "Ultra-smooth React / Next.js / Three.js frontends built for maximum responsiveness.",
    image: {
      src: "/images/services/06-60fps-web-apps.webp",
      alt: "Isometric illustration of a performance dashboard maxing its speedometer",
    },
    badge: { kind: "count", to: 60, decimals: 0, unit: "FPS", sr: "60 frames per second" },
  },
  {
    title: "High-Velocity UI & Rapid Sprint",
    description:
      "Design-to-code execution with 48-hour turnarounds on component builds.",
    image: {
      src: "/images/services/08-high-velocity-ui.webp",
      alt: "Isometric illustration of a UI assembly line — component blocks conveyor-belted into an interface",
    },
    badge: { kind: "count", to: 48, decimals: 0, unit: "H", sr: "48-hour turnaround" },
  },
  {
    title: "Research Prototypes (R&D)",
    description:
      "Rapid MVP development and proof-of-concept testing for groundbreaking ideas.",
    image: {
      src: "/images/services/12-development.webp",
      alt: "Isometric illustration of a code pipeline — an editor feeding neon tubes into a build-and-deploy machine",
    },
    badge: { kind: "text", text: "MVP", sr: "MVP prototype builds" },
  },
  {
    title: "Continuous Maintenance & Monitoring",
    description:
      "99.9% uptime SLA monitoring, live dashboards, and regular performance audits.",
    image: {
      src: "/images/services/14-maintenance.webp",
      alt: "Isometric illustration of a monitored neural facility — a glowing network dome watched over by server racks",
    },
    badge: { kind: "count", to: 99.9, decimals: 1, unit: "%", sr: "99.9 percent uptime" },
  },
]

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const rowReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
}

/** Counts from 0 to `to` once the element scrolls into view. */
function CountUp({ to, decimals }: { to: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduced) {
      ref.current.textContent = to.toFixed(decimals)
      return
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals, reduced])

  return <span ref={ref}>0</span>
}

function SpeedBadge({ badge }: { badge: Badge }) {
  return (
    <motion.div
      variants={badgePop}
      className="inline-flex min-w-[7.5rem] flex-col items-center rounded-xl border border-cobalt/25 bg-white px-5 py-4"
    >
      <span
        aria-hidden="true"
        className="font-mono text-3xl font-semibold tracking-tight text-cobalt tabular-nums"
      >
        {badge.kind === "count" ? (
          <CountUp to={badge.to} decimals={badge.decimals} />
        ) : (
          badge.text
        )}
      </span>
      {badge.kind === "count" && (
        <span
          aria-hidden="true"
          className="mt-1 font-mono text-[10px] tracking-[0.22em] text-cobalt/60 uppercase"
        >
          {badge.unit}
        </span>
      )}
      <span className="sr-only">{badge.sr}</span>
    </motion.div>
  )
}

export function HighVelocity() {
  const reduced = useReducedMotion()

  return (
    <section
      id="high-velocity"
      className="scroll-mt-24 border-y border-border bg-secondary/50 py-20 md:py-28"
    >
      <Container>
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-cobalt uppercase">
            High velocity
          </p>
          <h2 className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground md:text-5xl">
            Fast is a feature.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            The numbers we hold ourselves to — in frames, hours and uptime.
          </p>
        </header>

        <motion.ul
          variants={listStagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="divide-y divide-border"
        >
          {features.map((feature) => (
            <motion.li
              key={feature.title}
              variants={rowReveal}
              className="flex flex-col gap-6 py-8 first:pt-0 md:grid md:grid-cols-[280px_1fr_auto] md:items-center md:gap-10 md:py-10"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-white">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  className="object-cover mix-blend-multiply"
                />
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em] text-foreground md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {feature.description}
                </p>
              </div>

              <div className="md:justify-self-end">
                <SpeedBadge badge={feature.badge} />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
