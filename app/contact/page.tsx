import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Clock, Globe, Mail, MessageCircle } from "lucide-react"
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants/contact"
import { PageHeader } from "@/components/sections/page-header"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Cobalt Axis. Message us on WhatsApp or email — a senior partner replies within one working day.",
}

const nextSteps = [
  {
    n: "01",
    title: "Say hello",
    desc: "One message is enough. A couple of lines about your business and what you need.",
  },
  {
    n: "02",
    title: "A 30-minute call",
    desc: "Free, no pitch deck. We ask about your customers, your numbers, and your timeline.",
  },
  {
    n: "03",
    title: "Proposal in 48 hours",
    desc: "Scope, timeline, and a fixed price. If we're not the right fit, we'll say so.",
  },
]

const ContactPage = () => {
  return (
    <div className="mb-8">
      <PageHeader
        label="Enquiry"
        title="Start a conversation."
        intro="Tell us what you're building. A senior partner — not a bot, not a form queue — replies within one working day."
        meta="Replies in 1 working day"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Primary channels */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="rounded-lg border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-3xl">
              The fastest way in
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              Message us on WhatsApp — you&apos;ll be talking with a designer or
              an engineer, never an account manager.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
            >
              <MessageCircle className="size-4 shrink-0" />
              <span className="tracking-widest uppercase">Chat on WhatsApp</span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 font-mono text-xs sm:text-sm">
              <span className="text-muted-foreground">Or by email:</span>
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
                <span>{EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Studio facts */}
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            <div className="flex flex-col gap-3 bg-background p-8">
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                <Globe className="size-4" />
                Where we work
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Based in India, working with clients worldwide. Async-first, so
                time zones never slow the work.
              </p>
            </div>
            <div className="flex flex-col gap-3 bg-background p-8">
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                <Clock className="size-4" />
                Response time
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Within one working day — usually sooner. Urgent launch weeks get
                a same-day answer.
              </p>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="rounded-lg border border-border p-8 md:p-10 lg:col-span-5">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            What happens next
          </p>
          <ol className="mt-8 flex flex-col gap-8">
            {nextSteps.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="font-mono text-xs font-semibold text-primary">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base font-medium font-[family-name:var(--font-display)] md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-t border-border pt-6">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Prefer to browse first?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See the work
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See the services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Phone strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary px-8 py-6">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Direct line
        </span>
        <a
          href="tel:+919347216338"
          className="font-mono text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}

export default ContactPage
