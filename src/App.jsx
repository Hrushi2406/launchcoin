import "./App.css";
import React from "react";

import { Button } from "./components/Button";
import { useWeb3 } from "./store/web3_store";

function App() {
  const initWallet = useWeb3((state) => state.initWallet);

  React.useEffect(() => {
    initWallet();
  }, []);
  return (
    <div className="App ">
      <Button label={"click me "} />
    </div>
  );
}

export default App;
