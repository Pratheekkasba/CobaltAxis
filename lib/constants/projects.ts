// All demo project data lives here. The GraphQL client/service are kept for
// reference but are no longer used by the UI — swap this for a real API
// (ideally one with images) when ready.

export type ProjectSection = { label: string; body: string }
export type ProjectResult = { value: string; label: string }

export type Project = {
  id: string
  /** URL segment for the case-study page: /work/[slug]. */
  slug: string
  title: string
  category: string
  year: number
  accent: string
  tags: string[]
  image?: string
  excerpt: string
  sections: ProjectSection[]
  results: ProjectResult[]
}

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1200/900`

const baseSections = (
  title: string,
  category: string,
  overview: string
): ProjectSection[] => [
  { label: "Overview", body: overview },
  {
    label: "Challenge",
    body: `${title} came to us with a fragmented ${category.toLowerCase()} presence — inconsistent across touchpoints and hard to scale. The brief: unify it into one confident system without slowing the team down.`,
  },
  {
    label: "Approach",
    body: "We ran a focused discovery sprint, set the visual and technical foundations, then designed and built in tight weekly loops — shipping real work stakeholders could react to instead of static decks.",
  },
  {
    label: "Outcome",
    body: "A fast, accessible, unmistakably premium experience the team can extend on their own — with metrics that moved in the right direction from launch.",
  },
]

export const projects: Project[] = [
  {
    id: "clns",
    slug: "clns",
    title: "CLNS",
    category: "LegalTech",
    year: 2026,
    accent: "#0052FF",
    tags: ["LegalTech", "Ecosystem", "Platform Design"],
    image: "/images/projects/clns.png",
    excerpt:
      "Centralised Legal Network Solutions — connecting clients, advocates, law students, and businesses in a unified legal ecosystem.",
    sections: [
      {
        label: "Overview",
        body: "CLNS is a legal-tech ecosystem connecting clients, advocates, law students, and businesses through accessible legal services, professional networking, and practical learning opportunities.",
      },
      {
        label: "Challenge",
        body: "Legal services and professional opportunities remain fragmented, making it difficult for people to find the right legal support and for students to gain practical exposure.",
      },
      {
        label: "Approach",
        body: "We shaped a unified digital experience around legal-service discovery, advocate onboarding, student opportunities, mentorship, and streamlined legal workflows — bringing the legal ecosystem closer together.",
      },
      {
        label: "Outcome",
        body: "A vision for a more connected, accessible, and modern legal ecosystem, designed to simplify legal journeys and create meaningful opportunities for both clients and legal professionals.",
      },
    ],
    results: [
      { value: "4", label: "Core user groups" },
      { value: "3", label: "Digital platforms envisioned" },
      { value: "1", label: "Connected legal ecosystem" },
    ],
  },
  {
    id: "orbit",
    slug: "orbit-commerce",
    title: "Orbit Commerce",
    category: "E-Commerce",
    year: 2025,
    accent: "#06b6d4",
    tags: ["Web", "Design System", "Development"],
    image: img("orbit-commerce"),
    excerpt:
      "A headless storefront that turned a slow catalogue into a fast, editorial shopping experience.",
    sections: baseSections(
      "Orbit Commerce",
      "E-Commerce",
      "Orbit sells design-led homeware to a global audience. We rebuilt their storefront as a headless, edge-rendered experience that loads instantly and merchandises like a magazine."
    ),
    results: [
      { value: "+64%", label: "Conversion" },
      { value: "0.9s", label: "Largest paint" },
      { value: "8 wks", label: "To launch" },
    ],
  },
  {
    id: "halo",
    slug: "halo-health",
    title: "Halo Health",
    category: "Product Design",
    year: 2024,
    accent: "#10b981",
    tags: ["UX", "Product", "Motion"],
    image: img("halo-health"),
    excerpt:
      "A calm, trustworthy patient app that makes managing care feel effortless.",
    sections: baseSections(
      "Halo Health",
      "Product Design",
      "Halo helps people manage chronic care from their phone. We designed a product language that stays calm under pressure and guides patients through anxious moments with clarity."
    ),
    results: [
      { value: "+120%", label: "Weekly active" },
      { value: "4.8★", label: "App rating" },
      { value: "10 wks", label: "To beta" },
    ],
  },
  {
    id: "vertex",
    slug: "vertex-studio",
    title: "Vertex Studio",
    category: "Branding",
    year: 2025,
    accent: "#f59e0b",
    tags: ["Identity", "Art Direction", "Web"],
    image: img("vertex-studio"),
    excerpt:
      "A bold identity system for an architecture studio that builds the impossible.",
    sections: baseSections(
      "Vertex Studio",
      "Branding",
      "Vertex designs landmark buildings. Their brand needed the same ambition — a confident wordmark, a flexible grid, and a site that lets the work breathe."
    ),
    results: [
      { value: "3×", label: "Inbound leads" },
      { value: "12", label: "Awards" },
      { value: "6 wks", label: "To rollout" },
    ],
  },
  {
    id: "flux",
    slug: "flux-labs",
    title: "Flux Labs",
    category: "Web Platform",
    year: 2024,
    accent: "#ec4899",
    tags: ["Web", "Development", "Motion"],
    image: img("flux-labs"),
    excerpt:
      "A developer platform site that makes complex infrastructure feel approachable.",
    sections: baseSections(
      "Flux Labs",
      "Web Platform",
      "Flux ships real-time infrastructure for engineers. We turned a dense technical story into an interactive site that demonstrates the product instead of just describing it."
    ),
    results: [
      { value: "+140%", label: "Signups" },
      { value: "1.2s", label: "Largest paint" },
      { value: "9 wks", label: "To launch" },
    ],
  },
]

// The Case Study section's featured project.
export const featuredProject: Project = {
  id: "nova",
  slug: "nova-finance",
  title: "Nova Finance",
  category: "Fintech · Rebrand",
  year: 2025,
  accent: "#8b5cf6",
  tags: ["Strategy", "Identity", "Web", "Product"],
  image: img("nova-finance"),
  excerpt:
    "We rebuilt Nova from the ground up — a new identity, a marketing site, and a product dashboard — unifying a fragmented experience into one confident, fast, and unmistakably premium platform.",
  sections: [
    {
      label: "Overview",
      body: "Nova Finance is a next-generation money app for a generation that expects software to feel effortless. We partnered end-to-end — brand, marketing site, and product dashboard — to make a fragmented experience feel like one confident platform.",
    },
    {
      label: "Challenge",
      body: "Rapid growth had left Nova with three disconnected design languages and a marketing site that couldn't keep up. Trust was leaking at exactly the moments that mattered most: onboarding and first deposit.",
    },
    {
      label: "Approach",
      body: "We rebuilt from first principles — a new identity system, a component library shared across web and product, and a conversion-focused site. Everything shipped in weekly increments the Nova team could pressure-test with real users.",
    },
    {
      label: "Outcome",
      body: "A cohesive, premium platform that reads as trustworthy at a glance and scales without us. Signups climbed, load times dropped, and the team now ships new surfaces on the system by themselves.",
    },
  ],
  results: [
    { value: "+240%", label: "Signup conversion" },
    { value: "1.8s", label: "Largest paint" },
    { value: "12 wks", label: "Concept to launch" },
  ],
}

// Everything linkable from the Work page and case-study routes: the flagship
// first, then the rest. Home uses `projects` for its compact highlight reel.
export const allProjects: Project[] = [featuredProject, ...projects]
