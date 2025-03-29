import { renderHook, act } from "@testing-library/react-hooks";

import { useSession } from "../../hooks/auth/useSession";

describe("useSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch session data successfully", async () => {
    const mockSession = { username: "testuser", isLoggedIn: true };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSession),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useSession());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    // After fetching session data
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

    const { result, waitForNextUpdate } = renderHook(() => useSession());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    // After failing to fetch session data
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBe("Failed to fetch session data");
  });

  it("should handle network error", async () => {
    const mockError = new Error("Network error");
    global.fetch = jest.fn(() => Promise.reject(mockError)) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => useSession());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    // After network error
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });
});
