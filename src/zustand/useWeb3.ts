import { create } from "zustand";
import {
  OneNFT,
  OneNFT__factory,
  NFTMarketplace,
  NFTMarketplace__factory,
} from "../typechain";
import { ethers } from "ethers";

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
  connect: () => void;
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
  setIsConnected: (isConnected) => set({ isConnected }),
  connect: async () => {
    // TODO: handle if user hasn't installed metamask
    // check if window.ethereum exists
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
  },
  disconnect: () => {
    return set({
      isConnected: false,
      walletAddress: "",
      keepDisconnect: true,
    });
  },
  init: async () => {
    // TODO: handle if user hasn't installed metamask
    // check if window.ethereum exists
    if (!window?.ethereum) {
      console.log("return because of no window.ethereum");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { provider: ethereum } = provider;

    //@ts-ignore
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts?.length > 0) {
        set({
          isConnected: true,
          walletAddress: accounts[0],
        });
      } else {
        set({
          isConnected: false,
          walletAddress: null,
        });
      }
    });

    const accounts = await provider.listAccounts();

    if (accounts?.length > 0 && get().keepDisconnect === false) {
      set({
        isConnected: true,
        walletAddress: accounts[0],
      });
    }

    //@ts-ignore
    ethereum.on("chainChanged", () => window.location.reload());

    set({
      nftContract: MonoNFT__factory.connect(addresses.nftAddress, provider),
      marketplaceContract: NFTMarketplace__factory.connect(
        addresses.marketplaceAddress,
        provider
      ),
      isInit: true,
    });
  },
}));
