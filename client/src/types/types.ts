import { ReactNode } from "react";

export interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  setAppTheme: (theme: string) => void;
  displayMode: string;
  setDisplayMode: (mode: string) => void;
  setAppDisplayMode: (mode: string) => void;
  filteredData: string[];
  setFilteredData: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface ChipProps {
  value: string;
  onRemove: () => void;
}

export interface catTypes {
  _id: string;
  category_name: string;
  count: number;
}

export interface FolderProps {
  name: string;
  count: number;
}
