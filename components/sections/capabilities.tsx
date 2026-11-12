import Image from "next/image"
import { SectionHeading } from "./section-heading"

/*
 * Section 04 — the three architectural pillars, presented as an editorial
 * Swiss layout: spacious horizontal showcases separated by hairlines, each
 * pairing a numbered text column (kicker, heading, description, 2x2 spec
 * matrix) with a large framed isometric illustration whose technical frame
 * annotations continue the metadata voice from Section 02.
 *
 * All motion is CSS: rows reveal on scroll (shared view() timeline rule) and
 * the illustration lifts slightly while the row is hovered. Everything is
 * disabled under prefers-reduced-motion.
 */

const pillars = [
  {
    n: "01",
    kicker: "Applied AI",
    sys: "SYS.01 // CONTEXT_RAG_ENGINE",
    fig: "FIG 03.1 // RAG_CONTEXT_GRAPH",
    tag: "Autonomous Execution",
    title: "AI Agents & Knowledge Engines",
    description:
      "Systems that reason over your business knowledge, understand context, and execute multi-step tasks autonomously.",
    capabilities: [
      "Custom AI Agents",
      "Production RAG Pipelines",
      "Enterprise Knowledge Search",
      "Automated Decisioning",
    ],
    image: "/images/capabilities-agents.png",
    alt: "Isometric illustration of an AI core and vector memory hub — a multi-tiered computing structure with a cobalt processing core, connected to knowledge vaults and agent terminals by dashed data pathways.",
    reversed: false,
  },
  {
    n: "02",
    kicker: "Process Orchestration",
    sys: "SYS.02 // AUTONOMOUS_PIPELINE",
    fig: "FIG 03.2 // ORCHESTRATION_BUS",
    tag: "Event-Driven Pipeline",
    title: "Autonomous Workflows",
    description:
      "Event-driven pipelines that connect your apps, databases, and teams, eliminating repetitive manual handoffs.",
    capabilities: [
      "End-to-End Automation",
      "Custom API Integrations",
      "Human-in-the-Loop Flows",
      "Real-Time Data Sync",
    ],
    image: "/images/capabilities-workflows.png",
    alt: "Isometric illustration of an autonomous pipeline — three automation stations linked by cobalt data bridges carrying data cubes, with an elevated workflow display screen.",
    reversed: true,
  },
  {
    n: "03",
    kicker: "Product Engineering",
    sys: "SYS.03 // CLOUD_PRODUCT_STACK",
    fig: "FIG 03.3 // CLOUD_UI_INFRASTRUCTURE",
    tag: "Production-Grade Stack",
    title: "Web Apps & Cloud Systems",
    description:
      "High-performance digital products and resilient cloud infrastructure designed to evolve with your business.",
    capabilities: [
      "Full-Stack Web Apps",
      "High-Concurrency Backends",
      "Cloud & DevOps Architecture",
      "Internal Tools & Portals",
    ],
    image: "/images/capabilities-products.png",
    alt: "Isometric illustration of a cloud and product engineering complex — server modules, wireframe interface panels and deployment towers linked by data pathways.",
    reversed: false,
  },
]

const FeatureFrame = ({
  image,
  alt,
}: {
  image: string
  alt: string
}) => (
  <figure className="relative overflow-hidden rounded-[1.5rem] border border-border bg-secondary dark:border-transparent dark:bg-[#f4f5f8]">
    <div className="capability-float relative aspect-[4/3]">
      <Image
        src={image}
        alt={alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 55vw, 92vw"
        className="object-contain p-6 sm:p-10 lg:p-12"
        draggable={false}
      />
    </div>
  </figure>
)

export const Capabilities = () => {
  return (
    <section id="capabilities" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="Section 04 / Capabilities"
          title="Three pillars. One connected stack."
          // Long title + mono index fight for one line between md and xl, so
          // the index stacks below the heading until the full row fits.
          indexInlineFrom="xl"
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg xl:-mt-10">
        From context-aware AI agents to 60fps digital products, we engineer the
        systems that power modern operations.
      </p>

      {pillars.map((pillar) => (
        <article
          key={pillar.n}
          className="capabilities-row section-reveal relative grid grid-cols-1 gap-10 border-t border-border py-14 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20 xl:gap-20"
        >
          {/* Text column — first in DOM, so mobile stacks copy above art */}
          <div
            className={`lg:col-span-5 ${
              pillar.reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <p className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              <span
                aria-hidden
                className="capability-dot size-1.5 rounded-full bg-primary"
              />
              <span className="text-primary/70">{pillar.n}</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>{pillar.kicker}</span>
            </p>

            <h3 className="mt-5 text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-[2.25rem] md:leading-[1.15]">
              {pillar.title}
            </h3>

            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>

            {/* 2x2 architectural spec matrix — hairline cells, no pills.
                The text column is only ~370px wide between lg and xl, too
                narrow for two ~230px cells, so the matrix drops to a single
                hairline column there and returns to 2x2 at xl. */}
            <ul className="capability-matrix mt-8 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {pillar.capabilities.map((capability, index) => (
                <li key={capability} className="capability-cell">
                  <span className="capability-cell-num font-mono text-[10px] tracking-[0.08em] text-primary/80">
                    {`0${index + 1}`}
                  </span>
                  <span className="text-sm leading-snug font-medium text-foreground">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Art column */}
          <div
            className={`lg:col-span-7 ${
              pillar.reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <FeatureFrame
              image={pillar.image}
              alt={pillar.alt}
            />
          </div>
        </article>
      ))}
    </section>
  )
}

export default Capabilities
