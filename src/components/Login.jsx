import Footer from "./Footer";
import Header from "./Header";

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white w-fit bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center flex items-center px-[30px] py-[1px] mx-[5px] rounded-full border-[3px] );">
        <p>Edit This</p>
      </div>
      <a href="/galaxy-quest/">
        <div className="hover:cursor-pointer transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 mt-2 text-black w-fit bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 font-Audiowide text-lg text-center hover:bg-red-800 flex items-center px-[30px] py-[1px] mx-[5px] rounded-full border-[3px] );">
          <p>Click here to return to the game!</p>
        </div>
      </a>
    </div>
  );
}

{
}
