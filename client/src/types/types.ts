import { ReactNode } from "react";

export interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  setAppTheme: (theme: string) => void;
  displayMode: string;
  setDisplayMode: (mode: string) => void;
  setAppDisplayMode: (mode: string) => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface ChipProps {
  value: string;
  onRemove: () => void;
}
