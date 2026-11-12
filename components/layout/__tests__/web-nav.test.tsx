import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { WebNav } from "../web-nav"
import { navItems } from "../nav-items"

describe("WebNav", () => {
  it("renders the logo and a link per nav item", () => {
    renderWithProviders(<WebNav />)

    expect(screen.getByText("COBALT")).toBeInTheDocument()

    navItems.forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href
      )
    })
  })

  it("renders the WhatsApp call to action", () => {
    renderWithProviders(<WebNav />)

    expect(screen.getByRole("link", { name: /let's talk/i })).toHaveAttribute(
      "href",
      expect.stringContaining("api.whatsapp.com")
    )
  })
})
