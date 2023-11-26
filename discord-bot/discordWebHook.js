const ethers = require('ethers');
const path = require("path");
const fs = require("fs");
const smartContractDir = path.resolve(__dirname, '..', 'frontend/src');
const outputFilePath = path.join(smartContractDir, 'output.json');
const jsonContent = fs.readFileSync(outputFilePath, "utf-8");
const { contractAddress, contractAbi } = JSON.parse(jsonContent);
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

const discordWebhookURL = process.env.DISCORD_WEB_HOOK_URL
console.log(discordWebhookURL);

const provider = new ethers.WebSocketProvider('wss://sepolia.infura.io/ws/v3/' + process.env.INFURA_KEY); // Connect to an Sepolia node
const contract = new ethers.Contract(contractAddress, JSON.parse(contractAbi), provider);

console.log(contractAbi);
console.log(contractAddress);

async function WatchSmartContractEvents() {

    contract.on("VoteCasted", async (walletAddress) => {
        const message = `Vote Casted by Wallet User: ${walletAddress}`;
        await axios.post(discordWebhookURL, { content: message });
        console.log("event");
    })
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

WatchSmartContractEvents();