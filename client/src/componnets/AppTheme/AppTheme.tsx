import { useApp } from "../../context/AppContext";
import Dark from "../../assets/dark-mode-dark.svg";
import Light from "../../assets/light-mode-light.svg";

const AppTheme = () => {
  const { theme, setAppTheme } = useApp();

  const toggleDarkMode = () => {
    setAppTheme("dark");
    // console.log("dark clicked");
  };

  const toggleLightMode = () => {
    setAppTheme("light");
    // console.log("light clicked");
  };
  return (
    <div>
      {theme === "light" ? (
        <img
          src={Dark}
          alt="dark mode"
          className="p-[2px] cursor-pointer w-7 hover:rounded-md hover:bg-slate-200"
          title="toggle dark mode"
          onClick={toggleDarkMode}
        />
      ) : (
        <img
          src={Light}
          alt="light mode"
          className="cursor-pointer w-7 hover:rounded-md hover:bg-slate-700"
          title="toggle light mode"
          onClick={toggleLightMode}
        />
      )}
    </div>
  );
};

export default AppTheme;
