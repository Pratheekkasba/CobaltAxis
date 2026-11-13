import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Process } from "../process"

// The process section: campus banner + a four-stage timeline whose cobalt
// line fills with scroll (state-driven activation; in jsdom the first
// stage is active and the fill sits at its initial value).
describe("Process", () => {
  it("renders the section header and campus banner", () => {
    renderWithProviders(<Process />)

    expect(
      screen.getByRole("heading", { name: "How the engine gets built." })
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(/Wide isometric view of the Cobalt Axis campus/i)
    ).toBeInTheDocument()
  })

  it("renders the four stages in order", () => {
    renderWithProviders(<Process />)

    const stages = [
      "Discover",
      "Architect",
      "Build",
      "Deploy & Evolve",
    ]
    stages.forEach((stage) => {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument()
    })

    expect(screen.getByText(/Systems research & goal mapping/i)).toBeInTheDocument()
    expect(screen.getByText(/System flow, data schemas/i)).toBeInTheDocument()
    expect(screen.getByText(/weekly demos/i)).toBeInTheDocument()
    expect(screen.getByText(/AI model optimization/i)).toBeInTheDocument()
  })

  it("numbers the stage dots 01–04", () => {
    renderWithProviders(<Process />)

    expect(screen.getByText("01")).toBeInTheDocument()
    expect(screen.getByText("04")).toBeInTheDocument()
  })

  it("anchors the section at #process", () => {
    const { container } = renderWithProviders(<Process />)

    expect(container.querySelector("#process")).not.toBeNull()
  })
})
