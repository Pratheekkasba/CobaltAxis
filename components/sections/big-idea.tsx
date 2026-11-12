"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"

const pillars = [
  {
    n: "01",
    name: "Speed",
    title: "Fast where it counts",
    desc: "Pages that load instantly, so visitors browse instead of bouncing.",
  },
  {
    n: "02",
    name: "Trust",
    title: "Credible at first click",
    desc: "A polished online presence that makes customers confident before they walk in.",
  },
  {
    n: "03",
    name: "Growth",
    title: "Built to bring work in",
    desc: "Bookings, payments, and analytics that turn visitors into customers.",
  },
]

export const BigIdea = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="idea" ref={containerRef} className="relative mb-28 md:mb-36">
      <SectionHeading label="Why Cobalt Axis exists" title="The big idea" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3"
      >
        {/* Manifesto cell */}
        <div className="flex flex-col justify-between gap-10 bg-background p-8 md:p-12 lg:col-span-2 lg:row-span-3">
          <h3 className="text-3xl leading-[1.15] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] sm:text-4xl lg:text-[2.75rem]">
            Technology is only powerful when it solves something{" "}
            <span className="text-primary">meaningful</span>.
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We combine high-performance software engineering, interface design,
            and intelligent systems to transform complex business challenges
            into intuitive, high-velocity digital products and experiences.
          </p>
        </div>

        {/* Pillars */}
        {pillars.map((pillar) => (
          <div
            key={pillar.n}
            className="flex flex-col gap-2 bg-secondary p-8"
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              {pillar.n}
            </span>
            <h4 className="mt-1 text-base font-medium text-foreground md:text-lg">
              {pillar.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pillar.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
