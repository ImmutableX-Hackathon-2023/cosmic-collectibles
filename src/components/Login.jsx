import React, { useEffect, useState } from 'react';

import Web3 from 'web3';
import { useAccountContext } from '../hooks/AccountContext';

const Login = () => {
  const [web3, setWeb3] = useState(null);
  // const [account, setAccount] = useState(null);
  const {account, dispatch}= useAccountContext()
  // console.log(account);

  useEffect(() => {
    // Check if the user has MetaMask installed and activated
    console.log('run ethereum')
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      // Request the user to access their MetaMask account
      const requestUser = async() => {
        // window.ethereum.enable().then((accounts) => {
        // console.log(`accounts ln21: ${accounts}`);
        // console.log(`accounts ln22: ${accounts[0]}`);
        // dispatch({type: 'UPDATE', payload:accounts[0]})
        // console.log(`account in login ln25: ${account}`)
        // })


        const accounts = await window.ethereum.enable();
        console.log(`accounts ln21: ${accounts}`);
        console.log(`accounts ln22: ${accounts[0]}`);
        dispatch({type: 'UPDATE', payload:accounts[0]})
        console.log(`account in login ln25: ${account}`)
        
      }
      requestUser();
    } 
  
  }, []);
  console.log(`ln29 in login: ${account}`)
  if(!window.ethereum){
    console.error('MetaMask is not installed or activated');
      return <div>MetaMask is not installed or activated</div>;
  }

  if (!web3 || !account) {
    return <div>Loading...</div>;
  }

  return (
    // <Redirect to="/game" />
    <div>
      <h1>You have logged in!!</h1>
      <button onClick={() => window.location.href="/galaxy-quest/game"}>Start game</button>
    </div>
  );

};

export default Login;