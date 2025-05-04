import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import the component to be tested
import { BaseTooltip } from "../../components/common/BaseTooltip";

describe("BaseTooltip Component", () => {
  // Test 1: Check if title and children are rendered
  it("should render the title and children correctly", () => {
    // Arrange: Define props and render the component
    const tooltipTitle = "Information";
    const tooltipContent = "This is the content.";
    render(
      <BaseTooltip title={tooltipTitle}>
        <p>{tooltipContent}</p>
      </BaseTooltip>
    );

    // Act: Find elements by their text content
    const titleElement = screen.getByText(tooltipTitle);
    const childElement = screen.getByText(tooltipContent);

    // Assert: Check if both title and children are present in the document
    expect(titleElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
