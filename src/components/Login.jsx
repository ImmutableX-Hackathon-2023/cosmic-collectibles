import React, { useEffect, useState } from "react";

import Web3 from "web3";
import { useAccountContext } from "../hooks/AccountContext";

const Login = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  // console.log(account);
  localStorage.setItem("wallet_address", account);
  console.log(localStorage.getItem("wallet_address"));

  useEffect(() => {
    // Check if the user has MetaMask installed and activated
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      window.ethereum.enable().then((accounts) => {
        setAccount(accounts[0]);
      });
    }
    // else {
    //   console.error('MetaMask is not installed or activated');
    //   return <div>MetaMask is not installed or activated</div>;
    // }
  }, []);

  if (!window.ethereum) {
    // console.error("MetaMask is not installed or activated");
    return <div>MetaMask is not installed or activated</div>;
  }

  if (!web3 || !account) {
    return <div>Loading...</div>;
  }

  return (
    // <Redirect to="/game" />
    <div>
      <h1>You have logged in!!</h1>
      <button onClick={() => (window.location.href = "/galaxy-quest/game")}>
        Start game
      </button>
    </div>
  );
};

export default Login;
