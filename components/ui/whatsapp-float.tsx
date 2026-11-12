import { cn } from "@/lib/utils"

interface WhatsAppFloatProps {
  /**
   * Phone number in international format, digits only (e.g. "919347216338").
   * Defaults to NEXT_PUBLIC_WHATSAPP_PHONE so the number can be supplied via
   * environment configuration without touching the code.
   */
  phoneNumber?: string
  /** Message pre-filled in the WhatsApp compose window. */
  initialMessage?: string
}

/**
 * Subtle floating WhatsApp contact button, fixed bottom-right on every route.
 * Pure CSS behaviour: muted monochrome bubble that tints WhatsApp-green and
 * reveals a "Chat on WhatsApp" label on hover/focus. Reduced-motion users get
 * the same states without any transition (motion-reduce variants), so the
 * component needs no client-side state at all.
 */
export const WhatsAppFloat = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "919347216338",
  initialMessage = "Hi Cobalt Axis, I would like to discuss a project.",
}: WhatsAppFloatProps = {}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(initialMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "group fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-50",
        "flex items-center rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur-sm",
        "transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out",
        "hover:scale-105 hover:border-emerald-500/40 hover:bg-white/20 hover:shadow-lg hover:shadow-emerald-500/10",
        "dark:bg-slate-900/10 dark:hover:bg-slate-900/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
      )}
    >
      {/* WhatsApp glyph — muted by default, brand-green on hover. */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0 text-slate-400 transition-colors duration-300",
          "group-hover:text-emerald-500 dark:text-slate-500 dark:group-hover:text-emerald-400",
          "motion-reduce:transition-none",
        )}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>

      {/* "Chat on WhatsApp" label — revealed on hover/focus, no animation under reduced motion. */}
      <span
        className={cn(
          "pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-lg whitespace-nowrap",
          "border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-lg",
          "dark:border-white/10 dark:bg-slate-900 dark:text-white",
          "opacity-0 transition-opacity duration-300 ease-out",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
          "motion-reduce:transition-none",
        )}
      >
        Chat on WhatsApp
      </span>
    </a>
  )
}

export default WhatsAppFloat
