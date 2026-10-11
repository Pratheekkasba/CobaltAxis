"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let lenisInstance: Lenis | null = null

export function useLenis() {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisInstance = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      lenisInstance = null
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return lenisInstance
}

export function scrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number }
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options)
  }
}

export function getLenis() {
  return lenisInstance
}
