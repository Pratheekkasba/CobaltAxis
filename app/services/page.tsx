import type { Metadata } from "next"
import { Hero } from "@/components/services/hero"
import { IntelligentEngineering } from "@/components/services/intelligent-engineering"
import { DesignBuild } from "@/components/services/design-build"
import { HighVelocity } from "@/components/services/high-velocity"
import { ServicesHero } from "@/components/sections/services-hero"
import { ServicesModules } from "@/components/sections/services-modules"
import { Services } from "@/components/sections/services"
import { ServicesGuardrails } from "@/components/sections/services-guardrails"
import { ServicesProcess } from "@/components/sections/services-process"
import { ServicesFaq } from "@/components/sections/services-faq"
import { ServicesCta } from "@/components/sections/services-cta"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  title: "Services",
  description:
    "One intelligent engine, seven modules — applied AI, autonomous workflows, RAG, cloud, 60fps apps — delivered by six design-and-build disciplines and one senior team.",
}

const ServicesPage = () => {
  return (
    <div className="mb-8">
      {/* S00 — The engineered-intelligence hero */}
      <Hero />

      {/* S01 — Intelligent engineering: the four system cards */}
      <IntelligentEngineering />

      {/* S02 — Design & build, the secondary pillar */}
      <DesignBuild />

      {/* S03 — High velocity: the dark contrast band */}
      <HighVelocity />

      {/* S04 — The promise, plus the proof strip */}
      <ServicesHero />

      {/* S05 — The intelligent engine deep dive: modules + Figure 1 */}
      <ServicesModules />

      {/* S06 — Design & build, the six disciplines */}
      <Services />

      {/* S07 — Guardrails you never have to think about */}
      <ServicesGuardrails />

      {/* S08 — The cadence: waterfall + stage rail */}
      <ServicesProcess />

      {/* S09 — The hard questions */}
      <ServicesFaq />

      {/* S10 — Scoping-call band */}
      <ServicesCta />

      <CtaBand
        title="Let's scope your project."
        sub="A senior partner replies within one working day — with a plan, not a pitch deck."
      />
    </div>
  )
}

export default ServicesPage
