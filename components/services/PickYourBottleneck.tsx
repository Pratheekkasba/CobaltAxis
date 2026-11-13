"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { sv2Blur } from "@/lib/blur"
import { scrollTo } from "@/hooks/use-lenis"
import { Container } from "./container"

/*
 * Pick your bottleneck — the dark problem-selector band.
 *
 * Left: five real <button role="tab">s (arrow-key roving). Right: a
 * tabpanel that re-types a terminal log, crossfades the matching
 * illustration on a white plate, and counts up three metrics. A ghost CTA
 * scrolls to the matching service card and pulses it (data-highlight) for
 * 2.5s. Auto-advances every 6s until any user interaction — then it stops
 * permanently. Reduced motion: no cycling, no typing, no count-up; the
 * final state renders statically. All animation is transform/opacity/text.
 */

type Metric =
  | {
      kind: "count"
      to: number
      decimals?: number
      suffix?: string
      label: string
    }
  | { kind: "text"; text: string; label: string }

type Bottleneck = {
  /** Mono index label. */
  index: string
  title: string
  description: string
  /** data-service hooks on the cards/rows this bottleneck maps to. */
  targets: string[]
  images: Array<{ src: string; alt: string }>
  /** Four terminal log lines; the last ends with "resolved ✓". */
  logs: string[]
  metrics: Metric[]
}

/** Which section each highlight target lives in (for the CTA scroll). */
const SERVICE_SECTIONS: Record<string, string> = {
  "intelligent-systems": "#intelligent-engineering",
  "autonomous-workflows": "#intelligent-engineering",
  "applied-ai-rag": "#intelligent-engineering",
  "cloud-ai-infrastructure": "#intelligent-engineering",
  "60fps-web-apps": "#high-velocity",
  "high-velocity-ui": "#high-velocity",
  "research-prototypes": "#high-velocity",
  "maintenance-monitoring": "#high-velocity",
}

