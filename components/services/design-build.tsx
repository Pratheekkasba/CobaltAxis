"use client"

import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { Section } from "./section"

/*
 * S02 — Design & Build, the secondary pillar.
 *
 * Two alternating split rows (art left / checklist right, then reversed).
 * Each row pairs two offset 16:9 plates with a spec-sheet checklist whose
 * cobalt check icons draw in (SVG pathLength) as the list staggers in.
 * All motion is transform/opacity/stroke — reduced-motion users get the
 * static layout with no entrance animation.
 */

const rows = [
  {
    title: "Art Direction & Brand Strategy",
    reverse: false,
    images: [
      {
        src: "/images/services/07-research-prototypes.webp",
        alt: "Isometric illustration of a prototyping lab — instruments and robotic arms around a central workbench",
      },
      {
        src: "/images/services/10-brand-strategy.webp",
        alt: "Isometric illustration of a positioning campus — a flagged radar mast and location pins marking ground",
      },
    ],
    items: [
      "Visual Identity Systems",
      "Brand Positioning",
      "Typography & Swatch Libraries",
      "Component Systems",
    ],
  },
  {
    title: "Web Design & Motion Design",
    reverse: true,
    images: [
      {
        src: "/images/services/11-web-design.webp",
        alt: "Isometric illustration of robotic cranes assembling a website interface on a giant wireframe board",
      },
      {
        src: "/images/services/13-motion-design.webp",
        alt: "Isometric illustration of a kinetic motion machine — gears, funnels and ball runs in motion",
      },
    ],
    items: [
      "High-Fidelity UI/UX",
      "3D & Micro-Interactions",
      "Interactive Landing Pages",
      "Lottie Animations",
    ],
  },
] as const

const rowStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const stackReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemReveal: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const checkDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.14 },
  },
}

/** Two 16:9 plates, slightly offset — the stacked-pair treatment. */
function ImageStack({
  images,
}: {
  images: readonly [
    { src: string; alt: string },
    { src: string; alt: string },
  ]
}) {
  const [back, front] = images
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-xl">
      <div className="absolute left-0 top-0 aspect-video w-[78%] overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src={back.src}
          alt={back.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover mix-blend-multiply"
        />
      </div>
      <div className="absolute right-0 bottom-0 aspect-video w-[64%] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_50px_-24px_rgba(10,10,15,0.35)]">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 32vw, 70vw"
          className="object-cover mix-blend-multiply"
        />
      </div>
    </div>
  )
}

export function DesignBuild() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="design-build"
      eyebrow="Secondary pillar"
      title="Design & build."
      lead="From identity systems to interfaces in motion — designed, built and shipped by the same senior team."
      className="scroll-mt-24"
    >
      <div className="space-y-20 md:space-y-28">
        {rows.map((row) => (
          <motion.div
            key={row.title}
            variants={rowStagger}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <motion.div
              variants={stackReveal}
              className={cn(row.reverse && "lg:order-2")}
            >
              <ImageStack images={row.images} />
            </motion.div>

            <motion.div
              variants={textReveal}
              className={cn(row.reverse && "lg:order-1")}
            >
              <h3 className="text-2xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground md:text-3xl">
                {row.title}
              </h3>

              <motion.ul
                variants={listStagger}
                className="mt-6 divide-y divide-border"
              >
                {row.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={itemReveal}
                    className="flex items-center gap-3.5 py-4 text-[15px] font-medium tracking-[-0.01em] text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt/10 text-cobalt"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="size-3.5"
                      >
                        <motion.path
                          d="M3.5 8.5l3 3 6-6.5"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={checkDraw}
                        />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
