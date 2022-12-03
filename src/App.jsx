import "./App.css";
import React from "react";

import { Button } from "./components/Button";
import { useWeb3 } from "./store/web3_store";
import { Route, Routes } from "react-router-dom";
import { LaunchToken } from "./pages/LaunchToken";
import { Navbar } from "./components/Navbar";

function App() {
  const initWallet = useWeb3((state) => state.initWallet);

  React.useEffect(() => {
    initWallet();

    if (window.ethereum) {
      // Detect metamask account change
      window.ethereum.on("accountsChanged", async function () {
        initWallet();
      });

      // Detect metamask network change
      window.ethereum.on("chainChanged", function () {
        initWallet();
      });
    }
  }, []);

  return (
    <div className="App ">
      <Navbar />
      <Routes>
        <Route path="/" element={<LaunchToken />} />
        <Route path="/hrushi" element={<Button label={"Click me Daddy"} />} />
      </Routes>
    </div>
  );
}

export default App;
