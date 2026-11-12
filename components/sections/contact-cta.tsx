"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants/contact"
import { SectionHeading } from "./section-heading"

function CornerCrosshair({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 font-mono text-xs leading-none text-slate-400/80 select-none dark:text-muted-foreground/60 ${className}`}
    >
      +
    </span>
  )
}

export const ContactCTA = () => {
  const copyTimerRef = useRef<number | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(EMAIL)
    } catch {
      // Clipboard may be unavailable in restricted contexts; still give feedback.
    }
    setCopied(true)
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current)
    }
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="mb-28 md:mb-36">
      <SectionHeading label="Section 07 / Enquiry" title="Start a conversation." />

      <div className="spec-sheet-grid relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white dark:border-white/[0.08] dark:from-[#0F1524] dark:to-[#0A0E1A]">
        {/* Four corner crosshair marks */}
        <CornerCrosshair className="top-3 left-3.5" />
        <CornerCrosshair className="top-3 right-3.5" />
        <CornerCrosshair className="bottom-3 left-3.5" />
        <CornerCrosshair className="right-3.5 bottom-3" />

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Left column (60%) — pitch */}
          <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:w-[60%] lg:p-12">
            <div className="space-y-4">
              <h3 className="text-3xl leading-[1.1] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground sm:text-4xl lg:text-[2.75rem]">
                Have an ambitious idea?
                <span className="mt-1 block text-[#3B5BDB] dark:text-[#6B7DFF]">
                  Let&apos;s make it real.
                </span>
              </h3>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                A direct line to the engineering team. No forms, no proposal
                queues, just a conversation.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#3B5BDB] px-8 py-4 font-mono text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#2F4BC4] hover:shadow-md dark:bg-[#6B7DFF] dark:hover:bg-[#5A6DF5] sm:text-sm"
              >
                <span>CHAT ON WHATSAPP</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[2px]"
                />
              </a>

              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] text-slate-500 uppercase dark:text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-blue-600 animate-pulse dark:bg-[#6B7DFF]"
                />
                <span>RESPONSE TIME: USUALLY WITHIN 2 MINS</span>
              </div>
            </div>
          </div>

          {/* Right column (40%) — Contact Directory panel */}
          <div className="flex flex-col border-t border-slate-200 dark:border-white/[0.08] lg:w-[40%] lg:border-t-0 lg:border-l">
            <div className="border-b border-slate-200 px-7 py-4 sm:px-8 dark:border-white/[0.08]">
              <p className="font-mono text-[11px] tracking-[0.18em] text-slate-400 uppercase dark:text-muted-foreground">
                CONTACT / DIRECTORY
              </p>
            </div>

            <div className="flex flex-1 flex-col divide-y divide-slate-200 dark:divide-white/[0.08]">
              {/* Row 1: Email (click to copy) */}
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${EMAIL}`}
                className="group flex flex-1 items-center justify-between gap-4 px-7 py-6 text-left transition-colors duration-150 hover:bg-slate-50 sm:px-8 dark:hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-slate-400 uppercase">
                    <span>EMAIL</span>
                    <span className="text-[10px] text-slate-400/80 transition-colors group-hover:text-blue-600 dark:group-hover:text-[#6B7DFF]">
                      {copied ? "• COPIED" : "• CLICK TO COPY"}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-base font-medium text-slate-800 dark:text-foreground">
                    {EMAIL}
                  </p>
                </div>

                {copied ? (
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                ) : (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-slate-400 transition-colors duration-150 group-hover:text-blue-600 dark:group-hover:text-[#6B7DFF]"
                  />
                )}
              </button>

              {/* Row 2: Phone / WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-1 items-center justify-between gap-4 px-7 py-6 transition-colors duration-150 hover:bg-slate-50 sm:px-8 dark:hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                    PHONE / WHATSAPP
                  </p>
                  <p className="mt-1.5 truncate text-base font-medium text-slate-800 dark:text-foreground">
                    {PHONE_DISPLAY}
                  </p>
                </div>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-slate-400 transition-colors duration-150 group-hover:text-blue-600 dark:group-hover:text-[#6B7DFF]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
