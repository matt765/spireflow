import { useState, useEffect } from "react";

export const useTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Hide the tooltip on document click
      hideTooltip();
    };

    // Listen for clicks on the document
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return { isTooltipVisible, showTooltip, hideTooltip };
};
