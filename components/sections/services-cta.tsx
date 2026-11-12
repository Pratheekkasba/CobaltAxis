import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/constants/contact"

/*
 * Mid-page conversion moment for /services: a spec-sheet band with corner
 * crosshairs and a micro-grid (same voice as the homepage enquiry sheet).
 * Left: the reassurance pitch. Right: the two direct actions (WhatsApp +
 * contact page) with a live response-time marker. Static markup — no JS.
 */

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

const assurances = [
  "A plan, not a pitch deck",
  "Senior partner on every call",
  "Reply within one working day",
]

export const ServicesCta = () => {
  return (
    <section aria-label="Not sure which service you need?" className="mb-20 md:mb-24">
      <div className="spec-sheet-grid relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white dark:border-white/[0.08] dark:from-[#0F1524] dark:to-[#0A0E1A]">
        <CornerCrosshair className="top-3 left-3.5" />
        <CornerCrosshair className="top-3 right-3.5" />
        <CornerCrosshair className="bottom-3 left-3.5" />
        <CornerCrosshair className="right-3.5 bottom-3" />

        <div className="relative z-10 flex flex-col gap-10 p-7 sm:p-10 md:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Scoping call — free, 30 minutes
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
              Not sure which one you need?
              <span className="mt-1 block text-[#3B5BDB] dark:text-[#6B7DFF]">
                Send the problem, not the brief.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Most projects mix three or four of these disciplines. Describe
              where the bottleneck is — we&apos;ll shape the right package
              around it.
            </p>

            <ul className="mt-6 space-y-2.5">
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#3B5BDB] dark:text-[#6B7DFF]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-4 sm:flex-row lg:flex-col lg:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5BDB] px-8 py-4 font-mono text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#2F4BC4] hover:shadow-md dark:bg-[#6B7DFF] dark:hover:bg-[#5A6DF5] sm:text-sm"
            >
              <span>Ask us directly</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-8 py-4 font-mono text-xs font-semibold tracking-[0.16em] text-foreground uppercase transition-colors duration-200 hover:bg-secondary sm:text-sm dark:border-white/10 dark:hover:bg-white/5"
            >
              WhatsApp us
            </a>
            <p className="flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.14em] text-slate-500 uppercase lg:justify-end dark:text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 animate-pulse rounded-full bg-blue-600 dark:bg-[#6B7DFF] motion-reduce:animate-none"
              />
              Response time: usually within 2 mins
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesCta
