const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Voting", function () {
    let voting;
    it("Should be able to Vote", async function () {
        voting = await ethers.deployContract("Voting");
        await voting.vote();
    });

    it("Already voted candidate should be unable to vote", async function () {
        expect(await voting.vote().to.be.revertedWith("You have already Casted Vote!"))
    });

    it("Should be able to See total Vote Counts Yet", async function () {
        await voting.getTotalVotes();
    });
});
