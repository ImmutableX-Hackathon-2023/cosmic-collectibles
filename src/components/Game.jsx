import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import main from "../../game/main";

export default function Game() {
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
