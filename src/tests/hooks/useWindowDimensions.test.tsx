import { renderHook, act } from "@testing-library/react-hooks";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";

describe("useWindowDimensions", () => {
  beforeEach(() => {
    // Mock the window object
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });

    // Trigger the window resize event
    window.dispatchEvent(new Event("resize"));
  });

  it("should return initial window dimensions", () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("should update dimensions on window resize", () => {
    const { result } = renderHook(() => useWindowDimensions());

    // Change the window dimensions
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1280,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 800,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(800);
  });
});
