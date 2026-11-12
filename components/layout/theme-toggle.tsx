"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const emptySubscribe = () => () => {}

type ThemeToggleProps = {
  className?: string
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-transparent text-foreground transition-colors duration-200 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5",
        className
      )}
    >
      <span className="relative size-4" aria-hidden="true">
        <Moon
          className={cn(
            "absolute inset-0 size-4 transition-all duration-200",
            !mounted
              ? "opacity-0 scale-75 rotate-45"
              : isDark
                ? "opacity-0 scale-75 -rotate-90"
                : "opacity-100 scale-100 rotate-0"
          )}
        />
        <Sun
          className={cn(
            "absolute inset-0 size-4 transition-all duration-200",
            !mounted
              ? "opacity-0 scale-75 -rotate-45"
              : isDark
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-90"
          )}
        />
      </span>
    </button>
  )
}
