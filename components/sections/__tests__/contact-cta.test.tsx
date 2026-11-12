import {
  describe,
  expect,
  it,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { ContactCTA } from "../contact-cta"

describe("ContactCTA", () => {
  it("renders the Section 07 heading and spec-sheet pitch", () => {
    renderWithProviders(<ContactCTA />)

    expect(screen.getByText("Section 07 / Enquiry")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /start a conversation/i })
    ).toBeInTheDocument()
    expect(screen.queryByText("ENQ.01 // DIRECT_LINE")).not.toBeInTheDocument()
    expect(screen.getByText(/have an ambitious idea\?/i)).toBeInTheDocument()
    expect(screen.getByText(/let's make it real\./i)).toBeInTheDocument()
    expect(
      screen.getByText("RESPONSE TIME: USUALLY WITHIN 2 MINS")
    ).toBeInTheDocument()
  })

  it("renders the WhatsApp CTA and Contact Directory rows (email and phone/whatsapp only)", () => {
    renderWithProviders(<ContactCTA />)

    expect(
      screen.getByRole("link", { name: /chat on whatsapp/i })
    ).toHaveAttribute("href", expect.stringContaining("api.whatsapp.com"))

    expect(screen.getByText("CONTACT / DIRECTORY")).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: /copy email address office@cobaltaxis\.in/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /\+91 93472 16338/i })
    ).toHaveAttribute("href", expect.stringContaining("api.whatsapp.com"))
    expect(screen.queryByText(/worldtaxes\.in/i)).not.toBeInTheDocument()
  })
})
