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
        "inline-flex items-center tracking-tight font-black select-none font-[family-name:var(--font-heading)] uppercase",
        sizeMap[size],
        withGlow && "drop-shadow-[0_0_12px_rgba(0,82,255,0.32)]",
        className
      )}
    >
      {/* COBALT in signature electric cobalt blue */}
      <span className="text-[#0052FF] dark:text-[#2563EB] tracking-wider font-extrabold">
        COBALT
      </span>
      {/* Hyphen in cobalt blue */}
      <span className="text-[#0052FF] dark:text-[#2563EB] font-bold mx-0.5">
        -
      </span>
      {/* AXIS with custom slashed X */}
      <span className="inline-flex items-center text-foreground font-extrabold tracking-wider">
        <span>A</span>
        {/* Custom X with extended vibrant cobalt slash */}
        <span className="relative inline-flex items-center justify-center px-[1px]">
          <span className="text-foreground">X</span>
          {/* Diagonal laser axis slice overlay */}
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <svg
              className="w-[125%] h-[140%] overflow-visible"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="3"
                y1="22"
                x2="21"
                y2="2"
                stroke="#0052FF"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_4px_#0052FF]"
              />
            </svg>
          </span>
        </span>
        <span>IS</span>
      </span>
    </div>
  )
}
