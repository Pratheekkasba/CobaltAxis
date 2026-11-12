import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Approach } from "../approach"

describe("Approach", () => {
  it("renders the section heading", () => {
    renderWithProviders(<Approach />)

    expect(screen.getByText("Section 04 / Our Approach")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /how we engineer/i }),
    ).toBeInTheDocument()
  })

  it("renders the convergence nodes and three parallel paths", () => {
    renderWithProviders(<Approach />)

    expect(screen.getByText("Business as usual.")).toBeInTheDocument()
    expect(screen.getByText("Business as code.")).toBeInTheDocument()
    expect(screen.getByText("IN /")).toBeInTheDocument()
    expect(screen.getByText("OUT /")).toBeInTheDocument()

    expect(screen.getByText("AI Agents &")).toBeInTheDocument()
    expect(screen.getByText("Applied RAG")).toBeInTheDocument()
    expect(screen.getByText("Autonomous")).toBeInTheDocument()
    expect(screen.getByText("Workflows")).toBeInTheDocument()
    expect(screen.getByText("Cloud & Web")).toBeInTheDocument()
    expect(screen.getByText("Engineering")).toBeInTheDocument()
  })

  it("renders the four execution stages", () => {
    renderWithProviders(<Approach />)

    ;["Understand", "Architect", "Engineer", "Deploy"].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })
})
