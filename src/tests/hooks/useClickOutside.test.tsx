import { render, fireEvent, cleanup } from "@testing-library/react";
import { useRef } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";

const TestComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return <div ref={ref}>Inside</div>;
};

describe("useClickOutside", () => {
  afterEach(cleanup);

  it("should call onClickOutside when clicking outside the element", () => {
    const onClickOutside = jest.fn();
    render(<TestComponent onClickOutside={onClickOutside} />);

    // Simulate a click outside the element
    fireEvent.mouseDown(document);

    expect(onClickOutside).toHaveBeenCalled();
  });

  it("should not call onClickOutside when clicking inside the element", () => {
    const onClickOutside = jest.fn();
    const { container } = render(
      <TestComponent onClickOutside={onClickOutside} />
    );

    // Simulate a click inside the element
    const insideElement = container.firstChild as HTMLElement;
    if (insideElement) {
      fireEvent.mouseDown(insideElement);
    }

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
