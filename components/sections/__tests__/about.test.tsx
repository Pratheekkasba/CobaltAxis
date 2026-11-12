import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { About } from "../about"

describe("About", () => {
  it("renders the section heading", () => {
    renderWithProviders(<About />)

    expect(screen.getByText("Section 05 / About")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /who we are/i })
    ).toBeInTheDocument()
  })

  it("renders the manifesto with its accent keywords", () => {
    const { container } = renderWithProviders(<About />)

    expect(container.textContent).toContain("compact studio of designers")
    expect(screen.getByText("craft")).toBeInTheDocument()
    expect(screen.getByText("technology")).toBeInTheDocument()
    expect(container.textContent).toContain("feel inevitable")
  })

  it("renders the three-column studio proof strip", () => {
    renderWithProviders(<About />)

    expect(screen.getByText("01 / ARCHITECTURE")).toBeInTheDocument()
    expect(
      screen.getByText("Built for scale & zero bottlenecks.")
    ).toBeInTheDocument()
    expect(screen.getByText("02 / VELOCITY")).toBeInTheDocument()
    expect(screen.getByText("Direct-to-engineer execution.")).toBeInTheDocument()
    expect(screen.getByText("03 / PRECISION")).toBeInTheDocument()
    expect(
      screen.getByText("60fps interfaces & resilient AI.")
    ).toBeInTheDocument()
  })
})
