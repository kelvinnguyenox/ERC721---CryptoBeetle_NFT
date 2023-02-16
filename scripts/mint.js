// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const fs = require("fs");

// let rawdata = fs.readFileSync("student.json");
// let student = JSON.parse(rawdata);
// console.log(student);
const cryptoBeetlesJSON = require("../artifacts/contracts/CryptoBeetles.sol/CryptoBeetles.json");
// console.log(cryptoBeetles);
// const cryptoBeetlesData = fs.readFileSync(cryptoBeetles);
// const cryptoBeetlesJSON = JSON.parse(cryptoBeetlesData);
async function main() {
  const abi = cryptoBeetlesJSON.abi;
  console.log(abi);
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );
  const wallet = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);
  const singer = wallet.connect(provider);
  const cryptoBeetles = new ethers.Contract(
    process.env.ADDRESS_CONTRACT,
    abi,
    singer
  );
  await cryptoBeetles.mint(
    process.env.OWNER_CONTRACT,
    7,
    "https://ipfs.io/ipfs/QmXwpwWYEoxN6mfNgjGYEvJu1TRXdQw3XSJeAuPVZx2tWR"
  );
  console.log("NFT is minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
