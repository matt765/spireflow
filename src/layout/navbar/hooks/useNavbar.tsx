import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { useAppStore } from "../../../store/appStore";
import { useSession } from "../../../hooks/auth/useSession";
import { useDropdown } from "../../../hooks/useDropdown";

export const useNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { isMobileMenuOpen, toggleMobileMenu, isSideMenuOpen } = useAppStore();
  const t = useTranslations("navbar");

  const [isPrismaticTheme, setIsPrismaticTheme] = useState(true);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const { session } = useSession();

  const themes = [
    "light",
    "dark",
    "charcoal",
    "sapphire",
    "oceanic",
    "sandstone",
    "prismatic",
  ];
  const themesDisplayNames = [
    "Snowlight",
    "Midnight",
    "Charcoal",
    "Sapphire",
    "Oceanic",
    "Sandstone",
    "Prismatic",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1280 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  }, []);

  const userIconBtnRef = useRef<HTMLButtonElement | null>(null);

  const themeDropdown = useDropdown();
  const userDropdown = useDropdown();
  const languageDropdown = useDropdown();

  useEffect(() => {
    const getCurrentLanguage = () => {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        return pathname.startsWith("/pl") ? "pl" : "en";
      }
      return "en";
    };

    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const selectTheme = (themeName: string) => {
    setTheme(themeName);
    if (theme && themeName === "prismatic") {
      setIsPrismaticTheme(true);
    } else {
      setIsPrismaticTheme(false);
    }
  };

  useEffect(() => {
    if (theme && theme === "prismatic") {
      setIsPrismaticTheme(true);
    } else {
      setIsPrismaticTheme(false);
    }
  }, [theme]);

  const cycleThemeUp = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const previousThemeIndex =
        (currentThemeIndex - 1 + themes.length) % themes.length;
      setTheme(themes[previousThemeIndex]);
    }
  };

  const cycleThemeDown = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setTheme(themes[nextThemeIndex]);
    }
  };

  return {
    theme,
    setTheme,
    currentLanguage,
    setCurrentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    t,
    isPrismaticTheme,
    setIsPrismaticTheme,
    closeMobileMenu,
    session,
    themes,
    themesDisplayNames,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    cycleThemeUp,
    cycleThemeDown,
  };
};
