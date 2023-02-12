import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import  {fetchRocket}  from "../fetch/fetchRocket";
// const fetchRocket = require('../fetch/fetchRocket')
import main from "../../game/main";
import { useAccountContext } from "../hooks/AccountContext";
export default function Game() {
  console.log("start game");
  const {account, dispatch} = useAccountContext;
  console.log(`account is ${account}`)
  fetchRocket();
  console.log("called fetchRocket");
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
