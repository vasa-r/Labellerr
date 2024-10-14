import { createContext, useContext, useState } from "react";
import { AppContextType, AppProviderProps } from "../types/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const initialTheme = window.localStorage.getItem("theme") || "light";
  const initialDisplayMode = window.localStorage.getItem("dMode") || "file";
  const [theme, setTheme] = useState(initialTheme);
  const [displayMode, setDisplayMode] = useState(initialDisplayMode);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const setAppTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const setAppDisplayMode = (mode: string) => {
    setDisplayMode(mode);
    localStorage.setItem("dMode", mode);
  };

  const values = {
    theme,
    setTheme,
    setAppTheme,
    displayMode,
    setDisplayMode,
    setAppDisplayMode,
    filteredData,
    setFilteredData,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
