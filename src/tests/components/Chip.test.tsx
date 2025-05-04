import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Chip } from "../../components/forms/Chip";

describe("Chip Component", () => {
  // Mock function for onDelete prop
  const mockOnDelete = jest.fn();

  // Reset mock before each test
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  // Test 1: Basic rendering and accessibility labels
  it("should render the label text and apply correct ARIA labels", () => {
    // Arrange
    const chipLabel = "Filter Option 1";
    render(<Chip label={chipLabel} onDelete={mockOnDelete} />);

    // Act
    const chipElement = screen.getByLabelText(`Chip with label ${chipLabel}`);
    const labelText = screen.getByText(chipLabel);
    const deleteButton = screen.getByRole("button", {
      name: `Remove ${chipLabel}`,
    });

    // Assert
    expect(chipElement).toBeInTheDocument(); // Check main container exists via its label
    expect(labelText).toBeInTheDocument(); // Check label text is rendered
    expect(deleteButton).toBeInTheDocument(); // Check delete button exists via its label
    // Optionally check if the label text is within the main chip element
    expect(chipElement).toContainElement(labelText);
    expect(chipElement).toContainElement(deleteButton);
  });

  // Test 2: Delete button interaction
  it("should call onDelete prop when the delete button is clicked", () => {
    // Arrange
    const chipLabel = "Removable Tag";
    render(<Chip label={chipLabel} onDelete={mockOnDelete} />);

    // Act
    const deleteButton = screen.getByRole("button", {
      name: `Remove ${chipLabel}`,
    });
    fireEvent.click(deleteButton);

    // Assert
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
