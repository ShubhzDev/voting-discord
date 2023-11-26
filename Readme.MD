### **Project Structure**

- **Smart Contracts**

  - Created a smart contract named `Voting.sol` for simple voting and tallying total votes.
  - Implemented test cases using Mocha and Chai in `test.js`.
  - Developed `deploy.js`, responsible for deploying the smart contract and generating `output.json` in the directory.

- **Discord Bot**

  - Integrated a WebHook for Discord that registers the smart contract event "VoteCasted" and sends notifications to everyone in the server.

- **Frontend**
  - Designed a responsive React-based frontend that achieves the following functionalities:
    - Connects to MetaMask for wallet interactions.
    - Allows users to vote for a petition.
    - Displays the total voting counts.

### **How to Run the Project**

1. **Discord Bot Section**

   - Open the terminal in the `discord-bot` directory and execute `./start_discord_bot.sh`.
   - If there are permission issues, use `chmod +x ./start_discord_bot.sh` to grant executable permissions.

2. **Frontend Section**
   - Open the terminal in the `frontend` directory and execute `./start_frontend.sh`.
   - If there are permission issues, use `chmod +x ./start_frontend.sh` to grant executable permissions.
