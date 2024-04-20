import { create } from "zustand";

interface UseWeb3Type {
  account: string;
  chainId: number;
  web3: any;
  setAccount: (account: string) => void;
  setChainId: (chainId: number) => void;
  setWeb3: (web3: any) => void;
}

export const useWeb3 = create((set) => ({
  account: "",
  chainId: 0,
  web3: null,
  setAccount: (account: string) => set({ account }),
  setChainId: (chainId: number) => set({ chainId }),
  setWeb3: (web3: any) => set({ web3 }),
}));
