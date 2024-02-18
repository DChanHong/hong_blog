"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`hover:scale-110 active:scale-100 duration-200 bg-[#000] `}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <MdDarkMode size={`30`} />
      ) : (
        <MdLightMode size={`30`} />
      )}
    </button>
  );
};
