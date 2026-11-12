"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  withGlow?: boolean
}

export const CobaltAxisLogo = ({
  className,
  size = "md",
  withGlow = false,
}: LogoProps) => {
  const sizeMap = {
    sm: "h-6 text-lg",
    md: "h-8 text-2xl",
    lg: "h-11 text-3xl",
    xl: "h-16 text-5xl",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center tracking-tight font-semibold select-none font-[family-name:var(--font-display)] uppercase",
        sizeMap[size],
        withGlow && "drop-shadow-[0_0_12px_rgba(86,105,255,0.32)]",
        className
      )}
    >
      {/* COBALT in signature electric cobalt */}
      <span className="text-primary tracking-wider">
        COBALT
      </span>
      {/* Hyphen in cobalt */}
      <span className="text-primary mx-0.5">
        -
      </span>
      {/* AXIS with custom slashed X */}
      <span className="inline-flex items-center text-foreground tracking-wider">
        <span>A</span>
        {/* Custom X with navy backslash and extended cobalt forward slash */}
        <span className="relative inline-flex items-center justify-center mx-[1px] h-[0.88em] w-[0.82em]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Navy backslash (\) */}
            <line
              x1="5"
              y1="5"
              x2="19"
              y2="19"
              className="stroke-foreground"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            {/* Extended cobalt forward slash (/) */}
            <line
              x1="1.5"
              y1="22.5"
              x2="22.5"
              y2="1.5"
              className="stroke-primary drop-shadow-[0_0_5px_rgba(86,105,255,0.6)]"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span>IS</span>
      </span>
    </div>
  )
}
