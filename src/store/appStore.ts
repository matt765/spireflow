import create from "zustand";

interface AppStore {
  isMobileMenuOpen: boolean;
  isSideMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSideMenu: () => void;
}

const determineInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      isMobileMenuOpen: window.innerWidth < 1024,
      isSideMenuOpen: window.innerWidth >= 1024,
    };
  }
  return {
    isMobileMenuOpen: false,
    isSideMenuOpen: true,
  };
};

export const useAppStore = create<AppStore>((set) => ({
  isMobileMenuOpen: false, 
  isSideMenuOpen: true, 
  toggleMobileMenu: () => {
    set((state: AppStore) => ({
      ...state,
      isMobileMenuOpen: state.isMobileMenuOpen
        ? false
        : determineInitialState().isMobileMenuOpen,
    }));
  },
  toggleSideMenu: () => {
    set((state: AppStore) => ({
      ...state,
      isSideMenuOpen: state.isSideMenuOpen
        ? false
        : determineInitialState().isSideMenuOpen,
    }));
  },
}));
