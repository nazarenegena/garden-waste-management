import { useState, useEffect } from "react";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="transition-all duration-300 absolute lg:left-4 top-5 md:left-2 left-1 z-50">
      <button
        onClick={toggleDarkMode}
        className="cursor-pointer bg-neutral/25 dark:bg-secondary/20 rounded-lg p-3 border border-base/20 hover:scale-105 transition-transform"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <IoIosSunny className="lg:w-5 lg:h-5 w-4 h-4" color="#F5B214" />
        ) : (
          <FaMoon className="lg:w-5 lg:h-5 w-4 h-4" color="#1F2E25" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
