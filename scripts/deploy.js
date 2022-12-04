const { ethers } = require("hardhat");

async function main() {
  const LaunchTokenApp = await ethers.getContractFactory("LaunchCoinApp");
  const launchTokenApp = await LaunchTokenApp.deploy();
  await launchTokenApp.deployed();

  // const launchTokenApp = LaunchTokenApp.attach(
  //   "0x4fA88ddDc8cA9F29557a9Aa8Cc8F9ad66881F7D2"
  // );

  console.log("contract address: ", launchTokenApp.address);

  //await testFunction(launchTokenApp);
}

const testFunction = async (launchTokenApp) => {
  const [addr1, addr2, addr3] = await ethers.getSigners();

  // console.log(addr1.address, addr2.address, addr3.address);

  // const tx = await launchTokenApp.createToken(
  //   "image",
  //   "Sam Token",
  //   "SBF",
  //   1000,
  //   10000,
  //   false,
  //   false,
  //   [false, 0, false]
  // );

  // await tx.wait();

  const tokens = await launchTokenApp.getAllTokensForUser(addr1.address);

  console.log(tokens[0]);

  // const tx1 = await launchTokenApp.createPool(
  //   tokens[0].contractAddress,
  //   "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
  // );

  // await tx1.wait();

  // const pools = await launchTokenApp.getAllPoolsForToken(
  //   tokens[0].contractAddress
  // );

  // console.log("Pools", pools);

  const CustomERC20 = await ethers.getContractFactory("CustomERC20");
  const customERC20 = CustomERC20.attach(tokens[0].contractAddress);

  // const aTx = await customERC20.approve(launchTokenApp.address, 100);
  // await aTx.wait();

  // console.log(
  //   "Balance before accounts[1]",
  //   await customERC20.balanceOf(addr2.address)
  // );
  // console.log(
  //   "Balance before accounts[2]",
  //   await customERC20.balanceOf(addr3.address)
  // );

  // const tx2 = await launchTokenApp.createAirdrop(
  //   tokens[0].contractAddress,
  //   100,
  //   [addr2.address, addr3.address]
  // );

  // await tx2.wait();

  // console.log(
  //   "Balance after accounts[1]",
  //   await customERC20.balanceOf(addr2.address)
  // );
  // console.log(
  //   "Balance after accounts[2]",
  //   await customERC20.balanceOf(addr3.address)
  // );

  const airdrops = await launchTokenApp.getAllAirdropsForToken(
    tokens[0].contractAddress
  );

  console.log(airdrops[0]);
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
