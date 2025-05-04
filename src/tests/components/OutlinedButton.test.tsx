import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { OutlinedButton } from "../../components/common/OutlinedButton";

describe("OutlinedButton Component", () => {
  // Mock function for handleClick prop
  const mockHandleClick = jest.fn();

  // Reset mock before each test
  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  // Test 1: Rendering with text and icon
  it("should render text and icon when children are not provided", () => {
    // Arrange
    const buttonText = "Action Text";
    const icon = <svg data-testid="test-icon" />;
    render(<OutlinedButton text={buttonText} icon={icon} />);

    // Act
    // Accessible name defaults to text content here
    const button = screen.getByRole("button", { name: buttonText });

    // Assert
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText); // Checks text node presence
    expect(button).toContainElement(screen.getByTestId("test-icon"));
  });

  // Test 2: Rendering with children (should override text/icon)
  it("should render children when provided, ignoring text and icon props", () => {
    // Arrange
    const buttonText = "Should Not Show";
    const icon = <svg data-testid="test-icon-ignored" />;
    const childContent = "Custom Child Content";
    // Provide an aria-label as children might not be simple text
    const customLabel = "Button with children";
    render(
      <OutlinedButton text={buttonText} icon={icon} ariaLabel={customLabel}>
        <span>{childContent}</span>
      </OutlinedButton>
    );

    // Act
    const button = screen.getByRole("button", { name: customLabel });

    // Assert
    expect(button).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument(); // Children rendered
    expect(screen.queryByText(buttonText)).not.toBeInTheDocument(); // Text prop ignored
    expect(screen.queryByTestId("test-icon-ignored")).not.toBeInTheDocument(); // Icon prop ignored
  });

  // Test 3: Click handler invocation
  it("should call handleClick when clicked", () => {
    // Arrange
    const buttonLabel = "Click Me";
    render(
      <OutlinedButton ariaLabel={buttonLabel} handleClick={mockHandleClick} />
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: buttonLabel }));

    // Assert
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  // Test 4: Setting button type attribute
  it("should have the specified type attribute", () => {
    // Arrange
    const buttonLabel = "Submit Button";
    render(<OutlinedButton ariaLabel={buttonLabel} type="submit" />);

    // Act
    const button = screen.getByRole("button", { name: buttonLabel });

    // Assert
    expect(button).toHaveAttribute("type", "submit");
    // Default type check
    render(<OutlinedButton ariaLabel="Default Type" />);
    expect(
      screen.getByRole("button", { name: "Default Type" })
    ).toHaveAttribute("type", "button");
  });

  // Test 5: ARIA attributes application
  it("should apply explicit aria-label and aria-pressed attributes", () => {
    // Arrange
    const customLabel = "Toggle Action";
    render(
      <OutlinedButton
        text="Irrelevant"
        ariaLabel={customLabel}
        ariaPressed={true}
      />
    );

    // Act
    const button = screen.getByRole("button", { name: customLabel });

    // Assert
    expect(button).toHaveAttribute("aria-label", customLabel);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  // Test 6: forwardRef functionality
  it("should forward the ref to the underlying button element", () => {
    // Arrange
    const ref = React.createRef<HTMLButtonElement>();
    render(<OutlinedButton ref={ref} ariaLabel="Ref Button" />);

    // Assert
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    // Check if the referenced button is the one we expect
    expect(ref.current).toHaveAttribute("aria-label", "Ref Button");
  });
});
