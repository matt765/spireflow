import create from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  isMobileMenuOpen: boolean;
  isSideMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSideMenu: () => void;
}

const isClient = typeof window !== "undefined";

const persistedStore = persist<AppStore>(
  (set) => ({
    isMobileMenuOpen:
      isClient && localStorage.getItem("app-store")
        ? JSON.parse(localStorage.getItem("app-store")!).isMobileMenuOpen
        : false,
    toggleMobileMenu: () =>
      set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    isSideMenuOpen: true,
    toggleSideMenu: () =>
      set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
  }),
  {
    name: "app-store",
  }
);

export const useAppStore = create(persistedStore);
