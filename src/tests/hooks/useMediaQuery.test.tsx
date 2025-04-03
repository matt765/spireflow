import { renderHook } from "@testing-library/react-hooks";

import { useMediaQuery } from "../../hooks/useMediaQuery";

describe("useMediaQuery", () => {
  beforeEach(() => {
    // Mock the window.matchMedia function
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });
  });

  it("should return false when the query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));
    expect(result.current).toBe(false);
  });

  it("should return true when the query matches", () => {
    // Mock the matchMedia to return true for this specific query
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === "(max-width: 600px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));
    expect(result.current).toBe(true);
  });
});
