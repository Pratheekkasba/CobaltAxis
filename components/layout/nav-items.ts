// Shared navigation targets for Cobalt Axis
export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Idea", href: "#idea" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

// Section ids the scroll-spy watches (stable module-level reference).
export const sectionIds = navItems.map((item) => item.href.slice(1))
