import create from "zustand";
import { ethers } from "ethers";
import { supportedNetworks, defaultChainId } from "../utils/network_config";
import { formatBigNum } from "../utils/helper";

const web3Store = (set, get) => ({
  accounts: [],

  connectWallet: async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("accounts: ", accounts);

      const signer = provider.getSigner();

      const { chainId } = await provider.getNetwork();

      if (!supportedNetworks[chainId]) {
        throw new Error("Use Correct Network");
      }

      const contracts = {};
      // const contracts = await fetchContracts(signer, chainId);

      const balance = formatBigNum(await provider.getBalance(accounts[0]));

      set({
        accounts,
        chainId,
        signer,
        balance: parseFloat(balance),
        ...contracts,
      });
    } catch (e) {
      set({ error: e.message });

      console.log("useWeb3 : connectWallet failed -> " + e.message);
    }
  },

  initWallet: async () => {
    try {
      let provider;

      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        provider = new ethers.providers.JsonRpcProvider(
          supportedNetworks[defaultChainId].rpcURL
        );
      }

      const isMetamaskConnected = (await provider.listAccounts()).length > 0;
      set({ isMetamaskConnected });

      if (isMetamaskConnected) {
        await get().connectWallet();
      } else {
        //const contracts = await fetchContracts(provider, defaultChainId);
        //
        const contracts = {};

        set({ ...contracts, provider });
      }
    } catch (error) {
      console.log("Error ConnectionProvider -> ", error);

      set({ error });
    }
  },
});

export const useWeb3 = create(web3Store);
