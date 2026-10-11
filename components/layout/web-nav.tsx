"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useActiveSection } from "@/hooks/use-active-section"
import { navItems, sectionIds } from "./nav-items"
import { scrollToSection } from "./scroll-to-section"
import { ThemeToggle } from "./theme-toggle"
import { CobaltAxisLogo } from "@/components/ui/logo"

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=919347216338&text=Hi+CobaltAxis%21+I%27m+interested+in+your+services.&type=phone_number&app_absent=0"

export const WebNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-60 hidden justify-center md:flex px-4 pointer-events-none">
      <motion.nav
        layout
        transition={{
          layout: { type: "spring", stiffness: 220, damping: 28, mass: 0.6 },
        }}
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-colors duration-500",
          scrolled
            ? "mt-4 w-fit max-w-[94vw] rounded-full border border-border/80 bg-background/90 px-5 py-2 lg:px-6 lg:py-2.5 shadow-2xl backdrop-blur-xl"
            : "mt-0 w-full max-w-[1380px] rounded-full border border-transparent bg-transparent px-4 py-6 md:px-12"
        )}
      >
        {/* Brand Logo */}
        <Link
          href="#top"
          onClick={(e) => scrollToSection(e, "#top")}
          className="flex items-center shrink-0 mr-3 lg:mr-6"
        >
          <CobaltAxisLogo size="sm" />
        </Link>

        {/* Navigation Items (single line, no wrapping) */}
        <ul className="flex items-center gap-0.5 lg:gap-1.5 text-xs font-mono font-medium whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href} className="relative shrink-0">
                <Link
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "relative z-10 block px-2.5 py-1.5 lg:px-3.5 lg:py-2 tracking-widest uppercase transition-colors whitespace-nowrap",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 z-0 rounded-full bg-muted/80"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA & Theme Controls */}
        <div className="flex items-center gap-2.5 lg:gap-3 shrink-0 ml-3 lg:ml-6">
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 whitespace-nowrap rounded-full border border-border/80 bg-background/60 px-3.5 py-1.5 lg:px-4 lg:py-1.5 text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.nav>
    </header>
  )
}
