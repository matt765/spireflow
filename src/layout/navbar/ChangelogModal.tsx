"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface ChangelogModalProps {
  closeModal: () => void;
}

export const ChangelogModal = ({ closeModal }: ChangelogModalProps) => {
  const t = useTranslations("navbar");
  const [changelogContent, setChangelogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, closeModal);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/matt765/spireflow/main/CHANGELOG.md"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch changelog: ${response.status}`);
        }

        const content = await response.text();
        setChangelogContent(content);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching changelog:", err);
        setError("Failed to load changelog. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  // Simple function to format markdown content with basic HTML
  const formatMarkdown = (text: string) => {
    // Split content into lines
    const lines = text.split("\n");
    let formattedContent = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle headings
      if (line.startsWith("# ")) {
        formattedContent += `<h2 class="text-primaryText dark:text-primaryTextDark text-3xl w-full text-left mt-2 mb-4">${line.substring(
          2
        )}</h2>`;
      } else if (line.startsWith("## ")) {
        formattedContent += `<p class="text-left w-full mt-4 text-xl text-secondaryText dark:text-secondaryTextDark">${line.substring(
          3
        )}</p>`;
      } else if (line.startsWith("### ")) {
        formattedContent += `<p class="text-secondaryText dark:text-secondaryTextDark mb-2 mt-4">${line.substring(
          4
        )}</p>`;
        // Handle list items
      } else if (line.startsWith("- ")) {
        formattedContent += `<li class="list-disc list-inside pl-3 text-primaryText dark:text-primaryTextDark">${line.substring(
          2
        )}</li>`;
        // Handle code blocks (simple version)
      } else if (line.startsWith("```")) {
        formattedContent += `<div class="bg-gray-100 dark:bg-gray-800 p-2 rounded my-2 font-mono text-sm">`;
        i++; // Skip the opening ```
        while (i < lines.length && !lines[i].startsWith("```")) {
          formattedContent += `${lines[i]}<br/>`;
          i++;
        }
        formattedContent += `</div>`;
        // Handle empty lines
      } else if (line.trim() === "") {
        formattedContent += `<div class="my-2"></div>`;
        // Regular text
      } else {
        formattedContent += `<p class="mb-4 text-base text-primaryText dark:text-primaryTextDark">${line}</p>`;
      }
    }

    return formattedContent;
  };

  return (
    <div className="alternativeScrollbar">
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md z-40" />
      <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="w-screen h-full md:w-auto md:h-auto bg-loginModalBg dark:bg-loginModalBgDark shadow-xl px-[0vw] md:px-10 pt-0 md:pt-[3rem] md:pb-12 flex flex-col items-center justify-start md:rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl
            fill-secondaryText
            dark:stroke-secondaryTextDark       
            dark:fill-secondaryTextDark
            hover:dark:stroke-secondaryTextHoverDark
            hover:dark:fill-secondaryTextHoverDark
            hover:fill-secondaryTextHover          
            hover:stroke-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          <div className="md:max-h-[60vh] md:min-h-[60vh] h-full w-full md:h-[60vh] -mr-4 overflow-auto pr-4 max-w-full md:max-w-[50vw] min-w-[32.7vw]">
            <div className="text-primaryText text-base w-full h-full dark:text-primaryTextDark -mt-4 text-left px-8 md:px-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-10 w-full h-full">
                  <SpinnerIcon className="contentSpinner" />
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-5">{error}</div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(changelogContent),
                  }}             
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
