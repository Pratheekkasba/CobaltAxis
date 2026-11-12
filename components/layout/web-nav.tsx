"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items"
import { CobaltAxisLogo } from "@/components/ui/logo"
import { ThemeToggle } from "./theme-toggle"

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=919347216338&text=Hi+CobaltAxis%21+I%27m+interested+in+your+services.&type=phone_number&app_absent=0"

// True when the current route is this nav item's page (or nested under it).
// Null-safe: pathname is null in some test/static contexts.
const isRouteActive = (pathname: string | null, href: string) => {
  if (pathname === null) return false
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const WebNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-60 hidden justify-center px-4 md:flex">
      <motion.nav
        layout
        transition={{
          layout: { type: "spring", stiffness: 220, damping: 28, mass: 0.6 },
        }}
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-colors duration-200",
          scrolled
            ? "mt-4 w-fit max-w-[94vw] rounded-full border border-border/80 bg-background/90 px-5 py-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0F1524]/80 dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] lg:px-6 lg:py-2.5"
            : "mt-0 w-full max-w-[1380px] rounded-full border border-transparent bg-transparent px-4 py-6 md:px-12"
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="mr-3 flex shrink-0 items-center lg:mr-6">
          <CobaltAxisLogo size="sm" />
        </Link>

        {/* Navigation Items (single line, no wrapping) */}
        <ul className="flex items-center gap-0.5 font-mono text-xs font-medium whitespace-nowrap lg:gap-1.5">
          {navItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href)
            return (
              <li key={item.href} className="relative shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "relative z-10 block px-2.5 py-2 tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-200 lg:px-3.5",
                    isActive
                      ? "font-semibold text-foreground opacity-100"
                      : "text-muted-foreground opacity-75 hover:text-foreground hover:opacity-100"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-[#6B7DFF]"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Theme Toggle + CTA */}
        <div className="ml-3 flex shrink-0 items-center gap-2.5 lg:ml-6 lg:gap-3">
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold tracking-wider whitespace-nowrap text-primary-foreground uppercase transition-colors duration-300 hover:bg-accent-foreground"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.nav>
    </header>
  )
}
