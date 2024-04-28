import { create } from "zustand";
import {
  OneNFT,
  OneNFT__factory,
  NFTMarketplace,
  NFTMarketplace__factory,
} from "../typechain";
import { ethers } from "ethers";
import { toast } from "sonner";

export const CHAIN_ID = "0x539";
export const CHAIN_NAME = "Localnet";

interface UseWeb3Type {
  isConnected: boolean;
  nftContract: OneNFT | null;
  marketplaceContract: NFTMarketplace | null;
  walletAddress: string | null;
  isInit: boolean;
  keepDisconnect: boolean;
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ethereum = provider.provider;

    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts?.length > 0) {
        set({ isConnected: true, walletAddress: accounts[0] });
      } else {
        set({ isConnected: false, walletAddress: null });
      }
    });

    ethereum.on("chainChanged", () => window.location.reload());

    try {
      const accounts = await provider.listAccounts();
      if (accounts?.length > 0 && !get().keepDisconnect) {
        set({ isConnected: true, walletAddress: accounts[0] });
      }
    } catch (error) {
      console.error("Error initializing connection:", error);
    }

    try {
      const nftContract = OneNFT__factory.connect(
        addresses.nftAddress,
        provider
      );
      const marketplaceContract = NFTMarketplace__factory.connect(
        addresses.marketplaceAddress,
        provider
      );
      set({ nftContract, marketplaceContract, isInit: true });
    } catch (error) {
      console.error("Error initializing contracts:", error);
      toast.error("Failed to initialize contracts.");
    }
  },
}));
