export type ProcessStep = {
  step: string
  title: string
  sub: string
  description: string
  artifact: string
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    sub: "Deconstruct the core problem",
    description:
      "We interrogate requirements down to first principles. Before designing or writing code, we map data paths, edge failure modes, and user friction points.",
    artifact: "Technical spec & architecture blueprint",
  },
  {
    step: "02",
    title: "Design",
    sub: "Architect systems & tactile interfaces",
    description:
      "We design state models, API contracts, and fluid visual systems simultaneously. Every interface interaction has intentional physics and purpose.",
    artifact: "Interactive high-fidelity prototype",
  },
  {
    step: "03",
    title: "Engineer",
    sub: "Production rigor & zero-bloat execution",
    description:
      "Modern full-stack implementation with clean abstractions, strict TypeScript, efficient queries, and automated testing pipelines.",
    artifact: "Audited, versioned repository",
  },
  {
    step: "04",
    title: "Validate",
    sub: "Stress testing & benchmark verification",
    description:
      "Real-world concurrency loads, accessibility checks, 60fps frame rate benchmarks, and security audits to ensure unbroken reliability.",
    artifact: "Performance & security audit report",
  },
  {
    step: "05",
    title: "Evolve",
    sub: "Telemetry, optimization & scale",
    description:
      "Software is a living organism. We instrument telemetry, gather user signals, and deploy iterative enhancements that compound over time.",
    artifact: "Live telemetry & iteration cadence",
  },
]
