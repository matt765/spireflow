"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNavbar } from "./hooks/useNavbar";
import { useRouter } from "next/navigation";

interface Section {
  section: string;
  page: string;
  id: string;
  translatedSection: string;
  translatedPage: string;
}

export const SearchInput = () => {
  const t = useTranslations("navbar");
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useNavbar();

  const sections = [
    // Analytics
    { section: "Asset performance", page: "Analytics", id: "assetPerformance" },
    { section: "Today's sales", page: "Analytics", id: "todaysSales" },
    { section: "Total profit", page: "Analytics", id: "totalProfit" },
    { section: "Performance", page: "Analytics", id: "performance" },
    { section: "Year overview", page: "Analytics", id: "yearOverview" },
    { section: "Market metrics", page: "Analytics", id: "marketMetrics" },
    {
      section: "Revenue distribution",
      page: "Analytics",
      id: "revenueDistribution",
    },

    // Homepage
    { section: "Revenue over time", page: "Homepage", id: "revenueOverTime" },
    { section: "Regions", page: "Homepage", id: "regions" },
    {
      section: "Bestselling products",
      page: "Homepage",
      id: "bestsellingProducts",
    },
    {
      section: "Customer satisfaction",
      page: "Homepage",
      id: "customerSatisfaction",
    },
    {
      section: "Revenue per country",
      page: "Homepage",
      id: "revenuePerCountry",
    },
    { section: "Sales", page: "Homepage", id: "salesCard" },
    { section: "Profit", page: "Homepage", id: "profitCard" },
    { section: "Traffic", page: "Homepage", id: "trafficCard" },
    { section: "Customers", page: "Homepage", id: "customersCard" },

    // Other pages
    { section: "Customers", page: "Customers", id: "customers" },
    { section: "Calendar", page: "Calendar", id: "calendar" },
    { section: "Orders", page: "Orders", id: "orders" },
    { section: "Products", page: "Products", id: "products" },
  ];

  // Transform sections with translations
  const translatedSections = sections.map((item) => {
    // Try to get translated section name from search.sections
    let translatedSection;
    try {
      translatedSection = t(`search.sections.${item.id}`);
    } catch (error) {
      translatedSection = item.section;
    }

    // Try to get translated page name from search.pages
    let translatedPage;
    try {
      translatedPage = t(`search.pages.${item.page}`);
    } catch (error) {
      translatedPage = item.page;
    }

    return {
      ...item,
      translatedSection,
      translatedPage,
    };
  });

  const filteredSections = translatedSections.filter(
    (item) =>
      item.translatedSection.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translatedPage.toLowerCase().includes(searchText.toLowerCase()) ||
      item.section.toLowerCase().includes(searchText.toLowerCase()) ||
      item.page.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };
  const router = useRouter();
  const handleSectionClick = (section: Section) => {
    console.log("Selected section:", section);
    setIsDropdownOpen(false);

    const baseUrl = `/${currentLanguage}`;
    const normalizedPath = window.location.pathname.replace(/\/$/, "");

    if (section.page === "Homepage") {
      if (normalizedPath === baseUrl) {
        document
          .getElementById(section.id)
          ?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `${baseUrl}/#${section.id}`);
      } else {
        router.push(`${baseUrl}/#${section.id}`);
      }
    } else if (section.page === "Analytics") {
      if (normalizedPath === `${baseUrl}/analytics`) {
        document
          .getElementById(section.id)
          ?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `${baseUrl}/analytics#${section.id}`);
      } else {
        router.push(`${baseUrl}/analytics#${section.id}`);
      }
    } else {
      router.push(`${baseUrl}/${section.page.toLowerCase()}`);
    }
  };

  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  let searchPlaceholder;
  try {
    searchPlaceholder = t("search.placeholder");
  } catch (error) {
    searchPlaceholder = "Search...";
  }

  let noResultsText;
  try {
    noResultsText = t("search.noResults");
  } catch (error) {
    noResultsText = "No results found";
  }

  return (
    <>
      <style jsx>{`
        .search-dropdown::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: transparent;
        }

        .search-dropdown::-webkit-scrollbar-track {
          background-color: transparent;
        }

        .search-dropdown::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 6px;
        }

        .search-dropdown::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      <div className="w-[15rem] h-[2.5rem]" ref={dropdownRef}>
        <div className="relative w-full h-full">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchText}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            className="z-30 pl-8 text-primaryText dark:text-primaryTextDark pt-[0.1rem] bg-[rgb(255,255,255,0.01)] w-full h-full border dark:border-mainBorderDark border-mainBorder hover:dark:border-mainBorderDarkHover hover:border-mainBorderHover rounded-md"
          />
          <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.5rem] xl:top-[0.55rem] 2xl:top-[0.65rem] left-2">
            <SearchIcon />
          </div>

          {isDropdownOpen && (
            <div
              className="search-dropdown absolute top-full left-0 w-[200%] mt-1 bg-dropdownBg dark:bg-dropdownBgDark border dark:border-inputBorderDark border-inputBorder rounded-md shadow-md z-40 max-h-64 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(156, 163, 175, 0.3) transparent",
              }}
            >
              {filteredSections.length > 0 ? (
                filteredSections.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSectionClick(item)}
                    className="flex justify-between items-center px-5 py-4 hover:bg-dropdownBgHover dark:hover:bg-dropdownBgHoverDark cursor-pointer border-b dark:border-mainBorderDark border-mainBorder last:border-b-0"
                  >
                    <span className="text-primaryText dark:text-primaryTextDark font-medium">
                      {item.translatedSection}
                    </span>
                    <div className="bg-outlinedButtonBg dark:bg-outlinedButtonBgDark text-secondaryText dark:text-secondaryTextDark text-xs px-2 py-1 rounded">
                      {item.translatedPage}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-5 text-center text-secondaryText dark:text-secondaryTextDark">
                  {noResultsText}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
