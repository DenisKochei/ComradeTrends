import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <Helmet>
        <meta
          name="theme-color"
          content="#1E293B"
        />
      </Helmet>
      <div className="text-gray-700 bg-white dark:text-gray-200 dark:bg-slate-800 min-h-screen">
        {children}
      </div>
    </div>
  );
}
