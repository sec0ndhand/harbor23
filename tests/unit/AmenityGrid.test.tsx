import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AmenityGrid from "~/components/AmenityGrid";
import { AMENITIES, AMENITY_CATEGORIES } from "~/lib/property-data";

describe("<AmenityGrid />", () => {
  it("renders every amenity by default", () => {
    render(<AmenityGrid />);
    // Pick a couple of labels we know exist in the seed data.
    expect(screen.getByText(AMENITIES[0].label)).toBeDefined();
    expect(
      screen.getByText(AMENITIES[AMENITIES.length - 1].label)
    ).toBeDefined();
  });

  it("caps the visible count when a limit is provided", () => {
    const limit = 3;
    const { container } = render(<AmenityGrid limit={limit} />);
    const items = container.querySelectorAll(".amenity-item");
    expect(items.length).toBe(limit);
  });

  it("shows filter buttons for every category when showFilter is true", () => {
    render(<AmenityGrid showFilter />);
    expect(screen.getByRole("button", { name: "All" })).toBeDefined();
    for (const category of AMENITY_CATEGORIES) {
      expect(screen.getByRole("button", { name: category })).toBeDefined();
    }
  });

  it("filters the grid when a category button is clicked", () => {
    const { container } = render(<AmenityGrid showFilter />);
    const initialCount =
      container.querySelectorAll(".amenity-item").length;

    // Click a specific category and confirm the grid narrows to only
    // amenities in that category.
    const outdoorsButton = screen.getByRole("button", { name: "Outdoors" });
    fireEvent.click(outdoorsButton);

    const filteredCount =
      container.querySelectorAll(".amenity-item").length;
    const expectedCount = AMENITIES.filter((a) => a.category === "Outdoors")
      .length;
    expect(filteredCount).toBe(expectedCount);
    expect(filteredCount).toBeLessThan(initialCount);
  });
});
