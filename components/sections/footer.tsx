"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { scrollToSection } from "@/components/layout/scroll-to-section"
import { CobaltAxisLogo } from "@/components/ui/logo"

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cobaltaxis.in?dlrf=d3AxOXF2bWI0Ymlh",
  },
  { label: "X", href: "https://x.com/CobaltAxis" },
  { label: "LinkedIn", href: "https://linkedin.com/company/cobaltaxis" },
]

export const Footer = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const magnetRef = useRef<HTMLAnchorElement>(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    const wrap = wrapRef.current
    const magnet = magnetRef.current
    if (!wrap || !magnet) return

    const mm = gsap.matchMedia()
    // Magnetic pull — desktop pointers only, and never when motion is reduced.
    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3" })
        const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3" })

        const onMove = (e: MouseEvent) => {
          const rect = magnet.getBoundingClientRect()
          const relX = e.clientX - (rect.left + rect.width / 2)
          const relY = e.clientY - (rect.top + rect.height / 2)
          xTo(relX * 0.35)
          yTo(relY * 0.35)
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }

        wrap.addEventListener("mousemove", onMove)
        wrap.addEventListener("mouseleave", onLeave)
        return () => {
          wrap.removeEventListener("mousemove", onMove)
          wrap.removeEventListener("mouseleave", onLeave)
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <footer
      className="mt-32 border-t border-border pt-16 md:pt-20"
    >
      <div className="md:flex md:items-center md:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-8 text-5xl leading-[0.95] font-black tracking-tighter uppercase md:text-8xl"
        >
          Got a project?
          <br />
          <span className="text-primary">Let&apos;s talk.</span>
        </motion.h2>

        {/* Magnetic WhatsApp button */}
        <div ref={wrapRef} className="mt-12 flex w-fit shrink-0 p-6">
          <a
            ref={magnetRef}
            href="https://api.whatsapp.com/send/?phone=919347216338&text=Hi+CobaltAxis%21+I%27m+interested+in+your+services.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 rounded-full border border-border px-8 py-5 text-xl font-medium transition-colors duration-300 hover:bg-foreground hover:text-background md:text-3xl"
          >
            Chat on WhatsApp
            <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-8" />
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-24 flex flex-col gap-6 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <CobaltAxisLogo size="sm" />
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:office@cobaltaxis.in"
              className="tracking-widest uppercase transition-colors hover:text-foreground text-[#0052FF] font-medium"
            >
              office@cobaltaxis.in
            </a>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="tracking-widest uppercase transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <span className="order-last md:order-0">
          © {year} Cobalt Axis. All rights reserved.
        </span>

        <a
          href="#top"
          onClick={(e) => scrollToSection(e, "#top")}
          className="group flex items-center gap-2 tracking-widest uppercase transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
        </a>
      </div>
    </footer>
  )
}
