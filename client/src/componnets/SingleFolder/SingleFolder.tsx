import Folder from "../../assets/folder.png";
import { FolderProps } from "../../types/types";

const SingleFolder = ({ name, count }: FolderProps) => {
  return (
    <div className="flex-col center">
      <img src={Folder} alt="folder icon" className="w-48 h-48" />
      <p className="mt-[-18px] text-lg">{name}</p>
      <small className="text-sm">{count} items</small>
    </div>
  );
};

export default SingleFolder;
