import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/page-header"
import { ServicesPillars } from "@/components/sections/services-pillars"
import { Services } from "@/components/sections/services"
import { ServicesProcess } from "@/components/sections/services-process"
import { ServicesCta } from "@/components/sections/services-cta"
import { CtaBand } from "@/components/sections/cta-band"
import { services } from "@/lib/constants/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three pillars, six disciplines, one senior team — applied AI, autonomous workflows, and product engineering carried from first sketch to production deploy.",
}

const ServicesPage = () => {
  return (
    <div className="mb-8">
      <PageHeader
        label="What we do"
        title="Six disciplines. One senior team."
        intro="One compact team carries your project the whole way — from the first moodboard to the last deploy. No handoffs between agencies, no lost context."
        meta={`${services.length} services`}
      />

      {/* The three pillars — what you get */}
      <ServicesPillars />

      {/* The disciplines — how we deliver it */}
      <Services />

      {/* The cadence — how it runs week to week */}
      <ServicesProcess />

      {/* Mid-page conversion moment */}
      <ServicesCta />

      <CtaBand
        title="Let's scope your project."
        sub="A senior partner replies within one working day — with a plan, not a pitch deck."
      />
    </div>
  )
}

export default ServicesPage
