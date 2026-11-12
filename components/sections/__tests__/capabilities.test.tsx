import {
  describe,
  expect,
  it,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Capabilities } from "../capabilities"

const pillarTitles = [
  "AI Agents & Knowledge Engines",
  "Autonomous Workflows",
  "Web Apps & Cloud Systems",
]

describe("Capabilities", () => {
  it("renders the section heading, description and three pillars", () => {
    renderWithProviders(<Capabilities />)

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /three pillars\. one connected stack\./i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/from context-aware ai agents to 60fps digital products/i)
    ).toBeInTheDocument()

    for (const title of pillarTitles) {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument()
    }
  })

  it("renders the 2x2 architectural spec matrices", () => {
    renderWithProviders(<Capabilities />)

    expect(document.querySelectorAll(".capability-cell")).toHaveLength(12)
    expect(screen.getAllByText("Automated Decisioning")).toHaveLength(1)
    expect(screen.getAllByText("Custom API Integrations")).toHaveLength(1)
    expect(screen.getAllByText("Internal Tools & Portals")).toHaveLength(1)
  })

  it("renders the three framed illustrations cleanly without overlay text", () => {
    renderWithProviders(<Capabilities />)

    const frames = screen.getAllByRole("img", {
      name: /isometric illustration/i,
    })
    expect(frames).toHaveLength(3)

    expect(
      screen.queryByText("FIG 03.1 // RAG_CONTEXT_GRAPH")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("SYS.01 // CONTEXT_RAG_ENGINE")
    ).not.toBeInTheDocument()
  })
})
