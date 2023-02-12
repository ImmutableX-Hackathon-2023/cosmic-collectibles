import React, { useContext, useEffect } from "react";

import { AccountContext } from "./AccountContext";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import main from "../../game/main";

export default function Game() {
  const { account } = useContext(AccountContext);
  // console.log(localStorage.getItem('wallet_address'));
  const items = { ...localStorage };
  // console.log(`items: ${items}`)
  // console.log(items);
  // console.log('Account from context in Game component:', account);
  useEffect(() => {
    console.log("Account:", account);
  }, [account]);

  return (
    <>
      <Header />
      <div id="game-display" className="flex items-center justify-center ">
        <Loading />
        {main()}
      </div>
      <Footer />
    </>
  );
}
