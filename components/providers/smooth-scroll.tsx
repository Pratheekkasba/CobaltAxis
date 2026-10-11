"use client"

import { useLenis } from "@/hooks/use-lenis"
import type { ReactNode } from "react"

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useLenis()
  return <>{children}</>
}
