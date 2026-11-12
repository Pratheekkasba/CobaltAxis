import {
  Code2,
  Compass,
  PenTool,
  RefreshCw,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  n: string
  title: string
  desc: string
  icon: LucideIcon
  /** Detailed deliverables shown on the /services page. */
  points: string[]
}

export const services: Service[] = [
  {
    n: "01",
    title: "Art Direction",
    desc: "Every engagement starts with a point of view. We define the visual language, mood, and creative direction everything is built on.",
    icon: Compass,
    points: ["Visual language", "Moodboards & styleframes", "Creative direction"],
  },
  {
    n: "02",
    title: "Brand Strategy",
    desc: "Positioning, narrative, and identity systems that make ambitious brands impossible to ignore.",
    icon: Target,
    points: ["Positioning & narrative", "Identity systems", "Brand guidelines"],
  },
  {
    n: "03",
    title: "Web Design",
    desc: "Editorial, conversion-focused interfaces designed pixel by pixel for clarity and impact.",
    icon: PenTool,
    points: ["Wireframes to hi-fi", "Design systems", "Responsive layouts"],
  },
  {
    n: "04",
    title: "Development",
    desc: "Fast, accessible, production-grade builds in modern React, Next.js, and headless stacks.",
    icon: Code2,
    points: ["Next.js & React", "Headless CMS", "Performance budgets"],
  },
  {
    n: "05",
    title: "Motion Design",
    desc: "Purposeful animation and interaction that give the product life and guide the eye.",
    icon: Sparkles,
    points: ["Scroll storytelling", "Micro-interactions", "Loading choreography"],
  },
  {
    n: "06",
    title: "Maintenance",
    desc: "We don't disappear at launch. Ongoing iteration, monitoring, and support keep the work sharp as you grow.",
    icon: RefreshCw,
    points: ["Ongoing iteration", "Monitoring & fixes", "Growth experiments"],
  },
]
