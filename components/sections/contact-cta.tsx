"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=919347216338&text=Hi+CobaltAxis%21+I%27m+interested+in+your+services.&type=phone_number&app_absent=0"

interface VerticalMarqueeProps {
  children: ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
  speed?: number
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 22,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

const marqueeItems = [
  "Intelligent Systems",
  "Autonomous Workflows",
  "60 FPS Web Apps",
  "Cloud Architectures",
  "Applied AI & RAG",
  "Research Prototypes",
  "High-Velocity UI",
]

export const ContactCTA = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Dynamic center opacity calculation: words brighten at center, fade near edges
  useEffect(() => {
    const marqueeContainer = marqueeRef.current
    if (!marqueeContainer) return

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item")
      const containerRect = marqueeContainer.getBoundingClientRect()
      const centerY = containerRect.top + containerRect.height / 2
      const maxDistance = containerRect.height / 2

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterY = itemRect.top + itemRect.height / 2
        const distance = Math.abs(centerY - itemCenterY)
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const opacity = 1 - normalizedDistance * 0.85
        ;(item as HTMLElement).style.opacity = Math.max(0.12, opacity).toString()
      })
    }

    let frameId: number
    const loop = () => {
      updateOpacity()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <section id="contact" className="relative mb-36">
      <SectionHeading label="Enquiry" title="Start A Conversation" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Direct WhatsApp Contact */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-foreground font-[family-name:var(--font-heading)] uppercase">
              Have an ambitious idea?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400">
                Let&apos;s make it real.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground font-light max-w-xl">
              Connect directly with our engineering team. No intermediaries or
              lengthy proposal queues — start a direct conversation on WhatsApp.
            </p>
          </div>

          {/* Action Box: Direct WhatsApp CTA */}
          <div className="rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0052FF] hover:bg-[#0042D4] text-white px-8 py-5 text-base font-bold shadow-xl shadow-blue-600/25 transition-all duration-300 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99] overflow-hidden"
            >
              <MessageCircle className="size-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className="tracking-wider uppercase font-mono text-sm sm:text-base font-semibold">
                Chat On WhatsApp
              </span>
              <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
            </a>
          </div>
        </div>

        {/* Right Column: Vertical Rolling Marquee Showcase */}
        <div
          ref={marqueeRef}
          className="lg:col-span-5 relative h-[460px] lg:h-[540px] rounded-3xl border border-border/60 bg-card/40 flex items-center justify-center overflow-hidden backdrop-blur-sm"
        >
          <div className="relative w-full h-full flex flex-col justify-center px-6 text-center select-none">
            <VerticalMarquee speed={24} pauseOnHover className="h-full justify-center">
              {marqueeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="py-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-foreground font-[family-name:var(--font-heading)] marquee-item transition-opacity duration-300 hover:text-blue-500"
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>

            {/* Top Vignette Fade */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-background via-background/60 to-transparent z-10" />

            {/* Bottom Vignette Fade */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
