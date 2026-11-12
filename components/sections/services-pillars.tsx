"use client"

import { SectionHeading } from "./section-heading"

/*
 * The three pillars from the homepage stack, reframed here as engagement
 * outcomes. Each card names the disciplines (indexed further down the page)
 * that feed it, so the page reads as one system: pillars are what you get,
 * disciplines are how we run it. Entrance motion is the shared CSS
 * scroll-driven reveal (view() timeline) — reduced-motion safe, no JS.
 */

const pillars = [
  {
    n: "01",
    sys: "PILLAR.01 // AI_SYSTEMS",
    title: "AI Agents & Knowledge Engines",
    desc: "Autonomous systems that reason over your business knowledge, understand context, and execute multi-step work with guardrails.",
    chips: ["Custom AI Agents", "Applied RAG", "Decision Copilots"],
    via: ["Development", "Maintenance"],
  },
  {
    n: "02",
    sys: "PILLAR.02 // AUTONOMOUS_OPERATIONS",
    title: "Autonomous Workflows",
    desc: "Event-driven pipelines that connect your apps, data, and teams — eliminating repetitive manual handoffs end to end.",
    chips: ["Workflow Orchestration", "API & Data Pipelines", "Human-in-the-loop"],
    via: ["Development", "Motion Design"],
  },
  {
    n: "03",
    sys: "PILLAR.03 // PRODUCT_CLOUD",
    title: "Web Apps & Cloud Systems",
    desc: "High-performance digital products and resilient cloud infrastructure that carry the brand at 60fps.",
    chips: ["Full-Stack Web Apps", "Cloud & DevOps", "Internal Tools"],
    via: ["Art Direction", "Web Design", "Motion Design"],
  },
] as const

export const ServicesPillars = () => {
  return (
    <section id="pillars" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading label="The three pillars" title="What we build." />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        Every engagement lands on one of three pillars. The six disciplines
        below are how each one ships.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {pillars.map((pillar) => (
          <article
            key={pillar.n}
            className="section-reveal group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_color-mix(in_srgb,var(--primary)_28%,transparent)] md:p-7 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {/* Glow dot — ignites on hover, the card's "system live" marker. */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-6 size-1.5 rounded-full bg-border transition-colors duration-300 group-hover:bg-primary group-hover:shadow-[0_0_10px_2px_color-mix(in_srgb,var(--primary)_50%,transparent)]"
            />

            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {pillar.sys}
            </p>

            <h3 className="mt-4 max-w-[16ch] text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-[1.3rem] md:leading-[1.2]">
              {pillar.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {pillar.desc}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {pillar.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-border pt-4 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              Delivered via{" "}
              <span className="text-foreground">{pillar.via.join(" · ")}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesPillars
