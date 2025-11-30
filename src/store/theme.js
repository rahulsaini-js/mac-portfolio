import { create } from "zustand";

// Get initial theme from localStorage or default to false (light mode)
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.isDark || false;
      } catch {
        return false;
      }
    }
  }
  return false;
};

const useThemeStore = create((set) => ({
  isDark: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme-storage", JSON.stringify({ isDark: newTheme }));
      }
      return { isDark: newTheme };
    }),
}));

export default useThemeStore;

