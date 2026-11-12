import { Geist, Geist_Mono, Inter_Tight, Michroma } from "next/font/google"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from "./providers"
import { WhatsAppFloat } from "@/components/ui/whatsapp-float"
import { WebNav } from "@/components/layout/web-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Footer } from "@/components/sections/footer"

import "./globals.css"
import { cn } from "@/lib/utils"

// Display face: neutral grotesque carrying the big headlines (w500, tight
// leading, -2% tracking at section scale). Geist stays for body copy and
// Geist Mono is the "data voice" — tickers, stats, labels.
const displayFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
})

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// Brand wordmark face: the Eurostile-Extended-style letterforms of the
// official Cobalt Axis logo (wide, squared, uniform strokes). Used only by
// the logo component so the mark renders identically everywhere.
const logoFont = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
})

// Vercel exposes the production domain at build time; fall back to localhost so
// absolute URLs (and the OG image) resolve in development too.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

const title = "Cobalt Axis"
const description =
  "Cobalt Axis partners with ambitious brands to engineer digital experiences, products, and interfaces with cutting-edge design and motion."

export const metadata: Metadata = {
  // Required for `app/opengraph-image.png` (and twitter:image) to resolve to
  // absolute URLs. Next picks the file up automatically — no `images` key needed.
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Cobalt Axis",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description,
  keywords: [
    "cobalt axis",
    "digital agency",
    "creative engineering",
    "web development",
    "motion design",
    "interactive studio",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Cobalt Axis",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-sans",
        geistMono.variable,
        displayFont.variable,
        logoFont.variable
      )}
    >
      <body>
        {/* globals.css pre-hides the hero so it can't flash before GSAP boots.
            If JS never runs, nothing would reveal it — so undo that here.
            Must be dangerouslySetInnerHTML: children of <noscript> are inert
            text to the parser, but React would reconcile a real <style> node on
            hydration — and a <style> applies even inside a display:none parent,
            so these !important rules would fight GSAP with JS enabled. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              .hero-fx, .hero-word { opacity: 1 !important; }
            </style>`,
          }}
        />
        <Providers>
          {/* Global chrome: nav outside the scaling container so the project
              drawer can shrink the page underneath it; footer on every route. */}
          <WebNav />
          <MobileNav />
          <main
            id="top"
            data-scale-container
            className="mx-auto min-h-screen max-w-[1380px] px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-20"
          >
            {children}
          </main>
          {/* Full-bleed footer (sketchbook paper spans the viewport edge to
              edge), outside the scaling container but on every route. */}
          <Footer />
          {/* Floating WhatsApp contact button */}
          <WhatsAppFloat />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
