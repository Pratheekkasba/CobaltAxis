export type EngineModule = {
  /** Deck index (08–14). */
  n: string
  /** Stable key, also drives the engine-node highlight. */
  key: string
  /** Mono system label shown on wide screens. */
  sys: string
  title: string
  tagline: string
  chips: string[]
  /** Where the module lives in the engine diagram: the core, or an orbit. */
  orbit: "core" | "outer" | "inner"
  /** Position on its orbit, degrees (0 = right, 90 = down). */
  angle: number
}

/*
 * The Intelligent Engineering group from the services deck, presented as
 * one engine with seven modules. 08 is the core; the other six ride two
 * orbital rails in the diagram. Copy is the studio voice — outcome first,
 * deliverables as chips.
 */
export const engineModules: EngineModule[] = [
  {
    n: "08",
    key: "systems",
    sys: "INTELLIGENT_SYSTEMS",
    title: "Intelligent Systems",
    tagline:
      "The core. Agents and copilots that reason over your business knowledge and make governed decisions — with guardrails, not guesswork.",
    chips: ["Custom AI Agents", "Decision Copilots", "Guardrails & Evals"],
    orbit: "core",
    angle: 0,
  },
  {
    n: "09",
    key: "workflows",
    sys: "AUTONOMOUS_WORKFLOWS",
    title: "Autonomous Workflows",
    tagline:
      "Event-driven pipelines that move work between your apps, databases and teams — repetitive handoffs eliminated end to end.",
    chips: ["Workflow Orchestration", "API & Data Pipelines", "Human-in-the-Loop"],
    orbit: "outer",
    angle: 195,
  },
  {
    n: "10",
    key: "rag",
    sys: "APPLIED_AI_RAG",
    title: "Applied AI & RAG",
    tagline:
      "Production retrieval. Your documents, policies and data become answers your team can trust — grounded, cited, fast.",
    chips: ["RAG Pipelines", "Knowledge Search", "Grounded Answers"],
    orbit: "inner",
    angle: 60,
  },
  {
    n: "11",
    key: "cloud",
    sys: "CLOUD_ARCHITECTURES",
    title: "Cloud Architectures",
    tagline:
      "Infrastructure that scales under load and survives failure by design — sized right, monitored, cheaper to run than to babysit.",
    chips: ["DevOps Architecture", "High-Concurrency Backends", "Failover Patterns"],
    orbit: "outer",
    angle: 15,
  },
  {
    n: "12",
    key: "fps",
    sys: "60FPS_WEB_APPS",
    title: "60 FPS Web Apps",
    tagline:
      "Products engineered to a frame budget. Every interaction under 16.6ms, every load under a second — speed as a feature.",
    chips: ["Full-Stack Apps", "Performance Budgets", "Loading Choreography"],
    orbit: "outer",
    angle: 285,
  },
  {
    n: "13",
    key: "prototypes",
    sys: "RESEARCH_PROTOTYPES",
    title: "Research Prototypes",
    tagline:
      "Working experiments in days, not decks. De-risk the idea before you fund the build — feasibility, proven.",
    chips: ["Feasibility Spikes", "Working Prototypes", "Demo Builds"],
    orbit: "inner",
    angle: 180,
  },
  {
    n: "14",
    key: "velocity",
    sys: "HIGH_VELOCITY_UI",
    title: "High-Velocity UI",
    tagline:
      "Interfaces tuned for reaction speed — motion systems, micro-interactions and telemetry that make the product feel alive.",
    chips: ["Motion Systems", "Micro-interactions", "Interaction Telemetry"],
    orbit: "outer",
    angle: 105,
  },
]
