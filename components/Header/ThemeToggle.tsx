"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const currentMode = theme === "light" ? "dark" : "light"

  return (
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        variant="ghost"
        className="p-2 cursor-pointer"
        title={`Theme toggle: Turn ${currentMode}`}
      >
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>
  );
};
