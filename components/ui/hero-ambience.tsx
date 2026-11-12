import { SparkleMark } from "./sparkle"

// Four-point star used for the ambient sparkles. Kept inline so the hero adds
// no image weight and every mark inherits the current color.
const Sparkle = ({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <path
      d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.8-12 12-.9-7.2-4.8-11.1-12-12C7.2 11.1 11.1 7.2 12 0Z"
      fill="currentColor"
    />
  </svg>
)

/*
 * Ambient hero decoration: five four-point sparkles, four glowing dots and
 * three technical cross marks — the same set as before, repositioned into a
 * strict exclusion zone around the copy.
 *
 * Every mark is anchored at a fixed distance from the hero's horizontal centre
 * line (`50% ± D`), so its clearance from the text never depends on the
 * viewport width. The copy spans at most ~±29rem from that centre (the
 * two-line display headline), so marks inside the headline's own vertical band
 * sit at 38rem — beyond anything the headline can render — while marks above
 * the eyebrow and below the CTAs (whose rows never reach past ~±15rem) sit at
 * 17.5rem+. Marks that do not fit simply fall outside this clipping layer and
 * never render, so phones keep only the corner sparkle above the copy. Float
 * amplitudes stay ≤10px, well inside every clearance.
 */
export const HeroAmbience = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden select-none"
  >
    <div className="hero-ambient-glow" />

    {/* Four-point sparkles — outer margins only */}
    <Sparkle
      className="hero-particle absolute top-[13%] left-[calc(50%_-_20rem)] size-4 text-primary/25"
      style={
        {
          "--dur": "22s",
          "--delay": "-2s",
          "--dx": "5px",
          "--dy": "-10px",
          "--o-min": "0.1",
          "--o-max": "0.25",
        } as React.CSSProperties
      }
    />
    <Sparkle
      className="hero-particle absolute top-[17%] right-[calc(50%_-_17.5rem)] size-2.5 text-primary/30"
      style={
        {
          "--dur": "16s",
          "--delay": "-6s",
          "--dx": "-4px",
          "--dy": "-7px",
          "--o-min": "0.12",
          "--o-max": "0.3",
        } as React.CSSProperties
      }
    />
    {/* The one phone-visible mark: a corner sparkle above the copy. */}
    <Sparkle
      className="hero-particle absolute top-[14%] right-[7%] size-3 text-primary/30 sm:hidden"
      style={
        {
          "--dur": "18s",
          "--delay": "-3s",
          "--dx": "4px",
          "--dy": "-8px",
          "--o-min": "0.12",
          "--o-max": "0.28",
        } as React.CSSProperties
      }
    />
    <Sparkle
      className="hero-particle absolute bottom-[19%] left-[calc(50%_-_19rem)] size-3.5 text-primary/25"
      style={
        {
          "--dur": "24s",
          "--delay": "-4s",
          "--dx": "7px",
          "--dy": "-9px",
          "--o-min": "0.08",
          "--o-max": "0.22",
        } as React.CSSProperties
      }
    />
    <Sparkle
      className="hero-particle absolute bottom-[15%] right-[calc(50%_-_21rem)] size-4 text-primary/25"
      style={
        {
          "--dur": "20s",
          "--delay": "-8s",
          "--dx": "-6px",
          "--dy": "-10px",
          "--o-min": "0.09",
          "--o-max": "0.25",
        } as React.CSSProperties
      }
    />

    {/* Glowing cobalt dots */}
    <span
      className="hero-particle-dot absolute top-[24%] left-[calc(50%_-_26rem)] size-1 rounded-full bg-primary/50"
      style={{ "--dur": "14s", "--delay": "-2s" } as React.CSSProperties}
    />
    <span
      className="hero-particle-dot absolute top-[66%] right-[calc(50%_-_24rem)] size-1.5 rounded-full bg-primary/40"
      style={{ "--dur": "18s", "--delay": "-5s" } as React.CSSProperties}
    />
    <span
      className="hero-particle-dot absolute bottom-[27%] left-[calc(50%_-_26rem)] size-1 rounded-full bg-primary/40"
      style={{ "--dur": "16s", "--delay": "-7s" } as React.CSSProperties}
    />
    <span
      className="hero-particle-dot absolute top-[42%] right-[calc(50%_-_38rem)] size-1 rounded-full bg-primary/35"
      style={{ "--dur": "20s", "--delay": "-4s" } as React.CSSProperties}
    />

    {/* Technical cross marks */}
    <SparkleMark
      className="hero-particle absolute top-[43%] left-[calc(50%_-_38rem)] w-2.5 text-primary/15"
      style={
        {
          "--dur": "26s",
          "--delay": "-3s",
          "--dx": "4px",
          "--dy": "-5px",
          "--o-min": "0.1",
          "--o-max": "0.2",
        } as React.CSSProperties
      }
    />
    <SparkleMark
      className="hero-particle absolute bottom-[37%] right-[calc(50%_-_38rem)] w-3 text-primary/12"
      style={
        {
          "--dur": "28s",
          "--delay": "-9s",
          "--dx": "-4px",
          "--dy": "-6px",
          "--o-min": "0.08",
          "--o-max": "0.18",
        } as React.CSSProperties
      }
    />
    <SparkleMark
      className="hero-particle absolute bottom-[11%] left-[calc(50%_-_30rem)] w-2 text-primary/10"
      style={
        {
          "--dur": "24s",
          "--delay": "-6s",
          "--dx": "5px",
          "--dy": "6px",
          "--o-min": "0.07",
          "--o-max": "0.16",
        } as React.CSSProperties
      }
    />
  </div>
)
