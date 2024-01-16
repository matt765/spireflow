import create from "zustand";

interface AppStore {
  isMobileMenuOpen: boolean;
  isSideMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSideMenu: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const determineInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      isMobileMenuOpen: window.innerWidth < 1280,
      isSideMenuOpen: window.innerWidth >= 1280,
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
  isLoading: true,
  setLoading: (loading) => set(() => ({ isLoading: loading })),
}));

export const initializeLoadingState = () => {
  useAppStore.getState().setLoading(true);
  setTimeout(() => useAppStore.getState().setLoading(false), 400);
};