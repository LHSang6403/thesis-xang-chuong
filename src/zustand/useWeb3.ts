import { create } from "zustand";
// import {
//   OneNFT,
//   OneNFT__factory,
//   NFTMarketplace,
//   NFTMarketplace__factory,
// } from "../typechain";
import { ethers } from "ethers";
import { toast } from "sonner";
import { is } from "date-fns/locale";

export const CHAIN_ID = "0x539";
export const CHAIN_NAME = "Localnet";

export interface UseWeb3Type {
  isConnected: boolean;
  keepDisconnect: boolean;
  // nftContract: OneNFT | null;
  // marketplaceContract: NFTMarketplace | null;
  nftContract: any;
  marketplaceContract: any;
  isInit: boolean;
  walletAddress: string | null;
  setIsConnected: (isConnected: boolean) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  init: () => void;
}

export const useWeb3 = create((set, get) => ({
  isConnected: false,
  keepDisconnect: false,
  nftContract: null,
  marketplaceContract: null,
  isInit: false,
  walletAddress: null,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  connect: async () => {
    if (!window || !("ethereum" in window) || !window.ethereum) {
      toast.error("Please install Metamask to connect to the blockchain.");
    } else {
      const { ethereum } = window as any;
      const provider = new ethers.BrowserProvider(ethereum);

      try {
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();

        set({ isConnected: true, keepDisconnect: false, walletAddress });
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
        toast.error("Failed to connect to the blockchain.");
      }
    }
  },
  disconnect: () => {
    set({ isConnected: false, walletAddress: null, keepDisconnect: true });
  },
  init: async () => {
    if (!window || !("ethereum" in window) || !window.ethereum) {
      console.log("No window.ethereum found");
      toast.error("Please install Metamask to connect to the blockchain.");
    }

    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const ether = provider.provider;

    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts?.length > 0) {
        set({ isConnected: true, walletAddress: accounts[0] });
      } else {
        set({ isConnected: false, walletAddress: null });
      }
    });

    ethereum.on("chainChanged", () => window.location.reload());

    try {
      const { keepDisconnect } = get() as { keepDisconnect: boolean };
      const accounts = await provider.listAccounts();
      if (accounts?.length > 0 && !keepDisconnect) {
        set({ isConnected: true, walletAddress: accounts[0] });
        const { isConnected, walletAddress } = get() as UseWeb3Type;
        console.log("keep", isConnected, walletAddress);
      }
    } catch (error) {
      console.error("Error initializing connection:", error);
    }

    try {
      // const nftContract = OneNFT__factory.connect(
      //   addresses.nftAddress,
      //   provider
      // );
      // const marketplaceContract = NFTMarketplace__factory.connect(
      //   addresses.marketplaceAddress,
      //   provider
      // );
      // set({ nftContract, marketplaceContract, isInit: true });
      const {
        isConnected,
        keepDisconnect,
        nftContract,
        marketplaceContract,
        isInit,
        walletAddress,
      } = get() as UseWeb3Type;

      console.log("connected to blockchain");
      console.log({
        isConnected,
        keepDisconnect,
        nftContract,
        marketplaceContract,
        isInit,
        walletAddress,
      });
    } catch (error) {
      console.error("Error initializing contracts:", error);
      toast.error("Failed to initialize contracts.");
    }
  },
}));
