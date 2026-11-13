import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { HighVelocity } from "../high-velocity"

// jsdom has no IntersectionObserver; framer-motion's whileInView/useInView
// need one to attach to. A no-op stub keeps the component renderable —
// count-up badges stay at their initial "0" in this environment.
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

// The speed-numbers band: four feature rows with count-up speed badges
// on a soft in-theme neutral band.
describe("HighVelocity", () => {
  it("renders the section header", () => {
    renderWithProviders(<HighVelocity />)

    expect(screen.getByText("High velocity")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Fast is a feature." })
    ).toBeInTheDocument()
  })

  it("renders all four feature rows", () => {
    renderWithProviders(<HighVelocity />)

    const titles = [
      "60 FPS Web Apps",
      "High-Velocity UI & Rapid Sprint",
      "Research Prototypes (R&D)",
      "Continuous Maintenance & Monitoring",
    ]
    titles.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
    })

    expect(screen.getByText(/Ultra-smooth React/i)).toBeInTheDocument()
    expect(screen.getByText(/48-hour turnarounds/i)).toBeInTheDocument()
    expect(screen.getByText(/Rapid MVP development/i)).toBeInTheDocument()
    expect(screen.getByText(/99.9% uptime SLA/i)).toBeInTheDocument()
  })

  it("renders the four speed badges with accessible values", () => {
    renderWithProviders(<HighVelocity />)

    expect(screen.getByText("60 frames per second")).toBeInTheDocument()
    expect(screen.getByText("48-hour turnaround")).toBeInTheDocument()
    expect(screen.getByText("MVP prototype builds")).toBeInTheDocument()
    expect(screen.getByText("99.9 percent uptime")).toBeInTheDocument()
  })

  it("renders the four illustrations and anchors at #high-velocity", () => {
    const { container } = renderWithProviders(<HighVelocity />)

    expect(screen.getAllByRole("img")).toHaveLength(4)
    expect(container.querySelector("#high-velocity")).not.toBeNull()
  })

  it("carries data-service hooks the bottleneck CTA can highlight", () => {
    const { container } = renderWithProviders(<HighVelocity />)

    for (const service of [
      "60fps-web-apps",
      "high-velocity-ui",
      "research-prototypes",
      "maintenance-monitoring",
    ]) {
      expect(
        container.querySelector(`[data-service="${service}"]`)
      ).not.toBeNull()
    }
  })
})
