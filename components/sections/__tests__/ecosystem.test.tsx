import {
  describe,
  expect,
  it,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Ecosystem } from "../ecosystem"

const capabilityLabels = [
  "Autonomous AI Agents",
  "Applied RAG & Search",
  "Workflow Orchestration",
  "Full-Stack Web Apps",
  "Cloud Infrastructure",
  "API & Data Pipelines",
]

describe("Ecosystem", () => {
  it("renders the section heading and six capability labels", () => {
    renderWithProviders(<Ecosystem />)

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /built to run in production/i,
      })
    ).toBeInTheDocument()

    for (const label of capabilityLabels) {
      expect(
        Array.from(document.querySelectorAll(".ecosystem-label")).some((el) =>
          el.textContent?.includes(label)
        )
      ).toBe(true)
    }
  })

  it("renders the supplied artwork with descriptive alt text", () => {
    renderWithProviders(<Ecosystem />)

    expect(
      screen.getByRole("img", { name: /isometric illustration/i })
    ).toBeInTheDocument()
  })

  it("renders the three compact deployment target cards", () => {
    renderWithProviders(<Ecosystem />)

    expect(screen.getByText("Private Cloud & VPC")).toBeInTheDocument()
    expect(screen.getByText("Cloud & Edge Mesh")).toBeInTheDocument()
    expect(screen.getByText("Team Apps & Consoles")).toBeInTheDocument()
  })

  it("duplicates the capabilities marquee for a seamless loop", () => {
    renderWithProviders(<Ecosystem />)

    // One visible group, one aria-hidden copy for the loop.
    expect(screen.getAllByText("RAG Pipelines")).toHaveLength(2)
    expect(screen.getAllByText("LLM Orchestration")).toHaveLength(2)
  })
})
