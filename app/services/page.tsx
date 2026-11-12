import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/page-header"
import { ServicesEngine } from "@/components/sections/services-engine"
import { Services } from "@/components/sections/services"
import { ServicesProcess } from "@/components/sections/services-process"
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
      <PageHeader
        label="What we do"
        title="The intelligent engine, and the team that builds it."
        intro="Seven engineering modules plugged into one machine — the engine runs your operation, and the disciplines below build, wire and maintain it."
        meta="07 modules · 06 disciplines"
      />

      {/* S01 — The intelligent engine (priority) */}
      <ServicesEngine />

      {/* S02 — Design & build, the six disciplines */}
      <Services />

      {/* S03 — The cadence */}
      <ServicesProcess />

      {/* S04 — Mid-page conversion moment */}
      <ServicesCta />

      <CtaBand
        title="Let's scope your project."
        sub="A senior partner replies within one working day — with a plan, not a pitch deck."
      />
    </div>
  )
}

export default ServicesPage
