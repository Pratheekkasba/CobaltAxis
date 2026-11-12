import type { ReactNode } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/sections/section-heading"

type TileData = {
  row: number
  col: number
  name?: string
  icon?: ReactNode
}

export function Integrations() {
  return (
    <div>
      <SectionHeading
        label="Section 06 / Ecosystem"
        title="Ecosystem."
        indexInlineFrom="xl"
      />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Content */}
        <div className="space-y-5 lg:col-span-6">
          <h3 className="text-3xl leading-[1.1] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground sm:text-4xl lg:text-[2.75rem]">
            Plug straight in.
            <span className="mt-1 block text-[#3B5BFF] dark:text-[#6B7DFF]">
              Zero rip-and-replace.
            </span>
          </h3>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
            We wire directly into the tools, databases, and cloud workflows your
            team already uses every day.
          </p>

          <p className="mt-6 font-mono text-xs tracking-wide text-slate-400 dark:text-muted-foreground/80">
            CUSTOM APIs &nbsp;·&nbsp; REAL-TIME WEBHOOKS &nbsp;·&nbsp; NATIVE MCP
          </p>
        </div>

        {/* Right Content - Staggered Architectural Icon Grid */}
        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <div className="relative flex items-center justify-center">
            {/* Soft radial cobalt-blue ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,91,255,0.16)_0%,rgba(59,91,255,0.05)_48%,transparent_72%)] blur-xl"
            />

            <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-90">
              {tiles.map((tile) => (
                <IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntegrationCard({ row, col, name, icon }: TileData) {
  const isTool = Boolean(icon)

  return (
    <div
      title={name}
      aria-label={name}
      className={cn(
        "absolute flex size-18 items-center justify-center rounded-md border transition-all duration-200",
        isTool
          ? "border-slate-200 bg-white shadow-xs hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md dark:border-white/20 dark:bg-white"
          : "border-dashed border-slate-200/80 bg-slate-50/40 dark:border-white/10 dark:bg-white/[0.03]"
      )}
      style={{
        left: col * 72,
        top: row * 72,
      }}
    >
      {isTool ? (
        <span className="pointer-events-none flex size-8 items-center justify-center select-none">
          {icon}
        </span>
      ) : (
        <Plus
          className="pointer-events-none size-4 text-slate-300 dark:text-muted-foreground/35"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 256 268" className="size-7" aria-hidden="true">
      <path
        fill="#FFF"
        d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
      />
      <path
        fill="#0F172A"
        d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z"
      />
    </svg>
  )
}

function LinearIcon() {
  return (
    <svg viewBox="0 0 100 100" className="size-7" aria-hidden="true">
      <path
        fill="#5E6AD2"
        d="M1.225 61.523c-.222-.949.908-1.546 1.596-.857l36.513 36.513c.689.688.092 1.818-.857 1.596C20.052 94.452 5.548 79.948 1.225 61.523ZM.002 46.889a.99.99 0 0 0 .289.76l52.06 52.06a.99.99 0 0 0 .76.289c2.71-.158 5.363-.523 7.943-1.081.76-.164 1.033-1.097.484-1.646L2.729 38.462c-.549-.549-1.482-.276-1.646.484A50.25 50.25 0 0 0 .002 46.89Zm4.205-20.135a.99.99 0 0 0-.213 1.098l68.155 68.155a.99.99 0 0 0 1.098-.213c2.01-1.396 3.922-2.931 5.718-4.59a.99.99 0 0 0 .024-1.42L10.217 20.996a.99.99 0 0 0-1.42.024c-1.659 1.796-3.194 3.708-4.59 5.734Zm12.404-13.21C25.33 5.217 37.095 0 50 0c27.614 0 50 22.386 50 50 0 12.905-5.217 24.67-13.544 33.389a.99.99 0 0 1-1.41.016L16.595 14.954a.99.99 0 0 1 .016-1.41Z"
      />
    </svg>
  )
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 256 222" className="size-6 fill-[#0F172A]" aria-hidden="true">
      <path d="m128 0 128 221.705H0z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-[#0F172A]" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg viewBox="0 49.4 512 399.42" className="size-7" aria-hidden="true">
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#4285f4"
            d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          />
          <path
            fill="#34a853"
            d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          />
          <path
            fill="#fbbc04"
            d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          />
        </g>
        <path
          fill="#ea4335"
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
        />
        <path
          fill="#c5221f"
          fillRule="nonzero"
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
        />
      </g>
    </svg>
  )
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 109 113" fill="none" className="size-7" aria-hidden="true">
      <path
        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
        fill="#249361"
      />
      <path
        d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
        fill="#3ECF8E"
      />
    </svg>
  )
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 128 128" className="size-7" aria-hidden="true">
      <path
        fill="#E01E5A"
        d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309v13.317zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.309 5.986 13.309 13.317v33.335c0 7.33-5.986 13.317-13.309 13.317-7.33 0-13.317-5.987-13.317-13.317V80.719z"
      />
      <path
        fill="#36C5F0"
        d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309H47.281zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.309-13.317 13.309H13.946C6.616 60.59.63 54.604.63 47.281c0-7.33 5.987-13.317 13.317-13.317h33.335z"
      />
      <path
        fill="#2EB67D"
        d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309V47.281zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.309-5.986-13.309-13.317V13.946C67.41 6.616 73.396.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317v33.335z"
      />
      <path
        fill="#ECB22E"
        d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309h13.317zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.309 13.317-13.309h33.335c7.33 0 13.317 5.986 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317H80.719z"
      />
    </svg>
  )
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-[#0F172A]" aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" />
    </svg>
  )
}

function StripeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#635BFF" />
      <path
        fill="#FFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.05 12.16c0-.87.72-1.2 1.91-1.2 1.71 0 3.87.52 5.58 1.44V7.12c-1.87-.74-3.72-1.03-5.58-1.03-4.56 0-7.6 2.38-7.6 6.36 0 6.21 8.54 5.22 8.54 7.89 0 1.03-.9 1.36-2.16 1.36-1.87 0-4.26-.77-6.15-1.81v5.34c2.09.9 4.21 1.28 6.15 1.28 4.67 0 7.89-2.31 7.89-6.35-.03-6.7-8.58-5.51-8.58-8Z"
      />
    </svg>
  )
}

// 5x5 staggered architectural grid featuring 9 engineering/enterprise tools + 3 modular ghost slots.
const tiles: TileData[] = [
  // Row 0
  { row: 0, col: 1 },
  { row: 0, col: 3, name: "Notion", icon: <NotionIcon /> },

  // Row 1
  { row: 1, col: 0 },
  { row: 1, col: 2, name: "Linear", icon: <LinearIcon /> },
  { row: 1, col: 4, name: "Vercel", icon: <VercelIcon /> },

  // Row 2
  { row: 2, col: 1, name: "GitHub", icon: <GitHubIcon /> },
  { row: 2, col: 3, name: "Gmail", icon: <GmailIcon /> },

  // Row 3
  { row: 3, col: 0 },
  { row: 3, col: 2, name: "Supabase", icon: <SupabaseIcon /> },
  { row: 3, col: 4, name: "Slack", icon: <SlackIcon /> },

  // Row 4
  { row: 4, col: 1, name: "OpenAI", icon: <OpenAIIcon /> },
  { row: 4, col: 3, name: "Stripe", icon: <StripeIcon /> },
]

export default Integrations
