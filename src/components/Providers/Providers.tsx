"use client";

import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "next-themes";
import { useWeb3, UseWeb3Type } from "@/zustand/useWeb3";
import { useEffect } from "react";
import { ethers } from "ethers";

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} position="top-right" />;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { init, isInit } = useWeb3() as UseWeb3Type;

  useEffect(() => {
    if (!window || !("ethereum" in window) || isInit) {
      return;
    }

    init();
  }, [ethers]);

  return (
    <ThemeProvider attribute="class">
      <ToasterProvider />
      {children}
    </ThemeProvider>
  );
}
