// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Beetles = await hre.ethers.getContractFactory("CryptoBeetles");
  const beetles = await Beetles.deploy("CryptoBeetles", "DEV116");
  await beetles.deployed();
  const [owner] = await ethers.getSigners();
  console.log(`Beetles is deployed` + beetles.address);
  const newItemId = await beetles.mint(
    process.env.OWNER_CONTRACT,
    1,
    "https://ipfs.io/ipfs/QmeYJAYyj2rJA43zQgqb8ZD3JxiHW4uDemPjVur9TTC8hq"
  );
  console.log("Mint success" + newItemId);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
