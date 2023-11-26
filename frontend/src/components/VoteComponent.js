import React, { useEffect, useState } from 'react';

const VoteComponent = ({ userAddress, contractInstance }) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [voteCount, setVoteCount] = useState(0);
    const [isVoting, setIsVoting] = useState(false); // State to track if a vote is in progress

    useEffect(() => {
        const fetchData = async () => {
            await getTotalVotes();
            console.log("userAddress===" + userAddress);
        };

        fetchData();
        console.log("userAddress===" + userAddress);
    }, []);

    const castVote = async () => {
        if (contractInstance && userAddress) {
            try {
                setIsVoting(true); // Set voting to true when a vote starts
                await contractInstance.methods.vote().send({ from: userAddress });
            } catch (error) {
                if (error.code === 4001) {
                    // User rejected transaction (MetaMask)
                    setErrorMessage('Transaction rejected by user');
                } else {
                    // Reverted transaction due to other reasons
                    setErrorMessage('Transaction failed. Please try again.');
                    console.error("Transaction reverted:", error);
                }
            }
            finally {
                setIsVoting(false); // Set voting back to false after the transaction is done or failed
            }
            await getTotalVotes();
            console.log('Vote successfully casted!');
        } else {
            console.error('Contract instance or user address not available.');
        }

        setTimeout(() => {
            setErrorMessage('');
        }, 5000); // 5000 milliseconds = 5 seconds

    };

    async function getTotalVotes() {
        try {
            const votes = await contractInstance.methods.getTotalVotes().call();
            console.log("votes " + votes);
            setVoteCount(votes);
            console.log('Total votes:', votes.toString());
        } catch (error) {
            console.error('Error getting total votes:', error);
        }
    }

    return (
        <div className="MiddleComponent">
            <h1>Connected to Address: {userAddress}</h1>
            <h2>Vote For a Petition To Donate $1 of Every Purchase will Go to FeedIndia!</h2>
            <h3>Total Votes : {voteCount.toString()} </h3>
            <button className="customButton" onClick={castVote} disabled={isVoting}>
                {isVoting ? 'Voting...' : 'Vote'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default VoteComponent;
