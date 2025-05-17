import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  const actualTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", actualTheme === "dark" ? "	#1e293b" : "#e9d5ff");
    }

    document.body.classList.toggle("dark", actualTheme === "dark");
  }, [actualTheme]);

  return (
    <div className={actualTheme}>
      <div className="text-gray-700 bg-gray-300 dark:text-gray-200 dark:bg-slate-800 min-h-screen">
        {children}
      </div>
    </div>
  );
}
