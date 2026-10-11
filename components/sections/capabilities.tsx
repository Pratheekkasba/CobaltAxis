"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"

const capabilities = [
  {
    id: "ai",
    number: "01",
    title: "AI & Intelligent Systems",
    icon: Brain,
    tagline: "Autonomous workflows & neural models that do real work.",
    outcome:
      "We build production-grade agentic pipelines, RAG systems, and custom automation that eliminate operational bottlenecks and deliver defensible intelligence.",
    features: [
      "Autonomous Agentic Workflows",
      "Retrieval-Augmented Generation (RAG)",
      "Model Fine-Tuning & Evaluation",
      "API & LLM Infrastructure",
    ],
    deliverable: "Working production model / microservice in < 4 weeks",
  },
  {
    id: "software",
    number: "02",
    title: "Software Engineering",
    icon: Cpu,
    tagline: "Scalable cloud architectures built for speed and resilience.",
    outcome:
      "Full-stack web applications, secure APIs, and distributed backends engineered to handle enterprise concurrency without breaking a sweat.",
    features: [
      "Distributed Cloud Architectures",
      "Type-Safe Next.js & Node / Go / Python",
      "Real-time Databases & State Sync",
      "Observability & Low-Latency Caching",
    ],
    deliverable: "Zero-downtime, fully audited cloud application",
  },
  {
    id: "experience",
    number: "03",
    title: "Digital Experiences",
    icon: Layers,
    tagline: "Ultra-fluid interfaces that turn visitors into believers.",
    outcome:
      "We design and build bespoke web interfaces with 60fps micro-animations, tactile micro-interactions, and pristine typography that command industry authority.",
    features: [
      "Dynamic GSAP & Lenis Smooth Motion",
      "Interactive 3D / WebGL Integration",
      "Accessible Design Systems",
      "Conversion & SEO Optimization",
    ],
    deliverable: "Award-caliber interactive web product",
  },
  {
    id: "research",
    number: "04",
    title: "Research & Experimentation",
    icon: Sparkles,
    tagline: "From frontier concepts to battle-tested working prototypes.",
    outcome:
      "De-risk big product bets before writing enterprise code. We test emerging technologies and validate hypotheses with functional, interactive proof-of-concepts.",
    features: [
      "Rapid Prototype Sprints",
      "Emerging Tech Feasibility Audits",
      "User Interaction Experiments",
      "Production Handover Roadmaps",
    ],
    deliverable: "Interactive click-through prototype & technical verdict",
  },
]

export const Capabilities = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <section id="services" className="relative my-32 sm:my-44">
      {/* Header */}
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-mono tracking-widest text-[#0052FF] dark:text-[#3b82f6] uppercase">
            <span className="size-1.5 rounded-full bg-[#0052FF] dark:bg-[#3b82f6]" />
            03 // WHAT WE DO
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tighter uppercase sm:text-5xl md:text-6xl font-[family-name:var(--font-heading)]">
            Engineering Capabilities.
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground font-mono">
          Four distinct specializations. Measurable outcomes over buzzwords.
        </p>
      </div>

      {/* Grid of 4 Capabilities */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {capabilities.map((item) => {
          const Icon = item.icon
          const isExpanded = activeTab === item.id

          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => setActiveTab(isExpanded ? null : item.id)}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-8 sm:p-10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,82,255,0.08)] backdrop-blur-sm cursor-pointer"
            >
              <div>
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground group-hover:text-blue-500 transition-colors">
                    {item.number}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-background/80 text-foreground transition-all duration-300 group-hover:border-blue-500/40 group-hover:text-blue-500 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">
                  {item.tagline}
                </p>

                {/* Outcome Statement */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.outcome}
                </p>

                {/* Feature Checklist */}
                <ul className="mt-6 space-y-2 border-t border-border/40 pt-6">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Deliverable Bar */}
              <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-mono text-muted-foreground">
                <span className="truncate pr-2">
                  Outcome:{" "}
                  <strong className="text-foreground font-semibold">
                    {item.deliverable}
                  </strong>
                </span>
                <span className="inline-flex items-center gap-1 text-blue-500 font-semibold group-hover:translate-x-1 transition-transform shrink-0">
                  Inspect <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
