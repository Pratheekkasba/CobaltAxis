import { cn } from "@/lib/utils"

type SparkleMarkProps = {
  className?: string
  style?: React.CSSProperties
}

// Small cobalt plus-sparkle matching the ones inside the city illustration.
export const SparkleMark = ({ className, style }: SparkleMarkProps) => (
  <svg
    viewBox="0 0 16 16"
    className={cn("h-auto", className)}
    style={style}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M8 1.5v13M1.5 8h13"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
)
