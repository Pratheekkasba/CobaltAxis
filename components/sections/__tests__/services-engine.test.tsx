import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { ServicesEngine } from "../services-engine"

// The engine section renders the diagram plus one row per deck module
// (08–14) — each module appears once in the DOM.
describe("ServicesEngine", () => {
  it("renders the section heading", () => {
    renderWithProviders(<ServicesEngine />)

    expect(screen.getByText("The intelligent engine")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "One engine. Seven modules." })
    ).toBeInTheDocument()
  })

  it("renders all seven modules with their deliverables", () => {
    renderWithProviders(<ServicesEngine />)

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
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument()
    })

    // Deliverable chips from the engine constants.
    expect(screen.getByText("Guardrails & Evals")).toBeInTheDocument()
    expect(screen.getByText("Performance Budgets")).toBeInTheDocument()
    expect(screen.getByText("Interaction Telemetry")).toBeInTheDocument()
  })

  it("renders the engine diagram and the nominal readout", () => {
    renderWithProviders(<ServicesEngine />)

    expect(
      screen.getByRole("img", { name: /intelligent engine/i })
    ).toBeInTheDocument()
    expect(screen.getByText("ALL SYSTEMS // NOMINAL")).toBeInTheDocument()
    expect(screen.getByText("Engine // Live")).toBeInTheDocument()
  })
})
