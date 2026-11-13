import { services } from "@/lib/constants/services"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

/*
 * S03 — Design & build: the six disciplines that assemble the engine.
 * Rendered in the reference's "What we do" rhythm: a solid cobalt tile
 * with a hand-drawn generative mark, a bold statement, a body paragraph
 * and the mono deliverable chips. The capability ticker above keeps the
 * page always moving (CSS marquee, reduced-motion safe). No JS — static
 * markup with the shared CSS view()-timeline reveal.
 */

/** One-off generative marks, drawn as single-path squiggles (±12 box). */
const marks: Record<string, React.ReactNode> = {
  "01": (
    <>
      <circle cx="0" cy="0" r="8.6" />
      <path d="M -6.5 6.5 L 7 -7.5 M -2 -9 L 3 9" opacity="0.7" />
    </>
  ),
  "02": (
    <>
      <circle cx="0" cy="0" r="9" opacity="0.55" />
      <path d="M -5.6 -5.6 A 8 8 0 0 1 5.6 -5.6" />
      <circle cx="0" cy="0" r="2.6" fill="currentColor" stroke="none" />
    </>
  ),
  "03": (
    <>
      <path d="M -10 6 C -4 -8, 2 12, 9 -4" />
      <path d="M -10 -1 C -4 -12, 4 4, 10 -9" opacity="0.55" />
    </>
  ),
  "04": (
    <>
      <path d="M -4.5 -8 L -9 0 L -4.5 8" />
      <path d="M 4.5 -8 L 9 0 L 4.5 8" />
      <path d="M 1.5 -9 L -1.5 9" opacity="0.7" />
    </>
  ),
  "05": (
    <path
      d="M 0 -9.5 L 2.4 -2.4 L 9.5 0 L 2.4 2.4 L 0 9.5 L -2.4 2.4 L -9.5 0 L -2.4 -2.4 Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  "06": (
    <>
      <path d="M 8.5 -2 A 9 9 0 1 0 9 2" />
      <path d="M 9 -5.5 L 8.7 -1.6 L 4.9 -2.4" />
    </>
  ),
}

const tickerTerms = [
  "Art Direction",
  "Brand Strategy",
  "Web Design",
  "Development",
  "Motion Design",
  "Maintenance",
  "Custom AI Agents",
  "Workflow Orchestration",
  "60fps Interfaces",
  "Cloud Systems",
]

const TickerGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {tickerTerms.map((term, index) => (
      <li key={term} className="flex items-center gap-2.5 pr-4 whitespace-nowrap">
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.1em] uppercase xl:text-[11px]",
            index % 2 === 0 ? "text-foreground/75" : "text-muted-foreground",
          )}
        >
          {term}
        </span>
        <span aria-hidden className="text-primary/70">
          ✦
        </span>
      </li>
    ))}
  </ul>
)

export const Services = () => {
  return (
    <section id="disciplines" className="relative mb-24 md:mb-32">
      {/* Capability ticker */}
      <div className="section-reveal services-marquee relative mb-14 overflow-hidden border-y border-border py-5 md:mb-16">
        <div className="services-marquee-fade">
          <div className="services-marquee-track flex w-max">
            <TickerGroup />
            <TickerGroup hidden />
          </div>
        </div>
      </div>

      <div className="section-reveal">
        <SectionHeading
          label="Design & build"
          title="How we deliver."
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        One compact team carries your project the whole way — from the first
        moodboard to the last deploy. No handoffs between agencies, no lost
        context.
      </p>

      {/* Discipline list — tile + statement + deliverables. */}
      <ul className="border-t border-border">
        {services.map((service) => (
          <li key={service.n}>
            <article className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-b border-border px-1 py-8 transition-colors duration-300 hover:bg-secondary/40 sm:gap-x-7 md:py-10">
              {/* Cobalt tile with the generative mark. */}
              <span className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,white_25%,transparent)] transition-transform duration-300 group-hover:scale-[1.06] sm:size-16">
                <svg
                  role="img"
                  aria-label={`${service.title} mark`}
                  viewBox="-13 -13 26 26"
                  className="sv2-mark size-7 sm:size-8"
                >
                  {marks[service.n]}
                </svg>
              </span>

              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-medium tracking-[-0.015em] font-[family-name:var(--font-display)] md:text-[1.7rem]">
                    {service.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {service.n}
                  </span>
                </div>

                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {service.desc}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Services
