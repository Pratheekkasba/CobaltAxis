"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { sv2Blur } from "@/lib/blur"
import { Section } from "./section"

/*
 * S04 — Process: the campus banner + a scroll-driven stage timeline.
 *
 * A cobalt progress line runs through the four stages and fills as the
 * section scrolls through the viewport (framer useScroll → scaleX on
 * desktop / per-stage rail segments on mobile). A stage "activates" when
 * the line reaches it: dot flips to cobalt, text brightens. Reduced-
 * motion users get the completed line with every stage active.
 */

const steps = [
  { title: "Discover", description: "Systems research & goal mapping." },
  {
    title: "Architect",
    description: "System flow, data schemas, UI layout blueprint.",
  },
  {
    title: "Build",
    description: "Rapid sprint-based engineering with weekly demos.",
  },
  {
    title: "Deploy & Evolve",
    description: "Automated launch, monitoring, AI model optimization.",
  },
]

const bannerReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Process() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)))
  })

  const activeIdx = reduced ? steps.length - 1 : active

  return (
    <Section
      id="process"
      eyebrow="Process"
      title="How the engine gets built."
      lead="Four stages from first call to a system that keeps improving — with something reviewable at every step."
      className="scroll-mt-24"
    >
      <div ref={sectionRef}>
        <motion.div
          variants={bannerReveal}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="overflow-hidden rounded-2xl border border-border bg-white"
        >
          <div className="relative aspect-[21/9]">
            <Image
              src="/images/services/09-art-direction.webp"
              alt="Wide isometric view of the Cobalt Axis campus — the studio floor where the four stages run"
              fill
              placeholder="blur"
              blurDataURL={sv2Blur("/images/services/09-art-direction.webp")}
              sizes="(min-width: 1152px) 72rem, 100vw"
              className="object-cover mix-blend-multiply"
            />
          </div>
        </motion.div>

        <ol className="relative mt-14 grid gap-12 md:mt-16 md:grid-cols-4 md:gap-8">
        {/* Desktop track + scroll-driven fill */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[17px] hidden h-px bg-border md:block"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleX: reduced ? 1 : scrollYProgress }}
          className="absolute inset-x-0 top-[17px] hidden h-px origin-left bg-cobalt md:block"
        />

        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative pb-12 pl-14 last:pb-0 md:pb-0 md:pl-0 md:pt-16"
          >
            {/* Mobile rail segment — turns cobalt as the stage activates */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[17px] top-10 bottom-0 w-px bg-border transition-colors duration-300 md:hidden",
                i < activeIdx && "bg-cobalt",
                i === steps.length - 1 && "hidden",
              )}
            />

            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 left-0 flex size-9 items-center justify-center rounded-full border font-mono text-[11px] font-medium transition-colors duration-300",
                i <= activeIdx
                  ? "border-cobalt bg-cobalt text-white shadow-[0_0_0_4px_rgba(43,84,216,0.12)]"
                  : "border-border bg-white text-muted-foreground",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div
              className={cn(
                "transition-opacity duration-300",
                i <= activeIdx ? "opacity-100" : "opacity-50",
              )}
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  )
}
