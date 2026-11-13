import type { Metadata } from "next"
import { Hero } from "@/components/services/hero"
import { IntelligentEngineering } from "@/components/services/intelligent-engineering"
import { DesignBuild } from "@/components/services/design-build"
import { HighVelocity } from "@/components/services/high-velocity"
import { FinalCTA } from "@/components/services/final-cta"

const SITE_URL = "https://cobaltaxis.in"

export const metadata: Metadata = {
  title: "Services — AI Engineering & Automation",
  description:
    "Autonomous workflows, applied AI & RAG, cloud architectures and 60 FPS web apps — designed, built and maintained end to end by one senior team.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — AI Engineering & Automation | Cobalt Axis",
    description:
      "Autonomous workflows, applied AI & RAG, cloud architectures and 60 FPS web apps — designed, built and maintained end to end by one senior team.",
    url: "/services",
    siteName: "Cobalt Axis",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/01-hero-hq.webp",
        width: 1600,
        height: 893,
        alt: "Isometric illustration of the Cobalt Axis campus wired to server racks by glowing circuit paths",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — AI Engineering & Automation | Cobalt Axis",
    description:
      "Autonomous workflows, applied AI & RAG, cloud architectures and 60 FPS web apps — designed, built and maintained end to end by one senior team.",
    images: ["/images/services/01-hero-hq.webp"],
  },
}

/** Structured data: the studio (Organization) and its services (Service). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Cobalt Axis",
      url: SITE_URL,
      email: "hello@cobaltaxis.in",
      logo: `${SITE_URL}/images/services/01-hero-hq.webp`,
      description:
        "Senior design-and-build studio engineering AI systems, automation and high-velocity web products.",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/services#service`,
      name: "AI Engineering & Product Build Services",
      serviceType:
        "AI automation, applied AI, cloud architecture and web engineering",
      description:
        "Autonomous workflows, applied AI & RAG, cloud architectures and 60 FPS web apps — designed, built and maintained end to end by one senior team.",
      provider: { "@id": `${SITE_URL}/#org` },
      areaServed: "Worldwide",
      url: `${SITE_URL}/services`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering practices",
        itemListElement: [
          "Intelligent Systems & Decision Engines",
          "Autonomous Workflows & AI Agents",
          "Applied AI & RAG",
          "Cloud & AI Infrastructure",
          "60 FPS Web Apps",
          "High-Velocity UI & Rapid Sprint",
          "Research Prototypes (R&D)",
          "Continuous Maintenance & Monitoring",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
}

const ServicesPage = () => {
  return (
    <div className="mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* S00 — The engineered-intelligence hero */}
      <Hero />

      {/* S01 — Intelligent engineering: the four system cards */}
      <IntelligentEngineering />

      {/* S02 — Design & build, the secondary pillar */}
      <DesignBuild />

      {/* S03 — High velocity: the speed-numbers band */}
      <HighVelocity />

      {/* S04 — Final CTA: start a project / book a call */}
      <FinalCTA />
    </div>
  )
}

export default ServicesPage
