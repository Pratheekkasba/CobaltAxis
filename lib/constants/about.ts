export const values = [
  {
    title: "Craft",
    desc: "We sweat the details others skip — the easing curve, the empty state, the last 5%.",
  },
  {
    title: "Candor",
    desc: "Direct, senior collaborators. No account-manager telephone, no hidden roadmaps.",
  },
  {
    title: "Momentum",
    desc: "Small teams, short loops, real work shipping every week — never a black box.",
  },
  {
    title: "Ownership",
    desc: "We treat your product like ours: outcomes over deliverables, always.",
  },
]

export type Fact = {
  value: number
  label: string
  count: boolean
  suffix?: string
}

export const facts: Fact[] = [
  { value: 2025, label: "Founded", count: false },
  { value: 8, label: "People", count: true },
  { value: 100, label: "In-house team", count: true, suffix: "%" },
]
