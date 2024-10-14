import { useApp } from "../../context/AppContext";

const PageLoader = () => {
  const { theme } = useApp();
  return (
    <div
      className={`inset-0 z-50 flex items-center justify-center w-full h-full  bg-opacity-75 ${
        theme === "light" ? "bg-white" : "bg-customGray"
      }`}
    >
      <div
        style={{
          border: "6px solid rgba(0, 0, 0, 0.1)",
          borderTop: "6px solid #3498db",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
