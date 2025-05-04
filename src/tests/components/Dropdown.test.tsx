import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Dropdown } from "../../components/common/Dropdown";

describe("Dropdown Component", () => {
  // Test 1: Check if children are rendered
  it("should render its children correctly", () => {
    // Arrange: Prepare test data and render the component
    const testMessage = "Dropdown Content";
    render(
      <Dropdown>
        <span>{testMessage}</span>
      </Dropdown>
    );

    // Act: Find the element (in this case, by its text)
    const childElement = screen.getByText(testMessage);

    // Assert: Check if the child element is present in the document
    expect(childElement).toBeInTheDocument();
  });

  // Test 2: Check ARIA attributes and CSS class application
  it("should apply ARIA attributes and custom className", () => {
    // Arrange
    const customClass = "my-extra-styles";
    const labelledBy = "dropdown-trigger-button";
    render(
      <Dropdown className={customClass} ariaLabelledby={labelledBy}>
        <div>Item 1</div>
      </Dropdown>
    );

    // Act: Find the element by its ARIA role
    const dropdownElement = screen.getByRole("menu");

    // Assert: Check presence, role, aria-labelledby, and classes
    expect(dropdownElement).toBeInTheDocument();
    expect(dropdownElement).toHaveAttribute("aria-labelledby", labelledBy);
    // Check for both base classes (examples) and the custom class
    expect(dropdownElement).toHaveClass("absolute"); // Example base class
    expect(dropdownElement).toHaveClass("z-10"); // Example base class
    expect(dropdownElement).toHaveClass(customClass); // Custom class
  });

  // Test 3: Check ref forwarding functionality
  it("should forward the ref to the underlying div element", () => {
    // Arrange: Create a ref
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Dropdown ref={ref}>
        <div>Ref Test Content</div>
      </Dropdown>
    );

    // Act: (Rendering already assigned the ref)

    // Assert: Check if ref.current is not null and is an instance of HTMLDivElement
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    // Optionally, check if the referenced element has the correct role
    expect(ref.current).toHaveAttribute("role", "menu");
  });
});
