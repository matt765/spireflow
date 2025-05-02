// Import waitFor from @testing-library/react
import { renderHook, waitFor } from "@testing-library/react";

import { useSession } from "../../hooks/auth/useSession";

// Define the Session type based on your hook (if not exported)
interface Session {
  username?: string;
  isLoggedIn?: boolean;
}

describe("useSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch session data successfully", async () => {
    const mockSession: Session = { username: "testuser", isLoggedIn: true };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSession),
      })
    ) as jest.Mock;

    // Remove waitForNextUpdate from destructuring
    const { result } = renderHook(() => useSession());

    // Initial state check (optional but good)
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    // Replace waitForNextUpdate with waitFor
    // Wait until loading is false, indicating the fetch completed
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Now assert the final state
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch session data failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    // Remove waitForNextUpdate
    const { result } = renderHook(() => useSession());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    // Replace waitForNextUpdate with waitFor
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Assert final state
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBe("Failed to fetch session data");
  });

  it("should handle network error", async () => {
    const mockError = new Error("Network error");
    global.fetch = jest.fn(() => Promise.reject(mockError)) as jest.Mock;

    // Remove waitForNextUpdate
    const { result } = renderHook(() => useSession());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    // Replace waitForNextUpdate with waitFor
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Assert final state
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });
});
