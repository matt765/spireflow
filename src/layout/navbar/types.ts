import { RefObject } from "react";

export interface TooltipProps {
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
}

export interface DropdownProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface AboutModalProps {
  closeModal: () => void;
}

export interface HamburgerButtonProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export interface LanguageButtonProps {
  currentLanguage: string;
  languageTooltip: TooltipProps;
  languageDropdown: DropdownProps;
  themeDropdown: DropdownProps;
  userDropdown: DropdownProps;
  t: (key: string) => string;
}

export interface ThemeButtonProps {
  theme: string | undefined;
  isMobileMenuOpen: boolean;
  paletteTooltip: TooltipProps;
  themeDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  userDropdown: DropdownProps;
  closeMobileMenu: () => void;
  selectTheme: (themeName: string) => void;
  cycleThemeUp: () => void;
  cycleThemeDown: () => void;
  themes: string[];
  themesDisplayNames: string[];
  t: (key: string) => string;
  searchClose: () => void;
}

export interface UserButtonProps {
  userIconBtnRef: RefObject<HTMLButtonElement | null>;
  closeMobileMenu: () => void;
  userDropdown: DropdownProps;
  themeDropdown: DropdownProps;
  languageDropdown: DropdownProps;
  userTooltip: TooltipProps;
  showLogoutModal: () => void;
  showAboutModal: () => void;
  showChangelogModal: () => void;
  session: {
    username?: string | null;
    isLoggedIn?: boolean;
  } | null;
  theme: string | undefined;
  t: (key: string) => string;
  searchClose: () => void;
}

export interface ChangelogModalProps {
  closeModal: () => void;
}
