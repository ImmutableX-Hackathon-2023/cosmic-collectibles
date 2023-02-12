import React, { useContext, useEffect, useState } from "react";

import { AccountContext } from "./AccountContext";
import Web3 from "web3";

export const get_wallet_address = () => {
  if (web3) {
    // Check if the user has MetaMask installed and activated
    if (window.ethereum) {
      window.ethereum.enable().then((accounts) => {
        console.log(accounts[0]);
        const wallet_address = accounts[0];
        return wallet_address;
      });
    } else {
      console.error("MetaMask is not installed or activated");
      return -1;
    }
  }
};

export const Login = () => {
  const [web3, setWeb3] = useState(null);
  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {
    // Check if the user has MetaMask installed and activated
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      // Request the user to access their MetaMask account
      window.ethereum.enable().then((accounts) => {
        console.log(accounts[0]);
        setAccount(accounts[0]);
      });
    } else {
      console.error("MetaMask is not installed or activated");
    }
  }, []);

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>You have logged in!!</h1>
      <button onClick={() => (window.location.href = "/galaxy-quest/game")}>
        Start game
      </button>
    </div>
  );
};

export default Login;

// module.exports.get_wallet_address = get_wallet_address;
