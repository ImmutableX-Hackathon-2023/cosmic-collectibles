import React, { useEffect, useState } from 'react'

import Web3 from 'web3';
import { useAccountContext } from '../hooks/AccountContext';

const Login = () => {window.addEventListener('load', async () => {
     const {account, dispatch}= useAccountContext();

    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            const accountId  = await ethereum.send('eth_requestAccounts');
            console.log(`ln15 login: ${accountId}`)
            console.log(`ln16 login: ${account}`)
            // Acccounts now exposed
            dispatch({type:'UPDATE', payload:accountId[0]});
            console.log(`ln18 login: ${account}`)

            return (<div> Logged In</div>)
        } 
        catch (error) {
           return( <div>Fix Up</div>)
        }
    }
  
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
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

});
}

export default Login;