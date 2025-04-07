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
    <div className="transition-colors">
      <button
        onClick={toggleDarkMode}
        className="cursor-pointer bg-secondary dark:bg-secondary/20 rounded-full p-2"
      >
        {darkMode ? (
          <IoIosSunny size={28} color="#F5B214" />
        ) : (
          <FaMoon size={28} color="#1F2E25" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
