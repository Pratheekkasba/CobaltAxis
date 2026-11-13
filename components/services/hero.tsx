"use client"

import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { sv2Blur } from "@/lib/blur"
import { scrollTo } from "@/hooks/use-lenis"
import { Button } from "./button"
import { Container } from "./container"

/*
 * Services page hero — split layout: headline block left, the Cobalt Axis
 * campus isometric illustration right (stacks below on mobile).
 *
 * Motion budget (transform/opacity only, all reduced-motion safe):
 * - Text entrance: staggered fade-up via framer-motion variants.
 * - Image: one-time fade-rise, then a slow CSS float loop ("parallax"
 *   drift) on the panel.
 * - Cyan dots: absolutely positioned over the illustration's glowing
 *   circuit paths, sonar-pulsing via CSS keyframes at low opacity.
 */

/** Dot positions sit on the illustration's cyan circuit traces (%, %). */
const DOTS: Array<{ x: string; y: string; d: string }> = [
  { x: "16%", y: "54%", d: "0s" },
  { x: "27%", y: "38%", d: "0.7s" },
  { x: "44%", y: "84%", d: "1.3s" },
  { x: "67%", y: "36%", d: "0.4s" },
  { x: "82%", y: "74%", d: "1s" },
]

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="We engineer intelligence into every pixel"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Subtle isometric grid, fading out toward the fold. */}
      <div
        aria-hidden="true"
        className="iso-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <motion.div
            variants={stagger}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="lg:col-span-6"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-[11px] tracking-[0.18em] text-cobalt uppercase"
            >
              Cobalt Axis — Intelligent engineering
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl leading-[1.06] font-medium tracking-[-0.025em] font-[family-name:var(--font-display)] text-foreground sm:text-5xl lg:text-[3.4rem]"
            >
              We Engineer{" "}
              <span className="text-cobalt">Intelligence</span> Into Every
              Pixel.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              From autonomous AI workflows to 60 FPS digital products — we
              design, build, and deploy systems that think.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  scrollTo("#intelligent-engineering", { offset: -96 })
                }
              >
                Explore AI Engineering
                <ArrowDown aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <div className="lg:col-span-6">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <div className="sv2-float relative">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_-30px_rgba(43,84,216,0.28)]">
                  <div className="relative aspect-16/9">
                    <Image
                      src="/images/services/01-hero-hq.webp"
                      alt="Isometric illustration of the Cobalt Axis campus — the studio headquarters wired to server racks by glowing cyan circuit paths"
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL={sv2Blur("/images/services/01-hero-hq.webp")}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover mix-blend-multiply"
                    />
                  </div>

                  {/* Cyan pulses riding the illustration's circuit paths */}
                  {DOTS.map((dot, i) => (
                    <span
                      key={i}
                      data-testid="hero-dot"
                      aria-hidden="true"
                      style={{ left: dot.x, top: dot.y, "--pd": dot.d } as React.CSSProperties}
                      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    >
                      <span className="relative block size-2">
                        <span className="absolute inset-0 rounded-full bg-neon opacity-60 shadow-[0_0_10px_2px_rgba(0,240,255,0.5)]" />
                        <span className="sv2-ping absolute inset-0 rounded-full bg-neon/50" />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
