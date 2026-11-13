"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Section } from "./section"
import { ServiceCard } from "./service-card"

/*
 * S01 — Intelligent Engineering, the page's priority band.
 *
 * Four engineering systems as 16:9-art ServiceCards in a 2×2 grid. Scroll
 * reveal: cards fade-up once, staggered 80ms via parent variants —
 * transform/opacity only, skipped entirely for reduced-motion users.
 */

const systems = [
  {
    index: "01",
    title: "Intelligent Systems & Decision Engines",
    description:
      "Custom AI decision engines, predictive ML models, and neural processing architectures.",
    image: {
      src: "/images/services/02-intelligent-systems.webp",
      alt: "Isometric illustration of an AI processing facility — server racks feeding a central intelligence core",
    },
    chips: [
      "Real-time Data Pipelines",
      "ML Model Training & Deployment",
      "Computer Vision & NLP",
    ],
  },
  {
    index: "02",
    title: "Autonomous Workflows & AI Agents",
    description:
      "End-to-end task automation and multi-agent systems executing complex operations zero-ops.",
    image: {
      src: "/images/services/03-autonomous-workflows.webp",
      alt: "Isometric illustration of an automated data workflow system routing tasks between connected nodes",
    },
    chips: [
      "AI Agent Orchestration",
      "Document Automation",
      "Self-Healing System Workflows",
    ],
  },
  {
    index: "03",
    title: "Applied AI & RAG",
    description:
      "Vector databases and custom RAG architectures that allow AI to search and act on enterprise knowledge.",
    image: {
      src: "/images/services/04-applied-ai-rag.webp",
      alt: "Isometric illustration of a database search — vector retrieval over enterprise documents",
    },
    chips: [
      "Custom LLM Fine-Tuning",
      "RAG Knowledge Bases",
      "Enterprise Document Q&A",
    ],
  },
  {
    index: "04",
    title: "Cloud & AI Infrastructure",
    description:
      "Auto-scaling serverless backends designed for extreme compute performance and low latency.",
    image: {
      src: "/images/services/05-cloud-architectures.webp",
      alt: "Isometric illustration of server buildings on a floating island — cloud infrastructure",
    },
    chips: [
      "AWS / GCP Infrastructure",
      "Microservices",
      "High-Throughput API Gateway",
    ],
  },
]

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function IntelligentEngineering() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="intelligent-engineering"
      eyebrow="Intelligent Engineering"
      title="What we engineer."
      lead="Four practices, one connected core — everything a product needs to think, act, and scale."
      className="scroll-mt-24"
    >
      <motion.div
        variants={gridStagger}
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {systems.map((card) => (
          <motion.div key={card.index} variants={cardReveal} className="h-full">
            <ServiceCard {...card} className="h-full" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
