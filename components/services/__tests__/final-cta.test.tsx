import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { FinalCTA } from "../final-cta"

// The closer: headline, launchpad illustration with its cyan halo, and
// the three conversion paths (project link, booking link, mailto).
describe("FinalCTA", () => {
  it("renders the headline and supporting copy", () => {
    renderWithProviders(<FinalCTA />)

    expect(
      screen.getByRole("heading", {
        name: "Ready to Build an Engine That Thinks?",
      })
    ).toBeInTheDocument()
  })

  it("links Start a Project to /contact", () => {
    renderWithProviders(<FinalCTA />)

    const link = screen.getByRole("link", { name: /Start a Project/i })
    expect(link).toHaveAttribute("href", "/contact")
  })

  it("links the strategy call to the Calendly constant", () => {
    renderWithProviders(<FinalCTA />)

    const link = screen.getByRole("link", {
      name: /Book a 15-Min Strategy Call/i,
    })
    expect(link.getAttribute("href")).toMatch(/^https:\/\/calendly\.com\//)
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("exposes hello@cobaltaxis.in as a mailto link", () => {
    renderWithProviders(<FinalCTA />)

    const link = screen.getByRole("link", { name: /hello@cobaltaxis\.in/i })
    expect(link).toHaveAttribute("href", "mailto:hello@cobaltaxis.in")
  })

  it("renders the launchpad illustration and anchors at #final-cta", () => {
    const { container } = renderWithProviders(<FinalCTA />)

    expect(
      screen.getByAltText(/launchpad illustration/i)
    ).toBeInTheDocument()
    expect(container.querySelector("#final-cta")).not.toBeNull()
  })
})
