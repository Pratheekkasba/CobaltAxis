import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { Hero } from "../hero"

// The page-opening hero: split layout with the campus illustration, a CTA
// that scrolls to the intelligent-engineering section, and pulsing cyan
// dots on the illustration's circuit paths.
describe("Hero", () => {
  it("renders the page's single h1 headline", () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByRole("heading", { level: 1, name: /We Engineer/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /From autonomous AI workflows to 60 FPS digital products/i
      )
    ).toBeInTheDocument()
  })

  it("renders the CTA with an arrow and a scroll target", () => {
    renderWithProviders(<Hero />)

    const cta = screen.getByRole("button", {
      name: /Explore AI Engineering/i,
    })
    expect(cta).toBeInTheDocument()
    // Arrow is decorative.
    expect(cta.querySelector("svg")).toBeInTheDocument()
  })

  it("renders the campus illustration and its pulse dots", () => {
    renderWithProviders(<Hero />)

    expect(
      screen.getByRole("img", {
        name: /Cobalt Axis campus/i,
      })
    ).toBeInTheDocument()

    // Five absolutely positioned pulse dots over the circuit paths.
    expect(screen.getAllByTestId("hero-dot")).toHaveLength(5)
  })
})
