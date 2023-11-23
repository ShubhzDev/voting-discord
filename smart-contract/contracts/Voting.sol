// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct voter {
        bool isVoteCasted;
    }

    uint totalVotes;
    mapping(address => voter) voters;

    //casting a vote
    function vote(address walletAddress) public {
        require(
            !voters[walletAddress].isVoteCasted,
            "You have already Casted Vote!"
        );
        voters[walletAddress].isVoteCasted = true;
    }

    //viewing total votes
    function getTotalVotes() public view returns (uint) {
        return totalVotes;
    }
}
