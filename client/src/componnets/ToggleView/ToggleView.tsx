import { useApp } from "../../context/AppContext";

const ToggleView = () => {
  const { theme, displayMode, setAppDisplayMode } = useApp();

  const handleFileView = () => {
    setAppDisplayMode("file");
  };

  const handleGroupView = () => {
    setAppDisplayMode("group");
  };
  return (
    <div
      className={`flex items-center gap-3 p-1 px-2 text-sm text-black rounded-[4px] ${
        theme === "light" ? "bg-white border" : "bg-white"
      }`}
    >
      <div
        onClick={handleFileView}
        className={`p-1 px-2 rounded-[4px] cursor-pointer cente ${
          displayMode === "file" ? `bg-customGray text-white` : "text-black"
        }`}
      >
        File View
      </div>
      <div
        onClick={handleGroupView}
        className={`p-1 px-2 rounded-[4px] cursor-pointer center ${
          displayMode === "group" ? `bg-customGray text-white` : "text-black"
        }`}
      >
        Group View
      </div>
    </div>
  );
};

export default ToggleView;
