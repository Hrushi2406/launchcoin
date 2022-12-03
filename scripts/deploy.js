const { ethers } = require("hardhat");

async function main() {
  const LaunchTokenApp = await ethers.getContractFactory("LaunchTokenApp");
  const launchTokenApp = await LaunchTokenApp.deploy();
  await launchTokenApp.deployed();

  console.log("contract address: ", launchTokenApp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
