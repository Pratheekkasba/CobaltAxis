"use client"

import { useState } from "react"
import {
  Terminal,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react"

export const FlagshipProject = () => {
  const [viewMode, setViewMode] = useState<"architecture" | "logs">("architecture")

  return (
    <section id="work" className="relative my-32 sm:my-44 border-t border-border/40 pt-20">
      {/* Section Tag */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-xs font-mono tracking-widest text-[#0052FF] dark:text-[#3b82f6] uppercase">
          <span className="size-1.5 rounded-full bg-[#0052FF] dark:bg-[#3b82f6]" />
          04 // FLAGSHIP SHOWCASE
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tighter uppercase sm:text-5xl md:text-6xl font-[family-name:var(--font-display)]">
          Cobalt Engine.
        </h2>
        <p className="mt-2 text-sm font-mono text-muted-foreground uppercase tracking-widest">
          Autonomous Data Orchestration Platform
        </p>
      </div>

      {/* Flagship Editorial Card */}
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card/80 via-card/50 to-background shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Context (Problem, Approach, Outcome) */}
          <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/50">
            <div className="space-y-8">
              {/* Problem */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-rose-500 font-semibold">
                  [ The Problem ]
                </span>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  Brittle pipelines & fragmented data feeds
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Enterprises lost hundreds of engineering hours debugging fragile ETL scripts that constantly failed under spike concurrency and schema shifts.
                </p>
              </div>

              {/* Approach */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-blue-500 font-semibold">
                  [ The Approach ]
                </span>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  Event-driven Rust core + Next.js telemetry
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Engineered an autonomous streaming pipeline with deterministic retry mechanics, distributed Kafka clustering, and a sub-50ms reactive management UI.
                </p>
              </div>

              {/* Outcome */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-500 font-semibold">
                  [ The Outcome ]
                </span>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  Zero downtime, 12x throughput improvement
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Processed over 40M daily events with sub-millisecond execution times, saving over 35 hours of manual triage weekly.
                </p>
              </div>
            </div>

            {/* Metrics Pills & CTA */}
            <div className="mt-10 pt-6 border-t border-border/40">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-black text-foreground font-mono">
                    99.99%
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono uppercase">
                    Uptime SLA
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-500 font-mono">
                    42ms
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono uppercase">
                    P99 Latency
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground font-mono">
                    12x
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono uppercase">
                    Throughput
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-blue-600 hover:text-white"
              >
                Request Architecture Brief <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive System Preview */}
          <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between bg-black/40">
            {/* Window Controls & Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-xs text-white/40">
                  engine.cobaltaxis.internal
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("architecture")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    viewMode === "architecture"
                      ? "bg-blue-600 text-white shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Layers className="size-3.5" /> Pipeline View
                </button>
                <button
                  onClick={() => setViewMode("logs")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    viewMode === "logs"
                      ? "bg-blue-600 text-white shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Terminal className="size-3.5" /> Stream Logs
                </button>
              </div>
            </div>

            {/* Display Body */}
            <div className="my-8 min-h-[340px] flex items-center justify-center">
              {viewMode === "architecture" ? (
                <div className="w-full space-y-4">
                  {/* Pipeline Stage 1 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-xs text-white">
                    <div className="flex items-center gap-3">
                      <Zap className="size-4 text-blue-400" />
                      <div>
                        <div className="font-semibold text-white">
                          Ingestion Router [Edge]
                        </div>
                        <div className="text-[11px] text-white/50">
                          Distributed webhook gateway · TLS 1.3
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                      LIVE · 2.8k req/s
                    </span>
                  </div>

                  {/* Flow arrow */}
                  <div className="flex justify-center text-blue-500 text-xs">
                    ↓
                  </div>

                  {/* Pipeline Stage 2 */}
                  <div className="flex items-center justify-between rounded-xl border border-blue-500/40 bg-blue-500/10 p-4 font-mono text-xs text-white shadow-[0_0_20px_rgba(0,82,255,0.15)]">
                    <div className="flex items-center gap-3">
                      <Activity className="size-4 text-blue-400 animate-spin" />
                      <div>
                        <div className="font-semibold text-white">
                          Cobalt Neural Core [Transformer]
                        </div>
                        <div className="text-[11px] text-blue-200/70">
                          Real-time token embeddings & classification
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-blue-500/30 px-2 py-0.5 text-[10px] text-blue-300">
                      PARALLEL BATCHING
                    </span>
                  </div>

                  {/* Flow arrow */}
                  <div className="flex justify-center text-blue-500 text-xs">
                    ↓
                  </div>

                  {/* Pipeline Stage 3 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-xs text-white">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="size-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-white">
                          Persistent Event Sinks
                        </div>
                        <div className="text-[11px] text-white/50">
                          Automated ledger & real-time webhook broadcasts
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                      SYNCED · 0 LAG
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full rounded-xl bg-black/80 border border-white/10 p-5 font-mono text-xs text-emerald-400/90 leading-relaxed overflow-x-auto">
                  <p className="text-white/40">{"// Live streaming cluster telemetry..."}</p>
                  <p className="mt-2">
                    [10:14:02.102] <span className="text-blue-400">INFO</span> node-04 initialized worker threadpool (16 cores)
                  </p>
                  <p>
                    [10:14:02.148] <span className="text-emerald-400">SUCCESS</span> Ingestion socket bound: :8443
                  </p>
                  <p>
                    [10:14:02.219] <span className="text-blue-400">INFO</span> Neural weights verified. Checksum sha256: 7f8a...9c
                  </p>
                  <p>
                    [10:14:02.342] <span className="text-yellow-400">WARN</span> Queue load spiked +18% — auto-scaling pod group 2
                  </p>
                  <p>
                    [10:14:02.501] <span className="text-emerald-400">RESOLVED</span> Rebalanced in 159ms. Zero dropped frames.
                  </p>
                  <p className="mt-3 text-white/50 animate-pulse">
                    &gt; Listening for incoming connections_
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-white/40">
              <span>Stack: Rust · Kafka · TypeScript · Next.js</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                Cluster Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
