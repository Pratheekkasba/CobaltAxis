import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { ServicesHero } from "../services-hero"

// The page opens with the promise statement and four proof metric cards.
describe("ServicesHero", () => {
  it("renders the promise statement and meta line", () => {
    renderWithProviders(<ServicesHero />)

    // The promise is a paragraph now — the page's single <h1> lives in the
    // new <Hero/> above this section.
    expect(
      screen.getByText(/Our promise is an operation that/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/07 engine modules · 06 disciplines · 01 senior team/i)
    ).toBeInTheDocument()
  })

  it("renders the four proof metrics", () => {
    renderWithProviders(<ServicesHero />)

    expect(screen.getByText("Reply time")).toBeInTheDocument()
    expect(screen.getByText("Delivery cadence")).toBeInTheDocument()
    expect(screen.getByText("Engine modules")).toBeInTheDocument()
    expect(screen.getByText("Frame budget")).toBeInTheDocument()

    // The numbers themselves.
    expect(screen.getByText("16.6")).toBeInTheDocument()
    expect(screen.getByText("working day")).toBeInTheDocument()
  })
})
