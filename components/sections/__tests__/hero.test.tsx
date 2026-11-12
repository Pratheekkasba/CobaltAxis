import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Hero } from "../hero"

describe("Hero", () => {
  it("renders the new positioning headline and eyebrow", () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByText(/applied ai & product engineering/i)
    ).toBeInTheDocument()

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent(/engineer intelligence/i)
    expect(heading).toHaveTextContent(/automate what comes next/i)
  })

  it("renders the description and capability index", () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByText(/autonomous ai agents, self-driving workflows/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText("AI Agents / Workflow Automation / Web Engineering")
    ).toBeInTheDocument()
  })

  it("routes the primary and secondary calls to action", () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByRole("link", { name: /start a conversation/i })
    ).toHaveAttribute("href", "/contact")
    expect(
      screen.getByRole("link", { name: /explore our work/i })
    ).toHaveAttribute("href", "/work")
  })
})
