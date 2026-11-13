import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
  fireEvent,
} from "@/test/integration"
import { PickYourBottleneck } from "../PickYourBottleneck"

// The dark problem-selector band: five tabs, a typing terminal, crossfading
// illustrations, count-up metrics and the highlight CTA. (IntersectionObserver
// and matchMedia are stubbed globally in test/integration/setup.ts — the
// panel renders its pre-reveal state and motion runs on real timers, so the
// typing test asserts on the first log line only.)
describe("PickYourBottleneck", () => {
  it("renders the band header copy", () => {
    renderWithProviders(<PickYourBottleneck />)

    expect(
      screen.getByRole("heading", { name: "What's slowing you down?" })
    ).toBeInTheDocument()
    expect(
      screen.getByText("SECTION 02 // START WITH THE PROBLEM")
    ).toBeInTheDocument()
    expect(screen.getByText(/Pick a bottleneck\./)).toBeInTheDocument()
  })

  it("renders five tabs with the first selected by default", () => {
    renderWithProviders(<PickYourBottleneck />)

    const tabs = screen.getAllByRole("tab")
    expect(tabs).toHaveLength(5)
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    expect(tabs[0]).toHaveAttribute("tabindex", "0")
    expect(tabs[1]).toHaveAttribute("aria-selected", "false")
    expect(tabs[1]).toHaveAttribute("tabindex", "-1")
  })

  it("moves the selection with arrow keys, wrapping at the ends", () => {
    renderWithProviders(<PickYourBottleneck />)

    const tabs = screen.getAllByRole("tab")
    fireEvent.keyDown(tabs[0], { key: "ArrowDown" })
    expect(tabs[1]).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(tabs[1], { key: "ArrowLeft" })
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
  })

  it("selects a bottleneck on click and relabels the tabpanel", () => {
    renderWithProviders(<PickYourBottleneck />)

    fireEvent.click(screen.getByRole("tab", { name: /Slow, clunky app/ }))

    expect(
      screen.getByRole("tab", { name: /Slow, clunky app/ })
    ).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      "pyb-tab-2"
    )
  })

  it("shows the active bottleneck's metrics and the CTA", () => {
    const { container } = renderWithProviders(<PickYourBottleneck />)

    // The visible count-up value animates; its static sr-only value is
    // the assertable surface in jsdom.
    expect(screen.getByText("70% less manual effort")).toBeInTheDocument()
    expect(screen.getByText("24/7")).toBeInTheDocument()
    expect(screen.getByText("less manual effort")).toBeInTheDocument()
    expect(screen.getByText("ops overhead")).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /See the matching service/ })
    ).toBeInTheDocument()
    expect(container.querySelector('[aria-live="polite"]')).not.toBeNull()
    expect(container.querySelector('[role="tabpanel"]')).not.toBeNull()
  })

  it("renders the illustration for the active bottleneck", () => {
    renderWithProviders(<PickYourBottleneck />)

    expect(
      screen.getByAltText(/automated data workflow system/i)
    ).toBeInTheDocument()
  })

  it("swaps the illustration when another bottleneck is selected", async () => {
    renderWithProviders(<PickYourBottleneck />)

    fireEvent.click(screen.getByRole("tab", { name: /Slow, clunky app/ }))

    expect(
      await screen.findByAltText(/performance dashboard maxing its speedometer/i)
    ).toBeInTheDocument()
  })

  it("types the terminal log for the active bottleneck", async () => {
    renderWithProviders(<PickYourBottleneck />)

    expect(await screen.findByText(/intake\.received/)).toBeInTheDocument()
  })
})
