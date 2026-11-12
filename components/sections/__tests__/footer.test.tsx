import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Footer } from "../footer"

describe("Footer", () => {
  it("renders the giant COBALT wordmark", () => {
    renderWithProviders(<Footer />)

    // The wordmark doubles as the footer's sr-only heading.
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toHaveTextContent(/cobalt/i)
  })

  it("renders the mailto and WhatsApp links", () => {
    renderWithProviders(<Footer />)

    const mailtoLinks = screen.getAllByRole("link", {
      name: /office@cobaltaxis.in/i,
    })
    expect(mailtoLinks.length).toBeGreaterThan(0)
    mailtoLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "mailto:office@cobaltaxis.in")
    })

    expect(
      screen.getByRole("link", { name: /\+91 93472 16338/ }),
    ).toHaveAttribute("href", expect.stringContaining("api.whatsapp.com"))
  })

  it("links every in-page section through the footer", () => {
    renderWithProviders(<Footer />)

    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/#capabilities",
    )
    expect(screen.getByRole("link", { name: "Approach" })).toHaveAttribute(
      "href",
      "/#approach",
    )
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/#about",
    )
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/#contact",
    )
  })

  it("renders the updated studio copy", () => {
    const { container } = renderWithProviders(<Footer />)

    expect(container.textContent).toMatch(
      /AI systems, autonomous workflows and digital products/i,
    )
    expect(container.textContent).toMatch(
      /We engineer intelligence that moves businesses forward/i,
    )
  })

  it("renders the crew, socials and current year", () => {
    renderWithProviders(<Footer />)

    // Crew members are hit targets with their sayings as labels.
    expect(screen.getByRole("button", { name: /Bruno/i })).toBeInTheDocument()

    ;["Instagram", "X", "LinkedIn"].forEach((social) => {
      expect(screen.getAllByRole("link", { name: social }).length).toBeGreaterThan(0)
    })

    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`)),
    ).toBeInTheDocument()
  })
})
