import SocialLogin from "@biconomy/web3-auth";
import React from "react";
import { ethers } from "ethers";
// NOTE: If you're using version ^0.0.4 then you need to import the css in project root
import "@biconomy/web3-auth/dist/src/style.css";
import { useSyncExternalStore } from "react";

export function SocialLoginUI() {
  const getAccount = async () => {
    // init wallet
    const socialLoginSDK = new SocialLogin();
    await socialLoginSDK.init("0x13881"); // Enter the network id in hex) parameter
    socialLoginSDK.showConnectModal();

    // show connect modal
    socialLoginSDK.showWallet();
    if (!socialLoginSDK?.web3auth?.provider) return;
    const provider = new ethers.providers.Web3Provider(
      socialLoginSDK.web3auth.provider
    );
    const accounts = await provider.listAccounts();
    console.log("EOA address", accounts);
  };

  React.useEffect(() => {}, []);
  return <></>;
}
