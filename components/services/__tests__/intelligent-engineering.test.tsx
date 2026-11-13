import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { IntelligentEngineering } from "../intelligent-engineering"

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

// The priority band: four engineering systems as ServiceCards with chips.
describe("IntelligentEngineering", () => {
  it("renders the section header", () => {
    renderWithProviders(<IntelligentEngineering />)

    expect(
      screen.getByRole("heading", { name: "What we engineer." })
    ).toBeInTheDocument()
    expect(screen.getByText("Intelligent Engineering")).toBeInTheDocument()
    expect(
      screen.getByText(/Four practices, one connected core/i)
    ).toBeInTheDocument()
  })

  it("renders the four system cards", () => {
    renderWithProviders(<IntelligentEngineering />)

    const titles = [
      "Intelligent Systems & Decision Engines",
      "Autonomous Workflows & AI Agents",
      "Applied AI & RAG",
      "Cloud & AI Infrastructure",
    ]
    titles.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
    })
  })

  it("renders capability chips on the cards", () => {
    renderWithProviders(<IntelligentEngineering />)

    expect(screen.getByText("Real-time Data Pipelines")).toBeInTheDocument()
    expect(screen.getByText("AI Agent Orchestration")).toBeInTheDocument()
    expect(screen.getByText("RAG Knowledge Bases")).toBeInTheDocument()
    expect(screen.getByText("AWS / GCP Infrastructure")).toBeInTheDocument()

    // Card indices 01–04.
    expect(screen.getByText("01")).toBeInTheDocument()
    expect(screen.getByText("04")).toBeInTheDocument()
  })

  it("anchors the section at #intelligent-engineering", () => {
    const { container } = renderWithProviders(<IntelligentEngineering />)

    expect(
      container.querySelector("#intelligent-engineering")
    ).not.toBeNull()
  })
})
