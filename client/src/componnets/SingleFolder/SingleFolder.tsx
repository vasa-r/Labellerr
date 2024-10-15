import Folder from "../../assets/folder.png";
import { useApp } from "../../context/AppContext";
import { FolderProps } from "../../types/types";

const SingleFolder = ({ name, count }: FolderProps) => {
  const { setCategory } = useApp();

  const handleFolderClick = (cat: string) => {
    setCategory(cat);
  };

  return (
    <div
      className="flex-col cursor-pointer center"
      onClick={() => handleFolderClick(name)}
    >
      <img src={Folder} alt="folder icon" className="w-48 h-48" />
      <p className="mt-[-18px] text-lg">{name}</p>
      <small className="text-sm">{count} items</small>
    </div>
  );
};

export default SingleFolder;
