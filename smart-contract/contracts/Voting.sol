// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct voter {
        bool isVoteCasted;
    }

    uint private totalVotes;

    mapping(address => voter) private voters;

    event VoteCasted(address indexed voter);

    // Casting a vote
    function vote() public {
        address walletAddress = msg.sender;
        require(
            !voters[walletAddress].isVoteCasted,
            "You have already casted your vote!"
        );
        voters[walletAddress].isVoteCasted = true;
        totalVotes += 1;

        // Emit the VoteCasted event when a vote is cast
        emit VoteCasted(walletAddress);
    }

    // Viewing total votes
    function getTotalVotes() public view returns (uint) {
        return totalVotes;
    }
}
