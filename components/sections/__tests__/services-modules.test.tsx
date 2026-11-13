import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { ServicesModules } from "../services-modules"

// The engine section: seven numbered module cards plus Figure 1, the
// routing diagram with its caption.
describe("ServicesModules", () => {
  it("renders the section heading", () => {
    renderWithProviders(<ServicesModules />)

    expect(
      screen.getByRole("heading", { name: "Seven modules. One machine." })
    ).toBeInTheDocument()
  })

  it("renders all seven modules with deck numbering", () => {
    renderWithProviders(<ServicesModules />)

    const modules = [
      "Intelligent Systems",
      "Autonomous Workflows",
      "Applied AI & RAG",
      "Cloud Architectures",
      "60 FPS Web Apps",
      "Research Prototypes",
      "High-Velocity UI",
    ]

    modules.forEach((title) => {
      expect(
        screen.getByRole("heading", { name: title })
      ).toBeInTheDocument()
    })

    // Deck numbers 08–14 appear as the card indices.
    const deckNumbers = ["08", "09", "10", "11", "12", "13", "14"]
    deckNumbers.forEach((n) => {
      expect(screen.getByText(n)).toBeInTheDocument()
    })

    expect(screen.getByText("The core")).toBeInTheDocument()
  })

  it("renders Figure 1 with its caption and guarantee badge", () => {
    renderWithProviders(<ServicesModules />)

    expect(
      screen.getByRole("img", { name: /raw work enters the engine/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/Figure 1\. Raw work enters the engine/i)).toBeInTheDocument()
    expect(
      screen.getByText("Human-in-the-loop by default")
    ).toBeInTheDocument()
  })
})
