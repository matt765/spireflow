import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Input } from "../../components/forms/Input";

describe("Input Component", () => {
  // Mock handlers
  const mockOnChange = jest.fn();
  const mockOnInput = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnInput.mockClear();
  });

  // Test 1: Basic rendering with required props
  it("should render an input element with the correct type", () => {
    render(<Input type="text" ariaLabel="Test Input" />); // ariaLabel needed for reliable getByRole
    const inputElement = screen.getByRole("textbox", { name: "Test Input" });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  // Test 2: Rendering with common attributes
  it("should apply common input attributes when provided", () => {
    const props = {
      type: "email",
      placeholder: "Enter email",
      value: "test@example.com",
      id: "email-input",
      name: "userEmail",
      autoComplete: "email",
    };
    render(<Input {...props} />);
    // Find by placeholder as it will be the default aria-label
    const inputElement = screen.getByPlaceholderText(props.placeholder);

    expect(inputElement).toHaveAttribute("id", props.id);
    expect(inputElement).toHaveAttribute("name", props.name);
    expect(inputElement).toHaveAttribute("placeholder", props.placeholder);
    expect(inputElement).toHaveAttribute("autocomplete", props.autoComplete);
    expect(inputElement).toHaveValue(props.value);
    expect(inputElement).toHaveAttribute("type", props.type);
  });

  // Test 3: Rendering with an icon and checking padding
  it("should render the icon and apply correct padding when icon is provided", () => {
    const icon = <svg data-testid="test-icon" />;
    render(<Input type="text" icon={icon} ariaLabel="Input with icon" />);
    const inputElement = screen.getByRole("textbox", {
      name: "Input with icon",
    });

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    // Check if the icon's parent div exists
    expect(screen.getByTestId("test-icon").parentElement).toHaveClass(
      "absolute"
    );
    // Check for padding class on the input itself
    expect(inputElement).toHaveClass("pl-11");
    expect(inputElement).not.toHaveClass("pl-3");
  });

  // Test 4: Rendering without an icon and checking padding
  it("should not render an icon and apply correct padding when icon is not provided", () => {
    render(<Input type="text" ariaLabel="Input without icon" />);
    const inputElement = screen.getByRole("textbox", {
      name: "Input without icon",
    });

    expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    // Check for padding class on the input itself
    expect(inputElement).toHaveClass("pl-3");
    expect(inputElement).not.toHaveClass("pl-11");
  });

  // Test 5: onChange handler
  it("should call onChange handler when input value changes", () => {
    const placeholder = "Type here";
    render(
      <Input type="text" placeholder={placeholder} onChange={mockOnChange} />
    );
    const inputElement = screen.getByPlaceholderText(placeholder);

    // Simulate typing - fireEvent.change is simpler, userEvent.type is more realistic
    fireEvent.change(inputElement, { target: { value: "new text" } });
    // If using userEvent: await userEvent.type(inputElement, 'new text');

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    // Optionally check the event object passed, though often just checking call count is sufficient
    // expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  // Test 6: onInput handler
  it("should call onInput handler when input event occurs", () => {
    // Note: 'input' fires before 'change' for text inputs usually
    const placeholder = "Input event test";
    render(
      <Input type="text" placeholder={placeholder} onInput={mockOnInput} />
    );
    const inputElement = screen.getByPlaceholderText(placeholder);

    // Simulate input event
    fireEvent.input(inputElement, { target: { value: "a" } });

    expect(mockOnInput).toHaveBeenCalledTimes(1);
  });

  // Test 7: ARIA label logic
  it("should use ariaLabel prop for accessible name when provided", () => {
    const customLabel = "Custom Accessible Name";
    render(
      <Input
        type="text"
        placeholder="Placeholder Text"
        ariaLabel={customLabel}
      />
    );
    // Find by the explicitly provided aria-label
    const inputElement = screen.getByRole("textbox", { name: customLabel });
    expect(inputElement).toBeInTheDocument();
  });

  it("should use placeholder prop for accessible name when ariaLabel is not provided", () => {
    const placeholderText = "Use as Label";
    render(<Input type="text" placeholder={placeholderText} />);
    // Find by the placeholder text which acts as the label
    const inputElement = screen.getByRole("textbox", { name: placeholderText });
    expect(inputElement).toBeInTheDocument();
  });

  // Test 8: forwardRef functionality
  it("should forward the ref to the underlying input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input type="text" ref={ref} ariaLabel="Ref Input" />); // Label needed to find element easily

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    // Check if the referenced input is the one we expect
    expect(ref.current).toHaveAttribute("aria-label", "Ref Input");
  });

  // Test 9: className prop merging
  it("should merge className prop with base classes", () => {
    const customClass = "my-extra-input-style";
    render(
      <Input type="text" ariaLabel="Class Test" className={customClass} />
    );
    const inputElement = screen.getByRole("textbox", { name: "Class Test" });

    expect(inputElement).toHaveClass(customClass);
    expect(inputElement).toHaveClass("bg-inputBg"); // Example base class
  });
});
