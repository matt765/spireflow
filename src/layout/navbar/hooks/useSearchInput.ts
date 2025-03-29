import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useNavbar } from "./useNavbar";

interface Section {
  section: string;
  page: string;
  id: string;
  translatedSection: string;
  translatedPage: string;
}

export const useSearchInput = () => {
  const t = useTranslations("navbar");
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useNavbar();
  const router = useRouter();

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

  const handleSectionClick = (section: Section) => {
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

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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

  return {
    searchText,
    isDropdownOpen,
    dropdownRef,
    sections,
    translatedSections,
    filteredSections,
    searchPlaceholder,
    noResultsText,
    handleSearchChange,
    handleInputFocus,
    handleSectionClick,
    closeDropdown,
  };
};
