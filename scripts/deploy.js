const { ethers } = require("hardhat");

async function main() {
  const LaunchTokenApp = await ethers.getContractFactory("LaunchCoinApp");
  const launchTokenApp = await LaunchTokenApp.deploy();
  await launchTokenApp.deployed();

  console.log("contract address: ", launchTokenApp.address);

  await testFunction(launchTokenApp);
}

const testFunction = async (launchTokenApp) => {
  const accounts = await ethers.getSigner();

  const tx = await launchTokenApp.createToken(
    "image",
    "name",
    "SBF",
    1000,
    10000,
    false,
    false,
    [false, 0, false]
  );

  await tx.wait();

  const tokens = await launchTokenApp.getAllTokensForUser(accounts.address);

  console.log(tokens[0]);

  //   const tx1 = await launchTokenApp.createPool(
  //     tokens[0].contractAddress,
  //     "0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253"
  //   );

  //   await tx1.wait();

  //   const pools = await launchTokenApp.getAllPoolsForToken(
  //     tokens[0].contractAddress
  //   );

  //   console.log(pools);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

///LOGS
// [
//   '0x23277E28DaD2AF479b285C21C04C4e981508f7D3',
//   '0xB61613c09A2906CAf18043d636560537c73110B1',
//   '0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253',
//   tokenAddress: '0x23277E28DaD2AF479b285C21C04C4e981508f7D3',
//   poolContractAddress: '0xB61613c09A2906CAf18043d636560537c73110B1',
//   pairTokenAddress: '0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253'
// ]
