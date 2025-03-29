import { render, fireEvent, cleanup } from "@testing-library/react";

import { useTooltip } from "../../hooks/useTooltip";

// Helper component to test the hook
const TestComponent = () => {
  const { isTooltipVisible, showTooltip, hideTooltip } = useTooltip();

  return (
    <div>
      <button onClick={showTooltip}>Show Tooltip</button>
      {isTooltipVisible && <div>Tooltip</div>}
      <button onClick={hideTooltip}>Hide Tooltip</button>
    </div>
  );
};

describe("useTooltip", () => {
  afterEach(cleanup);

  it("should show the tooltip when showTooltip is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    expect(queryByText("Tooltip")).toBeNull();

    // Click to show the tooltip
    fireEvent.click(getByText("Show Tooltip"));

    expect(getByText("Tooltip")).toBeInTheDocument();
  });

  it("should hide the tooltip when hideTooltip is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to show the tooltip
    fireEvent.click(getByText("Show Tooltip"));
    expect(getByText("Tooltip")).toBeInTheDocument();

    // Click to hide the tooltip
    fireEvent.click(getByText("Hide Tooltip"));
    expect(queryByText("Tooltip")).toBeNull();
  });

  it("should hide the tooltip when clicking outside", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to show the tooltip
    fireEvent.click(getByText("Show Tooltip"));
    expect(getByText("Tooltip")).toBeInTheDocument();

    // Click outside to hide the tooltip
    fireEvent.mouseDown(document);

    expect(queryByText("Tooltip")).toBeNull();
  });
});
