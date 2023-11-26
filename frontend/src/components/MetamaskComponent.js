import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MetamaskComponent = ({ isConnectedToMetaMask, handleMetaMaskConnect,
    setContract, contractInstance,
    userAddress, setWalletAddress }) => {

    const connectToMetamask = async () => {
        try {
            if (window.ethereum) {

                const web3 = new Web3(window.ethereum);
                window.web3 = web3;

                const account = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })

                window.ethereum.on('accountsChanged', (newAccounts) => {
                    handleMetaMaskConnect(newAccounts.length > 0);
                    setWalletAddress(newAccounts[0]);

                    console.log('Metamask found' + userAddress);
                    console.log('Connected to Metamask' + isConnectedToMetaMask);

                });

            } else {
                alert("Install MetaMask!!");
                console.error('Metamask not found');
            }
        } catch (error) {
            console.error('Error connecting to Metamask:', error);
        }
    };

    return (
        <div className="MiddleComponent">
            <h1>Metamask Integration</h1>

            {!isConnectedToMetaMask ? (
                <button className="customButton" onClick={connectToMetamask}>Connect to Wallet</button>
            ) : (
                <div>
                    {userAddress ? (
                        <h2>Connected Address: {userAddress}</h2>
                    ) : (
                        <h2>Connecting...</h2>
                    )}
                </div>)}
        </div>
    );

};

export default MetamaskComponent;
