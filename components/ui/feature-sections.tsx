"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/sections/section-heading"
import { ListingsScene, SalonScene, SearchScene } from "@/components/ui/feature-art"

/*
 * Feature section — what every Cobalt Axis build ships with. Adapted from the
 * "feature cards" pattern: three image-led cards under a section heading.
 * The images are hand-built isometric dioramas (not stock art) in the same
 * visual language as the hero city, and the copy speaks to the two audiences
 * we serve: salon owners and real-estate owners.
 */
const features = [
  {
    n: "01",
    kicker: "Bookings",
    title: "Your calendar fills itself",
    desc: "Clients book and pay a deposit in three taps, with reminders on autopilot. Chairs stay full while you're mid-cut.",
    Art: SalonScene,
  },
  {
    n: "02",
    kicker: "Listings",
    title: "Properties that sell themselves",
    desc: "Photo-led listing pages with maps, floor plans and one-tap enquiries. Buyers arrive already half-sold.",
    Art: ListingsScene,
  },
  {
    n: "03",
    kicker: "Local search",
    title: "Found first, every time",
    desc: "Fast, mobile-first pages wired for local search. When someone nearby searches, you're the first name they see.",
    Art: SearchScene,
  },
]

export const FeatureSections = () => {
  return (
    <section id="features" className="relative mb-28 md:mb-36">
      <SectionHeading label="What every build ships with" title="The features that bring you work" />

      <p className="-mt-6 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:-mt-10 md:mb-12 md:text-lg">
        No add-ons, no plugins to babysit. Every Cobalt Axis site launches with
        the three things that turn visitors into bookings and buyers.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {features.map((feature, i) => (
          <motion.article
            key={feature.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="border-b border-border bg-secondary/70 p-2.5">
              <feature.Art />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <span className="font-mono text-[11px] tracking-widest text-primary uppercase">
                {feature.n} — {feature.kicker}
              </span>
              <h3 className="mt-1 text-xl leading-snug font-medium tracking-[-0.01em] font-[family-name:var(--font-display)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default FeatureSections
