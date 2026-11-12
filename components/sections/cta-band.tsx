import Link from "next/link"
import { WHATSAPP_URL } from "@/lib/constants/contact"

// The dark closing band shared by the inner pages: pitch on the left,
// the two conversion actions on the right.
type CtaBandProps = {
  title: string
  sub: string
}

export const CtaBand = ({ title, sub }: CtaBandProps) => {
  return (
    <div className="mt-20 rounded-lg bg-chapter p-8 text-chapter-foreground md:mt-24 md:p-12">
      <div className="md:flex md:items-center md:justify-between md:gap-10">
        <div>
          <p className="font-mono text-xs tracking-widest text-chapter-muted uppercase">
            Ready when you are
          </p>
          <h2 className="mt-4 max-w-xl text-3xl leading-[1.1] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-chapter-muted md:text-base">
            {sub}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
          >
            Start a project
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-chapter-border px-7 py-3.5 text-sm font-semibold text-chapter-foreground transition-colors duration-300 hover:bg-chapter-panel"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  )
}
