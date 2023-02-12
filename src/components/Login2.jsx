import React, { useEffect, useState } from 'react';

import Web3 from 'web3';
import { useAccountContext } from '../hooks/AccountContext';

const Login = () => {
  const [web3, setWeb3] = useState(null);
  // const [account, setAccount] = useState(null);
  const {account, dispatch} = useAccountContext()

    
  
    console.log('run ethereum')
    useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      // Request the user to access their MetaMask account
      try{
       async function requestAccount(){
        const accounts = await ethereum.send('eth_requestAccounts');
        console.log(accounts);
        return accounts;
      }
     const accounts =  awaitRequestAccount();
      console.log(accounts);
     console.log(`accounts.result: ${accounts.result}`)
     dispatch({type:'UPDATE', payload: accounts.result[0]})

     const awaitRequestAccount = async () => { await requestAccount() }

      }
      catch(error){
        console.error(error);
      }
    } 
  
   

    console.log(account);
    if(!window.ethereum){
      console.error('MetaMask is not installed or activated');
        
    }

    if (!web3 || !account) {
      console.error('loading...')
    }
  }, []);
  return (
    // <Redirect to="/game" />
    <div>
      <h1>You have logged in!!</h1>
      <button onClick={() => window.location.href="/galaxy-quest/game"}>Start game</button>
    </div>
  );

};

export default Login;
