import type { MouseEvent } from "react"
import { scrollTo } from "@/hooks/use-lenis"

// Reliable in-page anchor navigation using Lenis smooth scroll when active,
// with graceful fallback for reduced motion.
export const scrollToSection = (e: MouseEvent, href: string) => {
  if (!href.startsWith("#")) return
  const el = document.getElementById(href.slice(1))
  if (!el) return

  e.preventDefault()
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!reduce) {
    scrollTo(el, { offset: -90, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: "auto" })
  }

  window.history.replaceState(null, "", href)
}
