"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Pulled from real shipped projects (lib/constants/projects.ts).
const metrics = [
  { value: "+240%", label: "Signup conversion — Nova Finance", up: true },
  { value: "+64%", label: "Conversion — Orbit Commerce", up: true },
  { value: "0.9s", label: "Largest paint — Orbit Commerce", up: false },
  { value: "+120%", label: "Weekly active — Halo Health", up: true },
  { value: "4.8★", label: "App rating — Halo Health", up: false },
  { value: "3×", label: "Inbound leads — Vertex Studio", up: true },
]

// The showpiece: a pinned scene where the page darkens, the headline makes
// way, and a board of real project results scales into view. ~300vh of
// scroll drives one scrubbed timeline. Everything is parked from its final
// state by JS (never hidden by CSS), so no-JS and reduced-motion users get
// a calm static section instead of a broken one.
export const ResultsZoom = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const darkRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Content above (async Projects section) changes page height after
    // fetch — recompute trigger positions when it does.
    let raf = 0
    const ro = new ResizeObserver(() => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        ScrollTrigger.refresh()
      })
    })
    ro.observe(document.body)

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const wrap = wrapRef.current
      const scene = sceneRef.current
      const dark = darkRef.current
      const headline = headlineRef.current
      const board = boardRef.current
      if (!wrap || !scene || !dark || !headline || !board) return

      // Give the timeline scroll room only when motion is allowed.
      wrap.style.height = "300vh"

      // Park at the start state (JS-only, so no-JS users never see this).
      gsap.set(dark, { opacity: 0 })
      gsap.set(headline, { opacity: 0 })
      gsap.set(board, { opacity: 0, scale: 0.8 })
      gsap.set(board.querySelectorAll("[data-metric]"), { y: 40, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          // Begin darkening as the scene scrolls into view, so the chapter
          // rises out of the page instead of starting from a blank white gap.
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
        },
        defaults: { ease: "none" },
      })

      tl.fromTo(dark, { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
        .fromTo(headline, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.4)
        .to(headline, { opacity: 0, y: -40, duration: 1.4 }, 2.2)
        .fromTo(
          board,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
          2.6
        )
        .to(
          board.querySelectorAll("[data-metric]"),
          { y: 0, opacity: 1, stagger: 0.25, duration: 1.2 },
          2.8
        )

      return () => {
        wrap.style.height = ""
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    return () => {
      ro.disconnect()
      mm.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative mb-28 md:mb-36">
      <div
        ref={sceneRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden text-chapter-foreground"
      >
        {/* Dark layer: opaque by default (the no-JS / reduced-motion fallback
            is a calm dark section), parked to 0 by JS so the page visibly
            darkens as the scene pins. */}
        <div
          ref={darkRef}
          aria-hidden
          className="absolute inset-0 bg-chapter"
        />

        <div className="relative z-10 w-full max-w-5xl px-6">
          {/* Phase 1: headline */}
          <div ref={headlineRef} className="text-center">
            <p className="font-mono text-xs tracking-widest text-chapter-muted uppercase">
              Results, 2024 – 2026
            </p>
            <h2 className="mt-6 text-5xl leading-[1.05] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-7xl">
              The work moves numbers.
            </h2>
          </div>

          {/* Phase 2: the results board */}
          <div
            ref={boardRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  data-metric
                  className="rounded-lg border border-chapter-border bg-chapter-panel p-4 md:p-6"
                >
                  <p
                    className={`text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-5xl ${
                      metric.up ? "text-up" : "text-chapter-foreground"
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-widest text-chapter-muted uppercase md:mt-3 md:text-[11px]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 hidden text-center font-mono text-xs tracking-widest text-chapter-muted uppercase md:block">
              Every metric pulled from a shipped project
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
