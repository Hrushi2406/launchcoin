import { ethers } from "ethers";
import { supportedNetworks } from "./network_config";
import LaunchCoinApp from "../artifacts/contracts/LaunchCoinApp.sol/LaunchCoinApp.json";
import CustomERC20 from "../artifacts/contracts/CustomERC20.sol/CustomERC20.json";

const fetchContracts = async (provider, chainId) => {
  const launchCoinApp = new ethers.Contract(
    supportedNetworks[chainId].address,
    LaunchCoinApp.abi,
    provider
  );

  // const tId = await toTheMoon.currentTournamentId();

  // const tAtId = await toTheMoon.tournaments(tId);

  // const tournament = new ethers.Contract(
  //   tAtId.contractAddress,
  //   Tournament.abi,
  //   provider
  // );

  return { launchCoinApp };
};

// const loadTournament = async (provider: any, chainId: number, id: string) => {
//   const toTheMoon = new ethers.Contract(
//     supportedNetworks[chainId].address,
//     ToTheMoon.abi,
//     provider
//   );

//   const tAtId = await toTheMoon.tournaments(id);
//   const tournament = new ethers.Contract(
//     tAtId.contractAddress,
//     Tournament.abi,
//     provider
//   );

//   return tournament;
// };

export { fetchContracts };
