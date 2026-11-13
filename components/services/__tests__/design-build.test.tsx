import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { DesignBuild } from "../design-build"

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one
// to attach to. A no-op stub keeps the component renderable in tests.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
if (typeof globalThis.IntersectionObserver === "undefined") {
  ;(
    globalThis as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = IntersectionObserverStub
}

// The secondary pillar: two alternating split rows, each with an offset
// image pair and a checklist whose cobalt checks draw in on scroll.
describe("DesignBuild", () => {
  it("renders the section header with the pillar eyebrow", () => {
    renderWithProviders(<DesignBuild />)

    expect(screen.getByText("Secondary pillar")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Design & build." })
    ).toBeInTheDocument()
  })

  it("renders both discipline rows with their checklists", () => {
    renderWithProviders(<DesignBuild />)

    expect(
      screen.getByRole("heading", { name: "Art Direction & Brand Strategy" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Web Design & Motion Design" })
    ).toBeInTheDocument()

    const items = [
      "Visual Identity Systems",
      "Brand Positioning",
      "Typography & Swatch Libraries",
      "Component Systems",
      "High-Fidelity UI/UX",
      "3D & Micro-Interactions",
      "Interactive Landing Pages",
      "Lottie Animations",
    ]
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it("renders the four stacked illustrations", () => {
    renderWithProviders(<DesignBuild />)

    expect(screen.getAllByRole("img")).toHaveLength(4)
    expect(
      screen.getByAltText(/robotic cranes assembling a website/i)
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(/kinetic motion machine/i)
    ).toBeInTheDocument()
  })

  it("anchors the section at #design-build", () => {
    const { container } = renderWithProviders(<DesignBuild />)

    expect(container.querySelector("#design-build")).not.toBeNull()
  })
})
