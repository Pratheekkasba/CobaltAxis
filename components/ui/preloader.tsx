"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { usePreloaderStore } from "@/stores/preloader"
import { CobaltAxisLogo } from "@/components/ui/logo"

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hidden, setHidden] = useState(false)
  const setLoaded = usePreloaderStore((s) => s.setLoaded)

  useEffect(() => {
    const container = containerRef.current
    const brand = brandRef.current
    const bottom = bottomRef.current
    const bar = barRef.current
    const fill = fillRef.current
    const counter = counterRef.current

    if (!container || !brand || !bottom || !bar || !fill || !counter) return

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
      // 1. Initial fade-in of brand title
      gsap.to(brand, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      })

      // 2. Fade in tagline and progress track
      gsap.to([bottom, bar], {
        opacity: 1,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      })

      // 3. Counter interpolation & bar fill from 0 to 100
      const counterProgress = { val: 0 }
      gsap.to(counterProgress, {
        val: 100,
        duration: 2.2,
        delay: 0.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.floor(counterProgress.val)
          counter.textContent = String(v)
          fill.style.width = `${v}%`
        },
        onComplete: () => {
          // 4. Preloader exit transition
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = ""
              setLoaded()
              setHidden(true)
            },
          })

          tl.to(brand, {
            y: -40,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          })

          tl.to(
            [bottom, bar],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            "-=0.2"
          )

          // As curtain starts lifting, unlock the hero animations
          tl.add(() => {
            setLoaded()
          }, "+=0.05")

          tl.to(container, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
          })
        },
      })
    })

    return () => {
      document.body.style.overflow = ""
      ctx.revert()
    }
  }, [setLoaded])

  if (hidden) return null

  return (
    <aside
      ref={containerRef}
      aria-label="Loading animation"
      style={{ zIndex: 999999 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-chapter text-chapter-foreground select-none"
    >
      <div className="w-[min(90vw,640px)] px-6 text-center">
        {/* Brand Display Header */}
        <div
          ref={brandRef}
          style={{ opacity: 0, transform: "translateY(32px)" }}
          className="mb-10 flex items-center justify-center"
        >
          <CobaltAxisLogo size="xl" withGlow />
        </div>

        {/* Tagline and Counter */}
        <div
          ref={bottomRef}
          style={{ opacity: 0 }}
          className="mb-3 flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest uppercase text-white/50"
        >
          <span className="tracking-[0.2em] text-white/60">
            Crafting Digital Experiences
          </span>
          <div className="font-semibold text-[#8b98ff]">
            <span ref={counterRef}>0</span>
            <span>%</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div
          ref={barRef}
          style={{ opacity: 0 }}
          className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10"
        >
          <div
            ref={fillRef}
            className="h-full w-0 rounded-full bg-primary shadow-[0_0_12px_rgba(86,105,255,0.8)] transition-[width] duration-75"
          />
        </div>
      </div>
    </aside>
  )
}
