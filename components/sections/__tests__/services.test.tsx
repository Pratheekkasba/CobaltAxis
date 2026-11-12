import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Services } from "../services"

// Services renders the sticky pitch, the live readout and one interactive
// row per discipline — each discipline appears once in the DOM.
describe("Services", () => {
  it("renders the section heading and pitch", () => {
    renderWithProviders(<Services />)

    expect(screen.getByText("The disciplines")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "How we deliver." })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/one compact team carries your project/i)
    ).toBeInTheDocument()
  })

  it("renders every discipline with its deliverables", () => {
    renderWithProviders(<Services />)

    const disciplines = [
      "Art Direction",
      "Brand Strategy",
      "Web Design",
      "Development",
      "Motion Design",
      "Maintenance",
    ]

    disciplines.forEach((title) => {
      expect(
        screen.getByRole("heading", { name: title })
      ).toBeInTheDocument()
    })

    // Deliverable chips from the shared constants.
    expect(screen.getByText("Visual language")).toBeInTheDocument()
    expect(screen.getByText("Performance budgets")).toBeInTheDocument()
    expect(screen.getByText("Loading choreography")).toBeInTheDocument()
  })

  it("renders the pillar feed tags and the mini stats stack", () => {
    renderWithProviders(<Services />)

    expect(screen.getByText("SYS.01 · SYS.02 · SYS.03")).toBeInTheDocument()
    expect(screen.getByText("Disciplines")).toBeInTheDocument()
    expect(screen.getByText("Senior team")).toBeInTheDocument()
  })
})
