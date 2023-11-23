const { Client, GatewayIntentBits } = require("discord.js");
const Web3 = require("web3");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessage]
});

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY'); // Connect to an Sepolia node
const contractAddress = "";
const contractAbi = "";

const contract = new web3.eth.Contract(contractAbi, contractAddress);

contract.events.VoteCast().on("data", async(events) = {

}).on("error", (error) => {
    console.error("Error : ", error);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    console.log(message.content);
});

client.login("ID");
