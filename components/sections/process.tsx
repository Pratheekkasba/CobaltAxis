"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"

const steps = [
  {
    step: "01",
    title: "Understand",
    sub: "Deconstruct the core problem",
    description:
      "We interrogate requirements down to first principles. Before designing or writing code, we map data paths, edge failure modes, and user friction points.",
    artifact: "Technical Spec & Architecture Blueprint",
  },
  {
    step: "02",
    title: "Design",
    sub: "Architect systems & tactile interfaces",
    description:
      "We design state models, API contracts, and fluid visual systems simultaneously. Every interface interaction has intentional physics and purpose.",
    artifact: "Interactive High-Fidelity Prototype",
  },
  {
    step: "03",
    title: "Engineer",
    sub: "Production rigor & zero-bloat execution",
    description:
      "Modern full-stack implementation with clean abstractions, strict TypeScript, efficient queries, and automated testing pipelines.",
    artifact: "Audited, Versioned Repository",
  },
  {
    step: "04",
    title: "Validate",
    sub: "Stress testing & benchmark verification",
    description:
      "Real-world concurrency loads, accessibility checks, 60fps frame rate benchmarks, and security audits to ensure unbroken reliability.",
    artifact: "Performance & Security Audit Report",
  },
  {
    step: "05",
    title: "Evolve",
    sub: "Telemetry, optimization & scale",
    description:
      "Software is a living organism. We instrument telemetry, gather user signals, and deploy iterative enhancements that compound over time.",
    artifact: "Live Telemetry & Iteration Cadence",
  },
]

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="relative mb-36">
      <SectionHeading label="Methodology" title="How We Think" />

      {/* Connected Interactive Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Step Pills (Left) */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx

            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? "border-blue-500/60 bg-blue-500/10 shadow-[0_0_24px_rgba(0,82,255,0.12)] text-foreground"
                    : "border-border/40 bg-card/40 hover:border-border hover:bg-card/70 text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <div
                      className={`text-base font-bold tracking-tight ${
                        isActive ? "text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {item.sub}
                    </div>
                  </div>
                </div>
                <div
                  className={`size-2 rounded-full ${
                    isActive ? "bg-blue-500 animate-pulse" : "bg-border"
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Detailed Phase Stage Showcase (Right) */}
        <div className="lg:col-span-7">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-card/90 to-card/40 p-8 sm:p-12 shadow-xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Ambient Background Gradient Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground border-b border-border/50 pb-6 mb-8">
              <span>PHASE {steps[activeStep].step} OF 05</span>
              <span className="text-blue-500 font-semibold uppercase">
                {steps[activeStep].title}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              {steps[activeStep].sub}
            </h3>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {steps[activeStep].description}
            </p>

            <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  Deliverable Artifact:
                </span>
                <span className="text-sm font-semibold text-foreground font-mono">
                  {steps[activeStep].artifact}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
