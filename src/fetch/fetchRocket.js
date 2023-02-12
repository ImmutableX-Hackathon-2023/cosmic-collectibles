import { useAccountContext } from '../hooks/AccountContext';

/**
 * Remember to try local ip address
 */
export async function fetchRocket(){
  console.log("In fetch rocket");
  const {account, dispatch}= useAccountContext()
  console.log(`account in fetchRocket: ${account}`)
  const response = await fetch(`http://localhost:4000/rocket/`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8' ,
        'wallet_address': account,
        }
  
      }
      )

  const result = await response.json();
  console.log(`result in fetchRocket: ${result}`)
  console.log(result);
  return result;
}

// module.exports = fetchRocket;