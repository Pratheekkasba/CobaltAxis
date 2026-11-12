import {
  describe,
  it,
  expect,
  renderWithProviders,
  screen,
} from "@/test/integration"
import { FeatureSections } from "../feature-sections"

describe("FeatureSections", () => {
  it("renders the section heading and the three feature cards", () => {
    renderWithProviders(<FeatureSections />)

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /features that bring you work/i,
    )

    ;[
      "Your calendar fills itself",
      "Properties that sell themselves",
      "Found first, every time",
    ].forEach((title) => {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument()
    })
  })

  it("renders the three isometric illustrations", () => {
    renderWithProviders(<FeatureSections />)

    expect(
      screen.getByRole("img", { name: /salon storefront/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: /real-estate office/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: /cobalt axis billboard/i }),
    ).toBeInTheDocument()
  })
})
