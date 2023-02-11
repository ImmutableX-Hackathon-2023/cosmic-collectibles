import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAccountContext } from '../hooks/AccountContext';

const Login = () => {
  const [web3, setWeb3] = useState(null);
  // const [account, setAccount] = useState(null);
  const {account, dispatch}= useAccountContext()
  // console.log(account);

  // const fetchData = async (address) => {
  //   const response = await fetch(`http://localhost/rocket/${address}`);
  //   const data = await response.json();
  //   console
  //   return data;
  // };

  useEffect(() => {
    // Check if the user has MetaMask installed and activated
    console.log('run ethereum')
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      // Request the user to access their MetaMask account
      window.ethereum.enable().then((accounts) => {
        console.log(accounts)
        // setAccount(accounts[0]);
        //update account with accounts[0]
        dispatch({type: 'UPDATE', payload:accounts[0]})
        console.log(account)
        // fetchData(account).then((data) => {
        //   // do something (data)....
        // });
      });
    } 
  }, []);

  if(!window.ethereum){
    console.error('MetaMask is not installed or activated');
      return <div>MetaMask is not installed or activated</div>;
  }

  if (!web3 || !account) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>You have logged in!!</h1>
      <button onClick={() => window.location.href="/galaxy-quest/game"}>Start game</button>
    </div>
  );

};

export default Login;
