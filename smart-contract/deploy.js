const fs = require("fs");
const path = require("path");
const { ethers, artifacts } = require("hardhat");

async function main() {
    const contract = await ethers.deployContract("Voting");
    await contract.waitForDeployment();

    console.log("Contract deployed to address:", contract.target);

    const contractAbi = JSON.stringify(artifacts.readArtifactSync("Voting").abi, null, 2);
    const contractInfo = {
        contractAddress: contract.target,
        contractAbi: contractAbi
    };

    const outputFilePath = path.join(__dirname, "output.json");

    fs.writeFileSync(outputFilePath, JSON.stringify(contractInfo, null, 2));

    console.log(`Generated JSON file with contract addresses: ${outputFilePath}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

