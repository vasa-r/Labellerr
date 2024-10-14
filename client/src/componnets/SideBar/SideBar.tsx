import ToggleView from "../ToggleView/ToggleView";
import AppTheme from "../AppTheme/AppTheme";
import FilterImage from "../FilterImage/FilterImage";

const SideBar = () => {
  return (
    <>
      <div
        className={`flex items-center justify-between w-full h-16 p-4 border border-gray-500 rounded-[4px]`}
      >
        <ToggleView />
        <AppTheme />
      </div>
      <div className="w-full">
        <FilterImage />
      </div>
    </>
  );
};

export default SideBar;
