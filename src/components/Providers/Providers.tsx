"use client";

import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "next-themes";
import { useWeb3 } from "@/zustand/useWeb3";
import { useEffect } from "react";

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} position="top-right" />;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setAccount, setChainId, setWeb3 } = useWeb3();

  useEffect(()=>{
    if (!window.ethereum) {
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    set({
      isConnected: true,
      keepDisconnect: false,
      walletAddress: await signer.getAddress(),
    });
  },[])

  return (
    <ThemeProvider attribute="class">
      <ToasterProvider />
      {children}
    </ThemeProvider>
  );
}
