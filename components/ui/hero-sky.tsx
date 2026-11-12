import { SparkleMark } from "./sparkle"

// Full-bleed sky backdrop for the hero: a soft tinted gradient that reaches
// up behind the fixed nav, with sparkles along the sides. Purely decorative
// (pointer-events off, hidden from assistive tech). Reusable on any page
// that wants the sky treatment.
export const HeroSky = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Tinted gradient — bleeds above the section so it sits behind the nav */}
      <div className="hero-sky absolute top-[-7rem] left-1/2 h-[calc(100%+7rem)] w-screen -translate-x-1/2" />

      {/* Sparkles */}
      <SparkleMark className="absolute top-[27%] left-[20%] w-3.5 text-primary opacity-70" />
      <SparkleMark className="absolute top-[18%] right-[19%] w-3 text-primary opacity-70" />
      <SparkleMark className="absolute top-[6%] right-[38%] w-3 text-primary opacity-50" />

      {/* Film grain — print texture, no banding */}
      <div className="film-grain absolute -top-28 right-0 bottom-0 left-0" />
    </div>
  )
}
