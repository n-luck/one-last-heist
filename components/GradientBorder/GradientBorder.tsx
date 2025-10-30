"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
}

export const GradientBorder = ({ children, className = "" }: GradientBorderProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn("relative p-[3px] border h-full", ...className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background",
          hover && "bg-linear-to-r from-blue-400 to-purple-500"
        )}
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientRotate 3s linear infinite",
        }}
      ></div>
      <div className="relative text-foreground font-medium bg-slate-50 dark:bg-card flex-1 h-full">
        {children}
      </div>
    </div>
  );
};
