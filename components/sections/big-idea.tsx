"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeading } from "./section-heading"

export const BigIdea = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

  return (
    <section id="idea" ref={containerRef} className="relative mb-36">
      <SectionHeading label="Why Cobalt Axis Exists" title="The Big Idea" />

      <div className="space-y-12">
        <motion.h3
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-foreground"
        >
          Technology is only powerful when it solves something{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400">
            meaningful
          </span>
          .
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-lg sm:text-2xl font-light leading-relaxed text-muted-foreground"
        >
          We combine high-performance software engineering, interface design,
          and intelligent systems to transform complex business challenges into
          intuitive, high-velocity digital products and experiences.
        </motion.p>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/50"
        >
          <div>
            <span className="text-xs font-mono text-blue-500 tracking-wider">
              01. RIGOR
            </span>
            <h4 className="mt-1 text-base font-medium text-foreground">
              Engineered for Scale
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Architectures built to withstand real-world enterprise load.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-blue-500 tracking-wider">
              02. SPEED
            </span>
            <h4 className="mt-1 text-base font-medium text-foreground">
              60 FPS Precision
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Tactile interactions and micro-animations crafted with care.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-blue-500 tracking-wider">
              03. UTILITY
            </span>
            <h4 className="mt-1 text-base font-medium text-foreground">
              Zero Artificial Bloat
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Every line of code and visual asset serves a direct outcome.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
