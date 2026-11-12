"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
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

// Mobile navigation. Below 768px renders logo on left, theme toggle +
// hamburger on right, and a full-width dropdown sheet under the navbar.
export const MobileNav = () => {
  const [openForPath, setOpenForPath] = useState<string | null | undefined>(
    undefined
  )
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const open = openForPath !== undefined && openForPath === pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close dropdown sheet on outside tap
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenForPath(undefined)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  return (
    <div ref={containerRef} className="md:hidden">
      <header className="fixed inset-x-0 top-0 z-60 flex justify-center">
        <div
          className={cn(
            "flex w-full items-center justify-between px-6 py-4 transition-all duration-300 ease-out",
            scrolled &&
              "mt-3 w-[92%] rounded-full border border-border bg-background/85 px-5 py-2.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0F1524]/85"
          )}
        >
          <Link
            href="/"
            onClick={() => setOpenForPath(undefined)}
            className="flex items-center"
          >
            <CobaltAxisLogo size="sm" />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpenForPath(open ? undefined : pathname)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-foreground transition-colors hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-[74px] z-50 border-y border-border bg-background/95 px-6 pb-6 pt-2 text-foreground shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0F1524]/95"
          >
            <nav aria-label="Mobile navigation">
              <ul className="divide-y divide-border dark:divide-white/[0.08]">
                {navItems.map((item) => {
                  const isActive = isRouteActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpenForPath(undefined)}
                        className={cn(
                          "flex min-h-[56px] items-center justify-between font-mono text-base tracking-[0.14em] uppercase transition-colors hover:text-foreground",
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-[#6B7DFF]"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpenForPath(undefined)}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-accent-foreground"
              >
                Let&apos;s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
