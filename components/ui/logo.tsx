"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  withGlow?: boolean
}

/**
 * The official Cobalt Axis wordmark, rebuilt as a transparent, theme-adaptive
 * vector: "COBALT-" in signature cobalt, "AXIS" in the foreground ink, and the
 * X drawn as the brand's two diagonals — a foreground backslash crossed by an
 * extended cobalt forward slash. Michroma carries the Eurostile-Extended-style
 * letterforms of the logo, so the mark stays crisp at any size (and stays
 * visible on both light and dark canvases — a bitmap of the white "AXIS"
 * variant would vanish on white).
 */
export const CobaltAxisLogo = ({
  className,
  size = "md",
  withGlow = false,
}: LogoProps) => {
  const sizeMap = {
    sm: "h-6 text-[15px]",
    md: "h-8 text-xl",
    lg: "h-11 text-2xl",
    xl: "h-16 text-4xl",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center font-[family-name:var(--font-logo)] tracking-[0.015em] select-none uppercase",
        sizeMap[size],
        withGlow && "drop-shadow-[0_0_12px_rgba(86,105,255,0.32)]",
        className
      )}
    >
      {/* COBALT in signature electric cobalt */}
      <span className="text-primary">
        COBALT
      </span>
      {/* Hyphen in cobalt */}
      <span className="text-primary mx-[0.12em]">
        -
      </span>
      {/* AXIS with custom slashed X */}
      <span className="inline-flex items-center text-foreground">
        <span>A</span>
        {/* Custom X with foreground backslash and extended cobalt forward slash */}
        <span className="relative mx-[0.08em] inline-flex h-[0.98em] w-[0.92em] items-center justify-center">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Foreground backslash (\) */}
            <line
              x1="4.6"
              y1="4.6"
              x2="19.4"
              y2="19.4"
              className="stroke-foreground"
              strokeWidth="3.1"
              strokeLinecap="butt"
            />
            {/* Extended cobalt forward slash (/) — overshoots the cap height */}
            <line
              x1="1.2"
              y1="24.6"
              x2="22.8"
              y2="-1.4"
              className="stroke-primary drop-shadow-[0_0_5px_rgba(86,105,255,0.6)]"
              strokeWidth="3.1"
              strokeLinecap="butt"
            />
          </svg>
        </span>
        <span>IS</span>
      </span>
    </div>
  )
}
