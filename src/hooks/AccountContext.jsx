import { createContext, useContext, useReducer } from "react";

export const AccountContext = createContext();


export const accountReducer = (state, action) => {
    switch (action.type){
        case('UPDATE'):
            console.log(`ln10: ${action.payload}`);
            return{
                account:action.payload
            }
        case('LOGOUT'):
            return{
                account:null
            }
        default:
            return state
    }
}

export const useAccountContext = () => {
    const stateAndDispatch = useContext(AccountContext);

    if(!stateAndDispatch){
        throw Error("useAccountContext in scope!")
    }
    return stateAndDispatch
}

export const AccountContextProvider = ({children}) => {

    const [state,dispatch]= useReducer(accountReducer, {account: null})
  return(
    <AccountContext.Provider value = {{...state, dispatch}}>
        {children}
    </AccountContext.Provider>
  )  
}