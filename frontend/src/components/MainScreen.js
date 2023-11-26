import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import MetamaskComponent, { userAddress } from './MetamaskComponent';
import VoteComponent from './VoteComponent';
import './StyleSheet.css'; // Assuming your CSS file is named MiddleComponent.css
import * as data from "../output.json"
let jsonContent = data;

const MainScreen = () => {
    const [isConnectedToMetaMask, setIsConnectedToMetaMask] = useState(false);
    const [contractInstance, setContractInstance] = useState(null);
    const [userAddress, setUserAddress] = useState("");

    function handleMetaMaskConnect(status) {
        console.log("seetting " + status);
        setIsConnectedToMetaMask(status);
    };

    function setContract(contract) {
        setContractInstance(contract);
    };

    function setWalletAddress(address) {
        setUserAddress(address);
    };

    useEffect(() => {
        const checkMetaMaskConnection = async () => {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    window.web3 = web3;

                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    console.log(accounts);
                    console.log(accounts.length);

                    handleMetaMaskConnect(accounts.length > 0);
                    setWalletAddress(accounts[0]);

                    window.ethereum.on('accountsChanged', (newAccounts) => {

                        console.log("newAccounts" + newAccounts);

                        handleMetaMaskConnect(newAccounts.length > 0);
                        setWalletAddress(newAccounts[0]);

                        console.log('Metamask found' + userAddress);
                        console.log('Connected to Metamask' + isConnectedToMetaMask);

                    });

                    const contract = new web3.eth.Contract(JSON.parse(jsonContent.contractAbi), jsonContent.contractAddress);
                    setContract(contract);

                } catch (error) {
                    console.error('Error checking MetaMask connection:', error);
                }
            } else {
                handleMetaMaskConnect(false);
            }
        };

        checkMetaMaskConnection();

    }, [isConnectedToMetaMask, userAddress]);

    return (
        <div>

            {isConnectedToMetaMask ? (
                <VoteComponent
                    userAddress={userAddress}
                    contractInstance={contractInstance}
                />
            ) : (
                <MetamaskComponent
                    isConnectedToMetaMask={isConnectedToMetaMask}
                    handleMetaMaskConnect={handleMetaMaskConnect}
                    contractInstance={contractInstance}
                    setContract={setContract}
                    userAddress={userAddress}
                    setWalletAddress={setWalletAddress}
                />
            )}
        </div>
    );
};

export default MainScreen;
