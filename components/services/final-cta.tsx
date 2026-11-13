import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "./button"
import { Container } from "./container"

/*
 * S05 — Final CTA: headline + the launchpad illustration with a subtle
 * neon-cyan halo. Static (server-rendered) — the buttons and links carry
 * the action, no motion needed here.
 */

/** Placeholder booking room until the real Calendly event is wired. */
const CALENDLY_URL = "https://calendly.com/cobaltaxis/15min"

export function FinalCTA() {
  return (
    <section id="final-cta" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl leading-[1.08] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground md:text-5xl">
              Ready to Build an Engine That Thinks?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              One senior team, one intelligent engine — from first call to
              launch and beyond.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/contact">
                Start a Project
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book a 15-Min Strategy Call
              </Button>
            </div>

            <p className="mt-6 font-mono text-xs tracking-[0.08em] text-muted-foreground">
              Prefer email?{" "}
              <a
                href="mailto:hello@cobaltaxis.in"
                className="text-cobalt underline-offset-4 transition-colors hover:text-cobalt-deep hover:underline"
              >
                hello@cobaltaxis.in
              </a>
            </p>
          </div>

          <div className="relative">
            {/* Subtle neon-cyan halo behind the launchpad plate */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2rem] bg-neon/20 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_-30px_rgba(43,84,216,0.28)]">
              <div className="relative aspect-video">
                <Image
                  src="/images/services/15-launchpad.webp"
                  alt="Isometric launchpad illustration — a rocket on its pad beside a 'Start Your Engine' billboard"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
