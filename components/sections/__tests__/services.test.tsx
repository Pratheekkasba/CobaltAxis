import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Services } from "../services"

// Services renders a sticky pitch and one card per discipline — each step
// appears once in the DOM.
describe("Services", () => {
  it("renders the section heading", () => {
    renderWithProviders(<Services />)

    expect(screen.getByText("What we do")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Six disciplines, one team." })
    ).toBeInTheDocument()
  })

  it("renders every step of the journey", () => {
    renderWithProviders(<Services />)

    const steps = [
      "Art Direction",
      "Brand Strategy",
      "Web Design",
      "Development",
      "Motion Design",
      "Maintenance",
    ]

    steps.forEach((step) => {
      expect(screen.getAllByText(step).length).toBeGreaterThan(0)
    })
  })
})
