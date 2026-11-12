// Shared navigation targets for Cobalt Axis. The site is multi-page now:
// every item is a real route, and the active one is highlighted via pathname.
export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/work" },
  { label: "Team", href: "/about" },
  { label: "Contact", href: "/contact" },
]
