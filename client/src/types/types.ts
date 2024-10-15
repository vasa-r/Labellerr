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
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
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

export interface imagesUrl {
  _id: string;
  flickr_url: string;
  id: number;
}

export interface ImageModalProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  id: number;
}

export interface ImageType {
  _id: string;
  file_name: string;
  coco_url: string;
  height: number;
  width: number;
  date_captured: string;
  flickr_url: string;
  id: number;
  categories: string[];
}

export interface ImageDetailType {
  image: ImageType;
}
