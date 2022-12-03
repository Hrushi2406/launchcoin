const { ethers } = require("hardhat");

async function main() {
  const LaunchTokenApp = await ethers.getContractFactory("LaunchTokenApp");
  const launchTokenApp = await LaunchTokenApp.deploy();
  await launchTokenApp.deployed();

  console.log("contract address: ", launchTokenApp.address);

  await testFunction(launchTokenApp);
}

const testFunction = async () => {
  const accounts = await ethers.getSigner();

  await launchTokenApp.createToken(
    "image",
    "name",
    "SBF",
    1000,
    10000,
    false,
    false,
    [false, 0, false]
  );

  await launchTokenApp.createToken(
    "image",
    "name",
    "SBF2",
    1000,
    10000,
    false,
    false,
    [false, 0, false]
  );

  const tokens = await launchTokenApp.getAllTokensForUser(accounts[0]);

  console.log(tokens[0]);
  console.log(tokens[1]);

  await launchTokenApp.createPool(
    tokens[0].contractAddress,
    tokens[1].contractAddress
  );

  const pools = await launchTokenApp.getAllPoolsForToken(
    tokens[0].contractAddress
  );

  console.log(pools[0]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
