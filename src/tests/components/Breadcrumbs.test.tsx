import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Breadcrumbs } from "../../components/common/Breadcrumbs";

// Mock the next-intl library
const mockT = jest.fn((key) => {
  // Provide a simple translation based on the key for testing purposes
  if (key === "firstPart") return "Home";
  if (key === undefined) return "undefined_page"; // How the mock handles undefined keys
  return `page_${key}`; // e.g., page_dashboard
});

jest.mock("next-intl", () => ({
  useTranslations: () => mockT,
}));

describe("Breadcrumbs Component", () => {
  // Reset mock calls before each test
  beforeEach(() => {
    mockT.mockClear();
  });

  // Test 1: Rendering with a pageName
  it("should render breadcrumbs with first part and translated page name", () => {
    // Arrange
    const page = "Dashboard";
    render(<Breadcrumbs pageName={page} />);

    // Act & Assert: Check the rendered output
    // Expecting "Home > page_dashboard" based on the mockT implementation
    expect(
      screen.getByText(`Home > page_${page.toLowerCase()}`)
    ).toBeInTheDocument();

    // Assert: Check if the translation function was called with expected keys
    expect(mockT).toHaveBeenCalledWith("firstPart");
    expect(mockT).toHaveBeenCalledWith(page.toLowerCase()); // Should be called with lowercased key
  });

  // Test 2: Rendering without a pageName
  it("should render breadcrumbs handling missing page name", () => {
    // Arrange: Render without the pageName prop
    render(<Breadcrumbs />);

    // Act & Assert: Check the rendered output based on how the mock handles undefined
    // Expecting "Home > undefined_page" based on the mockT implementation
    expect(screen.getByText("Home > undefined_page")).toBeInTheDocument();

    // Assert: Check if the translation function was called with expected keys
    expect(mockT).toHaveBeenCalledWith("firstPart");
    // The component logic calls t(pageName?.toLowerCase() as string), which results in t(undefined) here
    expect(mockT).toHaveBeenCalledWith(undefined);
  });
});
