"use client";

import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "next-themes";
import { useWeb3 } from "@/zustand/useWeb3";

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} position="top-right" />;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setAccount, setChainId, setWeb3 } = useWeb3();

  return (
    <ThemeProvider attribute="class">
      <ToasterProvider />
      {children}
    </ThemeProvider>
  );
}
