"use client"

import { ArrowUpRight, Users, Shield, Cpu } from "lucide-react"

export const WhoWeAre = () => {
  return (
    <section className="relative my-32 sm:my-44 border-t border-border/40 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Label & Mission */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-mono tracking-widest text-[#0052FF] dark:text-[#3b82f6] uppercase">
            <span className="size-1.5 rounded-full bg-[#0052FF] dark:bg-[#3b82f6]" />
            07 // WHO WE ARE
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-[family-name:var(--font-heading)]">
            People Behind The Code.
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
            Cobalt Axis was founded on a simple conviction: technology is at its best when rigorous engineering and fluid design work as one unified discipline.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground font-light">
            We don&apos;t operate as a bloated traditional agency. We are an agile team of product engineers, systems architects, and interaction designers who work directly with founders and product teams.
          </p>

          {/* Connect on Socials */}
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="https://x.com/CobaltAxis"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-mono font-medium text-foreground hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <span>Follow on X</span>
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href="https://www.instagram.com/cobaltaxis.in?dlrf=d3AxOXF2bWI0Ymlh"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-mono font-medium text-foreground hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <span>Instagram @cobaltaxis.in</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: 3 Core Principles */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Users className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  Direct Engineer Collaboration
                </h4>
                <p className="text-xs font-mono text-muted-foreground">
                  Zero administrative layers
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You speak directly with the architects and designers building your application. Decisions are made fast, technical context is never lost, and feedback loops happen in hours, not weeks.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Cpu className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  Obsessive Performance
                </h4>
                <p className="text-xs font-mono text-muted-foreground">
                  Frame 1 to Millisecond 40
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We obsess over frame rates, bundle footprints, and database response times. Fast software creates an immediate aura of trust that elevates any product above its competition.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Shield className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  Honest Craft
                </h4>
                <p className="text-xs font-mono text-muted-foreground">
                  No synthetic case studies
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We build functional prototypes before selling complex architectures. If an idea won&apos;t work or a technology adds pointless overhead, we tell you immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
