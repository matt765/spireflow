import create from "zustand";

type State = {
  user: null | { [key: string]: any };
  setUser: (user: null | { [key: string]: any }) => void;
  initializeUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useLoginStore = create<State>((set) => ({
  user: null,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user });
  },
  initializeUser: () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      set({ user, loading: false }); 
    }
  },
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
