const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Voting", function () {
    let voting;
    it("Should be able to Vote", async function () {
        voting = await ethers.deployContract("Voting");
        await voting.vote();
    });

    it("Already voted candidate shouldn't be unable to vote", async function () {
        await expect(voting.vote()).to.be.revertedWith("You have already Casted Vote!")
    });

    it("Should be able to See total Vote Counts Yet", async function () {
        await voting.getTotalVotes();
    });

    it("Vote Count Should be One", async function () {
        const voteCount = await voting.getTotalVotes();
        expect(voteCount).to.equal(1);
    });
});
