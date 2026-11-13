import type { CSSProperties } from "react"

/*
 * S01 — Statement hero + proof strip.
 *
 * The page opens like supermemory.ai: one editorial promise sentence in
 * muted ink with the operative words pulled darker, followed by a row of
 * honest metric cards — real numbers with mono micro-labels, no
 * adjectives. The waveform under "Engine modules" is a live dot-bar viz
 * (pure CSS, reduced-motion safe), echoing the reference's tokens bar.
 */

const wave = [
  34, 56, 28, 62, 42, 30, 68, 50, 38, 74, 46, 60, 33, 66, 48, 36, 72, 52, 40,
  62, 32, 68, 44, 58, 30, 52,
]

const stats: Array<{
  title: string
  sub: string
  value: string
  unit: string
  wave?: boolean
}> = [
  {
    title: "Reply time",
    sub: "Per enquiry · a senior partner",
    value: "1",
    unit: "working day",
  },
  {
    title: "Delivery cadence",
    sub: "Each stage ends in a reviewable artifact",
    value: "5",
    unit: "stages",
  },
  {
    title: "Engine modules",
    sub: "One connected machine",
    value: "7",
    unit: "modules",
    wave: true,
  },
  {
    title: "Frame budget",
    sub: "Every interaction we ship",
    value: "16.6",
    unit: "ms / frame",
  },
]

export const ServicesHero = () => {
  return (
    <section aria-label="Services overview" className="mb-20 md:mb-28">
      <p className="section-reveal font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        <span aria-hidden className="mr-2 text-primary">
          ✦
        </span>
        Cobalt Axis — Services
      </p>

      {/* The promise — muted ink, operative words pulled dark. Demoted to a
          paragraph: the new <Hero/> owns the page's single <h1>. */}
      <p
        aria-label="Services overview promise"
        className="section-reveal mt-6 max-w-4xl text-4xl leading-[1.12] tracking-[-0.025em] font-medium text-muted-foreground font-[family-name:var(--font-display)] md:text-6xl md:leading-[1.06]"
      >
        Our promise is an operation that{" "}
        <span className="font-semibold text-foreground">runs itself</span> —
        the kind of automation you{" "}
        <span className="font-semibold text-foreground">
          measure in hours saved
        </span>
        , not the kind that demos well.
      </p>

      <p className="section-reveal mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        Seven engineering modules plugged into one intelligent engine — and
        six disciplines that build, wire and maintain it. Below: what each
        one is, how work moves through the machine, and the numbers we hold
        ourselves to.
      </p>

      <p className="section-reveal mt-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:text-[11px]">
        07 engine modules · 06 disciplines · 01 senior team
      </p>

      {/* Proof strip — metric cards in the reference's spec-card style. */}
      <dl className="section-reveal mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-border bg-card/40 px-6 py-7"
          >
            <dt>
              <span className="block text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                {stat.title}
              </span>
              <span className="mt-1.5 block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                {stat.sub}
              </span>
            </dt>
            <dd
              className={`mt-5 flex items-baseline gap-2 ${stat.wave ? "" : "min-h-[3.5rem] items-start"}`}
            >
              <span className="text-6xl leading-none tracking-[-0.03em] font-medium font-[family-name:var(--font-display)] tabular-nums">
                {stat.value}
              </span>
              <span className="text-lg text-muted-foreground">{stat.unit}</span>
            </dd>

            {stat.wave && (
              <div
                aria-hidden="true"
                className="mt-4 flex h-14 items-end gap-[3px]"
              >
                {wave.map((h, i) => (
                  <span
                    key={i}
                    style={
                      {
                        height: `${h}%`,
                        "--pd": `${(i % 6) * 0.18}s`,
                      } as CSSProperties
                    }
                    className="sv2-wave flex-1 rounded-[2px] bg-primary/85"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}

export default ServicesHero