const BOTTLENECKS: Bottleneck[] = [
  {
    index: "01",
    title: "Manual busywork",
    description: "Repetitive handoffs quietly eating your team's week.",
    targets: ["autonomous-workflows"],
    images: [
      {
        src: "/images/services/03-autonomous-workflows.webp",
        alt: "Isometric illustration of an automated data workflow system routing tasks between connected nodes",
      },
    ],
    logs: [
      "intake.received document.pdf",
      "agent.classify -> invoice",
      "validate.rules passed 12/12",
      "filed + notified · resolved ✓",
    ],
    metrics: [
      { kind: "count", to: 70, suffix: "%", label: "less manual effort" },
      { kind: "text", text: "24/7", label: "operation" },
      { kind: "text", text: "0", label: "ops overhead" },
    ],
  },
  {
    index: "02",
    title: "Scattered knowledge",
    description: "Answers buried across docs, drives and inboxes.",
    targets: ["applied-ai-rag"],
    images: [
      {
        src: "/images/services/04-applied-ai-rag.webp",
        alt: "Isometric illustration of a database search — vector retrieval over enterprise documents",
      },
    ],
    logs: [
      "query.received",
      "vector.search 1,284 docs",
      "answer.generated with sources",
      "delivered · resolved ✓",
    ],
    metrics: [
      { kind: "text", text: "<1s", label: "retrieval" },
      { kind: "count", to: 100, suffix: "%", label: "cited answers" },
      { kind: "text", text: "Yours", label: "your data stays private" },
    ],
  },
  {
    index: "03",
    title: "Slow, clunky app",
    description: "Every click waits and every scroll stutters.",
    targets: ["60fps-web-apps", "high-velocity-ui"],
    images: [
      {
        src: "/images/services/06-60fps-web-apps.webp",
        alt: "Isometric illustration of a performance dashboard maxing its speedometer",
      },
      {
        src: "/images/services/08-high-velocity-ui.webp",
        alt: "Isometric illustration of a UI assembly line — component blocks conveyor-belted into an interface",
      },
    ],
    logs: [
      "audit.run lighthouse",
      "bundle.split + lazy-load",
      "render.budget 16ms",
      "60 fps locked · resolved ✓",
    ],
    metrics: [
      { kind: "count", to: 60, label: "FPS" },
      { kind: "count", to: 48, suffix: "H", label: "component builds" },
      { kind: "count", to: 95, suffix: "+", label: "Lighthouse" },
    ],
  },
  {
    index: "04",
    title: "Fragile systems",
    description: "Downtime, hotfixes and 3 a.m. deploy anxiety.",
    targets: ["cloud-ai-infrastructure", "maintenance-monitoring"],
    images: [
      {
        src: "/images/services/05-cloud-architectures.webp",
        alt: "Isometric illustration of server buildings on a floating island — cloud infrastructure",
      },
      {
        src: "/images/services/14-maintenance.webp",
        alt: "Isometric illustration of a monitored neural facility — a glowing network dome watched over by server racks",
      },
    ],
    logs: [
      "monitor.alert latency spike",
      "autoscale +3 pods",
      "rollback.ready v2.4.1",
      "healthy · resolved ✓",
    ],
    metrics: [
      { kind: "count", to: 99.9, decimals: 1, suffix: "%", label: "uptime SLA" },
      { kind: "text", text: "Auto", label: "scaling" },
      { kind: "text", text: "1-click", label: "rollback" },
    ],
  },
  {
    index: "05",
    title: "Unproven idea",
    description: "A promising bet with no evidence behind it yet.",
    targets: ["research-prototypes"],
    images: [
      {
        src: "/images/services/12-development.webp",
        alt: "Isometric illustration of a code pipeline — an editor feeding neon tubes into a build-and-deploy machine",
      },
    ],
    logs: [
      "idea.received",
      "prototype.build sprint 1",
      "test.users feedback in",
      "go/no-go ready · resolved ✓",
    ],
    metrics: [
      { kind: "text", text: "Weeks", label: "to MVP" },
      { kind: "text", text: "Proof", label: "before budget" },
      { kind: "text", text: "Clear", label: "go/no-go" },
    ],
  },
]

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Counts 0 → to over 800ms whenever it mounts (i.e. per selected tab). */
function CountUp({
  to,
  decimals,
  suffix,
}: {
  to: number
  decimals: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    if (reduced) {
      ref.current.textContent = `${to.toFixed(decimals)}${suffix ?? ""}`
      return
    }
    const controls = animate(0, to, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${v.toFixed(decimals)}${suffix ?? ""}`
      },
    })
    return () => controls.stop()
  }, [to, decimals, suffix, reduced])

  return (
    <span ref={ref}>
      {reduced ? `${to.toFixed(decimals)}${suffix ?? ""}` : "0"}
    </span>
  )
}

/** Colors the trailing "resolved ✓" marker green. */
function LogLine({ line }: { line: string }) {
  const marker = "resolved ✓"
  const at = line.indexOf(marker)
  if (at === -1) return <>{line}</>
  return (
    <>
      {line.slice(0, at)}
      <span className="text-up">{marker}</span>
    </>
  )
}

const TABLIST_LABEL = "Pick a bottleneck"
const PANEL_ID = "pyb-panel"
const tabId = (i: number) => `pyb-tab-${i}`

/**
 * The typing terminal. Remounted per selected bottleneck (keyed by the tab
 * index) so its state resets cleanly. Reduced motion skips the state machine
 * entirely and renders the finished log statically.
 */
function Terminal({ logs, reduced }: { logs: string[]; reduced: boolean }) {
  const [typed, setTyped] = useState<{ lines: string[]; current: string }>({
    lines: [],
    current: "",
  })
  const done = reduced || typed.lines.length >= logs.length

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    let timer: number
    let line = 0
    let char = 0

    const tick = () => {
      if (cancelled || line >= logs.length) return
      const text = logs[line]
      char += 1
      if (char > text.length) {
        setTyped({ lines: logs.slice(0, line + 1), current: "" })
        line += 1
        char = 0
        timer = window.setTimeout(tick, 260)
      } else {
        setTyped({ lines: logs.slice(0, line), current: text.slice(0, char) })
        timer = window.setTimeout(tick, 25)
      }
    }
    timer = window.setTimeout(tick, 300)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [logs, reduced])

  const lines = reduced ? logs : typed.lines
  const current = reduced ? "" : typed.current

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1220]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-[#FF5F56]/80"
        />
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-[#FFBD2E]/80"
        />
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-[#27C93F]/80"
        />
        <span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
          cobalt-axis — engine.log
        </span>
      </div>
      <div
        aria-live="polite"
        aria-busy={!done}
        className="min-h-[9.25rem] px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((line, i) => (
          <p key={i} className="text-white/70">
            <span aria-hidden="true" className="text-neon/70">
              ${" "}
            </span>
            <LogLine line={line} />
          </p>
        ))}
        {current && (
          <p className="text-white/70">
            <span aria-hidden="true" className="text-neon/70">
              ${" "}
            </span>
            {current}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-neon/80 motion-reduce:animate-none"
            />
          </p>
        )}
        {done && (
          <p aria-hidden="true" className="text-white/40">
            <span className="text-neon/70">$ </span>
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-neon/60 motion-reduce:animate-none" />
          </p>
        )}
      </div>
    </div>
  )
}

export function PickYourBottleneck() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const [active, setActive] = useState(0)
  /** Set once on the first user interaction; cycling never resumes. */
  const [stopped, setStopped] = useState(false)

  const item = BOTTLENECKS[active]

  /* Stop cycling permanently on any interaction inside the band. */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const stop = () => setStopped(true)
    const opts: AddEventListenerOptions = { capture: true, passive: true }
    el.addEventListener("pointerdown", stop, opts)
    el.addEventListener("keydown", stop, opts)
    el.addEventListener("focusin", stop, opts)
    return () => {
      el.removeEventListener("pointerdown", stop, opts)
      el.removeEventListener("keydown", stop, opts)
      el.removeEventListener("focusin", stop, opts)
    }
  }, [])

  /* Auto-advance every 6s until interaction or reduced motion. */
  useEffect(() => {
    if (reduced || stopped) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % BOTTLENECKS.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [reduced, stopped])

  /* Roving-tablist arrow navigation (both axes so the mobile pill row
     and the desktop column behave identically). */
  const onTablistKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const nextKeys = ["ArrowDown", "ArrowRight"]
      const prevKeys = ["ArrowUp", "ArrowLeft"]
      if (
        !nextKeys.includes(e.key) &&
        !prevKeys.includes(e.key) &&
        e.key !== "Home" &&
        e.key !== "End"
      )
        return
      e.preventDefault()
      const count = BOTTLENECKS.length
      let next: number
      if (e.key === "Home") next = 0
      else if (e.key === "End") next = count - 1
      else {
        const delta = nextKeys.includes(e.key) ? 1 : -1
        next = (active + delta + count) % count
      }
      setActive(next)
      tabRefs.current[next]?.focus()
    },
    [active],
  )

  /* CTA: scroll to the matching section, then pulse its cards. */
  const onSeeService = useCallback(() => {
    const target = BOTTLENECKS[active].targets
    scrollTo(SERVICE_SECTIONS[target[0]] ?? "#intelligent-engineering", {
      offset: -110,
      immediate: Boolean(reduced),
    })
    for (const service of target) {
      const el = document.querySelector<HTMLElement>(
        `[data-service="${service}"]`,
      )
      if (!el) continue
      el.setAttribute("data-highlight", "")
      window.setTimeout(() => el.removeAttribute("data-highlight"), 2500)
    }
  }, [active, reduced])

  return (
    <section
      id="pick-bottleneck"
      ref={rootRef}
      className="relative overflow-hidden bg-obsidian py-20 md:py-28"
    >
      {/* Faint dot grid across the obsidian band */}
      <div aria-hidden="true" className="sv2-dots-dark absolute inset-0" />

      <Container>
        <motion.div
          variants={panelReveal}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative rounded-[24px] border border-white/10 bg-white/[0.02] p-6 md:p-10 lg:p-12"
        >
          <header className="mb-10 max-w-2xl md:mb-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-neon uppercase">
              SECTION 02 // START WITH THE PROBLEM
            </p>
            <h2 className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-white md:text-5xl">
              What&apos;s slowing you down?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
              Pick a bottleneck. We&apos;ll show you the system that removes
              it.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-[35fr_65fr] lg:gap-10">
            {/* LEFT — the selector (pill row on mobile, column on desktop) */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={TABLIST_LABEL}
              onKeyDown={onTablistKeyDown}
              className="flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pb-1 md:flex-col md:gap-3"
            >
              {BOTTLENECKS.map((bottleneck, i) => {
                const isActive = i === active
                return (
                  <button
                    key={bottleneck.index}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={tabId(i)}
                    aria-selected={isActive}
                    aria-controls={PANEL_ID}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex shrink-0 snap-start cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 text-left outline-none transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out focus-visible:ring-[3px] focus-visible:ring-neon/40 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian md:w-full md:flex-col md:items-start md:gap-1.5 md:rounded-xl md:px-4 md:py-4 md:hover:translate-x-1 md:motion-reduce:hover:translate-x-0",
                      isActive
                        ? "border-cobalt/60 bg-cobalt/10 shadow-[0_0_28px_-8px_rgba(43,84,216,0.55)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25",
                    )}
                  >
                    {/* Cobalt active bar (desktop) */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 hidden h-9 w-[3px] -translate-y-1/2 rounded-full bg-cobalt shadow-[0_0_16px_rgba(43,84,216,0.65)] md:block"
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-[11px] font-medium tracking-[0.2em]",
                        isActive ? "text-neon" : "text-white/35",
                      )}
                    >
                      {bottleneck.index}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-medium tracking-[-0.01em] md:text-[15px]",
                          isActive
                            ? "text-white"
                            : "text-white/60 group-hover:text-white/85",
                        )}
                      >
                        {bottleneck.title}
                      </span>
                      <span className="mt-1 hidden text-xs leading-relaxed text-white/40 md:block">
                        {bottleneck.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* RIGHT — the matching system */}
            <div
              role="tabpanel"
              id={PANEL_ID}
              aria-labelledby={tabId(active)}
              className="min-w-0"
            >
              <div className="flex flex-col gap-5">
                {/* Terminal (remounts per selection to reset the typing) */}
                <Terminal key={active} logs={item.logs} reduced={!!reduced} />

                {/* Illustration on a white plate */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white">
                  <AnimatePresence initial={false}>
                    {item.images.map((img, i) => (
                      <motion.div
                        key={img.src}
                        initial={{ opacity: reduced ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.3,
                          ease: "easeOut",
                        }}
                        className={cn(
                          "absolute",
                          item.images.length === 1
                            ? "inset-0"
                            : i === 0
                              ? "left-[4%] top-[7%] w-[60%] rounded-lg shadow-[0_16px_36px_-16px_rgba(10,10,15,0.45)]"
                              : "right-[4%] bottom-[7%] w-[52%] rounded-lg shadow-[0_16px_36px_-16px_rgba(10,10,15,0.45)]",
                        )}
                      >
                        <div
                          className={cn(
                            "relative",
                            item.images.length === 1
                              ? "h-full"
                              : "aspect-video overflow-hidden rounded-lg",
                          )}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            placeholder="blur"
                            blurDataURL={sv2Blur(img.src)}
                            sizes="(min-width: 1024px) 42vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {item.metrics.map((metric) => (
                    <div
                      key={`${active}-${metric.label}`}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-4 md:px-4"
                    >
                      <div
                        aria-hidden="true"
                        className="font-mono text-xl font-semibold tracking-tight text-white tabular-nums md:text-2xl"
                      >
                        {metric.kind === "count" ? (
                          <CountUp
                            to={metric.to}
                            decimals={metric.decimals ?? 0}
                            suffix={metric.suffix}
                          />
                        ) : (
                          metric.text
                        )}
                      </div>
                      <p className="mt-1.5 text-[11px] leading-snug text-white/50 md:text-xs">
                        {metric.label}
                      </p>
                      <span className="sr-only">
                        {metric.kind === "count"
                          ? `${metric.to}${metric.suffix ?? ""} ${metric.label}`
                          : `${metric.text} ${metric.label}`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={onSeeService}
                  className="mt-1 inline-flex h-11 shrink-0 cursor-pointer select-none items-center justify-center gap-2 self-start rounded-full border border-white/15 px-6 text-sm font-semibold text-white outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-cobalt/70 hover:bg-cobalt/15 focus-visible:ring-[3px] focus-visible:ring-neon/40 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                >
                  See the matching service
                  <ArrowDown aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
