import { useTheme } from "@/store/context/ThemeContext";

const Spinner = () => {
  const { darkMode } = useTheme();

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 
        ${darkMode 
          ? "border-blue-400"
          : "border-blue-600"
        }`}
      />
    </div>
  );
};

export default Spinner;