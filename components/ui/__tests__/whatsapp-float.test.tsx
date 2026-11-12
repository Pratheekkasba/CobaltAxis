import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { WhatsAppFloat } from "../whatsapp-float"

describe("WhatsAppFloat", () => {
  it("renders a fixed WhatsApp link with the default number and message", () => {
    renderWithProviders(<WhatsAppFloat />)

    const link = screen.getByRole("link", { name: /chat on whatsapp/i })
    expect(link).toHaveAttribute(
      "href",
      `https://wa.me/919347216338?text=${encodeURIComponent(
        "Hi Cobalt Axis, I would like to discuss a project.",
      )}`,
    )
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("uses a configurable phone number and message", () => {
    renderWithProviders(
      <WhatsAppFloat
        phoneNumber="15550001234"
        initialMessage="Custom enquiry."
      />,
    )

    expect(
      screen.getByRole("link", { name: /chat on whatsapp/i }),
    ).toHaveAttribute(
      "href",
      `https://wa.me/15550001234?text=${encodeURIComponent("Custom enquiry.")}`,
    )
  })
})
