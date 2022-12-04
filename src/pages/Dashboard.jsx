import React from "react";
import { useWeb3 } from "../store/web3_store";
export function Dashboard() {
  const fetchMyTokens = useWeb3((state) => state.fetchMyTokens);
  const tokenInfo = useWeb3((state) => state.tokenInfo);

  React.useEffect(() => {
    //fetchMyTokens();
  }, []);

  if (!tokenInfo) return <div>Loading</div>;

  return (
    <div className="px-40 py-4">
      <div className="colored-box w-full bg-gray-100 px-16 py-8 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 self-center">
            <div className="rounded-full w-16 h-16 bg-gray-200">
              <img src={tokenInfo.image} />
            </div>
            <div className="space-y-1 text-left">
              <h1 className="uppercased">{tokenInfo.symbol}</h1>

              <h6 className="text-xs ">{tokenInfo.name}</h6>
            </div>
          </div>

          <a
            href={"#"}
            className="tracking-normal text-[#3B4FBA] underline underline-offset-4 "
          >
            <p>View on polyscan</p>
          </a>
        </div>

        <div className="my-12"></div>

        <div className="grid grid-cols-4 items-center gap-8">
          <InfoTile title={"Initial Supply"} value={tokenInfo.initialSupply} />
          <InfoTile title={"Total Supply"} value={tokenInfo.maxSupply} />
          <InfoTile title={"Can Mint "} value={tokenInfo.canBurn.toString()} />
          <InfoTile title={"Can Burn"} value={tokenInfo.canMint.toString()} />
          <InfoTile
            title={"Is Taxable"}
            value={tokenInfo.isTaxable.toString()}
          />
          <InfoTile
            title={"Should burn tax"}
            value={tokenInfo.shouldBurnTax.toString()}
          />
          <InfoTile title={"Tax Fee Percentange"} value={tokenInfo.taxFeePer} />
        </div>
      </div>

      <div className="my-8"></div>

      <div className="flex items-center justify-between gap-8">
        <div className="dashboard-card w-full">
          <div className="flex items-center justify-between ">
            <h6 className="font-bold tracking-wide text-lg">Liquidity Pools</h6>
            <button className="tracking-wide font-bold text-sm text-[#3B4FBA]">
              + Create Pool
            </button>
          </div>

          <div className="my-3"></div>
          <hr />
          <div className="my-3"></div>
        </div>

        <div className="dashboard-card w-full">
          <div className="flex items-center justify-between">
            <h6 className="font-bold tracking-wide text-lg">Airdrop</h6>
            <a
              href="/"
              className="tracking-wide font-bold text-sm text-[#3B4FBA] cursor-pointer"
            >
              + Create Airdrop
            </a>
          </div>
          <div className="my-3"></div>
          <hr />
          <div className="my-3"></div>
        </div>
      </div>
    </div>
  );
}

const InfoTile = ({ title, value }) => {
  return (
    <div className="text-left">
      <h6 className="uppercased text-xs ">{title}</h6>
      <p>{value}</p>
    </div>
  );
};
