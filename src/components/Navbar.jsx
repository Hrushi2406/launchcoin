import { Link } from "react-router-dom";
import { useWeb3 } from "../store/web3_store";
import { copyToClipboard, formatAddress } from "../utils/helper";

export function Navbar() {
  return (
    <nav className="mx-40 my-4 flex gap-4 items-center justify-between">
      <div className="uppercased">Launch Coin</div>

      <div className="flex gap-8">
        <a href="/dashboard" className="uppercased text-blue-800">
          Dashboard
        </a>
        <WalletConnect />
      </div>
    </nav>
  );
}

const WalletConnect = () => {
  const accounts = useWeb3((state) => state.accounts);
  const connectWallet = useWeb3((state) => state.connectWallet);

  const isConnected = useWeb3((state) => state.accounts.length > 0);

  return (
    <>
      {isConnected ? (
        <div
          className="colored-box text-sm cursor-copy"
          onClick={() => copyToClipboard(accounts[0])}
        >
          {formatAddress(accounts[0])}
        </div>
      ) : (
        <button className="primary-btn uppercased" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </>
  );
};
