import { SectionHeading } from "./section-heading"
import { EcosystemArt } from "@/components/ui/ecosystem-art"
import { DeploymentTargets } from "@/components/ui/deployment-targets"
import { cn } from "@/lib/utils"

/*
 * Section 02 — the intelligent engineering ecosystem.
 *
 * The supplied isometric artwork is the centre of a six-capability map. Labels
 * are real HTML (never baked into the image), placed around the artwork on
 * desktop and stacked beneath it on mobile. Deployment targets and the marquee
 * strip sit cleanly below the illustration.
 */

const capabilities = [
  { n: "01", title: "Autonomous AI Agents", area: "eco-l1", side: "left" },
  { n: "02", title: "Applied RAG & Search", area: "eco-l2", side: "left" },
  { n: "03", title: "Workflow Orchestration", area: "eco-l3", side: "left" },
  { n: "04", title: "Full-Stack Web Apps", area: "eco-r1", side: "right" },
  { n: "05", title: "Cloud Infrastructure", area: "eco-r2", side: "right" },
  { n: "06", title: "API & Data Pipelines", area: "eco-r3", side: "right" },
]

/*
 * Concrete engineering terms — they complement the six capability titles
 * above (which name the practices) rather than repeating them.
 */
const capabilityTerms = [
  "Autonomous Agents",
  "RAG Pipelines",
  "Cloud Architecture",
  "LLM Orchestration",
  "Full-Stack Systems",
  "API Infrastructure",
]

// Four-point separator star — the same mark that drifts through the hero
// ambience, so the capability strip and the hero read as one system.
const MarqueeStar = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className="size-2 shrink-0 text-primary/45"
  >
    <path
      d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.8-12 12-.9-7.2-4.8-11.1-12-12C7.2 11.1 11.1 7.2 12 0Z"
      fill="currentColor"
    />
  </svg>
)

/*
 * One copy of the capability strip. Spacing is sized so the six terms fit a
 * single centered line at ≥1024px viewports (the mono advance width makes the
 * fit exact), which is also how the reduced-motion fallback renders. The gap
 * lives on the item's trailing edge (not the list) so the loop seam between
 * the two copies keeps the same rhythm as the interior.
 */
const MarqueeGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {capabilityTerms.map((item, index) => (
      <li key={item} className="flex items-center gap-2.5 pr-4 whitespace-nowrap">
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.1em] uppercase xl:text-[11px]",
            index % 2 === 0 ? "text-foreground/75" : "text-muted-foreground"
          )}
        >
          {item}
        </span>
        <MarqueeStar />
      </li>
    ))}
  </ul>
)

export const Ecosystem = () => {
  return (
    <section id="ecosystem" className="relative mb-28 md:mb-36">
      <div className="ecosystem-reveal">
        <SectionHeading
          label="Section 02 / Architecture"
          title="Built to run in production."
        />
      </div>

      <p className="ecosystem-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:-mt-10 md:mb-16 md:text-lg">
        We bring custom AI agents, internal business data, and cloud
        infrastructure together into one connected system, so automation moves
        beyond demos and becomes how your business operates.
      </p>

      <div className="ecosystem-reveal relative">
        <div aria-hidden className="ecosystem-halo" />

        <div className="ecosystem-grid relative">
          <div className="eco-art">
            <EcosystemArt />
          </div>

          {capabilities.map((capability) => (
            <div
              key={capability.n}
              className={`ecosystem-label ecosystem-label-${capability.side} ${capability.area}`}
            >
              <span className="ecosystem-label-num font-mono text-[10px] tracking-[0.2em] text-primary/80">
                {capability.n}
              </span>
              <span className="ecosystem-label-title text-[15px] leading-snug font-medium tracking-[-0.01em] text-foreground">
                {capability.title}
              </span>
              <span aria-hidden className="ecosystem-connector" />
            </div>
          ))}
        </div>
      </div>

      <div className="ecosystem-reveal">
        <DeploymentTargets />
      </div>

      <div className="ecosystem-reveal mt-10">
        <div className="ecosystem-marquee relative overflow-hidden border-y border-border py-5">
          <div className="ecosystem-marquee-fade">
            <div className="ecosystem-marquee-track flex w-max">
              <MarqueeGroup />
              <MarqueeGroup hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ecosystem
