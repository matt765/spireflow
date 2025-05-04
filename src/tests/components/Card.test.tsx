import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Card } from "../../components/common/Card";

describe("Card Component", () => {
  // Test 1: Basic rendering with children, id, and className
  it("should render children, apply id and className, and have no title or content padding by default", () => {
    // Arrange
    const cardId = "my-card";
    const cardClassName = "extra-styles";
    const cardContent = "Basic card content";
    render(
      <Card id={cardId} className={cardClassName}>
        <p>{cardContent}</p>
      </Card>
    );

    // Act
    const cardElement = screen.getByText(cardContent).closest("div[id]"); // Find the main card div by ID
    const contentWrapper = screen.getByText(cardContent).parentElement; // Find the direct parent (content wrapper)

    // Assert
    expect(screen.getByText(cardContent)).toBeInTheDocument(); // Children are rendered
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveAttribute("id", cardId); // ID is applied
    expect(cardElement).toHaveClass(cardClassName); // Custom className is applied
    expect(screen.queryByText(/some title/i)).not.toBeInTheDocument(); // No element resembling a title should exist implicitly
    expect(contentWrapper).not.toHaveClass("px-6"); // Content wrapper should NOT have padding
  });

  // Test 2: Rendering with a title
  it("should render the title when provided and apply padding to the content area", () => {
    // Arrange
    const cardTitle = "Card Title";
    const cardContent = "Content with title";
    render(
      <Card title={cardTitle}>
        <p>{cardContent}</p>
      </Card>
    );

    // Act
    const titleElement = screen.getByText(cardTitle);
    const contentWrapper = screen.getByText(cardContent).parentElement; // Find the direct parent (content wrapper)

    // Assert
    expect(titleElement).toBeInTheDocument(); // Title is rendered
    expect(screen.getByText(cardContent)).toBeInTheDocument(); // Children are rendered
    expect(contentWrapper).toHaveClass("px-6"); // Content wrapper SHOULD have padding
  });

  // Test 3: Rendering with customHeader set to true (no title)
  it("should apply padding to the content area when customHeader is true, even without a title", () => {
    // Arrange
    const cardContent = "Content with custom header flag";
    render(
      <Card customHeader={true}>
        <p>{cardContent}</p>
      </Card>
    );

    // Act
    const contentWrapper = screen.getByText(cardContent).parentElement; // Find the direct parent (content wrapper)

    // Assert
    expect(screen.queryByText(/some title/i)).not.toBeInTheDocument(); // No title should be rendered
    expect(screen.getByText(cardContent)).toBeInTheDocument(); // Children are rendered
    expect(contentWrapper).toHaveClass("px-6"); // Content wrapper SHOULD have padding due to customHeader flag
  });
});
