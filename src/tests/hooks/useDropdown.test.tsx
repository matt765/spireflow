import { render, fireEvent, cleanup } from "@testing-library/react";

import { useDropdown } from "../../hooks/useDropdown";

// Helper component to test the hook
const TestComponent = () => {
  const { isOpen, toggle, close, ref, open } = useDropdown();

  return (
    <div>
      <button onClick={toggle}>Toggle Dropdown</button>
      <button onClick={open}>Open Dropdown</button>
      {isOpen && (
        <div ref={ref}>
          <div>Dropdown Content</div>
          <button onClick={close}>Close Dropdown</button>
        </div>
      )}
    </div>
  );
};

describe("useDropdown", () => {
  afterEach(cleanup);

  it("should open the dropdown when toggle is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    expect(queryByText("Dropdown Content")).toBeNull();

    // Click to open the dropdown
    fireEvent.click(getByText("Toggle Dropdown"));

    expect(getByText("Dropdown Content")).toBeInTheDocument();
  });

  it("should close the dropdown when close is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to open the dropdown
    fireEvent.click(getByText("Toggle Dropdown"));
    expect(getByText("Dropdown Content")).toBeInTheDocument();

    // Click to close the dropdown
    fireEvent.click(getByText("Close Dropdown"));
    expect(queryByText("Dropdown Content")).toBeNull();
  });

  it("should open the dropdown when open is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    expect(queryByText("Dropdown Content")).toBeNull();

    // Click to open the dropdown
    fireEvent.click(getByText("Open Dropdown"));

    expect(getByText("Dropdown Content")).toBeInTheDocument();
  });

  it("should close the dropdown when clicking outside", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to open the dropdown
    fireEvent.click(getByText("Toggle Dropdown"));
    expect(getByText("Dropdown Content")).toBeInTheDocument();

    // Simulate a click outside the dropdown
    fireEvent.mouseDown(document);

    expect(queryByText("Dropdown Content")).toBeNull();
  });
});
