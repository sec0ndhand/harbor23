import { describe, expect, it } from "vitest";
import {
  AMENITIES,
  AMENITY_CATEGORIES,
  PROPERTY,
  STATIC_REVIEWS,
  GALLERY,
  IMAGES,
} from "~/lib/property-data";

describe("property-data integrity", () => {
  it("PROPERTY has the minimum fields required for LodgingBusiness schema", () => {
    expect(PROPERTY.name).toBeTruthy();
    expect(PROPERTY.bedrooms).toBeGreaterThan(0);
    expect(PROPERTY.bathrooms).toBeGreaterThan(0);
    expect(PROPERTY.maxGuests).toBeGreaterThan(0);
    expect(PROPERTY.rating).toBeGreaterThan(0);
    expect(PROPERTY.rating).toBeLessThanOrEqual(5);
    expect(PROPERTY.reviewCount).toBeGreaterThan(0);
    expect(PROPERTY.lat).toBeCloseTo(42.6, 0);
    expect(PROPERTY.lng).toBeCloseTo(-88.5, 0);
  });

  it("every amenity category appears in AMENITY_CATEGORIES", () => {
    const categoriesInUse = new Set(AMENITIES.map((a) => a.category));
    for (const category of categoriesInUse) {
      expect(AMENITY_CATEGORIES).toContain(category);
    }
  });

  it("every amenity has a non-empty icon and label", () => {
    for (const amenity of AMENITIES) {
      expect(amenity.icon).toBeTruthy();
      expect(amenity.label).toBeTruthy();
      expect(amenity.category).toBeTruthy();
    }
  });

  it("every gallery image has an alt text for accessibility", () => {
    for (const image of GALLERY) {
      expect(image.alt).toBeTruthy();
      expect(image.url).toBeTruthy();
    }
  });

  it("every IMAGES entry has an alt text and a valid URL", () => {
    for (const [key, image] of Object.entries(IMAGES)) {
      expect(image.alt, `IMAGES.${key} alt text`).toBeTruthy();
      // Images may be local (/images/listing/...) or CDN (https://...).
      expect(image.url, `IMAGES.${key} url`).toMatch(/^(\/|https:\/\/)/);
    }
  });

  it("every static review has a rating between 1 and 5", () => {
    for (const review of STATIC_REVIEWS) {
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(review.author).toBeTruthy();
      expect(review.content.length).toBeGreaterThan(20);
    }
  });

  it("static review count does not overstate the claimed review count", () => {
    // The aggregate rating claims PROPERTY.reviewCount reviews; the sampled
    // static set should be a subset of that number.
    expect(STATIC_REVIEWS.length).toBeLessThanOrEqual(PROPERTY.reviewCount);
  });
});
