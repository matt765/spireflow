import { renderHook, act } from "@testing-library/react";
import { SortingState } from "@tanstack/react-table";

import { useTable } from "../../hooks/useTable";

type TestFilters = {
  status: string;
  category: string;
};

const initialFilters: TestFilters = {
  status: "active",
  category: "books",
};

describe("useTable", () => {
  it("should initialize with the correct initial state", () => {
    const { result } = renderHook(() => useTable<TestFilters>(initialFilters));

    expect(result.current.sorting).toEqual([]);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.currentPage).toBe(0);
    expect(result.current.itemsPerPage).toBe(10);
    expect(result.current.filters).toEqual(initialFilters);
  });

  it("should set and clear filters correctly", () => {
    const { result } = renderHook(() => useTable<TestFilters>(initialFilters));

    // Set a filter
    act(() => {
      result.current.setFilter("status", "inactive");
    });
    expect(result.current.filters.status).toBe("inactive");

    // Clear the filter
    act(() => {
      result.current.clearFilter("status");
    });
    expect(result.current.filters.status).toBeUndefined();
  });

  it("should handle pagination correctly", () => {
    const { result } = renderHook(() => useTable<TestFilters>(initialFilters));

    // Go to next page
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(1);

    // Go to previous page
    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(0);

    // Go to a specific page
    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(5);
  });

  it("should reset filters and state correctly", () => {
    const { result } = renderHook(() => useTable<TestFilters>(initialFilters));

    // Modify state
    act(() => {
      result.current.setFilter("status", "inactive");
      result.current.setSearchQuery("test");
      result.current.nextPage();
      result.current.setSorting([{ id: "name", desc: true }] as SortingState);
    });

    expect(result.current.filters.status).toBe("inactive");
    expect(result.current.searchQuery).toBe("test");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.sorting).toEqual([{ id: "name", desc: true }]);

    // Reset state
    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual(initialFilters);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.currentPage).toBe(0);
    expect(result.current.sorting).toEqual([]);
  });
});
