import SideBar from "../componnets/SideBar/SideBar";
import { useApp } from "../context/AppContext";

const ExplorePage = () => {
  const { theme } = useApp();
  return (
    <div className="w-full h-full bg-[#18181b] gap-4 p-6 center">
      <div
        className={`w-full h-full p-5 rounded-lg basis-3/4 ${
          theme === "light"
            ? "bg-white"
            : "bg-gradient-to-b from-customGray to-mediumGray"
        } `}
      >
        1
      </div>
      <div
        className={`flex flex-col items-center w-full h-full gap-4 p-5 rounded-lg basis-1/4 ${
          theme === "light"
            ? "bg-white"
            : "bg-gradient-to-b from-customGray to-mediumGray"
        }`}
      >
        <SideBar />
      </div>
    </div>
  );
};

export default ExplorePage;
