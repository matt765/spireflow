import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Tooltip } from "../../components/common/Tooltip";

describe("Tooltip Component", () => {
  // Test 1: Check rendering, className application, and ARIA attribute
  it("should render text, apply className, and have correct ARIA attribute", () => {
    // Arrange
    const tooltipText = "This is a tooltip";
    const customClass = "my-custom-tooltip-style";
    render(<Tooltip text={tooltipText} className={customClass} />);

    // Act
    // Find the element by the text it displays
    const tooltipElement = screen.getByText(tooltipText);

    // Assert
    expect(tooltipElement).toBeInTheDocument(); // Text is rendered
    expect(tooltipElement).toHaveAttribute("aria-live", "polite"); // ARIA attribute is set
    expect(tooltipElement).toHaveClass(customClass); // Custom class is applied
    // Optionally check for a base class to ensure they are also present
    expect(tooltipElement).toHaveClass("bg-tooltipBg");
    expect(tooltipElement).toHaveClass("rounded-md");
  });
});
