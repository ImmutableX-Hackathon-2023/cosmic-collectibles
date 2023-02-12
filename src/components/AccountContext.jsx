import React, { createContext, useState } from 'react';

import Cookies from 'universal-cookie';

export const AccountContext = createContext();


export const AccountContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  console.log("Setting initial account to:", account);
  // localStorage.setItem('wallet_address', account);
  // console.log(localStorage.getItem('wallet_address'));

  const cookies = new Cookies();
  cookies.set('wallet_address', account, { path: '/' });
  console.log(cookies.get('wallet_address')); // 


  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
