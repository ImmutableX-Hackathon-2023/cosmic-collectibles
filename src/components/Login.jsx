import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Login = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if the user has MetaMask installed and activated
    console.log('run ethereum')
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      // Request the user to access their MetaMask account
      window.ethereum.enable().then((accounts) => {
        console.log(accounts)
        setAccount(accounts[0]);
      });
    } else {
      console.error('MetaMask is not installed or activated');
    }
  }, []);

  if (!web3 || !account) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {account}</h1>
      <p>You are now logged in with MetaMask</p>
    </div>
  );
};

export default Login;
