import create from "zustand";
import { ethers } from "ethers";
import { supportedNetworks, defaultChainId } from "../utils/network_config";
import { formatBigNum } from "../utils/helper";
import { fetchContracts } from "../utils/fetch_contracts";

const web3Store = (set, get) => ({
  accounts: [],

  createToken: async (
    icon,
    name,
    symbol,
    initialSupply,
    maxSupply,
    canMint,
    canBurn,
    isTaxable,
    perTax,
    shouldBurnTax
  ) => {
    const launchCoinApp = get().launchCoinApp;

    try {
      const tx = await launchCoinApp.createToken(
        icon,
        name,
        symbol,
        initialSupply,
        maxSupply,
        canMint,
        canBurn,
        [isTaxable, parseFloat(perTax) * 100, shouldBurnTax]
      );

      await tx.wait();

      console.log("Minted tx: ", tx);
    } catch (err) {
      console.log("err: ", err);
    }
  },

  fetchMyTokens: async () => {
    const launchCoinApp = get().launchCoinApp;
    const basicInfo = await launchCoinApp.getAllTokensForUser(
      get().accounts[0]
    );

    const { name, symbol, image } = basicInfo[basicInfo.length - 1];

    const customERC20 = get().customERC20;

    const initialSupply = await customERC20.initialSupply();
    const maxSupply = await customERC20.maxSupply();
    const canMint = await customERC20.isMintAllowed();
    const canBurn = await customERC20.isBurnAllowed();
    const taxVars = await customERC20.taxVars();

    const tokenInfo = {
      name,
      symbol,
      image,
      initialSupply: initialSupply.toNumber(),
      maxSupply: maxSupply.toNumber(),
      canMint,
      canBurn,
      isTaxable: taxVars.isTaxed,
      shouldBurnTax: taxVars.shouldBurnTax,
      taxFeePer: taxVars.taxPercentage.toNumber() / 100,
    };

    console.log("tokenInfo: ", tokenInfo);

    set({
      tokenInfo,
    });
  },

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

      // const contracts = {};
      const contracts = await fetchContracts(signer, chainId, accounts[0]);

      const balance = formatBigNum(await provider.getBalance(accounts[0]));

      set({
        accounts,
        chainId,
        signer,
        balance: parseFloat(balance),
        ...contracts,
      });
      get().fetchMyTokens();
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
        const contracts = await fetchContracts(provider, defaultChainId, "");

        set({ ...contracts, provider });
      }
    } catch (error) {
      console.log("Error ConnectionProvider -> ", error);

      set({ error });
    }
  },
});

export const useWeb3 = create(web3Store);
