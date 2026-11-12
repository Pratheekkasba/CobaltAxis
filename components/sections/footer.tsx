"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { CobaltAxisLogo } from "@/components/ui/logo"
import DoodleCrewFooter, {
  type CrewMember,
  type FooterAction,
  type FooterColumn,
} from "@/components/ui/doodle-crew-footer"
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants/contact"

const exploreLinks = [
  { label: "Services", href: "/#capabilities" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cobaltaxis.in?dlrf=d3AxOXF2bWI0Ymlh",
  },
  { label: "X", href: "https://x.com/CobaltAxis" },
  { label: "LinkedIn", href: "https://linkedin.com/company/cobaltaxis" },
]

const columns: FooterColumn[] = [
  { title: "Explore", links: exploreLinks },
  {
    title: "Talk to us",
    links: [
      { label: EMAIL, href: EMAIL_HREF },
      { label: PHONE_DISPLAY, href: WHATSAPP_URL },
    ],
  },
  { title: "Follow", links: socials },
]

const actions: FooterAction[] = [
  { label: "Start your project", href: "/contact", icon: "bolt", variant: "solid" },
  { label: "See the work", href: "/#capabilities", icon: "sparkle", variant: "outline" },
]

// A crew member per letter of COBALT — the whole studio in one word.
const crew: CrewMember[] = [
  { kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "I carry beams. You carry bookings." },
  { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Cheep leads. Booked solid." },
  { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "Fun guy. Fungible? Never." },
  { kind: "kid", letter: 3, seat: "top", offset: -0.05, name: "Juno", says: "Best seat. Top result." },
  { kind: "ghost", letter: 4, seat: "behind", offset: 0, name: "Boo", says: "Boo! …your competitors." },
  { kind: "cat", letter: 5, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Nice cursor. Nicer website." },
]

// next/font generates hashed family names, so "Inter Tight" won't resolve by
// name for the canvas measurement. A hidden probe reads the real computed
// family off --font-display at mount; the component re-measures once fonts land.
const DISPLAY_FALLBACK = '"Inter Tight", Inter, "Helvetica Neue", Arial, sans-serif'

export const Footer = () => {
  const probeRef = useRef<HTMLSpanElement>(null)
  const [displayFamily, setDisplayFamily] = useState(DISPLAY_FALLBACK)
  const year = new Date().getFullYear()

  useLayoutEffect(() => {
    const fam = probeRef.current ? getComputedStyle(probeRef.current).fontFamily : ""
    if (fam && !fam.includes("var(")) setDisplayFamily(fam)
  }, [])

  return (
    <div style={{ "--dcf-body": "var(--font-sans)" } as React.CSSProperties}>
      <span
        ref={probeRef}
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", fontFamily: "var(--font-display)" }}
      />
      <DoodleCrewFooter
        wordmark="COBALT"
        brand="Cobalt Axis"
        brandLogo={<CobaltAxisLogo size="md" />}
        blurb="AI systems, autonomous workflows and digital products. Plain talk, sharp engineering, built for what comes next."
        statusBadge="Available for new projects"
        tagline="We engineer intelligence that moves businesses forward."
        columns={columns}
        actions={actions}
        copyright={`© ${year} Cobalt Axis. Hand-made builds.`}
        legal={[]}
        socials={[]}
        crew={crew}
        doodleCount={14}
        palette={{ accent: "var(--primary)" }}
        fontFamily={displayFamily}
        serifFamily="var(--font-sans)"
        height="740px"
      />
    </div>
  )
}
